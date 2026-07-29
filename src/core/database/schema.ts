import { SQLiteDatabase } from "expo-sqlite";

export const CREATE_ARTICLES_TABLE = `
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,

  title TEXT NOT NULL,

  summary TEXT,

  body TEXT,

  image_url TEXT,

  local_image_path TEXT,
 
  is_saved INTEGER DEFAULT 0,

  is_read INTEGER DEFAULT 0,

  is_downloaded INTEGER DEFAULT 0,

  created_at TEXT NOT NULL,

  updated_at TEXT NOT NULL,

  version INTEGER DEFAULT 1,

  sync_status TEXT DEFAULT 'synced'
);
`;

export const CREATE_PENDING_ACTIONS_TABLE = `
CREATE TABLE IF NOT EXISTS pending_actions (
  id TEXT PRIMARY KEY,

  article_id TEXT NOT NULL,

  action TEXT NOT NULL,

  payload TEXT,

  created_at TEXT NOT NULL
);
`;

export const CREATE_SYNC_METADATA_TABLE = `
CREATE TABLE IF NOT EXISTS sync_metadata (
  key TEXT PRIMARY KEY,

  value TEXT
);
`;

export async function createMigrationTable(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);
}
