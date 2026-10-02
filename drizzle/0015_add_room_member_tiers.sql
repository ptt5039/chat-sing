ALTER TABLE `memberships` ADD `room_tier` text NOT NULL DEFAULT 'visitor';
--> statement-breakpoint
UPDATE `memberships`
SET `room_tier` = CASE
  WHEN `moderator_level` = 3 THEN 'mod3'
  WHEN `moderator_level` = 2 THEN 'mod2'
  WHEN `moderator_level` = 1 THEN 'mod1'
  ELSE 'member'
END;
