ALTER TABLE `rooms` ADD `parent_room_id` integer REFERENCES `rooms`(`id`) ON DELETE CASCADE;
--> statement-breakpoint
CREATE INDEX `rooms_parent_idx` ON `rooms` (`parent_room_id`, `deleted_at`);
--> statement-breakpoint
ALTER TABLE `rooms` ADD `queue_paused` integer DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `mic_hold_by_user_id` integer REFERENCES `users`(`id`) ON DELETE SET NULL;
--> statement-breakpoint
ALTER TABLE `mic_queue` ADD `extra_seconds` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `users` ADD `gender` text;
