CREATE TABLE `site_settings` (
  `id` integer PRIMARY KEY NOT NULL,
  `buy_credits_enabled` integer DEFAULT true NOT NULL,
  `updated_by` integer,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `site_settings` (`id`, `buy_credits_enabled`, `updated_at`) VALUES (1, true, unixepoch() * 1000);
