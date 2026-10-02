CREATE TABLE `karaoke_selections` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `room_id` integer NOT NULL,
  `selected_by` integer NOT NULL,
  `source_url` text NOT NULL,
  `video_id` text NOT NULL,
  `title` text NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`selected_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `karaoke_room_idx` ON `karaoke_selections` (`room_id`);
