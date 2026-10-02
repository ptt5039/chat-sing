ALTER TABLE `rooms` ADD COLUMN `mic_mode` text NOT NULL DEFAULT 'queue' CHECK (`mic_mode` IN ('free', 'queue'));
