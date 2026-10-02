ALTER TABLE `memberships` ADD `moderator_level` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
UPDATE `memberships` SET `moderator_level` = 3 WHERE `user_id` IN (SELECT `id` FROM `users` WHERE `role` = 'moderator');
--> statement-breakpoint
UPDATE `users` SET `role` = 'user', `updated_at` = unixepoch() * 1000 WHERE `role` = 'moderator';
