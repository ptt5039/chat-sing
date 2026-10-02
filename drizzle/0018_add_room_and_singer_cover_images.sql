ALTER TABLE `rooms` ADD `profile_image_blob_key` text;
--> statement-breakpoint
ALTER TABLE `users` ADD `singer_cover_blob_key` text;
--> statement-breakpoint
CREATE TABLE `audit_logs` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` integer,
  `actor_name` text NOT NULL,
  `room_id` integer,
  `action` text NOT NULL,
  `details` text NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_logs_created_idx` ON `audit_logs` (`created_at`);
--> statement-breakpoint
CREATE INDEX `audit_logs_user_idx` ON `audit_logs` (`user_id`, `created_at`);
