import * as SQLite from "expo-sqlite";

import {
  CREATE_ARTICLES_TABLE,
  CREATE_PENDING_ACTIONS_TABLE,
  CREATE_SYNC_METADATA_TABLE,
} from "./schema";
import { runMigrations } from "./migrationRunner";

let database: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase() {
  if (!database) {
    database = initializeDatabase();
  }

  return database;
}

async function initializeDatabase() {
  const db = await SQLite.openDatabaseAsync("save-and-read.db");

  await db.execAsync(CREATE_ARTICLES_TABLE);

  await db.execAsync(CREATE_PENDING_ACTIONS_TABLE);

  await db.execAsync(CREATE_SYNC_METADATA_TABLE);

  await runMigrations(db);

  console.log("Database ready");

  return db;
}
