ALTER TABLE `rooms` ADD `chat_background_image_fit` text DEFAULT 'contain' NOT NULL;
--> statement-breakpoint
ALTER TABLE `rooms` ADD `chat_background_fade` integer DEFAULT 75 NOT NULL;
