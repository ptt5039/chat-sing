CREATE TABLE `room_bans` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `room_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `banned_by` integer,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`banned_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `room_bans_room_user_idx` ON `room_bans` (`room_id`,`user_id`);
--> statement-breakpoint
CREATE INDEX `room_bans_room_created_idx` ON `room_bans` (`room_id`,`created_at`);
--> statement-breakpoint
CREATE TABLE `friendships` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `requester_id` integer NOT NULL,
  `addressee_id` integer NOT NULL,
  `status` text DEFAULT 'pending' NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`requester_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`addressee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friendships_requester_addressee_idx` ON `friendships` (`requester_id`,`addressee_id`);
--> statement-breakpoint
CREATE INDEX `friendships_addressee_status_idx` ON `friendships` (`addressee_id`,`status`);
--> statement-breakpoint
CREATE INDEX `friendships_requester_status_idx` ON `friendships` (`requester_id`,`status`);