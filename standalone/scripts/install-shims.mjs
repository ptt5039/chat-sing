// Copies the local shims into node_modules so the app's unmodified
// `server/src/actions.ts` (which imports `@hatch/space-sdk` and
// `@space/privileged`) resolves under plain Bun/Node-style resolution.
import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const pkg of ["@hatch/space-sdk", "@space/privileged"]) {
  const src = join(root, "shims", pkg);
  const dest = join(root, "node_modules", pkg);
  await mkdir(dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: true });
  console.log(`[shims] installed ${pkg}`);
}
