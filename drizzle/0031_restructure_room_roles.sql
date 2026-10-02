UPDATE memberships
SET moderator_level = CASE room_tier
  WHEN 'mod1' THEN 1
  WHEN 'mod3' THEN 3
  WHEN 'blackshirt' THEN 3
  ELSE 0
END;
