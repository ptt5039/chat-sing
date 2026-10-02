ALTER TABLE `users` ADD `credit_balance` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `users` ADD `credit_online_ms` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `users` ADD `credit_last_seen_at` integer;
--> statement-breakpoint
CREATE TABLE `credit_gifts` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `room_id` integer NOT NULL,
  `singer_user_id` integer NOT NULL,
  `giver_user_id` integer NOT NULL,
  `amount` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`singer_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`giver_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `credit_gifts_room_singer_idx` ON `credit_gifts` (`room_id`,`singer_user_id`);