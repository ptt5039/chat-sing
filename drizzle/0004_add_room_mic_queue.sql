ALTER TABLE `rooms` ADD `default_mic_seconds` integer DEFAULT 300 NOT NULL;
--> statement-breakpoint
CREATE TABLE `mic_queue` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `room_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `joined_at` integer NOT NULL,
  `started_at` integer,
  `ends_at` integer,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mic_queue_room_user_idx` ON `mic_queue` (`room_id`,`user_id`);