DROP TABLE entries;
--> statement-breakpoint
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL COLLATE NOCASE UNIQUE,
  session_token TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'active' CHECK (state IN ('active', 'left', 'kicked')),
  muted INTEGER NOT NULL DEFAULT 0,
  voice_active INTEGER NOT NULL DEFAULT 0,
  joined_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  UNIQUE(room_id, user_id)
);
--> statement-breakpoint
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  kind TEXT NOT NULL DEFAULT 'message' CHECK (kind IN ('message', 'event')),
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE signals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  from_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('offer', 'answer', 'ice')),
  payload TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE INDEX rooms_updated_idx ON rooms(updated_at DESC);
--> statement-breakpoint
CREATE INDEX memberships_room_idx ON memberships(room_id, state, last_seen_at DESC);
--> statement-breakpoint
CREATE INDEX messages_room_idx ON messages(room_id, id DESC);
--> statement-breakpoint
CREATE INDEX signals_target_idx ON signals(to_user_id, room_id, id);
