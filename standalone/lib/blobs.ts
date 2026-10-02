// Local-disk blob storage implementing the `ctx.blobs` surface the actions
// use: put(key, bytes, {contentType, public}), getUrl(key), delete(key).

import { mkdir, rm, writeFile } from "node:fs/promises";
import { join, sep } from "node:path";

const DATA_DIR = process.env.CHAT_SING_DATA ?? "./data";
const BLOB_DIR = join(DATA_DIR, "blobs");

function safeKey(key: string): string {
  const parts = key.split("/").filter((p) => p && p !== "." && p !== "..");
  if (parts.length === 0) throw new Error("Invalid blob key");
  return parts.join(sep);
}

export const blobs = {
  async put(
    key: string,
    data: Uint8Array | ArrayBuffer,
    _options?: { contentType?: string; public?: boolean }
  ): Promise<void> {
    const rel = safeKey(key);
    const full = join(BLOB_DIR, rel);
    await mkdir(join(BLOB_DIR, rel.split(sep).slice(0, -1).join(sep) || "."), {
      recursive: true,
    }).catch(() => {});
    const dir = full.slice(0, full.lastIndexOf(sep));
    await mkdir(dir, { recursive: true });
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
    await writeFile(full, bytes);
  },

  async getUrl(_key: string, _options?: { public?: boolean }): Promise<string> {
    const key = safeKey(_key);
    return `/blobs/${key.split(sep).join("/")}`;
  },

  async delete(key: string): Promise<void> {
    const full = join(BLOB_DIR, safeKey(key));
    await rm(full, { force: true });
  },

  /** Absolute path of a stored blob, for the HTTP layer to serve. */
  diskPath(key: string): string {
    return join(BLOB_DIR, safeKey(key));
  },
};
