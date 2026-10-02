CREATE TABLE `reports` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `reporter_id` integer NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `target_type` text NOT NULL CHECK (`target_type` IN ('user','room')),
  `target_user_id` integer REFERENCES `users`(`id`) ON DELETE SET NULL,
  `target_room_id` integer REFERENCES `rooms`(`id`) ON DELETE SET NULL,
  `category` text NOT NULL CHECK (`category` IN ('harassment','hate','spam','sexual','violence','impersonation','other')),
  `details` text NOT NULL,
  `status` text NOT NULL DEFAULT 'open' CHECK (`status` IN ('open','reviewing','resolved','dismissed')),
  `reviewed_by` integer REFERENCES `users`(`id`) ON DELETE SET NULL,
  `review_note` text,
  `reviewed_at` integer,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `reports_status_created_idx` ON `reports` (`status`, `created_at`);
--> statement-breakpoint
CREATE TABLE `support_requests` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` integer NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `subject` text NOT NULL,
  `details` text NOT NULL,
  `status` text NOT NULL DEFAULT 'open' CHECK (`status` IN ('open','accepted','resolved','dismissed')),
  `assigned_to` integer REFERENCES `users`(`id`) ON DELETE SET NULL,
  `reviewed_by` integer REFERENCES `users`(`id`) ON DELETE SET NULL,
  `review_note` text,
  `reviewed_at` integer,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `support_requests_status_created_idx` ON `support_requests` (`status`, `created_at`);
--> statement-breakpoint
CREATE TABLE `support_messages` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `support_request_id` integer NOT NULL REFERENCES `support_requests`(`id`) ON DELETE CASCADE,
  `sender_id` integer NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `body` text NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `support_messages_ticket_created_idx` ON `support_messages` (`support_request_id`, `created_at`);