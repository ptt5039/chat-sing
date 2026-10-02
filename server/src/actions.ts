import { defineAction, z, type ActionsModule, type Ctx } from "@hatch/space-sdk";
import { and, asc, desc, eq, isNotNull, isNull, lte, or } from "drizzle-orm";
import * as schema from "./schema";
import { Privileged } from "@space/privileged";

const roleSchema = z.enum(["user", "moderator", "admin", "superadmin"]);
const storedRoomTierSchema = z.enum(["visitor", "member", "mod1", "mod2", "mod3", "blackshirt"]);
const roomTierSchema = z.enum(["visitor", "member", "mod1", "mod2", "mod3", "blackshirt", "owner", "admin", "superadmin"]);
type StoredRoomTier = z.infer<typeof storedRoomTierSchema>;
type RoomTier = z.infer<typeof roomTierSchema>;
const emailSchema = z.string().trim().email("Enter a valid email address.").max(254);
const chatFontFamilySchema = z.enum(["system", "serif", "rounded", "mono", "handwriting"]);
const chatTextStyleSchema = z.object({
  fontFamily: chatFontFamilySchema,
  fontSize: z.number().int().min(12).max(24),
  bold: z.boolean(),
  italic: z.boolean(),
  underline: z.boolean(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});
const userViewSchema = z.object({
  id: z.number(),
  name: z.string(),
  displayName: z.string(),
  personalStatus: z.string().nullable().optional(),
  gender: z.enum(["male", "female"]).nullable().optional(),
  email: z.string().nullable(),
  emailVerified: z.boolean(),
  role: roleSchema,
  hasPassword: z.boolean(),
  singerCoverPhotoUrl: z.string().nullable().optional(),
  chatTextStyle: chatTextStyleSchema.optional(),
});
const doneSchema = z.object({ ok: z.boolean(), error: z.string().optional() });
const reportCategorySchema = z.enum(["harassment", "hate", "spam", "sexual", "violence", "impersonation", "other"]);
const inboxStatusSchema = z.enum(["open", "reviewing", "resolved", "dismissed"]);
const supportStatusSchema = z.enum(["open", "accepted", "resolved", "dismissed"]);
const emailDeliverySchema = z.enum(["sent", "not_configured"]);
const passwordSchema = z.string().min(6, "Use at least 6 characters.").max(72, "Password must be 72 characters or fewer.");
const HEART_COOLDOWN_MS = 2 * 60_000;
const CREDIT_HOUR_MS = 60 * 60_000;
const ONLINE_CONTINUITY_MS = 30_000;
const MASTER_LOG_RETENTION_MS = 30 * 24 * 60 * 60_000;
const imageMimeSchema = z.enum(["image/jpeg", "image/png", "image/webp"]);
const imageUploadSchema = z.object({ dataBase64: z.string().min(1).max(10_000_000), mimeType: imageMimeSchema });
const reportAttachmentMimeSchema = z.enum([
  "image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/plain",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const reportAttachmentUploadSchema = z.object({
  dataBase64: z.string().min(1).max(10_000_000),
  mimeType: reportAttachmentMimeSchema,
  fileName: z.string().trim().min(1).max(120),
});

type AppCtx = Ctx;

function imageExtension(mimeType: z.infer<typeof imageMimeSchema>) {
  return mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
}

function decodeVerifiedImage(dataBase64: string, mimeType: z.infer<typeof imageMimeSchema>) {
  const bytes = Buffer.from(dataBase64, "base64");
  if (bytes.length === 0 || bytes.length > 7_500_000) return null;
  const isJpeg = mimeType === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = mimeType === "image/png" && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isWebp = mimeType === "image/webp" && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  return isJpeg || isPng || isWebp ? bytes : null;
}

async function publicBlobUrl(ctx: AppCtx, key: string | null) {
  if (!key) return null;
  try {
    return await ctx.blobs.getUrl(key, { public: true });
  } catch {
    return null;
  }
}

async function privateBlobUrl(ctx: AppCtx, key: string | null) {
  return key ? await ctx.blobs.getUrl(key) : null;
}

function decodeReportAttachment(dataBase64: string, mimeType: z.infer<typeof reportAttachmentMimeSchema>) {
  const bytes = Buffer.from(dataBase64, "base64");
  if (bytes.length === 0 || bytes.length > 7_500_000) return null;
  const isJpeg = mimeType === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = mimeType === "image/png" && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isWebp = mimeType === "image/webp" && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  const isGif = mimeType === "image/gif" && (bytes.subarray(0, 6).toString("ascii") === "GIF87a" || bytes.subarray(0, 6).toString("ascii") === "GIF89a");
  const isPdf = mimeType === "application/pdf" && bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  const isText = mimeType === "text/plain" && !bytes.includes(0);
  const isDoc = mimeType === "application/msword" && bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  const isDocx = mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  return isJpeg || isPng || isWebp || isGif || isPdf || isText || isDoc || isDocx ? bytes : null;
}

function safeAttachmentName(fileName: string) {
  const cleaned = fileName.replace(/[\\/\u0000-\u001f\u007f]/g, "_").trim().slice(0, 120);
  return cleaned || "evidence-file";
}

async function authenticated(ctx: AppCtx, token: string) {
  const db = ctx.db<typeof schema>();
  const user = await db.select().from(schema.users).where(eq(schema.users.sessionToken, token)).get();
  if (!user || user.accountLocked || user.deletedAt) return undefined;
  if (user.lastIpAddress) {
    const blocked = await db.select({ id: schema.blockedIps.id }).from(schema.blockedIps).where(eq(schema.blockedIps.ipAddress, user.lastIpAddress)).get();
    if (blocked) return undefined;
  }
  return user;
}

async function accrueOnlineCredit(ctx: AppCtx, userId: number) {
  const db = ctx.db<typeof schema>();
  const user = await db.select({ creditBalance: schema.users.creditBalance, creditOnlineMs: schema.users.creditOnlineMs, creditLastSeenAt: schema.users.creditLastSeenAt }).from(schema.users).where(eq(schema.users.id, userId)).get();
  if (!user) return { balance: 0, onlineMs: 0 };
  const now = new Date();
  const elapsed = user.creditLastSeenAt ? now.getTime() - user.creditLastSeenAt.getTime() : 0;
  const eligibleElapsed = elapsed > 0 && elapsed <= ONLINE_CONTINUITY_MS ? elapsed : 0;
  const totalMs = user.creditOnlineMs + eligibleElapsed;
  const earned = Math.floor(totalMs / CREDIT_HOUR_MS);
  const onlineMs = totalMs % CREDIT_HOUR_MS;
  const balance = user.creditBalance + earned;
  const updateAccount = db.update(schema.users).set({ creditBalance: balance, creditOnlineMs: onlineMs, creditLastSeenAt: now }).where(eq(schema.users.id, userId));
  if (earned > 0) await db.batch([updateAccount, db.insert(schema.creditTransactions).values({ userId, kind: "online_earned", amount: earned, createdAt: now })]);
  else await updateAccount;
  return { balance, onlineMs };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function issueAuthCode(ctx: AppCtx, user: { id: number; name: string; email: string }, purpose: "email_verification" | "password_reset") {
  const db = ctx.db<typeof schema>();
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  const code = String((values[0] ?? 0) % 1_000_000).padStart(6, "0");
  const { hash: codeHash } = await ctx.executePrivileged(Privileged.hashPassword, { password: code });
  await db.delete(schema.authCodes).where(and(eq(schema.authCodes.userId, user.id), eq(schema.authCodes.purpose, purpose)));
  await db.insert(schema.authCodes).values({
    userId: user.id,
    purpose,
    codeHash,
    expiresAt: new Date(Date.now() + (purpose === "email_verification" ? 24 * 60 * 60_000 : 30 * 60_000)),
  });
  const delivery = await ctx.executePrivileged(Privileged.sendAuthEmail, { to: user.email, username: user.name, kind: purpose, code });
  return delivery.sent ? "sent" as const : "not_configured" as const;
}

async function consumeAuthCode(ctx: AppCtx, userId: number, purpose: "email_verification" | "password_reset", code: string) {
  const db = ctx.db<typeof schema>();
  const row = await db.select().from(schema.authCodes).where(and(
    eq(schema.authCodes.userId, userId),
    eq(schema.authCodes.purpose, purpose),
    isNull(schema.authCodes.usedAt),
  )).orderBy(desc(schema.authCodes.createdAt)).get();
  if (!row || row.expiresAt.getTime() <= Date.now()) return false;
  const { valid } = await ctx.executePrivileged(Privileged.verifyPassword, { password: code, hash: row.codeHash });
  if (!valid) return false;
  await db.update(schema.authCodes).set({ usedAt: new Date() }).where(eq(schema.authCodes.id, row.id));
  return true;
}

function isPlatformAdmin(role: string): role is "admin" | "superadmin" {
  return role === "admin" || role === "superadmin";
}

async function getBuyCreditsEnabled(ctx: AppCtx) {
  const db = ctx.db<typeof schema>();
  const settings = await db.select({ buyCreditsEnabled: schema.siteSettings.buyCreditsEnabled }).from(schema.siteSettings).where(eq(schema.siteSettings.id, 1)).get();
  return settings?.buyCreditsEnabled ?? true;
}

function mayManage(actorRole: string, targetRole: string) {
  if (actorRole === "superadmin") return targetRole !== "superadmin";
  if (actorRole === "admin") return targetRole !== "admin" && targetRole !== "superadmin";
  return actorRole === "moderator" && targetRole === "user";
}

const TIER_ORDER: StoredRoomTier[] = ["visitor", "member", "mod2", "mod1", "mod3"];
const MUTE_RANK_ORDER: RoomTier[] = ["superadmin", "admin", "owner", "blackshirt", "mod3", "mod1", "mod2", "member", "visitor"];

function mayMuteTier(actorTier: RoomTier, targetTier: RoomTier) {
  const actorRank = MUTE_RANK_ORDER.indexOf(actorTier);
  const targetRank = MUTE_RANK_ORDER.indexOf(targetTier);
  const minimumMuteRank = MUTE_RANK_ORDER.indexOf("mod1");
  return actorRank >= 0 && targetRank > actorRank && actorRank <= minimumMuteRank;
}

function moderatorLevelForTier(tier: StoredRoomTier) {
  if (tier === "mod1") return 1;
  if (tier === "mod3" || tier === "blackshirt") return 3;
  return 0;
}

function roomTierName(tier: StoredRoomTier) {
  if (tier === "mod1") return "Mod 1 - Cộng tác viên";
  if (tier === "mod2") return "VIP";
  if (tier === "mod3") return "Mod 3 - Quản trị viên";
  if (tier === "blackshirt") return "Black shirt";
  return tier === "member" ? "Member" : "Visitor";
}

function effectiveRoomTier(accountRole: string, owner: boolean, tier: StoredRoomTier): RoomTier {
  if (owner) return "owner";
  if (tier === "blackshirt") return "blackshirt";
  if (accountRole === "superadmin") return "superadmin";
  if (accountRole === "admin") return "admin";
  return tier;
}

async function isRoomOwner(ctx: AppCtx, roomId: number, userId: number) {
  const db = ctx.db<typeof schema>();
  const room = await db.select({ createdBy: schema.rooms.createdBy }).from(schema.rooms).where(eq(schema.rooms.id, roomId)).get();
  return room?.createdBy === userId;
}

async function roomModeratorLevel(ctx: AppCtx, roomId: number, userId: number, role: string) {
  if (isPlatformAdmin(role) || await isRoomOwner(ctx, roomId, userId)) return 3;
  const db = ctx.db<typeof schema>();
  const room = await db.select({ parentRoomId: schema.rooms.parentRoomId }).from(schema.rooms).where(eq(schema.rooms.id, roomId)).get();
  const membership = await db.select({ roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(
    eq(schema.memberships.roomId, roomId),
    eq(schema.memberships.userId, userId),
    eq(schema.memberships.state, "active"),
  )).get();
  const directLevel = membership ? moderatorLevelForTier(membership.roomTier) : 0;
  if (!room?.parentRoomId) return directLevel;
  if (await isRoomOwner(ctx, room.parentRoomId, userId)) return 3;
  const parentMembership = await db.select({ roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(
    eq(schema.memberships.roomId, room.parentRoomId),
    eq(schema.memberships.userId, userId),
    eq(schema.memberships.state, "active"),
  )).get();
  return Math.max(directLevel, parentMembership ? moderatorLevelForTier(parentMembership.roomTier) : 0);
}

async function hasRoomModeratorPowers(ctx: AppCtx, roomId: number, userId: number, role: string) {
  return await roomModeratorLevel(ctx, roomId, userId, role) >= 1;
}

async function hasRoomAdminPowers(ctx: AppCtx, roomId: number, userId: number, role: string) {
  if (isPlatformAdmin(role) || await isRoomOwner(ctx, roomId, userId)) return true;
  const db = ctx.db<typeof schema>();
  const membership = await db.select({ roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(
    eq(schema.memberships.roomId, roomId),
    eq(schema.memberships.userId, userId),
    eq(schema.memberships.state, "active"),
  )).get();
  return membership?.roomTier === "blackshirt";
}

function containsEmoji(value: string) {
  return /\p{Extended_Pictographic}|\p{Regional_Indicator}|[\uFE0F\u20E3]/u.test(value);
}

async function purgeExpiredActivity(ctx: AppCtx) {
  const db = ctx.db<typeof schema>();
  await db.delete(schema.auditLogs).where(lte(schema.auditLogs.createdAt, new Date(Date.now() - MASTER_LOG_RETENTION_MS)));
}

async function logActivity(ctx: AppCtx, input: { userId?: number; actorName: string; roomId?: number; action: string; details: string }) {
  const db = ctx.db<typeof schema>();
  await purgeExpiredActivity(ctx);
  await db.insert(schema.auditLogs).values({ userId: input.userId ?? null, actorName: input.actorName, roomId: input.roomId ?? null, action: input.action, details: input.details });
}

type RoomActivityKind = "join" | "promote" | "demote" | "mute" | "unmute" | "kick";

function isVisibleLegacyRoomActivity(body: string) {
  // Historic room events predate typed activity categories. Keep only the six
  // user-facing categories requested for the in-chat feed while leaving every
  // audit-log row untouched for the admin dashboard.
  if (/ joined\.$/.test(body)) return true;
  if (/ promoted .+\.$/.test(body)) return true;
  if (/ demoted .+\.$/.test(body) || / removed black shirt status from .+\.$/.test(body)) return true;
  if (/ (?:muted|unmuted) .+\.$/.test(body)) return true;
  if (/ kicked .+\.$/.test(body)) return true;
  // Older kick entries used “removed NAME.”. Exclude all other known removal
  // phrases so only actual room removals remain visible.
  return / removed .+\.$/.test(body)
    && !/ removed (?:the chat background photo|the room picture)\.$/.test(body)
    && !/ removed .+ from the mic queue\.$/.test(body);
}

async function addEvent(ctx: AppCtx, roomId: number, body: string, userId?: number, roomActivityKind?: RoomActivityKind) {
  const db = ctx.db<typeof schema>();
  let actorName = "System";
  if (userId) {
    const actor = await db.select({ name: schema.users.name, displayName: schema.users.displayName }).from(schema.users).where(eq(schema.users.id, userId)).get();
    actorName = actor?.displayName ?? actor?.name ?? "Former user";
  }
  await purgeExpiredActivity(ctx);
  const auditInsert = db.insert(schema.auditLogs).values({ userId: userId ?? null, actorName, roomId, action: "room_activity", details: body });
  if (roomActivityKind) {
    await db.batch([
      db.insert(schema.messages).values({ roomId, userId: userId ?? null, kind: "event", body }),
      auditInsert,
    ]);
  } else {
    await auditInsert;
  }
}

async function ensureRoomLevel(ctx: AppCtx, roomId: number) {
  const db = ctx.db<typeof schema>();
  const room = await db.select({ level: schema.rooms.level }).from(schema.rooms).where(eq(schema.rooms.id, roomId)).get();
  if (!room) return 1;
  if (room.level >= 2) return 2;
  const activeMembers = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(eq(schema.memberships.roomId, roomId), eq(schema.memberships.state, "active")));
  if (activeMembers.length >= 50) {
    await db.update(schema.rooms).set({ level: 2, leveledAt: new Date(), updatedAt: new Date() }).where(eq(schema.rooms.id, roomId));
    return 2;
  }
  return 1;
}

async function removeVoiceSession(ctx: AppCtx, roomId: number, userId: number) {
  const db = ctx.db<typeof schema>();
  await db.update(schema.memberships).set({ voiceActive: false }).where(and(
    eq(schema.memberships.roomId, roomId),
    eq(schema.memberships.userId, userId),
  ));
  await db.delete(schema.signals).where(and(
    eq(schema.signals.roomId, roomId),
    or(eq(schema.signals.fromUserId, userId), eq(schema.signals.toUserId, userId)),
  ));
}

async function reconcileMicQueue(ctx: AppCtx, roomId: number) {
  const db = ctx.db<typeof schema>();
  const room = await db.select({ defaultMicSeconds: schema.rooms.defaultMicSeconds, micMode: schema.rooms.micMode }).from(schema.rooms).where(eq(schema.rooms.id, roomId)).get();
  if (!room) return;
  if (room.micMode === "free") {
    await db.delete(schema.micQueue).where(eq(schema.micQueue.roomId, roomId));
    return;
  }
  const now = new Date();
  const active = await db.select({
    id: schema.micQueue.id,
    userId: schema.micQueue.userId,
    endsAt: schema.micQueue.endsAt,
    name: schema.users.name,
    memberState: schema.memberships.state,
    muted: schema.memberships.muted,
    extraSeconds: schema.micQueue.extraSeconds,
  }).from(schema.micQueue)
    .innerJoin(schema.users, eq(schema.micQueue.userId, schema.users.id))
    .leftJoin(schema.memberships, and(eq(schema.memberships.roomId, roomId), eq(schema.memberships.userId, schema.micQueue.userId)))
    .where(and(eq(schema.micQueue.roomId, roomId), isNotNull(schema.micQueue.startedAt)))
    .orderBy(asc(schema.micQueue.startedAt)).get();
  if (active && active.memberState === "active" && !active.muted && active.endsAt && active.endsAt.getTime() > now.getTime()) return;
  if (active) {
    await db.delete(schema.micQueue).where(eq(schema.micQueue.id, active.id));
    await removeVoiceSession(ctx, roomId, active.userId);
    if (active.endsAt && active.endsAt.getTime() <= now.getTime()) await addEvent(ctx, roomId, `${active.name}'s mic time ended.`, active.userId);
  }

  const waiting = await db.select({
    id: schema.micQueue.id,
    userId: schema.micQueue.userId,
    name: schema.users.name,
    memberState: schema.memberships.state,
    muted: schema.memberships.muted,
    extraSeconds: schema.micQueue.extraSeconds,
  }).from(schema.micQueue)
    .innerJoin(schema.users, eq(schema.micQueue.userId, schema.users.id))
    .leftJoin(schema.memberships, and(eq(schema.memberships.roomId, roomId), eq(schema.memberships.userId, schema.micQueue.userId)))
    .where(eq(schema.micQueue.roomId, roomId))
    .orderBy(asc(schema.micQueue.joinedAt));
  for (const next of waiting) {
    if (next.memberState !== "active" || next.muted) {
      await db.delete(schema.micQueue).where(eq(schema.micQueue.id, next.id));
      await removeVoiceSession(ctx, roomId, next.userId);
      continue;
    }
    const endsAt = new Date(now.getTime() + (room.defaultMicSeconds + next.extraSeconds) * 1000);
    // A song belongs to one singer's turn. Clear the room selection before the
    // next turn starts so the incoming singer always begins with fresh music.
    await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, roomId));
    await db.update(schema.micQueue).set({ startedAt: now, endsAt }).where(eq(schema.micQueue.id, next.id));
    await addEvent(ctx, roomId, `${next.name}'s mic turn started.`, next.userId);
    return;
  }

  // With nobody left to sing, no room should retain the previous singer's
  // title or playback state. This also covers expiry, leaving, mute, and kick.
  await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, roomId));
}

export const Actions = {
  bootstrapSuperadmin: defineAction({
    request: z.object({ password: passwordSchema }),
    response: doneSchema,
    privileged: [Privileged.hashPassword],
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const existing = await db.select().from(schema.users).where(eq(schema.users.name, "superadmin")).get();
      if (existing) {
        if (existing.role === "superadmin") return { ok: true };
        return { ok: false, error: "The username superadmin is already in use." };
      }
      const { hash: passwordHash } = await ctx.executePrivileged(Privileged.hashPassword, { password: args.password });
      await db.insert(schema.users).values({
        name: "superadmin",
        displayName: "Super Admin",
        sessionToken: crypto.randomUUID(),
        passwordHash,
        role: "superadmin",
      });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  registerUser: defineAction({
    request: z.object({ name: z.string().trim().min(2).max(24), email: emailSchema, password: passwordSchema }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), token: z.string().optional(), user: userViewSchema.optional(), emailDelivery: emailDeliverySchema.optional() }),
    privileged: [Privileged.hashPassword, Privileged.sendAuthEmail],
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      if (args.name.toLowerCase() === "superadmin") return { ok: false, error: "That username is reserved." };
      const email = normalizeEmail(args.email);
      const [existingName, existingEmail] = await Promise.all([
        db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.name, args.name)).get(),
        db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, email)).get(),
      ]);
      if (existingName) return { ok: false, error: "That username is already in use. Sign in instead." };
      if (existingEmail) return { ok: false, error: "That email is already attached to an account." };
      const anyUser = await db.select({ id: schema.users.id }).from(schema.users).limit(1).get();
      const role = args.name === "admin" ? "admin" as const : anyUser ? "user" as const : "admin" as const;
      const token = crypto.randomUUID();
      const { hash: passwordHash } = await ctx.executePrivileged(Privileged.hashPassword, { password: args.password });
      const result = await db.insert(schema.users).values({ name: args.name, email, emailVerified: false, sessionToken: token, passwordHash, role }).returning({ id: schema.users.id });
      const inserted = result[0];
      if (!inserted) return { ok: false, error: "Could not create your account." };
      const emailDelivery = await issueAuthCode(ctx, { id: inserted.id, name: args.name, email }, "email_verification");
      await logActivity(ctx, { userId: inserted.id, actorName: args.name, action: "account_created", details: "Created an account." });
      ctx.invalidateQueries();
      return { ok: true, token, emailDelivery, user: { id: inserted.id, name: args.name, displayName: args.name, email, emailVerified: false, role, hasPassword: true } };
    },
  }),

  loginUser: defineAction({
    request: z.object({ name: z.string().trim().min(2).max(24), password: z.string().min(1).max(72) }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), token: z.string().optional(), user: userViewSchema.optional() }),
    privileged: [Privileged.verifyPassword],
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const user = await db.select().from(schema.users).where(eq(schema.users.name, args.name)).get();
      if (!user?.passwordHash) return { ok: false, error: "Name or password is incorrect." };
      if (user.deletedAt) return { ok: false, error: "This account has been deleted. An administrator can restore it." };
      if (user.accountLocked) return { ok: false, error: "This account is locked by an administrator." };
      const { valid } = await ctx.executePrivileged(Privileged.verifyPassword, { password: args.password, hash: user.passwordHash });
      if (!valid) return { ok: false, error: "Name or password is incorrect." };
      const token = crypto.randomUUID();
      await db.update(schema.users).set({ sessionToken: token, creditLastSeenAt: new Date(), updatedAt: new Date() }).where(eq(schema.users.id, user.id));
      await logActivity(ctx, { userId: user.id, actorName: user.displayName ?? user.name, action: "signed_in", details: "Signed in." });
      return { ok: true, token, user: { id: user.id, name: user.name, displayName: user.displayName ?? user.name, email: user.email, emailVerified: user.emailVerified, role: user.role, hasPassword: true } };
    },
  }),

  requestPasswordReset: defineAction({
    request: z.object({ email: emailSchema }),
    response: z.object({ ok: z.boolean() }),
    privileged: [Privileged.hashPassword, Privileged.sendAuthEmail],
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const email = normalizeEmail(args.email);
      const user = await db.select({ id: schema.users.id, name: schema.users.name, email: schema.users.email, deletedAt: schema.users.deletedAt }).from(schema.users).where(eq(schema.users.email, email)).get();
      if (user?.email && !user.deletedAt) await issueAuthCode(ctx, { id: user.id, name: user.name, email: user.email }, "password_reset");
      return { ok: true };
    },
  }),

  resetPassword: defineAction({
    request: z.object({ email: emailSchema, code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code."), newPassword: passwordSchema }),
    response: doneSchema,
    privileged: [Privileged.verifyPassword, Privileged.hashPassword],
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const user = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, normalizeEmail(args.email))).get();
      if (!user || !await consumeAuthCode(ctx, user.id, "password_reset", args.code)) return { ok: false, error: "That reset code is invalid or expired." };
      const { hash: passwordHash } = await ctx.executePrivileged(Privileged.hashPassword, { password: args.newPassword });
      await db.update(schema.users).set({ passwordHash, sessionToken: crypto.randomUUID(), updatedAt: new Date() }).where(eq(schema.users.id, user.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  resendVerificationEmail: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), emailDelivery: emailDeliverySchema.optional() }),
    privileged: [Privileged.hashPassword, Privileged.sendAuthEmail],
    async handler(ctx, args) {
      const user = await authenticated(ctx, args.token);
      if (!user) return { ok: false, error: "Session expired." };
      if (!user.email) return { ok: false, error: "Add an email address first." };
      if (user.emailVerified) return { ok: true };
      const emailDelivery = await issueAuthCode(ctx, { id: user.id, name: user.name, email: user.email }, "email_verification");
      return { ok: true, emailDelivery };
    },
  }),

  verifyEmail: defineAction({
    request: z.object({ token: z.string().min(1), code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code.") }),
    response: doneSchema,
    privileged: [Privileged.verifyPassword],
    async handler(ctx, args) {
      const user = await authenticated(ctx, args.token);
      if (!user) return { ok: false, error: "Session expired." };
      if (user.emailVerified) return { ok: true };
      if (!user.email || !await consumeAuthCode(ctx, user.id, "email_verification", args.code)) return { ok: false, error: "That confirmation code is invalid or expired." };
      const db = ctx.db<typeof schema>();
      await db.update(schema.users).set({ emailVerified: true, updatedAt: new Date() }).where(eq(schema.users.id, user.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setAccountEmail: defineAction({
    request: z.object({ token: z.string().min(1), currentPassword: z.string().max(72), email: emailSchema }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), emailDelivery: emailDeliverySchema.optional() }),
    privileged: [Privileged.verifyPassword, Privileged.hashPassword, Privileged.sendAuthEmail],
    async handler(ctx, args) {
      const user = await authenticated(ctx, args.token);
      if (!user) return { ok: false, error: "Session expired." };
      if (user.passwordHash) {
        if (!args.currentPassword) return { ok: false, error: "Enter your current password." };
        const { valid } = await ctx.executePrivileged(Privileged.verifyPassword, { password: args.currentPassword, hash: user.passwordHash });
        if (!valid) return { ok: false, error: "Current password is incorrect." };
      }
      const db = ctx.db<typeof schema>();
      const email = normalizeEmail(args.email);
      const existing = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, email)).get();
      if (existing && existing.id !== user.id) return { ok: false, error: "That email is already attached to an account." };
      await db.update(schema.users).set({ email, emailVerified: false, updatedAt: new Date() }).where(eq(schema.users.id, user.id));
      const emailDelivery = await issueAuthCode(ctx, { id: user.id, name: user.name, email }, "email_verification");
      ctx.invalidateQueries();
      return { ok: true, emailDelivery };
    },
  }),

  setPassword: defineAction({
    request: z.object({ token: z.string().min(1), currentPassword: z.string().max(72), newPassword: passwordSchema }),
    response: doneSchema,
    privileged: [Privileged.verifyPassword, Privileged.hashPassword],
    async handler(ctx, args) {
      const user = await authenticated(ctx, args.token);
      if (!user) return { ok: false, error: "Session expired." };
      if (user.passwordHash) {
        if (!args.currentPassword) return { ok: false, error: "Enter your current password." };
        const { valid } = await ctx.executePrivileged(Privileged.verifyPassword, { password: args.currentPassword, hash: user.passwordHash });
        if (!valid) return { ok: false, error: "Current password is incorrect." };
      }
      const { hash: passwordHash } = await ctx.executePrivileged(Privileged.hashPassword, { password: args.newPassword });
      const db = ctx.db<typeof schema>();
      await db.update(schema.users).set({ passwordHash, updatedAt: new Date() }).where(eq(schema.users.id, user.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  submitReport: defineAction({
    request: z.object({
      token: z.string().min(1),
      targetType: z.enum(["user", "room"]),
      targetId: z.number().int().positive(),
      category: reportCategorySchema,
      details: z.string().trim().min(10, "Add a little more detail so the admin team can review this report.").max(1500),
      attachments: z.array(reportAttachmentUploadSchema).max(3).default([]),
    }),
    response: doneSchema,
    async handler(ctx, args) {
      const reporter = await authenticated(ctx, args.token);
      if (!reporter) return { ok: false, error: "Sign in again to send a report." };
      const decodedAttachments = args.attachments.map((attachment) => ({
        bytes: decodeReportAttachment(attachment.dataBase64, attachment.mimeType),
        mimeType: attachment.mimeType,
        fileName: safeAttachmentName(attachment.fileName),
      }));
      if (decodedAttachments.some((attachment) => !attachment.bytes)) return { ok: false, error: "One of the evidence files is unsupported or larger than 7.5 MB." };
      const totalAttachmentBytes = decodedAttachments.reduce((sum, attachment) => sum + (attachment.bytes?.length ?? 0), 0);
      if (totalAttachmentBytes > 15_000_000) return { ok: false, error: "Evidence files must be 15 MB or less in total." };
      const db = ctx.db<typeof schema>();
      let targetUserId: number | null = null;
      let targetRoomId: number | null = null;
      if (args.targetType === "user") {
        if (args.targetId === reporter.id) return { ok: false, error: "You cannot report your own account." };
        const target = await db.select({ id: schema.users.id }).from(schema.users).where(and(eq(schema.users.id, args.targetId), isNull(schema.users.deletedAt))).get();
        if (!target) return { ok: false, error: "This user is no longer available." };
        targetUserId = target.id;
      } else {
        const target = await db.select({ id: schema.rooms.id }).from(schema.rooms).where(and(eq(schema.rooms.id, args.targetId), isNull(schema.rooms.deletedAt))).get();
        if (!target) return { ok: false, error: "This room is no longer available." };
        targetRoomId = target.id;
      }
      const inserted = await db.insert(schema.reports).values({ reporterId: reporter.id, targetType: args.targetType, targetUserId, targetRoomId, category: args.category, details: args.details.trim() }).returning({ id: schema.reports.id });
      const report = inserted[0];
      if (!report) return { ok: false, error: "Could not create this report." };
      const savedKeys: string[] = [];
      try {
        for (const [index, attachment] of decodedAttachments.entries()) {
          if (!attachment.bytes) continue;
          const key = `reports/${report.id}/${Date.now()}-${index}`;
          await ctx.blobs.put(key, attachment.bytes, { contentType: attachment.mimeType });
          savedKeys.push(key);
          await db.insert(schema.reportAttachments).values({ reportId: report.id, blobKey: key, fileName: attachment.fileName, mimeType: attachment.mimeType, sizeBytes: attachment.bytes.length });
        }
      } catch {
        await Promise.all(savedKeys.map((key) => ctx.blobs.delete(key)));
        await db.delete(schema.reports).where(eq(schema.reports.id, report.id));
        return { ok: false, error: "Could not save the evidence files. Try again." };
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  submitSupportRequest: defineAction({
    request: z.object({ token: z.string().min(1), details: z.string().trim().min(2).max(1500) }),
    response: doneSchema,
    async handler(ctx, args) {
      const user = await authenticated(ctx, args.token);
      if (!user) return { ok: false, error: "Sign in again to contact support." };
      const db = ctx.db<typeof schema>();
      const existing = await db.select({ id: schema.supportRequests.id }).from(schema.supportRequests).where(and(eq(schema.supportRequests.userId, user.id), or(eq(schema.supportRequests.status, "open"), eq(schema.supportRequests.status, "accepted")))).orderBy(desc(schema.supportRequests.createdAt)).get();
      if (existing) return { ok: false, error: "You already have an active support chat." };
      const inserted = await db.insert(schema.supportRequests).values({ userId: user.id, subject: "Support chat", details: args.details.trim() }).returning({ id: schema.supportRequests.id });
      const ticket = inserted[0];
      if (!ticket) return { ok: false, error: "Could not create the support ticket." };
      await db.insert(schema.supportMessages).values({ supportRequestId: ticket.id, senderId: user.id, body: args.details.trim() });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getMySupportChat: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), ticket: z.object({ id: z.number(), status: supportStatusSchema, adminName: z.string().nullable(), messages: z.array(z.object({ id: z.number(), senderId: z.number(), senderName: z.string(), fromAdmin: z.boolean(), body: z.string(), createdAt: z.string() })) }).nullable() }),
    async handler(ctx, args) {
      const user = await authenticated(ctx, args.token);
      if (!user) return { ok: false, error: "Sign in again to contact support.", ticket: null };
      const db = ctx.db<typeof schema>();
      const ticket = await db.select().from(schema.supportRequests).where(and(eq(schema.supportRequests.userId, user.id), or(eq(schema.supportRequests.status, "open"), eq(schema.supportRequests.status, "accepted")))).orderBy(desc(schema.supportRequests.createdAt)).get();
      if (!ticket) return { ok: true, ticket: null };
      const [messageRows, users] = await Promise.all([
        db.select().from(schema.supportMessages).where(eq(schema.supportMessages.supportRequestId, ticket.id)).orderBy(asc(schema.supportMessages.createdAt)),
        db.select({ id: schema.users.id, name: schema.users.name, displayName: schema.users.displayName, role: schema.users.role }).from(schema.users),
      ]);
      const userMap = new Map(users.map((row) => [row.id, row]));
      const admin = ticket.assignedTo ? userMap.get(ticket.assignedTo) : undefined;
      return { ok: true, ticket: { id: ticket.id, status: ticket.status, adminName: admin ? admin.displayName ?? admin.name : null, messages: messageRows.map((message) => { const sender = userMap.get(message.senderId); return { id: message.id, senderId: message.senderId, senderName: sender ? sender.displayName ?? sender.name : "Support", fromAdmin: Boolean(sender && isPlatformAdmin(sender.role)), body: message.body, createdAt: message.createdAt.toISOString() }; }) } };
    },
  }),

  acceptSupportTicket: defineAction({
    request: z.object({ token: z.string().min(1), ticketId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const ticket = await db.select().from(schema.supportRequests).where(eq(schema.supportRequests.id, args.ticketId)).get();
      if (!ticket) return { ok: false, error: "Support ticket not found." };
      if (ticket.status !== "open" && ticket.assignedTo !== admin.id) return { ok: false, error: "Another admin already accepted this ticket." };
      await db.update(schema.supportRequests).set({ status: "accepted", assignedTo: admin.id, reviewedBy: admin.id, reviewedAt: new Date() }).where(eq(schema.supportRequests.id, ticket.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  sendSupportMessage: defineAction({
    request: z.object({ token: z.string().min(1), ticketId: z.number().int().positive(), body: z.string().trim().min(1).max(1500) }),
    response: doneSchema,
    async handler(ctx, args) {
      const sender = await authenticated(ctx, args.token);
      if (!sender) return { ok: false, error: "Sign in again to send this message." };
      const db = ctx.db<typeof schema>();
      const ticket = await db.select().from(schema.supportRequests).where(eq(schema.supportRequests.id, args.ticketId)).get();
      if (!ticket || ticket.status === "resolved" || ticket.status === "dismissed") return { ok: false, error: "This support chat is closed." };
      const senderIsAdmin = isPlatformAdmin(sender.role);
      if (!senderIsAdmin && ticket.userId !== sender.id) return { ok: false, error: "This support chat is not available." };
      if (senderIsAdmin && ticket.assignedTo !== sender.id) return { ok: false, error: "Accept this ticket before replying." };
      await db.insert(schema.supportMessages).values({ supportRequestId: ticket.id, senderId: sender.id, body: args.body.trim() });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getAdminInbox: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(),
      reports: z.array(z.object({ id: z.number(), reporterId: z.number(), reporterName: z.string(), targetType: z.enum(["user", "room"]), targetId: z.number().nullable(), targetName: z.string(), category: reportCategorySchema, details: z.string(), status: inboxStatusSchema, reviewNote: z.string().nullable(), createdAt: z.string(), reviewedAt: z.string().nullable(), attachments: z.array(z.object({ id: z.number(), fileName: z.string(), mimeType: z.string(), sizeBytes: z.number(), url: z.string() })) })),
      supportRequests: z.array(z.object({ id: z.number(), userId: z.number(), userName: z.string(), subject: z.string(), details: z.string(), status: supportStatusSchema, assignedTo: z.number().nullable(), adminName: z.string().nullable(), reviewNote: z.string().nullable(), createdAt: z.string(), reviewedAt: z.string().nullable(), messages: z.array(z.object({ id: z.number(), senderId: z.number(), senderName: z.string(), fromAdmin: z.boolean(), body: z.string(), createdAt: z.string() })) })), 
    }),
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required.", reports: [], supportRequests: [] };
      const db = ctx.db<typeof schema>();
      const [reportRows, attachmentRows, supportRows, supportMessageRows, users, rooms] = await Promise.all([
        db.select().from(schema.reports).orderBy(desc(schema.reports.createdAt)).limit(200),
        db.select().from(schema.reportAttachments).orderBy(asc(schema.reportAttachments.createdAt)),
        db.select().from(schema.supportRequests).orderBy(desc(schema.supportRequests.createdAt)).limit(200),
        db.select().from(schema.supportMessages).orderBy(asc(schema.supportMessages.createdAt)),
        db.select({ id: schema.users.id, name: schema.users.name, displayName: schema.users.displayName, role: schema.users.role }).from(schema.users),
        db.select({ id: schema.rooms.id, name: schema.rooms.name }).from(schema.rooms),
      ]);
      const userNames = new Map(users.map((user) => [user.id, user.displayName ?? user.name]));
      const userRecords = new Map(users.map((user) => [user.id, user]));
      const roomNames = new Map(rooms.map((room) => [room.id, room.name]));
      const reportViews = await Promise.all(reportRows.map(async (report) => ({
        id: report.id,
        reporterId: report.reporterId,
        reporterName: userNames.get(report.reporterId) ?? "Former user",
        targetType: report.targetType,
        targetId: report.targetType === "user" ? report.targetUserId : report.targetRoomId,
        targetName: report.targetType === "user" ? (report.targetUserId ? userNames.get(report.targetUserId) ?? "Former user" : "Former user") : (report.targetRoomId ? roomNames.get(report.targetRoomId) ?? "Deleted room" : "Deleted room"),
        category: report.category,
        details: report.details,
        status: report.status,
        reviewNote: report.reviewNote,
        createdAt: report.createdAt.toISOString(),
        reviewedAt: report.reviewedAt?.toISOString() ?? null,
        attachments: await Promise.all(attachmentRows.filter((attachment) => attachment.reportId === report.id).map(async (attachment) => ({ id: attachment.id, fileName: attachment.fileName, mimeType: attachment.mimeType, sizeBytes: attachment.sizeBytes, url: await ctx.blobs.getUrl(attachment.blobKey) }))),
      })));
      return {
        ok: true,
        reports: reportViews,
        supportRequests: supportRows.map((request) => ({
          id: request.id,
          userId: request.userId,
          userName: userNames.get(request.userId) ?? "Former user",
          subject: request.subject,
          details: request.details,
          status: request.status,
          assignedTo: request.assignedTo,
          adminName: request.assignedTo ? userNames.get(request.assignedTo) ?? null : null,
          reviewNote: request.reviewNote,
          createdAt: request.createdAt.toISOString(),
          reviewedAt: request.reviewedAt?.toISOString() ?? null,
          messages: supportMessageRows.filter((message) => message.supportRequestId === request.id).map((message) => { const sender = userRecords.get(message.senderId); return { id: message.id, senderId: message.senderId, senderName: sender ? sender.displayName ?? sender.name : "Support", fromAdmin: Boolean(sender && isPlatformAdmin(sender.role)), body: message.body, createdAt: message.createdAt.toISOString() }; }),
        })),
      };
    },
  }),

  reviewAdminInboxItem: defineAction({
    request: z.object({ token: z.string().min(1), itemType: z.enum(["report", "support"]), itemId: z.number().int().positive(), status: inboxStatusSchema, reviewNote: z.string().trim().max(1000).optional() }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const reviewNote = args.reviewNote?.trim() || null;
      if (args.itemType === "report") {
        const item = await db.select({ id: schema.reports.id }).from(schema.reports).where(eq(schema.reports.id, args.itemId)).get();
        if (!item) return { ok: false, error: "Report not found." };
        await db.update(schema.reports).set({ status: args.status, reviewedBy: admin.id, reviewNote, reviewedAt: new Date() }).where(eq(schema.reports.id, args.itemId));
      } else {
        const item = await db.select().from(schema.supportRequests).where(eq(schema.supportRequests.id, args.itemId)).get();
        if (!item) return { ok: false, error: "Support request not found." };
        if (item.assignedTo && item.assignedTo !== admin.id && admin.role !== "superadmin") return { ok: false, error: "Another admin accepted this ticket." };
        const status = args.status === "reviewing" ? "accepted" as const : args.status;
        await db.update(schema.supportRequests).set({ status, assignedTo: item.assignedTo ?? admin.id, reviewedBy: admin.id, reviewNote, reviewedAt: new Date() }).where(eq(schema.supportRequests.id, args.itemId));
      }
      await logActivity(ctx, { userId: admin.id, actorName: admin.displayName ?? admin.name, action: `admin_${args.itemType}_${args.status}`, details: `${args.itemType} #${args.itemId} marked ${args.status}.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getAdminDashboard: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(),
      users: z.array(z.object({ id: z.number(), name: z.string(), displayName: z.string(), gender: z.enum(["male", "female"]).nullable(), email: z.string().nullable(), role: roleSchema, lastIpAddress: z.string().nullable(), ipLastSeenAt: z.string().nullable(), accountLocked: z.boolean(), ipBlocked: z.boolean(), deletedAt: z.string().nullable(), createdAt: z.string() })),
      rooms: z.array(z.object({ id: z.number(), name: z.string(), ownerId: z.number(), ownerName: z.string(), level: z.number(), locked: z.boolean(), lockReason: z.string().nullable(), deletedAt: z.string().nullable(), participantCount: z.number(), createdAt: z.string() })),
    }),
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required.", users: [], rooms: [] };
      const db = ctx.db<typeof schema>();
      const [userRows, blockedRows, roomRows, memberRows] = await Promise.all([
        db.select().from(schema.users).orderBy(desc(schema.users.createdAt)),
        db.select({ ipAddress: schema.blockedIps.ipAddress }).from(schema.blockedIps),
        db.select({ id: schema.rooms.id, name: schema.rooms.name, ownerId: schema.rooms.createdBy, ownerName: schema.users.name, ownerDisplayName: schema.users.displayName, level: schema.rooms.level, locked: schema.rooms.locked, lockReason: schema.rooms.lockReason, deletedAt: schema.rooms.deletedAt, createdAt: schema.rooms.createdAt }).from(schema.rooms).innerJoin(schema.users, eq(schema.rooms.createdBy, schema.users.id)).orderBy(desc(schema.rooms.createdAt)),
        db.select({ roomId: schema.memberships.roomId }).from(schema.memberships).where(eq(schema.memberships.state, "active")),
      ]);
      const blocked = new Set(blockedRows.map((row) => row.ipAddress));
      return {
        ok: true,
        users: userRows.map((user) => ({ id: user.id, name: user.name, displayName: user.displayName ?? user.name, gender: user.gender, email: user.email, role: user.role, lastIpAddress: user.lastIpAddress, ipLastSeenAt: user.ipLastSeenAt?.toISOString() ?? null, accountLocked: user.accountLocked, ipBlocked: Boolean(user.lastIpAddress && blocked.has(user.lastIpAddress)), deletedAt: user.deletedAt?.toISOString() ?? null, createdAt: user.createdAt.toISOString() })),
        rooms: roomRows.map((room) => ({ id: room.id, name: room.name, ownerId: room.ownerId, ownerName: room.ownerDisplayName ?? room.ownerName, level: room.level, locked: room.locked, lockReason: room.lockReason, deletedAt: room.deletedAt?.toISOString() ?? null, participantCount: memberRows.filter((member) => member.roomId === room.id).length, createdAt: room.createdAt.toISOString() })),
      };
    },
  }),

  getAdminMasterLogs: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(),
      logs: z.array(z.object({ id: z.number(), userId: z.number().nullable(), actorName: z.string(), roomId: z.number().nullable(), roomName: z.string().nullable(), action: z.string(), details: z.string(), createdAt: z.string() })),
    }),
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required.", logs: [] };
      const db = ctx.db<typeof schema>();
      await purgeExpiredActivity(ctx);
      const rows = await db.select({
        id: schema.auditLogs.id,
        userId: schema.auditLogs.userId,
        actorName: schema.auditLogs.actorName,
        roomId: schema.auditLogs.roomId,
        roomName: schema.rooms.name,
        action: schema.auditLogs.action,
        details: schema.auditLogs.details,
        createdAt: schema.auditLogs.createdAt,
      }).from(schema.auditLogs).leftJoin(schema.rooms, eq(schema.auditLogs.roomId, schema.rooms.id)).orderBy(desc(schema.auditLogs.createdAt)).limit(300);
      return { ok: true, logs: rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() })) };
    },
  }),

  manageUserAccess: defineAction({
    request: z.object({ token: z.string().min(1), targetUserId: z.number().int().positive(), action: z.enum(["lock", "unlock", "block_ip", "unblock_ip", "delete", "restore", "promote_admin", "demote_admin"]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const target = await db.select().from(schema.users).where(eq(schema.users.id, args.targetUserId)).get();
      if (!target) return { ok: false, error: "User not found." };
      if (target.role === "superadmin") return { ok: false, error: "The Super Admin account cannot be changed here." };
      if (target.id === admin.id && (args.action === "delete" || args.action === "demote_admin")) return { ok: false, error: "You cannot demote or delete your own account." };

      if (args.action === "promote_admin" || args.action === "demote_admin") {
        if (admin.role !== "superadmin") return { ok: false, error: "Super Admin access required." };
        if (target.deletedAt) return { ok: false, error: "Restore this account before changing its role." };
        if (args.action === "promote_admin") {
          if (target.role === "admin") return { ok: true };
          await db.update(schema.users).set({ role: "admin", updatedAt: new Date() }).where(eq(schema.users.id, target.id));
        } else {
          if (target.role !== "admin") return { ok: false, error: "Only an admin account can be demoted." };
          await db.update(schema.users).set({ role: "user", updatedAt: new Date() }).where(eq(schema.users.id, target.id));
        }
      } else {
        const targetIsAdmin = isPlatformAdmin(target.role);
        if (targetIsAdmin && !(admin.role === "superadmin" && (args.action === "delete" || args.action === "restore"))) {
          return { ok: false, error: "Administrator accounts can only be promoted, demoted, deleted, or restored by the Super Admin." };
        }
        if (args.action === "lock") {
          await db.update(schema.users).set({ accountLocked: true, lockedAt: new Date(), sessionToken: crypto.randomUUID(), updatedAt: new Date() }).where(eq(schema.users.id, target.id));
        } else if (args.action === "unlock") {
          await db.update(schema.users).set({ accountLocked: false, lockedAt: null, updatedAt: new Date() }).where(eq(schema.users.id, target.id));
        } else if (args.action === "delete") {
          await db.update(schema.users).set({ deletedAt: new Date(), deletedBy: admin.id, sessionToken: crypto.randomUUID(), updatedAt: new Date() }).where(eq(schema.users.id, target.id));
        } else if (args.action === "restore") {
          await db.update(schema.users).set({ deletedAt: null, deletedBy: null, updatedAt: new Date() }).where(eq(schema.users.id, target.id));
        } else {
          if (!target.lastIpAddress) return { ok: false, error: "No IP address has been recorded for this user yet." };
          if (args.action === "block_ip") {
            const adminAtIp = await db.select({ id: schema.users.id }).from(schema.users).where(and(eq(schema.users.lastIpAddress, target.lastIpAddress), or(eq(schema.users.role, "admin"), eq(schema.users.role, "superadmin")))).get();
            if (adminAtIp) return { ok: false, error: "This IP is also used by an administrator and cannot be blocked." };
            const existing = await db.select({ id: schema.blockedIps.id }).from(schema.blockedIps).where(eq(schema.blockedIps.ipAddress, target.lastIpAddress)).get();
            if (!existing) await db.insert(schema.blockedIps).values({ ipAddress: target.lastIpAddress, blockedBy: admin.id });
            const affected = await db.select({ id: schema.users.id }).from(schema.users).where(and(eq(schema.users.lastIpAddress, target.lastIpAddress), or(eq(schema.users.role, "user"), eq(schema.users.role, "moderator"))));
            for (const user of affected) await db.update(schema.users).set({ sessionToken: crypto.randomUUID(), updatedAt: new Date() }).where(eq(schema.users.id, user.id));
          } else {
            await db.delete(schema.blockedIps).where(eq(schema.blockedIps.ipAddress, target.lastIpAddress));
          }
        }
      }
      await logActivity(ctx, { userId: admin.id, actorName: admin.displayName ?? admin.name, action: `admin_${args.action}`, details: `${args.action.replaceAll("_", " ")} for ${target.displayName ?? target.name} (#${target.id})` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  manageRoomLock: defineAction({
    request: z.object({ token: z.string().min(1), roomId: z.number().int().positive(), locked: z.boolean(), reason: z.string().trim().max(240).optional() }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id, deletedAt: schema.rooms.deletedAt }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.deletedAt) return { ok: false, error: "Restore this room before changing its lock." };
      await db.update(schema.rooms).set({ locked: args.locked, lockReason: args.locked ? (args.reason?.trim() || "Community standards review") : null, lockedBy: args.locked ? admin.id : null, lockedAt: args.locked ? new Date() : null, updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      if (args.locked) {
        await db.delete(schema.micQueue).where(eq(schema.micQueue.roomId, args.roomId));
        await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, args.roomId));
        await db.delete(schema.signals).where(eq(schema.signals.roomId, args.roomId));
        await db.update(schema.memberships).set({ voiceActive: false }).where(eq(schema.memberships.roomId, args.roomId));
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setRoomLevel: defineAction({
    request: z.object({ token: z.string().min(1), roomId: z.number().int().positive(), level: z.union([z.literal(1), z.literal(2)]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id, deletedAt: schema.rooms.deletedAt }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room || room.deletedAt) return { ok: false, error: "Restore this room before changing its level." };
      await db.update(schema.rooms).set({ level: args.level, leveledAt: args.level === 2 ? new Date() : null, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  transferRoomOwnership: defineAction({
    request: z.object({ token: z.string().min(1), roomId: z.number().int().positive(), targetUserId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const [room, target] = await Promise.all([
        db.select({ id: schema.rooms.id, name: schema.rooms.name, createdBy: schema.rooms.createdBy, deletedAt: schema.rooms.deletedAt }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get(),
        db.select({ id: schema.users.id, name: schema.users.name, displayName: schema.users.displayName, deletedAt: schema.users.deletedAt }).from(schema.users).where(eq(schema.users.id, args.targetUserId)).get(),
      ]);
      if (!room || room.deletedAt) return { ok: false, error: "Active room not found." };
      if (!target || target.deletedAt) return { ok: false, error: "Active user not found." };
      if (room.createdBy === target.id) return { ok: true };
      await db.update(schema.rooms).set({ createdBy: target.id, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      await logActivity(ctx, { userId: admin.id, actorName: admin.displayName ?? admin.name, roomId: room.id, action: "room_owner_changed", details: `Transferred ownership of ${room.name} to ${target.displayName ?? target.name} (#${target.id}).` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getHome: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(), user: userViewSchema.optional(), credit: z.object({ balance: z.number(), onlineMs: z.number() }).optional(), buyCreditsEnabled: z.boolean().optional(),
      rooms: z.array(z.object({ id: z.number(), name: z.string(), profileImageUrl: z.string().nullable(), ownerName: z.string(), isOwner: z.boolean(), canDelete: z.boolean(), level: z.number(), isPrivate: z.boolean(), locked: z.boolean(), lockReason: z.string().nullable(), participantCount: z.number(), activeCount: z.number(), joined: z.boolean(), updatedAt: z.string() })), 
    }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid.", rooms: [] };
      const db = ctx.db<typeof schema>();
      const credit = await accrueOnlineCredit(ctx, me.id);
      const roomRows = await db.select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        profileImageBlobKey: schema.rooms.profileImageBlobKey,
        createdBy: schema.rooms.createdBy,
        ownerName: schema.users.name,
        ownerDisplayName: schema.users.displayName,
        level: schema.rooms.level,
        passwordHash: schema.rooms.passwordHash,
        locked: schema.rooms.locked,
        lockReason: schema.rooms.lockReason,
        updatedAt: schema.rooms.updatedAt,
      }).from(schema.rooms).innerJoin(schema.users, eq(schema.rooms.createdBy, schema.users.id)).where(and(isNull(schema.rooms.deletedAt), isNull(schema.rooms.parentRoomId))).orderBy(desc(schema.rooms.updatedAt)).limit(100);
      const memberRows = await db.select().from(schema.memberships).where(eq(schema.memberships.state, "active"));
      const now = Date.now();
      const rooms = (await Promise.all(roomRows.map(async (room) => {
        const members = memberRows.filter((m) => m.roomId === room.id);
        return {
          id: room.id,
          name: room.name,
          profileImageUrl: await publicBlobUrl(ctx, room.profileImageBlobKey),
          ownerName: room.ownerDisplayName ?? room.ownerName,
          isOwner: room.createdBy === me.id,
          canDelete: isPlatformAdmin(me.role) || room.createdBy === me.id,
          level: room.level,
          isPrivate: false,
          locked: room.locked,
          lockReason: room.lockReason,
          participantCount: members.length,
          activeCount: members.filter((m) => now - m.lastSeenAt.getTime() < 18000).length,
          joined: members.some((m) => m.userId === me.id),
          updatedAt: room.updatedAt.toISOString(),
        };
      }))).sort((a, b) => b.activeCount - a.activeCount);
      const [singerCoverPhotoUrl, buyCreditsEnabled] = await Promise.all([
        publicBlobUrl(ctx, me.singerCoverBlobKey),
        getBuyCreditsEnabled(ctx),
      ]);
      return { ok: true, user: { id: me.id, name: me.name, displayName: me.displayName ?? me.name, personalStatus: me.personalStatus, gender: me.gender, email: me.email, emailVerified: me.emailVerified, role: me.role, hasPassword: Boolean(me.passwordHash), singerCoverPhotoUrl, chatTextStyle: { fontFamily: me.chatFontFamily ?? "system", fontSize: me.chatFontSize ?? 14, bold: me.chatFontBold ?? false, italic: me.chatFontItalic ?? false, underline: me.chatFontUnderline ?? false, color: me.chatFontColor ?? "#092427" } }, credit, buyCreditsEnabled, rooms };
    },
  }),

  updateDisplayName: defineAction({
    request: z.object({ token: z.string(), displayName: z.string().trim().min(2).max(32) }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      await db.update(schema.users).set({ displayName: args.displayName, updatedAt: new Date() }).where(eq(schema.users.id, me.id));
      await logActivity(ctx, { userId: me.id, actorName: args.displayName, action: "profile_name_changed", details: "Changed their display name." });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updatePersonalStatus: defineAction({
    request: z.object({ token: z.string(), personalStatus: z.string().trim().max(80) }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const personalStatus = args.personalStatus || null;
      await db.update(schema.users).set({ personalStatus, updatedAt: new Date() }).where(eq(schema.users.id, me.id));
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, action: "personal_status_changed", details: personalStatus ? "Changed their personal status." : "Cleared their personal status." });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateGender: defineAction({
    request: z.object({ token: z.string(), gender: z.enum(["male", "female"]).nullable() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      await db.update(schema.users).set({ gender: args.gender, updatedAt: new Date() }).where(eq(schema.users.id, me.id));
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, action: "profile_gender_changed", details: args.gender ? "Changed their profile gender." : "Cleared their profile gender." });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateChatTextStyle: defineAction({
    request: z.object({ token: z.string(), style: chatTextStyleSchema }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      await db.update(schema.users).set({
        chatFontFamily: args.style.fontFamily,
        chatFontSize: args.style.fontSize,
        chatFontBold: args.style.bold,
        chatFontItalic: args.style.italic,
        chatFontUnderline: args.style.underline,
        chatFontColor: args.style.color.toLowerCase(),
        updatedAt: new Date(),
      }).where(eq(schema.users.id, me.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateSingerCoverPhoto: defineAction({
    request: z.object({ token: z.string(), image: imageUploadSchema.nullable() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const oldKey = me.singerCoverBlobKey;
      if (!args.image) {
        await db.update(schema.users).set({ singerCoverBlobKey: null, updatedAt: new Date() }).where(eq(schema.users.id, me.id));
        if (oldKey) await ctx.blobs.delete(oldKey);
        await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, action: "singer_cover_removed", details: "Removed their singer cover photo." });
        ctx.invalidateQueries();
        return { ok: true };
      }
      const bytes = decodeVerifiedImage(args.image.dataBase64, args.image.mimeType);
      if (!bytes) return { ok: false, error: "Choose a valid JPEG, PNG, or WebP image under 7.5 MB." };
      const key = `users/${me.id}/singer-cover-${Date.now()}.${imageExtension(args.image.mimeType)}`;
      await ctx.blobs.put(key, bytes, { contentType: args.image.mimeType, public: true });
      await db.update(schema.users).set({ singerCoverBlobKey: key, updatedAt: new Date() }).where(eq(schema.users.id, me.id));
      if (oldKey && oldKey !== key) await ctx.blobs.delete(oldKey);
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, action: "singer_cover_changed", details: "Changed their singer cover photo." });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomDisplayName: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), targetUserId: z.number().int().positive().optional(), displayName: z.string().trim().min(2).max(32) }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const targetUserId = args.targetUserId ?? me.id;
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, targetUserId),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!membership) return { ok: false, error: "That person is no longer in the room." };
      if (targetUserId !== me.id && await roomModeratorLevel(ctx, args.roomId, me.id, me.role) < 3) {
        return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      }
      await db.update(schema.memberships).set({ displayName: args.displayName }).where(eq(schema.memberships.id, membership.id));
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, roomId: args.roomId, action: "room_display_name_changed", details: targetUserId === me.id ? "Changed their room display name." : `Changed user #${targetUserId}'s room display name.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomName: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), name: z.string().trim().min(2).max(42) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "This session is no longer valid." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id, name: schema.rooms.name }).from(schema.rooms).where(and(eq(schema.rooms.id, args.roomId), isNull(schema.rooms.deletedAt))).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.name === args.name) return { ok: true };
      await db.update(schema.rooms).set({ name: args.name, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      await addEvent(ctx, room.id, `${actor.name} renamed the room to ${args.name}.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomChatBackground: defineAction({
    request: z.object({
      token: z.string(),
      roomId: z.number().int().positive(),
      background: z.string().refine((value) => value === "transparent" || /^#[0-9a-fA-F]{6}$/.test(value), "Choose a valid background color."),
    }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, actor.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!membership) return { ok: false, error: "Join the room before changing its chat background." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const room = await db.select({ id: schema.rooms.id, chatBackground: schema.rooms.chatBackground, chatBackgroundImageBlobKey: schema.rooms.chatBackgroundImageBlobKey, chatBackgroundPreset: schema.rooms.chatBackgroundPreset }).from(schema.rooms).where(and(eq(schema.rooms.id, args.roomId), isNull(schema.rooms.deletedAt))).get();
      if (!room) return { ok: false, error: "Room not found." };
      const background = args.background === "transparent" ? "transparent" : args.background.toLowerCase();
      if (room.chatBackground === background && !room.chatBackgroundImageBlobKey && !room.chatBackgroundPreset) return { ok: true };
      await db.update(schema.rooms).set({ chatBackground: background, chatBackgroundImageBlobKey: null, chatBackgroundImageFit: "contain", chatBackgroundPreset: null, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      if (room.chatBackgroundImageBlobKey) await ctx.blobs.delete(room.chatBackgroundImageBlobKey);
      await addEvent(ctx, room.id, `${actor.name} changed the chat background.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomChatBackgroundPreset: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), preset: z.enum(["kawaii-cats", "dreamy-kitten", "pastel-clouds", "pastel-daisies"]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, actor.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!membership) return { ok: false, error: "Join the room before changing its chat background." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const room = await db.select({ id: schema.rooms.id, chatBackgroundPreset: schema.rooms.chatBackgroundPreset, chatBackgroundImageBlobKey: schema.rooms.chatBackgroundImageBlobKey }).from(schema.rooms).where(and(eq(schema.rooms.id, args.roomId), isNull(schema.rooms.deletedAt))).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.chatBackgroundPreset === args.preset && !room.chatBackgroundImageBlobKey) return { ok: true };
      await db.update(schema.rooms).set({ chatBackgroundPreset: args.preset, chatBackgroundImageBlobKey: null, chatBackgroundImageFit: "cover", updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      if (room.chatBackgroundImageBlobKey) await ctx.blobs.delete(room.chatBackgroundImageBlobKey);
      await addEvent(ctx, room.id, `${actor.name} changed the chat wallpaper.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomChatBackgroundImage: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), image: imageUploadSchema.nullable(), fit: z.enum(["contain", "cover"]).optional() }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, actor.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!membership) return { ok: false, error: "Join the room before changing its chat background." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const room = await db.select({ id: schema.rooms.id, chatBackgroundImageBlobKey: schema.rooms.chatBackgroundImageBlobKey, chatBackgroundPreset: schema.rooms.chatBackgroundPreset }).from(schema.rooms).where(and(eq(schema.rooms.id, args.roomId), isNull(schema.rooms.deletedAt))).get();
      if (!room) return { ok: false, error: "Room not found." };
      const oldKey = room.chatBackgroundImageBlobKey;
      if (!args.image) {
        if (!oldKey && !room.chatBackgroundPreset) return { ok: true };
        await db.update(schema.rooms).set({ chatBackgroundImageBlobKey: null, chatBackgroundImageFit: "contain", chatBackgroundPreset: null, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
        if (oldKey) await ctx.blobs.delete(oldKey);
        await addEvent(ctx, room.id, `${actor.name} removed the chat background photo.`, actor.id);
        ctx.invalidateQueries();
        return { ok: true };
      }
      const bytes = decodeVerifiedImage(args.image.dataBase64, args.image.mimeType);
      if (!bytes) return { ok: false, error: "Choose a valid JPEG, PNG, or WebP image under 7.5 MB." };
      const key = `rooms/${room.id}/chat-background-${Date.now()}.${imageExtension(args.image.mimeType)}`;
      await ctx.blobs.put(key, bytes, { contentType: args.image.mimeType });
      await db.update(schema.rooms).set({ chatBackgroundImageBlobKey: key, chatBackgroundImageFit: args.fit ?? "contain", chatBackgroundPreset: null, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      if (oldKey && oldKey !== key) await ctx.blobs.delete(oldKey);
      await addEvent(ctx, room.id, `${actor.name} changed the chat background photo.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomChatBackgroundFade: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), fade: z.number().int().min(0).max(100) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, actor.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!membership) return { ok: false, error: "Join the room before changing its chat background." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const room = await db.select({ id: schema.rooms.id, chatBackgroundFade: schema.rooms.chatBackgroundFade }).from(schema.rooms).where(and(eq(schema.rooms.id, args.roomId), isNull(schema.rooms.deletedAt))).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.chatBackgroundFade === args.fade) return { ok: true };
      await db.update(schema.rooms).set({ chatBackgroundFade: args.fade, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  updateRoomProfileImage: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), image: imageUploadSchema.nullable() }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id, profileImageBlobKey: schema.rooms.profileImageBlobKey }).from(schema.rooms).where(and(eq(schema.rooms.id, args.roomId), isNull(schema.rooms.deletedAt))).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (await roomModeratorLevel(ctx, room.id, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const oldKey = room.profileImageBlobKey;
      if (!args.image) {
        await db.update(schema.rooms).set({ profileImageBlobKey: null, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
        if (oldKey) await ctx.blobs.delete(oldKey);
        await addEvent(ctx, room.id, `${actor.name} removed the room picture.`, actor.id);
        ctx.invalidateQueries();
        return { ok: true };
      }
      const bytes = decodeVerifiedImage(args.image.dataBase64, args.image.mimeType);
      if (!bytes) return { ok: false, error: "Choose a valid JPEG, PNG, or WebP image under 7.5 MB." };
      const key = `rooms/${room.id}/profile-${Date.now()}.${imageExtension(args.image.mimeType)}`;
      await ctx.blobs.put(key, bytes, { contentType: args.image.mimeType, public: true });
      await db.update(schema.rooms).set({ profileImageBlobKey: key, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      if (oldKey && oldKey !== key) await ctx.blobs.delete(oldKey);
      await addEvent(ctx, room.id, `${actor.name} changed the room picture.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  createRoom: defineAction({
    request: z.object({ token: z.string(), name: z.string().trim().min(2).max(42) }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), roomId: z.number().optional() }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      if (!isPlatformAdmin(me.role)) {
        const ownedRooms = await db.select({ id: schema.rooms.id }).from(schema.rooms).where(and(eq(schema.rooms.createdBy, me.id), isNull(schema.rooms.deletedAt), isNull(schema.rooms.parentRoomId)));
        if (ownedRooms.length >= 10) return { ok: false, error: "You can own up to 10 rooms. Delete one of your rooms before creating another." };
      }
      const result = await db.insert(schema.rooms).values({ name: args.name, createdBy: me.id }).returning({ id: schema.rooms.id });
      const room = result[0];
      if (!room) return { ok: false, error: "Could not create the room." };
      await db.insert(schema.memberships).values({ roomId: room.id, userId: me.id, state: "active" });
      await addEvent(ctx, room.id, `${me.name} opened the room.`, me.id);
      ctx.invalidateQueries();
      return { ok: true, roomId: room.id };
    },
  }),

  createSubroom: defineAction({
    request: z.object({ token: z.string(), parentRoomId: z.number().int().positive(), name: z.string().trim().min(2).max(42), password: z.string().max(72).optional() }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), roomId: z.number().optional() }),
    privileged: [Privileged.hashPassword],
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const parent = await db.select({ id: schema.rooms.id, parentRoomId: schema.rooms.parentRoomId, defaultMicSeconds: schema.rooms.defaultMicSeconds, deletedAt: schema.rooms.deletedAt }).from(schema.rooms).where(eq(schema.rooms.id, args.parentRoomId)).get();
      if (!parent || parent.deletedAt || parent.parentRoomId) return { ok: false, error: "Parent room not found." };
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(eq(schema.memberships.roomId, parent.id), eq(schema.memberships.userId, me.id), eq(schema.memberships.state, "active"))).get();
      if (!membership) return { ok: false, error: "Join the main room before creating a subroom." };
      if (await roomModeratorLevel(ctx, parent.id, me.id, me.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const existing = await db.select({ id: schema.rooms.id }).from(schema.rooms).where(and(eq(schema.rooms.parentRoomId, parent.id), isNull(schema.rooms.deletedAt)));
      if (existing.length >= 20) return { ok: false, error: "This room can have up to 20 subrooms." };
      const password = args.password?.trim() ?? "";
      if (password.length > 0 && password.length < 4) return { ok: false, error: "Use at least 4 characters for a room password." };
      const passwordHash = password ? (await ctx.executePrivileged(Privileged.hashPassword, { password })).hash : null;
      const created = await db.insert(schema.rooms).values({ name: args.name, createdBy: me.id, parentRoomId: parent.id, defaultMicSeconds: parent.defaultMicSeconds, passwordHash }).returning({ id: schema.rooms.id });
      const subroom = created[0];
      if (!subroom) return { ok: false, error: "Could not create the subroom." };
      await db.insert(schema.memberships).values({ roomId: subroom.id, userId: me.id, state: "active", roomTier: "mod3", moderatorLevel: 3 });
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, roomId: parent.id, action: "subroom_created", details: `Created subroom ${args.name}.` });
      ctx.invalidateQueries();
      return { ok: true, roomId: subroom.id };
    },
  }),

  deleteRoom: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "This session is no longer valid." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id, createdBy: schema.rooms.createdBy }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: true };
      if (!isPlatformAdmin(me.role) && room.createdBy !== me.id) return { ok: false, error: "Only this room’s owner or an admin can delete it." };
      await db.update(schema.rooms).set({ deletedAt: new Date(), deletedBy: me.id, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      await db.delete(schema.micQueue).where(eq(schema.micQueue.roomId, room.id));
      await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, room.id));
      await db.delete(schema.signals).where(eq(schema.signals.roomId, room.id));
      await db.update(schema.memberships).set({ state: "left", voiceActive: false }).where(eq(schema.memberships.roomId, room.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  restoreRoom: defineAction({
    request: z.object({ token: z.string().min(1), roomId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      await db.update(schema.rooms).set({ deletedAt: null, deletedBy: null, updatedAt: new Date() }).where(eq(schema.rooms.id, room.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setRoomPassword: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), password: z.string().max(72) }),
    response: doneSchema,
    privileged: [Privileged.hashPassword],
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ createdBy: schema.rooms.createdBy, parentRoomId: schema.rooms.parentRoomId }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (!room.parentRoomId) return { ok: false, error: "Passwords are only available for subrooms." };
      if (room.createdBy !== me.id) return { ok: false, error: "Only the subroom owner can change the subroom password." };
      const password = args.password.trim();
      if (password.length > 0 && password.length < 4) return { ok: false, error: "Use at least 4 characters for a room password." };
      const passwordHash = password ? (await ctx.executePrivileged(Privileged.hashPassword, { password })).hash : null;
      await db.update(schema.rooms).set({ passwordHash, updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  joinRoom: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), password: z.string().max(72).optional() }),
    response: doneSchema,
    privileged: [Privileged.verifyPassword],
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Please rejoin with your name." };
      const db = ctx.db<typeof schema>();
      const room = await db.select().from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room || room.deletedAt) return { ok: false, error: "That room no longer exists." };
      if (room.locked && !isPlatformAdmin(me.role)) return { ok: false, error: room.lockReason ? `This room is locked: ${room.lockReason}` : "This room is locked by an administrator." };
      const roomBan = await db.select({ id: schema.roomBans.id }).from(schema.roomBans).where(and(eq(schema.roomBans.roomId, args.roomId), eq(schema.roomBans.userId, me.id))).get();
      if (roomBan) return { ok: false, error: "You are banned from this room." };
      if (room.parentRoomId && room.passwordHash) {
        if (!args.password) return { ok: false, error: "Enter the subroom password." };
        const { valid } = await ctx.executePrivileged(Privileged.verifyPassword, { password: args.password, hash: room.passwordHash });
        if (!valid) return { ok: false, error: "That subroom password is incorrect." };
      }
      let inheritedTier: StoredRoomTier = "visitor";
      if (room.parentRoomId) {
        const parentMembership = await db.select({ roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(eq(schema.memberships.roomId, room.parentRoomId), eq(schema.memberships.userId, me.id), eq(schema.memberships.state, "active"))).get();
        if (!parentMembership) return { ok: false, error: "Join the main room before entering a subroom." };
        const parentOwner = await isRoomOwner(ctx, room.parentRoomId, me.id);
        inheritedTier = parentOwner ? "blackshirt" : parentMembership.roomTier;
      }
      const existing = await db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, me.id))).get();
      if (existing) {
        await db.update(schema.memberships).set({ state: "active", muted: false, voiceActive: false, roomTier: room.parentRoomId ? inheritedTier : existing.roomTier, moderatorLevel: room.parentRoomId ? moderatorLevelForTier(inheritedTier) : existing.moderatorLevel, joinedAt: new Date(), lastSeenAt: new Date() }).where(eq(schema.memberships.id, existing.id));
      } else {
        await db.insert(schema.memberships).values({ roomId: args.roomId, userId: me.id, roomTier: inheritedTier, moderatorLevel: moderatorLevelForTier(inheritedTier) });
      }
      const activeMembers = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.state, "active")));
      if (activeMembers.length >= 50 && room.level < 2) await db.update(schema.rooms).set({ level: 2, leveledAt: new Date(), updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      await addEvent(ctx, args.roomId, `${me.name} joined.`, me.id, "join");
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  leaveRoom: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      await db.update(schema.memberships).set({ state: "left", voiceActive: false, lastSeenAt: new Date() }).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, me.id)));
      await db.delete(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), eq(schema.micQueue.userId, me.id)));
      await db.update(schema.rooms).set({ micHoldByUserId: null }).where(and(eq(schema.rooms.id, args.roomId), eq(schema.rooms.micHoldByUserId, me.id)));
      await addEvent(ctx, args.roomId, `${me.name} left.`, me.id);
      await reconcileMicQueue(ctx, args.roomId);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  roomSnapshot: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(),
      room: z.object({ id: z.number(), name: z.string(), profileImageUrl: z.string().nullable(), chatBackground: z.string(), chatBackgroundImageUrl: z.string().nullable(), chatBackgroundImageFit: z.enum(["contain", "cover"]), chatBackgroundFade: z.number(), chatBackgroundPreset: z.enum(["kawaii-cats", "dreamy-kitten", "pastel-clouds", "pastel-daisies"]).nullable(), ownerId: z.number(), ownerName: z.string(), parentRoomId: z.number().nullable(), parentRoomName: z.string().nullable(), defaultMicSeconds: z.number(), micMode: z.enum(["free", "queue"]), queuePaused: z.boolean(), micHoldByUserId: z.number().nullable(), level: z.number(), isPrivate: z.boolean() }).optional(),
      subrooms: z.array(z.object({ id: z.number(), name: z.string(), micMode: z.enum(["free", "queue"]), isPrivate: z.boolean(), onlineCount: z.number() })).optional(),
      me: z.object({ id: z.number(), name: z.string(), role: roleSchema, roomTier: roomTierSchema, moderatorLevel: z.number(), isOwner: z.boolean(), muted: z.boolean(), creditBalance: z.number() }).optional(),
      participants: z.array(z.object({ id: z.number(), name: z.string(), gender: z.enum(["male", "female"]).nullable(), singerCoverPhotoUrl: z.string().nullable(), role: roleSchema, roomTier: roomTierSchema, moderatorLevel: z.number(), isOwner: z.boolean(), muted: z.boolean(), voiceActive: z.boolean(), online: z.boolean(), friendshipStatus: z.enum(["none", "outgoing", "incoming", "friends"]), friendRequestId: z.number().nullable() })),
      bans: z.array(z.object({ userId: z.number(), name: z.string(), bannedByName: z.string().nullable(), createdAt: z.string() })).optional(),
      messages: z.array(z.object({ id: z.number(), userId: z.number().nullable(), name: z.string().nullable(), kind: z.enum(["message", "event"]), body: z.string(), imageUrl: z.string().nullable(), createdAt: z.string(), textStyle: chatTextStyleSchema.nullable() })), 
      queue: z.array(z.object({ id: z.number(), userId: z.number(), name: z.string(), position: z.number(), isCurrent: z.boolean(), endsAt: z.string().nullable(), remainingSeconds: z.number().nullable() })).optional(),
      heart: z.object({ count: z.number(), availableAt: z.string().nullable() }).nullable().optional(),
    }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired.", participants: [], messages: [] };
      const db = ctx.db<typeof schema>();
      const accessRoom = await db.select({ locked: schema.rooms.locked, lockReason: schema.rooms.lockReason, deletedAt: schema.rooms.deletedAt }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!accessRoom || accessRoom.deletedAt) return { ok: false, error: "Room not found.", participants: [], messages: [] };
      if (accessRoom.locked && !isPlatformAdmin(me.role)) return { ok: false, error: accessRoom.lockReason ? `This room is locked: ${accessRoom.lockReason}` : "This room is locked by an administrator.", participants: [], messages: [] };
      const membership = await db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, me.id))).get();
      if (!membership || membership.state !== "active") return { ok: false, error: membership?.state === "kicked" ? "A moderator removed you from this room." : "Join this room to take part.", participants: [], messages: [] };
      await db.update(schema.memberships).set({ lastSeenAt: new Date() }).where(eq(schema.memberships.id, membership.id));
      const credit = await accrueOnlineCredit(ctx, me.id);
      await reconcileMicQueue(ctx, args.roomId);
      await ensureRoomLevel(ctx, args.roomId);
      const room = await db.select({ id: schema.rooms.id, name: schema.rooms.name, profileImageBlobKey: schema.rooms.profileImageBlobKey, chatBackground: schema.rooms.chatBackground, chatBackgroundImageBlobKey: schema.rooms.chatBackgroundImageBlobKey, chatBackgroundImageFit: schema.rooms.chatBackgroundImageFit, chatBackgroundFade: schema.rooms.chatBackgroundFade, chatBackgroundPreset: schema.rooms.chatBackgroundPreset, ownerId: schema.rooms.createdBy, ownerName: schema.users.name, ownerDisplayName: schema.users.displayName, parentRoomId: schema.rooms.parentRoomId, defaultMicSeconds: schema.rooms.defaultMicSeconds, micMode: schema.rooms.micMode, queuePaused: schema.rooms.queuePaused, micHoldByUserId: schema.rooms.micHoldByUserId, level: schema.rooms.level, passwordHash: schema.rooms.passwordHash }).from(schema.rooms).innerJoin(schema.users, eq(schema.rooms.createdBy, schema.users.id)).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found.", participants: [], messages: [] };
      const parentRoom = room.parentRoomId ? await db.select({ name: schema.rooms.name }).from(schema.rooms).where(eq(schema.rooms.id, room.parentRoomId)).get() : undefined;
      const childRooms = !room.parentRoomId ? await db.select({ id: schema.rooms.id, name: schema.rooms.name, micMode: schema.rooms.micMode, passwordHash: schema.rooms.passwordHash }).from(schema.rooms).where(and(eq(schema.rooms.parentRoomId, room.id), isNull(schema.rooms.deletedAt))).orderBy(asc(schema.rooms.createdAt)) : [];
      const childMemberships = childRooms.length > 0 ? await db.select({ roomId: schema.memberships.roomId, lastSeenAt: schema.memberships.lastSeenAt }).from(schema.memberships).where(eq(schema.memberships.state, "active")) : [];
      const childNow = Date.now();
      const subrooms = childRooms.map((child) => ({ id: child.id, name: child.name, micMode: child.micMode, isPrivate: Boolean(child.passwordHash), onlineCount: childMemberships.filter((item) => item.roomId === child.id && childNow - item.lastSeenAt.getTime() < 18000).length }));
      const memberRows = await db.select({ id: schema.users.id, username: schema.users.name, defaultDisplayName: schema.users.displayName, gender: schema.users.gender, singerCoverBlobKey: schema.users.singerCoverBlobKey, roomDisplayName: schema.memberships.displayName, role: schema.users.role, roomTier: schema.memberships.roomTier, moderatorLevel: schema.memberships.moderatorLevel, muted: schema.memberships.muted, voiceActive: schema.memberships.voiceActive, lastSeenAt: schema.memberships.lastSeenAt })
        .from(schema.memberships).innerJoin(schema.users, eq(schema.memberships.userId, schema.users.id))
        .where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.state, "active"))).orderBy(asc(schema.users.name));
      const rawMessages = await db.select({ id: schema.messages.id, userId: schema.messages.userId, username: schema.users.name, defaultDisplayName: schema.users.displayName, roomDisplayName: schema.memberships.displayName, kind: schema.messages.kind, body: schema.messages.body, imageBlobKey: schema.messages.imageBlobKey, createdAt: schema.messages.createdAt, chatFontFamily: schema.users.chatFontFamily, chatFontSize: schema.users.chatFontSize, chatFontBold: schema.users.chatFontBold, chatFontItalic: schema.users.chatFontItalic, chatFontUnderline: schema.users.chatFontUnderline, chatFontColor: schema.users.chatFontColor })
        .from(schema.messages).leftJoin(schema.users, eq(schema.messages.userId, schema.users.id))
        .leftJoin(schema.memberships, and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, schema.messages.userId)))
        .where(eq(schema.messages.roomId, args.roomId)).orderBy(desc(schema.messages.id)).limit(120);
      const queueRows = await db.select({
        id: schema.micQueue.id,
        userId: schema.micQueue.userId,
        username: schema.users.name,
        defaultDisplayName: schema.users.displayName,
        roomDisplayName: schema.memberships.displayName,
        startedAt: schema.micQueue.startedAt,
        endsAt: schema.micQueue.endsAt,
      }).from(schema.micQueue).innerJoin(schema.users, eq(schema.micQueue.userId, schema.users.id))
        .leftJoin(schema.memberships, and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, schema.micQueue.userId)))
        .where(eq(schema.micQueue.roomId, args.roomId))
        .orderBy(desc(schema.micQueue.startedAt), asc(schema.micQueue.joinedAt));
      const now = Date.now();
      const currentSinger = queueRows[0];
      let heart: { count: number; availableAt: string | null } | null = null;
      if (currentSinger?.startedAt) {
        const [singerHearts, latestGivenHeart] = await Promise.all([
          db.select({ id: schema.roomHearts.id }).from(schema.roomHearts).where(and(
            eq(schema.roomHearts.roomId, args.roomId),
            eq(schema.roomHearts.singerUserId, currentSinger.userId),
          )),
          db.select({ createdAt: schema.roomHearts.createdAt }).from(schema.roomHearts).where(and(
            eq(schema.roomHearts.roomId, args.roomId),
            eq(schema.roomHearts.giverUserId, me.id),
          )).orderBy(desc(schema.roomHearts.createdAt)).get(),
        ]);
        const availableAtMs = latestGivenHeart ? latestGivenHeart.createdAt.getTime() + HEART_COOLDOWN_MS : 0;
        heart = { count: singerHearts.length, availableAt: availableAtMs > now ? new Date(availableAtMs).toISOString() : null };
      }
      const roomProfileImageUrl = await publicBlobUrl(ctx, room.profileImageBlobKey);
      const chatBackgroundImageUrl = await privateBlobUrl(ctx, room.chatBackgroundImageBlobKey);
      const friendshipRows = await db.select().from(schema.friendships).where(or(eq(schema.friendships.requesterId, me.id), eq(schema.friendships.addresseeId, me.id)));
      const friendshipFor = (userId: number) => friendshipRows.find((row) => (row.requesterId === me.id && row.addresseeId === userId) || (row.requesterId === userId && row.addresseeId === me.id));
      const friendshipStatusFor = (userId: number): "none" | "outgoing" | "incoming" | "friends" => {
        const relation = friendshipFor(userId);
        if (!relation || relation.status === "declined") return "none";
        if (relation.status === "accepted") return "friends";
        return relation.requesterId === me.id ? "outgoing" : "incoming";
      };
      const canViewBans = await roomModeratorLevel(ctx, args.roomId, me.id, me.role) >= 3;
      const banRows = canViewBans ? await db.select().from(schema.roomBans).where(eq(schema.roomBans.roomId, args.roomId)).orderBy(desc(schema.roomBans.createdAt)) : [];
      const bans = canViewBans ? await Promise.all(banRows.map(async (ban) => {
        const [bannedUser, banningUser] = await Promise.all([
          db.select({ name: schema.users.name, displayName: schema.users.displayName }).from(schema.users).where(eq(schema.users.id, ban.userId)).get(),
          ban.bannedBy ? db.select({ name: schema.users.name, displayName: schema.users.displayName }).from(schema.users).where(eq(schema.users.id, ban.bannedBy)).get() : Promise.resolve(undefined),
        ]);
        return { userId: ban.userId, name: bannedUser?.displayName ?? bannedUser?.name ?? `User #${ban.userId}`, bannedByName: banningUser?.displayName ?? banningUser?.name ?? null, createdAt: ban.createdAt.toISOString() };
      })) : undefined;
      const participantViews = await Promise.all(memberRows.map(async (p) => ({
        id: p.id,
        name: p.roomDisplayName ?? p.defaultDisplayName ?? p.username,
        gender: p.gender,
        singerCoverPhotoUrl: await publicBlobUrl(ctx, p.singerCoverBlobKey),
        role: isPlatformAdmin(p.role) ? p.role : moderatorLevelForTier(p.roomTier) > 0 ? "moderator" as const : "user" as const,
        roomTier: effectiveRoomTier(p.role, room.ownerId === p.id, p.roomTier),
        moderatorLevel: moderatorLevelForTier(p.roomTier),
        isOwner: room.ownerId === p.id,
        muted: p.muted,
        voiceActive: p.voiceActive && now - p.lastSeenAt.getTime() < 18000,
        online: now - p.lastSeenAt.getTime() < 18000,
        friendshipStatus: p.id === me.id ? "none" as const : friendshipStatusFor(p.id),
        friendRequestId: p.id === me.id ? null : friendshipFor(p.id)?.id ?? null,
      })));
      return {
        ok: true,
        room: { id: room.id, name: room.name, profileImageUrl: roomProfileImageUrl, chatBackground: room.chatBackground, chatBackgroundImageUrl, chatBackgroundImageFit: room.chatBackgroundImageFit, chatBackgroundFade: room.chatBackgroundFade, chatBackgroundPreset: room.chatBackgroundPreset, ownerId: room.ownerId, ownerName: room.ownerDisplayName ?? room.ownerName, parentRoomId: room.parentRoomId, parentRoomName: parentRoom?.name ?? null, defaultMicSeconds: room.defaultMicSeconds, micMode: room.micMode, queuePaused: room.queuePaused, micHoldByUserId: room.micHoldByUserId, level: room.level, isPrivate: Boolean(room.parentRoomId && room.passwordHash) },
        subrooms,
        me: { id: me.id, name: membership.displayName ?? me.displayName ?? me.name, role: isPlatformAdmin(me.role) ? me.role : moderatorLevelForTier(membership.roomTier) > 0 ? "moderator" as const : "user" as const, roomTier: effectiveRoomTier(me.role, room.ownerId === me.id, membership.roomTier), moderatorLevel: moderatorLevelForTier(membership.roomTier), isOwner: room.ownerId === me.id, muted: membership.muted, creditBalance: credit.balance },
        participants: participantViews,
        bans,
        messages: await Promise.all(rawMessages.reverse().filter((message) => message.kind === "message" || isVisibleLegacyRoomActivity(message.body)).map(async (m) => ({ id: m.id, userId: m.userId, name: m.userId === null ? null : m.roomDisplayName ?? m.defaultDisplayName ?? m.username, kind: m.kind, body: m.body, imageUrl: await privateBlobUrl(ctx, m.imageBlobKey), createdAt: m.createdAt.toISOString(), textStyle: m.userId === null ? null : { fontFamily: m.chatFontFamily ?? "system", fontSize: m.chatFontSize ?? 14, bold: m.chatFontBold ?? false, italic: m.chatFontItalic ?? false, underline: m.chatFontUnderline ?? false, color: m.chatFontColor && /^#[0-9a-fA-F]{6}$/.test(m.chatFontColor) ? m.chatFontColor : "#092427" } }))),
        queue: queueRows.map((entry, index) => ({ id: entry.id, userId: entry.userId, name: entry.roomDisplayName ?? entry.defaultDisplayName ?? entry.username, position: index + 1, isCurrent: index === 0, endsAt: entry.endsAt?.toISOString() ?? null, remainingSeconds: entry.endsAt ? Math.max(0, Math.ceil((entry.endsAt.getTime() - now) / 1000)) : null })),
        heart,
      };
    },
  }),

  giftSingerCredits: defineAction({
    request: z.object({ token: z.string().min(1), roomId: z.number().int().positive(), amount: z.number().int().min(1).max(1000) }),
    response: z.object({ ok: z.boolean(), error: z.string().optional(), balance: z.number().optional(), singerBalance: z.number().optional() }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      await reconcileMicQueue(ctx, args.roomId);
      const singer = await db.select({ userId: schema.micQueue.userId }).from(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), isNotNull(schema.micQueue.startedAt))).orderBy(asc(schema.micQueue.startedAt)).get();
      if (!singer) return { ok: false, error: "There is no singer to receive this gift." };
      if (singer.userId === me.id) return { ok: false, error: "You cannot gift credits to yourself." };
      const [giverAccount, singerAccount] = await Promise.all([
        db.select({ balance: schema.users.creditBalance }).from(schema.users).where(eq(schema.users.id, me.id)).get(),
        db.select({ balance: schema.users.creditBalance }).from(schema.users).where(eq(schema.users.id, singer.userId)).get(),
      ]);
      if (!giverAccount || giverAccount.balance < args.amount) return { ok: false, error: "You do not have enough credits." };
      if (!singerAccount) return { ok: false, error: "Singer account not found." };
      const balance = giverAccount.balance - args.amount;
      const singerBalance = singerAccount.balance + args.amount;
      await db.batch([
        db.update(schema.users).set({ creditBalance: balance, updatedAt: new Date() }).where(eq(schema.users.id, me.id)),
        db.update(schema.users).set({ creditBalance: singerBalance, updatedAt: new Date() }).where(eq(schema.users.id, singer.userId)),
        db.insert(schema.creditGifts).values({ roomId: args.roomId, singerUserId: singer.userId, giverUserId: me.id, amount: args.amount }),
        db.insert(schema.creditTransactions).values({ userId: me.id, kind: "gift_sent", amount: -args.amount, relatedUserId: singer.userId, roomId: args.roomId }),
        db.insert(schema.creditTransactions).values({ userId: singer.userId, kind: "gift_received", amount: args.amount, relatedUserId: me.id, roomId: args.roomId }),
      ]);
      await addEvent(ctx, args.roomId, `${me.displayName ?? me.name} gifted ${args.amount} credit${args.amount === 1 ? "" : "s"} to the singer.`, me.id);
      ctx.invalidateQueries();
      return { ok: true, balance, singerBalance };
    },
  }),

  grantCredits: defineAction({
    request: z.object({ token: z.string().min(1), targetUserId: z.number().int().positive(), amount: z.number().int().min(1).max(1_000_000) }),
    response: doneSchema,
    async handler(ctx, args) {
      const superadmin = await authenticated(ctx, args.token);
      if (!superadmin || superadmin.role !== "superadmin") return { ok: false, error: "Super Admin access required." };
      if (superadmin.id === args.targetUserId) return { ok: false, error: "Choose another user." };
      const db = ctx.db<typeof schema>();
      const target = await db.select({ id: schema.users.id, creditBalance: schema.users.creditBalance, deletedAt: schema.users.deletedAt }).from(schema.users).where(eq(schema.users.id, args.targetUserId)).get();
      if (!target || target.deletedAt) return { ok: false, error: "Active user not found." };
      await db.batch([
        db.update(schema.users).set({ creditBalance: target.creditBalance + args.amount, updatedAt: new Date() }).where(eq(schema.users.id, target.id)),
        db.insert(schema.creditTransactions).values({ userId: target.id, kind: "admin_grant", amount: args.amount, relatedUserId: superadmin.id }),
      ]);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getCreditStore: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(), buyCreditsEnabled: z.boolean(),
      packages: z.array(z.object({ id: z.number(), credits: z.number(), priceCents: z.number() })),
      transactions: z.array(z.object({ id: z.number(), kind: z.enum(["online_earned", "purchase", "gift_sent", "gift_received", "admin_grant"]), amount: z.number(), relatedName: z.string().nullable(), roomName: z.string().nullable(), purchasedCredits: z.number().nullable(), priceCents: z.number().nullable(), createdAt: z.string() })),
    }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired.", buyCreditsEnabled: false, packages: [], transactions: [] };
      const db = ctx.db<typeof schema>();
      const buyCreditsEnabled = await getBuyCreditsEnabled(ctx);
      const [packages, rows, users] = await Promise.all([
        buyCreditsEnabled ? db.select({ id: schema.creditPackages.id, credits: schema.creditPackages.credits, priceCents: schema.creditPackages.priceCents }).from(schema.creditPackages).where(eq(schema.creditPackages.active, true)).orderBy(asc(schema.creditPackages.priceCents)) : Promise.resolve([]),
        db.select({ id: schema.creditTransactions.id, kind: schema.creditTransactions.kind, amount: schema.creditTransactions.amount, relatedUserId: schema.creditTransactions.relatedUserId, roomName: schema.rooms.name, purchasedCredits: schema.creditPurchases.credits, priceCents: schema.creditPurchases.priceCents, createdAt: schema.creditTransactions.createdAt }).from(schema.creditTransactions)
          .leftJoin(schema.rooms, eq(schema.creditTransactions.roomId, schema.rooms.id))
          .leftJoin(schema.creditPurchases, eq(schema.creditTransactions.purchaseId, schema.creditPurchases.id))
          .where(eq(schema.creditTransactions.userId, me.id)).orderBy(desc(schema.creditTransactions.createdAt)),
        db.select({ id: schema.users.id, name: schema.users.name, displayName: schema.users.displayName }).from(schema.users),
      ]);
      const names = new Map(users.map((user) => [user.id, user.displayName ?? user.name]));
      return { ok: true, buyCreditsEnabled, packages, transactions: rows.map((row) => ({ id: row.id, kind: row.kind, amount: row.amount, relatedName: row.relatedUserId ? names.get(row.relatedUserId) ?? null : null, roomName: row.roomName, purchasedCredits: row.purchasedCredits, priceCents: row.priceCents, createdAt: row.createdAt.toISOString() })) };
    },
  }),

  getAdminCreditDashboard: defineAction({
    request: z.object({ token: z.string().min(1) }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(), buyCreditsEnabled: z.boolean(),
      packages: z.array(z.object({ id: z.number(), credits: z.number(), priceCents: z.number(), active: z.boolean(), createdAt: z.string() })),
      purchases: z.array(z.object({ id: z.number(), userName: z.string(), credits: z.number(), priceCents: z.number(), status: z.enum(["pending", "completed", "failed", "canceled"]), createdAt: z.string(), completedAt: z.string().nullable() })),
    }),
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required.", buyCreditsEnabled: false, packages: [], purchases: [] };
      const db = ctx.db<typeof schema>();
      const [buyCreditsEnabled, packages, purchases] = await Promise.all([
        getBuyCreditsEnabled(ctx),
        db.select({ id: schema.creditPackages.id, credits: schema.creditPackages.credits, priceCents: schema.creditPackages.priceCents, active: schema.creditPackages.active, createdAt: schema.creditPackages.createdAt }).from(schema.creditPackages).orderBy(desc(schema.creditPackages.createdAt)),
        db.select({ id: schema.creditPurchases.id, userName: schema.users.name, userDisplayName: schema.users.displayName, credits: schema.creditPurchases.credits, priceCents: schema.creditPurchases.priceCents, status: schema.creditPurchases.status, createdAt: schema.creditPurchases.createdAt, completedAt: schema.creditPurchases.completedAt }).from(schema.creditPurchases).innerJoin(schema.users, eq(schema.creditPurchases.userId, schema.users.id)).orderBy(desc(schema.creditPurchases.createdAt)),
      ]);
      return { ok: true, buyCreditsEnabled, packages: packages.map((pack) => ({ ...pack, createdAt: pack.createdAt.toISOString() })), purchases: purchases.map((purchase) => ({ id: purchase.id, userName: purchase.userDisplayName ?? purchase.userName, credits: purchase.credits, priceCents: purchase.priceCents, status: purchase.status, createdAt: purchase.createdAt.toISOString(), completedAt: purchase.completedAt?.toISOString() ?? null })) };
    },
  }),

  setBuyCreditsEnabled: defineAction({
    request: z.object({ token: z.string().min(1), enabled: z.boolean() }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const existing = await db.select({ id: schema.siteSettings.id }).from(schema.siteSettings).where(eq(schema.siteSettings.id, 1)).get();
      if (existing) await db.update(schema.siteSettings).set({ buyCreditsEnabled: args.enabled, updatedBy: admin.id, updatedAt: new Date() }).where(eq(schema.siteSettings.id, 1));
      else await db.insert(schema.siteSettings).values({ id: 1, buyCreditsEnabled: args.enabled, updatedBy: admin.id });
      await logActivity(ctx, { userId: admin.id, actorName: admin.displayName ?? admin.name, action: "buy_credits_setting_changed", details: `${args.enabled ? "Enabled" : "Disabled"} credit purchases.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  addCreditPackage: defineAction({
    request: z.object({ token: z.string().min(1), credits: z.number().int().min(1).max(1_000_000), priceCents: z.number().int().min(1).max(100_000_000) }),
    response: doneSchema,
    async handler(ctx, args) {
      const admin = await authenticated(ctx, args.token);
      if (!admin || !isPlatformAdmin(admin.role)) return { ok: false, error: "Administrator access required." };
      const db = ctx.db<typeof schema>();
      const existing = await db.select({ id: schema.creditPackages.id }).from(schema.creditPackages).where(and(eq(schema.creditPackages.credits, args.credits), eq(schema.creditPackages.priceCents, args.priceCents))).get();
      if (existing) return { ok: false, error: "That credit package already exists." };
      await db.insert(schema.creditPackages).values({ credits: args.credits, priceCents: args.priceCents, createdBy: admin.id });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  createPayPalCreditCheckout: defineAction({
    request: z.object({ token: z.string().min(1), packageId: z.number().int().positive() }),
    response: z.object({ ok: z.boolean(), configured: z.boolean(), checkoutUrl: z.string().url().optional(), error: z.string().optional() }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, configured: false, error: "Session expired." };
      if (!await getBuyCreditsEnabled(ctx)) return { ok: false, configured: false, error: "Credit purchases are currently turned off." };
      const db = ctx.db<typeof schema>();
      const pack = await db.select({ credits: schema.creditPackages.credits, priceCents: schema.creditPackages.priceCents }).from(schema.creditPackages).where(and(eq(schema.creditPackages.id, args.packageId), eq(schema.creditPackages.active, true))).get();
      if (!pack) return { ok: false, configured: false, error: "That credit package is no longer available." };
      return { ok: false, configured: false, error: `PayPal checkout for ${pack.credits} credits ($${(pack.priceCents / 100).toFixed(2)}) needs a securely connected merchant account before purchases can open.` };
    },
  }),

  giveSingerHeart: defineAction({

    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const member = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, me.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!member) return { ok: false, error: "Join the room before giving a heart." };
      await reconcileMicQueue(ctx, args.roomId);
      const currentSinger = await db.select({ userId: schema.micQueue.userId }).from(schema.micQueue).where(and(
        eq(schema.micQueue.roomId, args.roomId),
        isNotNull(schema.micQueue.startedAt),
      )).orderBy(asc(schema.micQueue.startedAt)).get();
      if (!currentSinger) return { ok: false, error: "There is no singer on mic right now." };
      if (currentSinger.userId === me.id) return { ok: false, error: "You cannot give a heart to yourself." };
      const latest = await db.select({ createdAt: schema.roomHearts.createdAt }).from(schema.roomHearts).where(and(
        eq(schema.roomHearts.roomId, args.roomId),
        eq(schema.roomHearts.giverUserId, me.id),
      )).orderBy(desc(schema.roomHearts.createdAt)).get();
      if (latest) {
        const remainingSeconds = Math.ceil((latest.createdAt.getTime() + HEART_COOLDOWN_MS - Date.now()) / 1000);
        if (remainingSeconds > 0) return { ok: false, error: `You can give another heart in ${remainingSeconds} seconds.` };
      }
      await db.insert(schema.roomHearts).values({ roomId: args.roomId, singerUserId: currentSinger.userId, giverUserId: me.id });
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, roomId: args.roomId, action: "heart_given", details: `Gave a heart to user #${currentSinger.userId}.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  sendMessage: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), body: z.string().trim().min(1).max(1200) }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const member = await db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, me.id), eq(schema.memberships.state, "active"))).get();
      if (!member) return { ok: false, error: "You are not in this room." };
      if (member.muted) return { ok: false, error: "A moderator has muted you in this room." };
      if (member.roomTier === "visitor" && !isPlatformAdmin(me.role) && !await isRoomOwner(ctx, args.roomId, me.id) && containsEmoji(args.body)) {
        return { ok: false, error: "Visitors cannot send emoji or icons in chat." };
      }
      await db.insert(schema.messages).values({ roomId: args.roomId, userId: me.id, body: args.body });
      await logActivity(ctx, { userId: me.id, actorName: member.displayName ?? me.displayName ?? me.name, roomId: args.roomId, action: "message_sent", details: "Sent a chat message." });
      await db.update(schema.rooms).set({ updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  sendChatPhoto: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), image: imageUploadSchema }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const member = await db.select().from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, me.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!member) return { ok: false, error: "You are not in this room." };
      if (member.muted) return { ok: false, error: "A moderator has muted you in this room." };
      if (await roomModeratorLevel(ctx, args.roomId, me.id, me.role) < 3) return { ok: false, error: "Only room administrators and above can send photos." };
      const bytes = decodeVerifiedImage(args.image.dataBase64, args.image.mimeType);
      if (!bytes) return { ok: false, error: "Choose a valid JPG, PNG, or WebP image under 7.5 MB." };
      const blobKey = `chat-photos/${args.roomId}/${me.id}-${Date.now()}.${imageExtension(args.image.mimeType)}`;
      await ctx.blobs.put(blobKey, bytes, { contentType: args.image.mimeType });
      await db.insert(schema.messages).values({ roomId: args.roomId, userId: me.id, body: "", imageBlobKey: blobKey });
      await logActivity(ctx, { userId: me.id, actorName: member.displayName ?? me.displayName ?? me.name, roomId: args.roomId, action: "chat_photo_sent", details: "Sent a photo in chat." });
      await db.update(schema.rooms).set({ updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setQueuePaused: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), paused: z.boolean() }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 1) return { ok: false, error: "Collaborator, room administrator, or owner access required." };
      const db = ctx.db<typeof schema>();
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, actor.id), eq(schema.memberships.state, "active"))).get();
      if (!membership) return { ok: false, error: "Join the room before managing its mic queue." };
      const room = await db.select({ micMode: schema.rooms.micMode }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.micMode !== "queue") return { ok: false, error: "Queue controls are only available in Queue Mode." };
      await db.update(schema.rooms).set({ queuePaused: args.paused, updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      await addEvent(ctx, args.roomId, `${actor.name} ${args.paused ? "paused" : "resumed"} the mic queue.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setMicHold: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), active: z.boolean() }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 1) return { ok: false, error: "Collaborator, room administrator, or owner access required." };
      const db = ctx.db<typeof schema>();
      const membership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, actor.id), eq(schema.memberships.state, "active"))).get();
      if (!membership) return { ok: false, error: "Join the room before holding the microphone." };
      const room = await db.select({ micMode: schema.rooms.micMode }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.micMode !== "queue") return { ok: false, error: "Mic hold is only available in Queue Mode." };
      await db.update(schema.rooms).set({ micHoldByUserId: args.active ? actor.id : null, updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      if (args.active) {
        await reconcileMicQueue(ctx, args.roomId);
        const singer = await db.select({ userId: schema.micQueue.userId }).from(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), isNotNull(schema.micQueue.startedAt))).get();
        if (singer && singer.userId !== actor.id) await db.update(schema.memberships).set({ voiceActive: false }).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, singer.userId)));
      }
      await addEvent(ctx, args.roomId, `${actor.name} ${args.active ? "held" : "released"} the microphone.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  joinMicQueue: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const member = await db.select().from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, me.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!member) return { ok: false, error: "Join the room before joining the mic queue." };
      if (member.muted) return { ok: false, error: "A moderator has muted your microphone." };
      const room = await db.select({ micMode: schema.rooms.micMode, queuePaused: schema.rooms.queuePaused }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.micMode === "free") return { ok: false, error: "This room is in Free Mode. Turn on your microphone directly." };
      if (room.queuePaused) return { ok: false, error: "The mic queue is temporarily paused." };
      await reconcileMicQueue(ctx, args.roomId);
      const existing = await db.select({ id: schema.micQueue.id }).from(schema.micQueue).where(and(
        eq(schema.micQueue.roomId, args.roomId),
        eq(schema.micQueue.userId, me.id),
      )).get();
      if (existing) return { ok: true };
      await db.insert(schema.micQueue).values({ roomId: args.roomId, userId: me.id });
      await addEvent(ctx, args.roomId, `${me.name} joined the mic queue.`, me.id);
      await reconcileMicQueue(ctx, args.roomId);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  leaveMicQueue: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const entry = await db.select({ id: schema.micQueue.id, startedAt: schema.micQueue.startedAt }).from(schema.micQueue).where(and(
        eq(schema.micQueue.roomId, args.roomId),
        eq(schema.micQueue.userId, me.id),
      )).get();
      if (!entry) return { ok: true };
      await db.delete(schema.micQueue).where(eq(schema.micQueue.id, entry.id));
      // A moderator may be using the hot mic independently of a waiting queue
      // position. Leaving that waiting position must not end the announcement.
      if (entry.startedAt || !await hasRoomModeratorPowers(ctx, args.roomId, me.id, me.role)) {
        await removeVoiceSession(ctx, args.roomId, me.id);
      }
      await addEvent(ctx, args.roomId, entry.startedAt ? `${me.name} left the mic.` : `${me.name} left the mic queue.`, me.id);
      await reconcileMicQueue(ctx, args.roomId);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  manageMicQueue: defineAction({
    request: z.object({
      token: z.string(),
      roomId: z.number().int().positive(),
      action: z.enum(["add", "singNow", "moveUp", "remove", "clear"]),
      targetUserId: z.number().int().positive().optional(),
    }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      const moderatorLevel = await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role);
      if (moderatorLevel < 1) return { ok: false, error: "Collaborator, room administrator, or owner access required." };
      if (args.action === "moveUp" && moderatorLevel < 1) return { ok: false, error: "Collaborator or higher access required." };
      if (["add", "singNow"].includes(args.action) && moderatorLevel < 2) return { ok: false, error: "Room administrator or higher access required." };
      const db = ctx.db<typeof schema>();
      const actorMembership = await db.select({ id: schema.memberships.id }).from(schema.memberships).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, actor.id),
        eq(schema.memberships.state, "active"),
      )).get();
      if (!actorMembership) return { ok: false, error: "Join the room before managing its mic queue." };

      await reconcileMicQueue(ctx, args.roomId);
      if (args.action === "clear") {
        const queued = await db.select({ userId: schema.micQueue.userId }).from(schema.micQueue)
          .where(eq(schema.micQueue.roomId, args.roomId));
        for (const entry of queued) await removeVoiceSession(ctx, args.roomId, entry.userId);
        await db.delete(schema.micQueue).where(eq(schema.micQueue.roomId, args.roomId));
        await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, args.roomId));
        if (queued.length > 0) await addEvent(ctx, args.roomId, `${actor.name} cleared the mic queue.`, actor.id);
        ctx.invalidateQueries();
        return { ok: true };
      }

      if (!args.targetUserId) return { ok: false, error: "Choose a person first." };
      if (args.action === "add") {
        const roomState = await db.select({ queuePaused: schema.rooms.queuePaused }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
        if (roomState?.queuePaused) return { ok: false, error: "The mic queue is temporarily paused." };
      }
      const target = await db.select({
        id: schema.users.id,
        name: schema.users.name,
        muted: schema.memberships.muted,
        state: schema.memberships.state,
      }).from(schema.memberships).innerJoin(schema.users, eq(schema.memberships.userId, schema.users.id)).where(and(
        eq(schema.memberships.roomId, args.roomId),
        eq(schema.memberships.userId, args.targetUserId),
      )).get();
      if (!target || target.state !== "active") return { ok: false, error: "That person is no longer in the room." };
      if (target.muted && (args.action === "add" || args.action === "singNow")) return { ok: false, error: "Unmute this person before adding them to the mic queue." };

      let queueEntry = await db.select().from(schema.micQueue).where(and(
        eq(schema.micQueue.roomId, args.roomId),
        eq(schema.micQueue.userId, target.id),
      )).get();

      if (args.action === "add") {
        if (!queueEntry) {
          await db.insert(schema.micQueue).values({ roomId: args.roomId, userId: target.id });
          await addEvent(ctx, args.roomId, `${actor.name} added ${target.name} to the mic queue.`, actor.id);
          await reconcileMicQueue(ctx, args.roomId);
        }
        ctx.invalidateQueries();
        return { ok: true };
      }

      if (args.action === "singNow") {
        if (!queueEntry) {
          await db.insert(schema.micQueue).values({ roomId: args.roomId, userId: target.id });
          queueEntry = await db.select().from(schema.micQueue).where(and(
            eq(schema.micQueue.roomId, args.roomId),
            eq(schema.micQueue.userId, target.id),
          )).get();
        }
        if (!queueEntry) return { ok: false, error: "Could not add that person to the queue." };
        if (queueEntry.startedAt) return { ok: true };
        const room = await db.select({ defaultMicSeconds: schema.rooms.defaultMicSeconds }).from(schema.rooms)
          .where(eq(schema.rooms.id, args.roomId)).get();
        if (!room) return { ok: false, error: "Room not found." };
        const current = await db.select({ userId: schema.micQueue.userId }).from(schema.micQueue)
          .where(and(eq(schema.micQueue.roomId, args.roomId), isNotNull(schema.micQueue.startedAt))).get();
        if (current) await removeVoiceSession(ctx, args.roomId, current.userId);
        const now = new Date();
        await db.update(schema.micQueue).set({ startedAt: null, endsAt: null }).where(eq(schema.micQueue.roomId, args.roomId));
        await db.update(schema.micQueue).set({ startedAt: now, endsAt: new Date(now.getTime() + room.defaultMicSeconds * 1000) })
          .where(eq(schema.micQueue.id, queueEntry.id));
        await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, args.roomId));
        await addEvent(ctx, args.roomId, `${actor.name} moved ${target.name} to the singer spot.`, actor.id);
        ctx.invalidateQueries();
        return { ok: true };
      }

      if (!queueEntry) return { ok: false, error: "That person is not in the mic queue." };
      if (args.action === "moveUp") {
        if (queueEntry.startedAt) return { ok: true };
        const waiting = await db.select({ id: schema.micQueue.id, joinedAt: schema.micQueue.joinedAt }).from(schema.micQueue)
          .where(and(eq(schema.micQueue.roomId, args.roomId), isNull(schema.micQueue.startedAt)))
          .orderBy(asc(schema.micQueue.joinedAt));
        const targetIndex = waiting.findIndex((entry) => entry.id === queueEntry.id);
        if (targetIndex <= 0) return { ok: true };
        const previous = waiting[targetIndex - 1];
        if (!previous) return { ok: true };
        await db.batch([
          db.update(schema.micQueue).set({ joinedAt: previous.joinedAt }).where(eq(schema.micQueue.id, queueEntry.id)),
          db.update(schema.micQueue).set({ joinedAt: queueEntry.joinedAt }).where(eq(schema.micQueue.id, previous.id)),
        ]);
        await addEvent(ctx, args.roomId, `${actor.name} moved ${target.name} up in the mic queue.`, actor.id);
        ctx.invalidateQueries();
        return { ok: true };
      }

      const wasCurrent = Boolean(queueEntry.startedAt);
      await db.delete(schema.micQueue).where(eq(schema.micQueue.id, queueEntry.id));
      await removeVoiceSession(ctx, args.roomId, target.id);
      if (wasCurrent) await db.delete(schema.karaokeSelections).where(eq(schema.karaokeSelections.roomId, args.roomId));
      await addEvent(ctx, args.roomId, `${actor.name} removed ${target.name} from the mic queue.`, actor.id);
      await reconcileMicQueue(ctx, args.roomId);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setRoomMicMode: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), mode: z.enum(["free", "queue"]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 1) return { ok: false, error: "Collaborator, room administrator, owner, or system administrator access required." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id, micMode: schema.rooms.micMode }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      if (room.micMode === args.mode) return { ok: true };
      await db.update(schema.rooms).set({ micMode: args.mode, queuePaused: args.mode === "free" ? false : undefined, micHoldByUserId: args.mode === "free" ? null : undefined, updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      if (args.mode === "free") {
        await db.delete(schema.micQueue).where(eq(schema.micQueue.roomId, args.roomId));
      }
      const modeName = args.mode === "free" ? "Free Mode" : "Queue Mode";
      await logActivity(ctx, { userId: actor.id, actorName: actor.displayName ?? actor.name, roomId: args.roomId, action: "room_mic_mode_changed", details: `Changed the room microphone to ${modeName}.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setDefaultMicTime: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), durationMinutes: z.number().int().min(1).max(60) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const db = ctx.db<typeof schema>();
      const room = await db.select({ id: schema.rooms.id }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      await db.update(schema.rooms).set({ defaultMicSeconds: args.durationMinutes * 60, updatedAt: new Date() }).where(eq(schema.rooms.id, args.roomId));
      await addEvent(ctx, args.roomId, `${actor.name} set mic turns to ${args.durationMinutes} minute${args.durationMinutes === 1 ? "" : "s"}.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  addQueueTurnTime: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), targetUserId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 1) return { ok: false, error: "Collaborator, room administrator, or owner access required." };
      const db = ctx.db<typeof schema>();
      await reconcileMicQueue(ctx, args.roomId);
      const room = await db.select({ defaultMicSeconds: schema.rooms.defaultMicSeconds }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
      if (!room) return { ok: false, error: "Room not found." };
      const entry = await db.select({ id: schema.micQueue.id, endsAt: schema.micQueue.endsAt, extraSeconds: schema.micQueue.extraSeconds, name: schema.users.name }).from(schema.micQueue).innerJoin(schema.users, eq(schema.micQueue.userId, schema.users.id)).where(and(eq(schema.micQueue.roomId, args.roomId), eq(schema.micQueue.userId, args.targetUserId))).get();
      if (!entry) return { ok: false, error: "That person is not in the mic queue." };
      if (entry.endsAt) await db.update(schema.micQueue).set({ endsAt: new Date(entry.endsAt.getTime() + room.defaultMicSeconds * 1000) }).where(eq(schema.micQueue.id, entry.id));
      else await db.update(schema.micQueue).set({ extraSeconds: entry.extraSeconds + room.defaultMicSeconds }).where(eq(schema.micQueue.id, entry.id));
      await addEvent(ctx, args.roomId, `${actor.name} added one full turn to ${entry.name}.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  addMicTime: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), minutes: z.number().int().min(1).max(30) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (!await hasRoomModeratorPowers(ctx, args.roomId, actor.id, actor.role)) return { ok: false, error: "Collaborator, room administrator, or owner access required." };
      await reconcileMicQueue(ctx, args.roomId);
      const db = ctx.db<typeof schema>();
      const current = await db.select({ id: schema.micQueue.id, userId: schema.micQueue.userId, name: schema.users.name, endsAt: schema.micQueue.endsAt })
        .from(schema.micQueue).innerJoin(schema.users, eq(schema.micQueue.userId, schema.users.id))
        .where(and(eq(schema.micQueue.roomId, args.roomId), isNotNull(schema.micQueue.startedAt))).get();
      if (!current?.endsAt) return { ok: false, error: "No one is currently up on mic." };
      const endsAt = new Date(current.endsAt.getTime() + args.minutes * 60_000);
      await db.update(schema.micQueue).set({ endsAt }).where(eq(schema.micQueue.id, current.id));
      await addEvent(ctx, args.roomId, `${actor.name} added ${args.minutes} minute${args.minutes === 1 ? "" : "s"} to ${current.name}'s turn.`, actor.id);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setVoicePresence: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), active: z.boolean() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const member = await db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, me.id), eq(schema.memberships.state, "active"))).get();
      if (!member) return { ok: false, error: "Join the room first." };
      if (args.active && member.muted) return { ok: false, error: "A moderator has muted your microphone." };
      if (args.active) {
        const room = await db.select({ micMode: schema.rooms.micMode, micHoldByUserId: schema.rooms.micHoldByUserId }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get();
        if (!room) return { ok: false, error: "Room not found." };
        if (room.micMode === "queue") {
          await reconcileMicQueue(ctx, args.roomId);
          const current = await db.select({ userId: schema.micQueue.userId }).from(schema.micQueue)
            .where(and(eq(schema.micQueue.roomId, args.roomId), isNotNull(schema.micQueue.startedAt))).orderBy(asc(schema.micQueue.startedAt)).get();
          if (current?.userId === me.id && room.micHoldByUserId && room.micHoldByUserId !== me.id) return { ok: false, error: "A moderator is holding the microphone." };
          if ((!current || current.userId !== me.id) && !await hasRoomModeratorPowers(ctx, args.roomId, me.id, me.role)) {
            return { ok: false, error: "Join the queue and wait for your turn before starting the microphone." };
          }
        }
      }
      // Once a broadcast ends, remove delayed signaling from that microphone
      // session so it cannot be applied to a later connection.
      if (!args.active) {
        await db.delete(schema.signals).where(and(
          eq(schema.signals.roomId, args.roomId),
          or(eq(schema.signals.fromUserId, me.id), eq(schema.signals.toUserId, me.id)),
        ));
      }
      await db.update(schema.memberships).set({ voiceActive: args.active, lastSeenAt: new Date() }).where(eq(schema.memberships.id, member.id));
      await logActivity(ctx, { userId: me.id, actorName: member.displayName ?? me.displayName ?? me.name, roomId: args.roomId, action: args.active ? "microphone_started" : "microphone_stopped", details: args.active ? "Started broadcasting on the microphone." : "Stopped broadcasting on the microphone." });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  getFriends: defineAction({
    request: z.object({ token: z.string() }),
    response: z.object({
      ok: z.boolean(), error: z.string().optional(),
      friends: z.array(z.object({ requestId: z.number(), userId: z.number(), name: z.string() })),
      incoming: z.array(z.object({ requestId: z.number(), userId: z.number(), name: z.string() })),
      outgoing: z.array(z.object({ requestId: z.number(), userId: z.number(), name: z.string() })),
    }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired.", friends: [], incoming: [], outgoing: [] };
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.friendships).where(or(eq(schema.friendships.requesterId, me.id), eq(schema.friendships.addresseeId, me.id))).orderBy(desc(schema.friendships.updatedAt));
      const friends: { requestId: number; userId: number; name: string }[] = [];
      const incoming: { requestId: number; userId: number; name: string }[] = [];
      const outgoing: { requestId: number; userId: number; name: string }[] = [];
      for (const row of rows) {
        const otherUserId = row.requesterId === me.id ? row.addresseeId : row.requesterId;
        const other = await db.select({ name: schema.users.name, displayName: schema.users.displayName, deletedAt: schema.users.deletedAt }).from(schema.users).where(eq(schema.users.id, otherUserId)).get();
        if (!other || other.deletedAt || row.status === "declined") continue;
        const item = { requestId: row.id, userId: otherUserId, name: other.displayName ?? other.name };
        if (row.status === "accepted") friends.push(item);
        else if (row.addresseeId === me.id) incoming.push(item);
        else outgoing.push(item);
      }
      return { ok: true, friends, incoming, outgoing };
    },
  }),

  sendFriendRequest: defineAction({
    request: z.object({ token: z.string(), targetUserId: z.number().int().positive() }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      if (me.id === args.targetUserId) return { ok: false, error: "You cannot send a friend request to yourself." };
      const db = ctx.db<typeof schema>();
      const target = await db.select({ id: schema.users.id, deletedAt: schema.users.deletedAt }).from(schema.users).where(eq(schema.users.id, args.targetUserId)).get();
      if (!target || target.deletedAt) return { ok: false, error: "That person is no longer available." };
      const existing = await db.select().from(schema.friendships).where(or(
        and(eq(schema.friendships.requesterId, me.id), eq(schema.friendships.addresseeId, args.targetUserId)),
        and(eq(schema.friendships.requesterId, args.targetUserId), eq(schema.friendships.addresseeId, me.id)),
      )).get();
      if (existing?.status === "accepted") return { ok: true };
      if (existing?.status === "pending") return { ok: false, error: existing.addresseeId === me.id ? "This person already sent you a friend request." : "Friend request already sent." };
      if (existing) await db.delete(schema.friendships).where(eq(schema.friendships.id, existing.id));
      await db.insert(schema.friendships).values({ requesterId: me.id, addresseeId: args.targetUserId, status: "pending", createdAt: new Date(), updatedAt: new Date() });
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, action: "friend_request_sent", details: `Sent a friend request to user #${args.targetUserId}.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  respondFriendRequest: defineAction({
    request: z.object({ token: z.string(), requestId: z.number().int().positive(), response: z.enum(["accept", "decline"]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const request = await db.select().from(schema.friendships).where(and(eq(schema.friendships.id, args.requestId), eq(schema.friendships.addresseeId, me.id), eq(schema.friendships.status, "pending"))).get();
      if (!request) return { ok: false, error: "This friend request is no longer pending." };
      const status = args.response === "accept" ? "accepted" as const : "declined" as const;
      await db.update(schema.friendships).set({ status, updatedAt: new Date() }).where(eq(schema.friendships.id, request.id));
      await logActivity(ctx, { userId: me.id, actorName: me.displayName ?? me.name, action: `friend_request_${status}`, details: `${args.response === "accept" ? "Accepted" : "Declined"} a friend request from user #${request.requesterId}.` });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  manageRoomBan: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), targetUserId: z.number().int().positive(), action: z.enum(["ban", "unban"]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (actor.id === args.targetUserId) return { ok: false, error: "You cannot ban yourself." };
      if (await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role) < 3) return { ok: false, error: "Room administrator, owner, or system administrator access required." };
      const db = ctx.db<typeof schema>();
      const [room, actorMembership, target, targetMembership] = await Promise.all([
        db.select({ ownerId: schema.rooms.createdBy }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get(),
        db.select({ roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, actor.id), eq(schema.memberships.state, "active"))).get(),
        db.select({ id: schema.users.id, name: schema.users.name, displayName: schema.users.displayName, role: schema.users.role }).from(schema.users).where(eq(schema.users.id, args.targetUserId)).get(),
        db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, args.targetUserId))).get(),
      ]);
      if (!room || !actorMembership) return { ok: false, error: "Join the room before managing its ban list." };
      if (!target) return { ok: false, error: "User not found." };
      if (args.action === "unban") {
        await db.delete(schema.roomBans).where(and(eq(schema.roomBans.roomId, args.roomId), eq(schema.roomBans.userId, target.id)));
        await logActivity(ctx, { userId: actor.id, actorName: actor.displayName ?? actor.name, roomId: args.roomId, action: "room_user_unbanned", details: `Unbanned ${target.displayName ?? target.name}.` });
        ctx.invalidateQueries();
        return { ok: true };
      }
      if (!targetMembership || targetMembership.state !== "active") return { ok: false, error: "That person is no longer in the room." };
      const actorTier = effectiveRoomTier(actor.role, room.ownerId === actor.id, actorMembership.roomTier);
      const targetTier = effectiveRoomTier(target.role, room.ownerId === target.id, targetMembership.roomTier);
      const actorRank = MUTE_RANK_ORDER.indexOf(actorTier);
      const targetRank = MUTE_RANK_ORDER.indexOf(targetTier);
      if (actorRank < 0 || targetRank <= actorRank) return { ok: false, error: "You can only ban someone below your room rank." };
      const existingBan = await db.select({ id: schema.roomBans.id }).from(schema.roomBans).where(and(eq(schema.roomBans.roomId, args.roomId), eq(schema.roomBans.userId, target.id))).get();
      if (!existingBan) {
        await db.batch([
          db.insert(schema.roomBans).values({ roomId: args.roomId, userId: target.id, bannedBy: actor.id, createdAt: new Date() }),
          db.update(schema.memberships).set({ state: "kicked", muted: false, voiceActive: false }).where(eq(schema.memberships.id, targetMembership.id)),
          db.delete(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), eq(schema.micQueue.userId, target.id))),
        ]);
      } else {
        await db.batch([
          db.update(schema.memberships).set({ state: "kicked", muted: false, voiceActive: false }).where(eq(schema.memberships.id, targetMembership.id)),
          db.delete(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), eq(schema.micQueue.userId, target.id))),
        ]);
      }
      await removeVoiceSession(ctx, args.roomId, target.id);
      await logActivity(ctx, { userId: actor.id, actorName: actor.displayName ?? actor.name, roomId: args.roomId, action: "room_user_banned", details: `Banned ${target.displayName ?? target.name} from the room.` });
      await reconcileMicQueue(ctx, args.roomId);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  moderateUser: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), targetUserId: z.number().int().positive(), action: z.enum(["mute", "unmute", "kick"]) }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (actor.id === args.targetUserId) return { ok: false, error: "Use the room controls for your own microphone or leave the room." };
      const db = ctx.db<typeof schema>();
      const [target, member, actorMembership, room] = await Promise.all([
        db.select().from(schema.users).where(eq(schema.users.id, args.targetUserId)).get(),
        db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, args.targetUserId), eq(schema.memberships.state, "active"))).get(),
        db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, actor.id), eq(schema.memberships.state, "active"))).get(),
        db.select({ ownerId: schema.rooms.createdBy }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get(),
      ]);
      if (!actorMembership) return { ok: false, error: "Join the room before moderating someone." };
      if (!target || !member || !room) return { ok: false, error: "That person is no longer in the room." };
      const actorTier = effectiveRoomTier(actor.role, room.ownerId === actor.id, actorMembership.roomTier);
      const targetTier = effectiveRoomTier(target.role, room.ownerId === target.id, member.roomTier);
      if (args.action === "mute" || args.action === "unmute") {
        if (!mayMuteTier(actorTier, targetTier)) return { ok: false, error: "Only a higher-ranked collaborator, room administrator, owner, or system administrator can mute or unmute this person." };
      } else {
        const ownerPowers = await hasRoomAdminPowers(ctx, args.roomId, actor.id, actor.role);
        const actorModeratorLevel = await roomModeratorLevel(ctx, args.roomId, actor.id, actor.role);
        if (actorModeratorLevel < 1) return { ok: false, error: "Collaborator, room administrator, or owner access required." };
        const effectiveActorRole = isPlatformAdmin(actor.role) ? actor.role : ownerPowers ? "admin" : "moderator";
        const effectiveTargetRole = isPlatformAdmin(target.role) ? target.role : moderatorLevelForTier(member.roomTier) > 0 ? "moderator" : "user";
        if (!mayManage(effectiveActorRole, effectiveTargetRole)) return { ok: false, error: "You cannot moderate this person." };
      }
      if (args.action === "kick") {
        await db.update(schema.memberships).set({ state: "kicked", muted: false, voiceActive: false }).where(eq(schema.memberships.id, member.id));
        await db.delete(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), eq(schema.micQueue.userId, target.id)));
        await removeVoiceSession(ctx, args.roomId, target.id);
        await addEvent(ctx, args.roomId, `${actor.name} removed ${target.name}.`, actor.id, "kick");
      } else {
        const muted = args.action === "mute";
        await db.update(schema.memberships).set({ muted, voiceActive: muted ? false : member.voiceActive }).where(eq(schema.memberships.id, member.id));
        if (muted) {
          await db.delete(schema.micQueue).where(and(eq(schema.micQueue.roomId, args.roomId), eq(schema.micQueue.userId, target.id)));
          await removeVoiceSession(ctx, args.roomId, target.id);
        }
        await addEvent(ctx, args.roomId, `${actor.name} ${muted ? "muted" : "unmuted"} ${target.name}.`, actor.id, muted ? "mute" : "unmute");
      }
      await reconcileMicQueue(ctx, args.roomId);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  changeRole: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), targetUserId: z.number().int().positive(), direction: z.enum(["promote", "demote"]), targetTier: storedRoomTierSchema.optional() }),
    response: doneSchema,
    async handler(ctx, args) {
      const actor = await authenticated(ctx, args.token);
      if (!actor) return { ok: false, error: "Session expired." };
      if (actor.id === args.targetUserId) return { ok: false, error: "You cannot change your own room tier." };
      const db = ctx.db<typeof schema>();
      const [actorMembership, targetMembership, target, room] = await Promise.all([
        db.select({ roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, actor.id), eq(schema.memberships.state, "active"))).get(),
        db.select({ id: schema.memberships.id, roomTier: schema.memberships.roomTier }).from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, args.targetUserId), eq(schema.memberships.state, "active"))).get(),
        db.select({ id: schema.users.id, name: schema.users.name, role: schema.users.role }).from(schema.users).where(eq(schema.users.id, args.targetUserId)).get(),
        db.select({ id: schema.rooms.id, ownerId: schema.rooms.createdBy }).from(schema.rooms).where(eq(schema.rooms.id, args.roomId)).get(),
      ]);
      if (!actorMembership) return { ok: false, error: "Join the room before managing tiers." };
      if (!targetMembership || !target || !room) return { ok: false, error: "That person is no longer in the room." };
      if (room.ownerId === target.id) return { ok: false, error: "The room owner remains the sole owner and cannot be assigned another room tier." };

      const actorIsSuperAdmin = actor.role === "superadmin";
      if (args.targetTier === "blackshirt") {
        if (args.direction !== "promote") return { ok: false, error: "Black shirt status must be assigned as a promotion." };
        if (!actorIsSuperAdmin) return { ok: false, error: "Only the Super Admin can assign black shirt status." };
        if (target.role === "superadmin") return { ok: false, error: "Another Super Admin cannot be assigned black shirt status." };
        if (targetMembership.roomTier === "blackshirt") return { ok: false, error: "This person already has black shirt status in this room." };
        await db.update(schema.memberships).set({ roomTier: "blackshirt", moderatorLevel: 3 }).where(eq(schema.memberships.id, targetMembership.id));
        await addEvent(ctx, args.roomId, `${actor.name} promoted ${target.name} to black shirt status.`, actor.id, "promote");
        ctx.invalidateQueries();
        return { ok: true };
      }

      if (targetMembership.roomTier === "blackshirt") {
        if (!actorIsSuperAdmin) return { ok: false, error: "Only the Super Admin can remove black shirt status." };
        if (args.direction !== "demote" || args.targetTier) return { ok: false, error: "Black shirt status can only be demoted to Room administrator." };
        await db.update(schema.memberships).set({ roomTier: "mod3", moderatorLevel: 3 }).where(eq(schema.memberships.id, targetMembership.id));
        await addEvent(ctx, args.roomId, `${actor.name} removed black shirt status from ${target.name}.`, actor.id, "demote");
        ctx.invalidateQueries();
        return { ok: true };
      }

      if (isPlatformAdmin(target.role)) return { ok: false, error: "Administrators are outside the standard room tier ladder." };

      const actorHasFullPower = isPlatformAdmin(actor.role) || room.ownerId === actor.id || actorMembership.roomTier === "blackshirt";
      const actorIsMod3 = actorMembership.roomTier === "mod3" && room.ownerId !== actor.id && !isPlatformAdmin(actor.role);
      if (!actorHasFullPower && !actorIsMod3) return { ok: false, error: "Only a room administrator, black shirt, owner, or system administrator can change room tiers." };

      const currentIndex = TIER_ORDER.indexOf(targetMembership.roomTier);
      if (currentIndex < 0) return { ok: false, error: "This room tier could not be changed." };
      if (actorIsMod3 && targetMembership.roomTier === "mod3") return { ok: false, error: "A room administrator cannot change another room administrator or the owner." };

      if (args.direction === "demote") {
        if (args.targetTier) return { ok: false, error: "Demotion moves down one tier at a time." };
        if (currentIndex === 0) return { ok: false, error: "Visitor is already the lowest room tier." };
        const nextTier = TIER_ORDER[currentIndex - 1];
        if (!nextTier) return { ok: false, error: "This room tier could not be changed." };
        await db.update(schema.memberships).set({ roomTier: nextTier, moderatorLevel: moderatorLevelForTier(nextTier) }).where(eq(schema.memberships.id, targetMembership.id));
        await addEvent(ctx, args.roomId, `${actor.name} demoted ${target.name} to ${roomTierName(nextTier)}.`, actor.id, "demote");
      } else {
        if (!args.targetTier) return { ok: false, error: "Choose the tier to promote this person to." };
        const targetIndex = TIER_ORDER.indexOf(args.targetTier);
        if (targetIndex <= currentIndex) return { ok: false, error: "Promotion must move to a higher room tier." };
        const highestAllowed = actorIsMod3 ? TIER_ORDER.indexOf("mod1") : TIER_ORDER.indexOf("mod3");
        if (targetIndex > highestAllowed) return { ok: false, error: actorIsMod3 ? "A room administrator can promote only up to Collaborator." : "The highest assignable tier is Room administrator." };
        await db.update(schema.memberships).set({ roomTier: args.targetTier, moderatorLevel: moderatorLevelForTier(args.targetTier) }).where(eq(schema.memberships.id, targetMembership.id));
        await addEvent(ctx, args.roomId, `${actor.name} promoted ${target.name} to ${roomTierName(args.targetTier)}.`, actor.id, "promote");
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  sendSignal: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive(), toUserId: z.number().int().positive(), kind: z.enum(["offer", "answer", "ice"]), payload: z.string().max(20000) }),
    response: doneSchema,
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, error: "Session expired." };
      const db = ctx.db<typeof schema>();
      const member = await db.select().from(schema.memberships).where(and(eq(schema.memberships.roomId, args.roomId), eq(schema.memberships.userId, me.id), eq(schema.memberships.state, "active"))).get();
      // Listeners also need to return WebRTC answers and ICE candidates. Mic
      // permission controls whether their connection has an outgoing audio
      // track; signaling itself must remain available to every room member.
      if (!member) return { ok: false, error: "Join the room before connecting audio." };
      await db.insert(schema.signals).values({ roomId: args.roomId, fromUserId: me.id, toUserId: args.toUserId, kind: args.kind, payload: args.payload });
      return { ok: true };
    },
  }),

  pollSignals: defineAction({
    request: z.object({ token: z.string(), roomId: z.number().int().positive() }),
    response: z.object({ ok: z.boolean(), signals: z.array(z.object({ id: z.number(), fromUserId: z.number(), kind: z.enum(["offer", "answer", "ice"]), payload: z.string() })) }),
    async handler(ctx, args) {
      const me = await authenticated(ctx, args.token);
      if (!me) return { ok: false, signals: [] };
      const db = ctx.db<typeof schema>();
      const rows = await db.select({ id: schema.signals.id, fromUserId: schema.signals.fromUserId, kind: schema.signals.kind, payload: schema.signals.payload }).from(schema.signals)
        .where(and(eq(schema.signals.roomId, args.roomId), eq(schema.signals.toUserId, me.id))).orderBy(asc(schema.signals.id)).limit(100);
      const last = rows.at(-1);
      if (last) await db.delete(schema.signals).where(and(eq(schema.signals.roomId, args.roomId), eq(schema.signals.toUserId, me.id), lte(schema.signals.id, last.id)));
      return { ok: true, signals: rows };
    },
  }),
} satisfies ActionsModule;
