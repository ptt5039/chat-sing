// Standalone HTTP server for chat-sing — replaces the Muse hosting runtime.
//
// Serves the prebuilt client (public/), speaks the same action protocol the
// client bundle already uses (POST /actions with {action, args}), stores
// blobs on local disk (/blobs/*), and runs the app's unmodified
// `server/src/actions.ts` against a local SQLite file via drizzle-orm.
//
// Run: bun run start   (env: PORT=3000, CHAT_SING_DATA=./data)

import { extname, join, normalize, resolve } from "node:path";
import { dbAccessor, runMigrations } from "./lib/db.ts";
import { blobs } from "./lib/blobs.ts";
import { isAction } from "./lib/sdk-shim.ts";

// Resolved through shims installed by scripts/install-shims.mjs so the
// unmodified app sources keep working outside the Muse runtime.
import { Actions } from "../server/src/actions.ts";
import privilegedHandlers from "@space/privileged";

const ROOT = join(import.meta.dir, "..");
const PUBLIC_DIR = join(import.meta.dir, "public");
const MIGRATIONS_DIR = join(ROOT, "drizzle");
const DATA_DIR = process.env.CHAT_SING_DATA ? resolve(process.env.CHAT_SING_DATA) : resolve("./data");

// ---------------------------------------------------------------------------
// Privileged contracts (password hashing, email stub) from the app's own
// server/src/privileged.ts — same behavior as the hosted version.
// ---------------------------------------------------------------------------
const privilegedByName = new Map<string, { contract: any; handler: (args: any) => Promise<any> }>();
for (const entry of (privilegedHandlers as any).entries ?? []) {
  privilegedByName.set(entry.contract.name, entry);
}

async function executePrivileged(contract: any, args: any): Promise<any> {
  const entry = privilegedByName.get(contract?.name);
  if (!entry) throw new Error(`Unknown privileged contract: ${contract?.name}`);
  const validArgs = entry.contract.request.parse(args);
  const result = await entry.handler(validArgs);
  return entry.contract.response.parse(result);
}

// ---------------------------------------------------------------------------
// Per-request action context (the `Ctx` the actions were written against).
// ---------------------------------------------------------------------------
let invocationSeq = 0;

function makeCtx() {
  return {
    slug: "chat-sing",
    invocationId: `standalone-${Date.now()}-${++invocationSeq}`,
    spaceDir: ROOT,
    db: dbAccessor,
    viewer: undefined,
    blobs,
    // The client polls on an interval, so cross-client invalidation is a no-op.
    invalidateQueries: () => {},
    executePrivileged,
  };
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

// ---------------------------------------------------------------------------
// POST /actions — the exact protocol the client bundle speaks:
//   request  { action: string, args: object, actionCallId: string }
//   response { data: unknown } | { error: string }
// ---------------------------------------------------------------------------
async function handleAction(req: Request): Promise<Response> {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const def = (Actions as Record<string, unknown>)[body?.action];
  if (!isAction(def)) {
    return json({ error: `Unknown action: ${String(body?.action)}` }, 404);
  }

  let args: unknown;
  try {
    args = def.request.parse(body.args ?? {});
  } catch {
    return json({ error: "Invalid action arguments." }, 400);
  }

  try {
    const data = await def.handler(makeCtx(), args);
    return json({ data: data ?? null });
  } catch (e: any) {
    return json({ error: e?.message ? String(e.message) : "Action failed." });
  }
}

// ---------------------------------------------------------------------------
// Static client + blob files.
// ---------------------------------------------------------------------------
const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

async function serveStatic(pathname: string): Promise<Response> {
  let rel = pathname === "/" ? "/index.html" : pathname;
  try {
    rel = decodeURIComponent(rel);
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  const full = normalize(join(PUBLIC_DIR, rel));
  if (!full.startsWith(PUBLIC_DIR)) return new Response("Forbidden", { status: 403 });

  let file = Bun.file(full);
  if (!(await file.exists())) {
    file = Bun.file(join(PUBLIC_DIR, "index.html")); // SPA fallback
    if (!(await file.exists())) return new Response("Client not built.", { status: 500 });
  }
  return new Response(file, {
    headers: { "content-type": MIME[extname(full)] ?? "application/octet-stream" },
  });
}

// ---------------------------------------------------------------------------
// Boot.
// ---------------------------------------------------------------------------
await runMigrations(MIGRATIONS_DIR);

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/actions") {
      return handleAction(req);
    }

    if (req.method === "GET" && url.pathname.startsWith("/blobs/")) {
      const key = url.pathname.slice("/blobs/".length);
      const file = Bun.file(blobs.diskPath(key));
      if (!(await file.exists())) return new Response("Not found", { status: 404 });
      return new Response(file);
    }

    if (req.method === "GET" || req.method === "HEAD") {
      return serveStatic(url.pathname);
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`[chat-sing] listening on http://localhost:${port}`);
console.log(`[chat-sing] data dir: ${DATA_DIR}`);
