CREATE TABLE `room_hearts` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `room_id` integer NOT NULL,
  `singer_user_id` integer NOT NULL,
  `giver_user_id` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`singer_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`giver_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `room_hearts_room_singer_idx` ON `room_hearts` (`room_id`,`singer_user_id`);
--> statement-breakpoint
CREATE INDEX `room_hearts_room_giver_created_idx` ON `room_hearts` (`room_id`,`giver_user_id`,`created_at`);
