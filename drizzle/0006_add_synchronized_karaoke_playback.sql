ALTER TABLE `karaoke_selections` ADD `playing` integer NOT NULL DEFAULT 1;
--> statement-breakpoint
ALTER TABLE `karaoke_selections` ADD `position_seconds` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `karaoke_selections` ADD `playback_updated_at` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
UPDATE `karaoke_selections` SET `playback_updated_at` = `updated_at`;
