ALTER TABLE `users` ADD `email` text;
--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);
--> statement-breakpoint
CREATE TABLE `auth_codes` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` integer NOT NULL,
  `purpose` text NOT NULL,
  `code_hash` text NOT NULL,
  `expires_at` integer NOT NULL,
  `used_at` integer,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `auth_codes_user_purpose_idx` ON `auth_codes` (`user_id`, `purpose`);
