import { definePrivilegedContracts, definePrivilegedHandlers, z } from "@hatch/space-sdk";

export const Privileged = definePrivilegedContracts({
  hashPassword: {
    request: z.object({ password: z.string().min(6).max(72) }),
    response: z.object({ hash: z.string() }),
  },
  verifyPassword: {
    request: z.object({ password: z.string().min(1).max(72), hash: z.string().min(1) }),
    response: z.object({ valid: z.boolean() }),
  },
  sendAuthEmail: {
    request: z.object({
      to: z.string().email(),
      username: z.string().min(1),
      kind: z.enum(["email_verification", "password_reset"]),
      code: z.string().regex(/^\d{6}$/),
    }),
    response: z.object({ sent: z.boolean(), error: z.string().optional() }),
  },
});

export default definePrivilegedHandlers(Privileged, {
  async hashPassword({ password }) {
    return { hash: await Bun.password.hash(password, { algorithm: "argon2id" }) };
  },
  async verifyPassword({ password, hash }) {
    return { valid: await Bun.password.verify(password, hash) };
  },
  async sendAuthEmail() {
    // Provider seam: replace this handler with the chosen provider's API call.
    // Keep provider credentials in the approved secret store, never in source.
    // The action layer already creates one-time codes, expiry, retry, and
    // verification/reset flows, so a provider only needs to deliver the code.
    return { sent: false, error: "Email delivery is not connected yet." };
  },
});
