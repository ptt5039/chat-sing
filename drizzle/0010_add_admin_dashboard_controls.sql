ALTER TABLE `users` ADD `last_ip_address` text;
--> statement-breakpoint
ALTER TABLE `users` ADD `ip_last_seen_at` integer;
--> statement-breakpoint
ALTER TABLE `users` ADD `account_locked` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `users` ADD `locked_at` integer;
--> statement-breakpoint
ALTER TABLE `users` ADD `deleted_at` integer;
--> statement-breakpoint
ALTER TABLE `users` ADD `deleted_by` integer;
--> statement-breakpoint
CREATE TABLE `blocked_ips` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `ip_address` text NOT NULL,
  `blocked_by` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`blocked_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blocked_ips_address_idx` ON `blocked_ips` (`ip_address`);
--> statement-breakpoint
ALTER TABLE `rooms` ADD `level` integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `leveled_at` integer;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `locked` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `lock_reason` text;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `locked_by` integer REFERENCES users(id);
--> statement-breakpoint
ALTER TABLE `rooms` ADD `locked_at` integer;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `deleted_at` integer;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `deleted_by` integer REFERENCES users(id);