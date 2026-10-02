// SQLite database for the standalone server: libsql (file) + drizzle-orm,
// matching the `SpaceDb` surface the actions use
// (select/insert/update/delete/run/all/get/batch).

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { mkdirSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { isAbsolute, join, resolve } from "node:path";

// Absolute data dir, created before the client opens the file — libsql
// cannot create missing parent directories itself.
const DATA_DIR = process.env.CHAT_SING_DATA
  ? resolve(process.env.CHAT_SING_DATA)
  : resolve("./data");
mkdirSync(DATA_DIR, { recursive: true });
export const DB_PATH = join(DATA_DIR, "app.db");

export const libsql = createClient({ url: `file:${DB_PATH}` });
export const db = drizzle(libsql);

export type AppDb = typeof db;

/** `ctx.db<T>()` — the accessor shape actions expect. */
export function dbAccessor<T = Record<string, never>>(): AppDb {
  return db as unknown as AppDb;
}

async function appliedMigrations(): Promise<Set<string>> {
  await libsql.execute(
    `CREATE TABLE IF NOT EXISTS __migrations (tag TEXT PRIMARY KEY, applied_at INTEGER NOT NULL)`
  );
  const rs = await libsql.execute(`SELECT tag FROM __migrations`);
  return new Set(rs.rows.map((r) => String(r.tag)));
}

/** Apply `drizzle/*.sql` migrations in journal order, skipping applied ones. */
export async function runMigrations(migrationsDir: string): Promise<void> {
  const journalRaw = await readFile(join(migrationsDir, "meta", "_journal.json"), "utf8");
  const journal = JSON.parse(journalRaw) as {
    entries: { tag: string }[];
  };
  const applied = await appliedMigrations();

  for (const entry of journal.entries) {
    if (applied.has(entry.tag)) continue;
    const sql = await readFile(join(migrationsDir, `${entry.tag}.sql`), "utf8");
    // Strip the statement-breakpoint comments drizzle emits.
    const cleaned = sql
      .split("\n")
      .filter((line) => !line.trimStart().startsWith("-->"))
      .join("\n");
    await libsql.executeMultiple(cleaned);
    await libsql.execute({
      sql: `INSERT INTO __migrations (tag, applied_at) VALUES (?, ?)`,
      args: [entry.tag, Date.now()],
    });
    console.log(`[db] applied migration ${entry.tag}`);
  }
}
