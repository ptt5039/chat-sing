import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  displayName: text("display_name"),
  personalStatus: text("personal_status"),
  singerCoverBlobKey: text("singer_cover_blob_key"),
  email: text("email"),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  sessionToken: text("session_token").notNull().unique(),
  passwordHash: text("password_hash"),
  role: text("role", { enum: ["user", "moderator", "admin", "superadmin"] }).notNull().default("user"),
  lastIpAddress: text("last_ip_address"),
  ipLastSeenAt: integer("ip_last_seen_at", { mode: "timestamp_ms" }),
  accountLocked: integer("account_locked", { mode: "boolean" }).notNull().default(false),
  lockedAt: integer("locked_at", { mode: "timestamp_ms" }),
  deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
  deletedBy: integer("deleted_by"),
  creditBalance: integer("credit_balance").notNull().default(0),
  creditOnlineMs: integer("credit_online_ms").notNull().default(0),
  creditLastSeenAt: integer("credit_last_seen_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [
  uniqueIndex("users_name_idx").on(table.name),
  uniqueIndex("users_email_idx").on(table.email),
]);

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(),
  buyCreditsEnabled: integer("buy_credits_enabled", { mode: "boolean" }).notNull().default(true),
  updatedBy: integer("updated_by").references(() => users.id, { onDelete: "set null" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const blockedIps = sqliteTable("blocked_ips", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ipAddress: text("ip_address").notNull(),
  blockedBy: integer("blocked_by").notNull().references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [uniqueIndex("blocked_ips_address_idx").on(table.ipAddress)]);

export const authCodes = sqliteTable("auth_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  purpose: text("purpose", { enum: ["email_verification", "password_reset"] }).notNull(),
  codeHash: text("code_hash").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  usedAt: integer("used_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("auth_codes_user_purpose_idx").on(table.userId, table.purpose)]);

export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  profileImageBlobKey: text("profile_image_blob_key"),
  chatBackground: text("chat_background").notNull().default("#ffffff"),
  chatBackgroundImageBlobKey: text("chat_background_image_blob_key"),
  chatBackgroundImageFit: text("chat_background_image_fit", { enum: ["contain", "cover"] }).notNull().default("contain"),
  chatBackgroundFade: integer("chat_background_fade").notNull().default(75),
  chatBackgroundPreset: text("chat_background_preset", { enum: ["kawaii-cats", "dreamy-kitten", "pastel-clouds", "pastel-daisies"] }),
  createdBy: integer("created_by").notNull().references(() => users.id),
  defaultMicSeconds: integer("default_mic_seconds").notNull().default(300),
  micMode: text("mic_mode", { enum: ["free", "queue"] }).notNull().default("queue"),
  level: integer("level").notNull().default(1),
  leveledAt: integer("leveled_at", { mode: "timestamp_ms" }),
  passwordHash: text("password_hash"),
  locked: integer("locked", { mode: "boolean" }).notNull().default(false),
  lockReason: text("lock_reason"),
  lockedBy: integer("locked_by").references(() => users.id),
  lockedAt: integer("locked_at", { mode: "timestamp_ms" }),
  deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
  deletedBy: integer("deleted_by").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const memberships = sqliteTable("memberships", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  roomTier: text("room_tier", { enum: ["visitor", "member", "mod1", "mod2", "mod3", "blackshirt"] }).notNull().default("visitor"),
  moderatorLevel: integer("moderator_level").notNull().default(0),
  state: text("state", { enum: ["active", "left", "kicked"] }).notNull().default("active"),
  muted: integer("muted", { mode: "boolean" }).notNull().default(false),
  voiceActive: integer("voice_active", { mode: "boolean" }).notNull().default(false),
  joinedAt: integer("joined_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [
  uniqueIndex("memberships_room_user_idx").on(table.roomId, table.userId),
  index("memberships_room_tier_idx").on(table.roomId, table.roomTier, table.state),
]);

export const roomBans = sqliteTable("room_bans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  bannedBy: integer("banned_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [
  uniqueIndex("room_bans_room_user_idx").on(table.roomId, table.userId),
  index("room_bans_room_created_idx").on(table.roomId, table.createdAt),
]);

export const friendships = sqliteTable("friendships", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  requesterId: integer("requester_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  addresseeId: integer("addressee_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["pending", "accepted", "declined"] }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [
  uniqueIndex("friendships_requester_addressee_idx").on(table.requesterId, table.addresseeId),
  index("friendships_addressee_status_idx").on(table.addresseeId, table.status),
  index("friendships_requester_status_idx").on(table.requesterId, table.status),
]);

export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id"),
  actorName: text("actor_name").notNull(),
  roomId: integer("room_id"),
  action: text("action").notNull(),
  details: text("details").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [
  index("audit_logs_created_idx").on(table.createdAt),
  index("audit_logs_user_idx").on(table.userId, table.createdAt),
]);

export const reports = sqliteTable("reports", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reporterId: integer("reporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: text("target_type", { enum: ["user", "room"] }).notNull(),
  targetUserId: integer("target_user_id").references(() => users.id, { onDelete: "set null" }),
  targetRoomId: integer("target_room_id").references(() => rooms.id, { onDelete: "set null" }),
  category: text("category", { enum: ["harassment", "hate", "spam", "sexual", "violence", "impersonation", "other"] }).notNull(),
  details: text("details").notNull(),
  status: text("status", { enum: ["open", "reviewing", "resolved", "dismissed"] }).notNull().default("open"),
  reviewedBy: integer("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewNote: text("review_note"),
  reviewedAt: integer("reviewed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("reports_status_created_idx").on(table.status, table.createdAt)]);

export const reportAttachments = sqliteTable("report_attachments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reportId: integer("report_id").notNull().references(() => reports.id, { onDelete: "cascade" }),
  blobKey: text("blob_key").notNull(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("report_attachments_report_idx").on(table.reportId)]);

export const supportRequests = sqliteTable("support_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  details: text("details").notNull(),
  status: text("status", { enum: ["open", "accepted", "resolved", "dismissed"] }).notNull().default("open"),
  assignedTo: integer("assigned_to").references(() => users.id, { onDelete: "set null" }),
  reviewedBy: integer("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewNote: text("review_note"),
  reviewedAt: integer("reviewed_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("support_requests_status_created_idx").on(table.status, table.createdAt)]);

export const supportMessages = sqliteTable("support_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  supportRequestId: integer("support_request_id").notNull().references(() => supportRequests.id, { onDelete: "cascade" }),
  senderId: integer("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("support_messages_ticket_created_idx").on(table.supportRequestId, table.createdAt)]);

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  kind: text("kind", { enum: ["message", "event"] }).notNull().default("message"),
  body: text("body").notNull(),
  imageBlobKey: text("image_blob_key"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const signals = sqliteTable("signals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  fromUserId: integer("from_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  toUserId: integer("to_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  kind: text("kind", { enum: ["offer", "answer", "ice"] }).notNull(),
  payload: text("payload").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const micQueue = sqliteTable("mic_queue", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: integer("joined_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  startedAt: integer("started_at", { mode: "timestamp_ms" }),
  endsAt: integer("ends_at", { mode: "timestamp_ms" }),
}, (table) => [uniqueIndex("mic_queue_room_user_idx").on(table.roomId, table.userId)]);

export const roomHearts = sqliteTable("room_hearts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  singerUserId: integer("singer_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  giverUserId: integer("giver_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [
  index("room_hearts_room_singer_idx").on(table.roomId, table.singerUserId),
  index("room_hearts_room_giver_created_idx").on(table.roomId, table.giverUserId, table.createdAt),
]);

export const creditGifts = sqliteTable("credit_gifts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  singerUserId: integer("singer_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  giverUserId: integer("giver_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("credit_gifts_room_singer_idx").on(table.roomId, table.singerUserId)]);

export const creditPackages = sqliteTable("credit_packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  credits: integer("credits").notNull(),
  priceCents: integer("price_cents").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdBy: integer("created_by").notNull().references(() => users.id, { onDelete: "restrict" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [uniqueIndex("credit_packages_credits_price_idx").on(table.credits, table.priceCents)]);

export const creditPurchases = sqliteTable("credit_purchases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  packageId: integer("package_id").references(() => creditPackages.id, { onDelete: "set null" }),
  credits: integer("credits").notNull(),
  priceCents: integer("price_cents").notNull(),
  status: text("status", { enum: ["pending", "completed", "failed", "canceled"] }).notNull().default("pending"),
  paypalOrderId: text("paypal_order_id"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp_ms" }),
}, (table) => [index("credit_purchases_user_created_idx").on(table.userId, table.createdAt)]);

export const creditTransactions = sqliteTable("credit_transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  kind: text("kind", { enum: ["online_earned", "purchase", "gift_sent", "gift_received", "admin_grant"] }).notNull(),
  amount: integer("amount").notNull(),
  relatedUserId: integer("related_user_id").references(() => users.id, { onDelete: "set null" }),
  roomId: integer("room_id").references(() => rooms.id, { onDelete: "set null" }),
  purchaseId: integer("purchase_id").references(() => creditPurchases.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [index("credit_transactions_user_created_idx").on(table.userId, table.createdAt)]);

export const karaokeSelections = sqliteTable("karaoke_selections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }),
  selectedBy: integer("selected_by").notNull().references(() => users.id, { onDelete: "cascade" }),
  sourceUrl: text("source_url").notNull(),
  videoId: text("video_id").notNull(),
  title: text("title").notNull(),
  playing: integer("playing", { mode: "boolean" }).notNull().default(true),
  positionSeconds: integer("position_seconds").notNull().default(0),
  playbackUpdatedAt: integer("playback_updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}, (table) => [uniqueIndex("karaoke_room_idx").on(table.roomId)]);
