PRAGMA foreign_keys = OFF;
--> statement-breakpoint
CREATE TABLE users_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL COLLATE NOCASE UNIQUE,
  display_name TEXT,
  email TEXT,
  email_verified INTEGER NOT NULL DEFAULT 0,
  session_token TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin', 'superadmin')),
  last_ip_address TEXT,
  ip_last_seen_at INTEGER,
  account_locked INTEGER NOT NULL DEFAULT 0,
  locked_at INTEGER,
  deleted_at INTEGER,
  deleted_by INTEGER,
  credit_balance INTEGER NOT NULL DEFAULT 0,
  credit_online_ms INTEGER NOT NULL DEFAULT 0,
  credit_last_seen_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
INSERT INTO users_new (
  id, name, display_name, email, email_verified, session_token, password_hash, role,
  last_ip_address, ip_last_seen_at, account_locked, locked_at, deleted_at, deleted_by,
  credit_balance, credit_online_ms, credit_last_seen_at, created_at, updated_at
)
SELECT
  id, name, display_name, email, email_verified, session_token, password_hash, role,
  last_ip_address, ip_last_seen_at, account_locked, locked_at, deleted_at, deleted_by,
  credit_balance, credit_online_ms, credit_last_seen_at, created_at, updated_at
FROM users;
--> statement-breakpoint
DROP TABLE users;
--> statement-breakpoint
ALTER TABLE users_new RENAME TO users;
--> statement-breakpoint
CREATE UNIQUE INDEX users_email_idx ON users(email);
--> statement-breakpoint
PRAGMA foreign_keys = ON;
