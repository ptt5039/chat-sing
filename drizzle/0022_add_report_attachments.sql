CREATE TABLE `report_attachments` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `report_id` integer NOT NULL,
  `blob_key` text NOT NULL,
  `file_name` text NOT NULL,
  `mime_type` text NOT NULL,
  `size_bytes` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `report_attachments_report_idx` ON `report_attachments` (`report_id`);
