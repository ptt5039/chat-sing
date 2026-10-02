// Re-exported as `@space/privileged` inside standalone node_modules.
// Reuses the app's real privileged handlers (argon2id password hashing,
// email stub) so behavior matches the hosted version.
export * from "../../../server/src/privileged.ts";
export { default } from "../../../server/src/privileged.ts";
