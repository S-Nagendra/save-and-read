import * as SQLite from "expo-sqlite";

import {
  CREATE_ARTICLES_TABLE,
  CREATE_PENDING_ACTIONS_TABLE,
  CREATE_SYNC_METADATA_TABLE,
} from "./schema";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync("save-and-read.db");

  await database.execAsync(CREATE_ARTICLES_TABLE);
  await database.execAsync(CREATE_PENDING_ACTIONS_TABLE);
  await database.execAsync(CREATE_SYNC_METADATA_TABLE);

  return database;
}
