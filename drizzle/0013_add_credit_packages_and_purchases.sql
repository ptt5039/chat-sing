CREATE TABLE `credit_packages` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `credits` integer NOT NULL,
  `price_cents` integer NOT NULL,
  `active` integer NOT NULL DEFAULT 1,
  `created_by` integer NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credit_packages_credits_price_idx` ON `credit_packages` (`credits`,`price_cents`);
--> statement-breakpoint
CREATE TABLE `credit_purchases` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` integer NOT NULL,
  `package_id` integer,
  `credits` integer NOT NULL,
  `price_cents` integer NOT NULL,
  `status` text NOT NULL DEFAULT 'pending',
  `paypal_order_id` text,
  `created_at` integer NOT NULL,
  `completed_at` integer,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`package_id`) REFERENCES `credit_packages`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `credit_purchases_user_created_idx` ON `credit_purchases` (`user_id`,`created_at`);
--> statement-breakpoint
CREATE TABLE `credit_transactions` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` integer NOT NULL,
  `kind` text NOT NULL,
  `amount` integer NOT NULL,
  `related_user_id` integer,
  `room_id` integer,
  `purchase_id` integer,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (`related_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`purchase_id`) REFERENCES `credit_purchases`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `credit_transactions_user_created_idx` ON `credit_transactions` (`user_id`,`created_at`);
--> statement-breakpoint
INSERT INTO `credit_packages` (`credits`,`price_cents`,`active`,`created_by`,`created_at`,`updated_at`)
SELECT 100,99,1,`id`,CAST(strftime('%s','now') AS INTEGER) * 1000,CAST(strftime('%s','now') AS INTEGER) * 1000 FROM `users` WHERE `role` = 'admin' ORDER BY `id` LIMIT 1;
--> statement-breakpoint
INSERT INTO `credit_packages` (`credits`,`price_cents`,`active`,`created_by`,`created_at`,`updated_at`)
SELECT 500,399,1,`id`,CAST(strftime('%s','now') AS INTEGER) * 1000,CAST(strftime('%s','now') AS INTEGER) * 1000 FROM `users` WHERE `role` = 'admin' ORDER BY `id` LIMIT 1;
--> statement-breakpoint
INSERT INTO `credit_packages` (`credits`,`price_cents`,`active`,`created_by`,`created_at`,`updated_at`)
SELECT 1000,599,1,`id`,CAST(strftime('%s','now') AS INTEGER) * 1000,CAST(strftime('%s','now') AS INTEGER) * 1000 FROM `users` WHERE `role` = 'admin' ORDER BY `id` LIMIT 1;