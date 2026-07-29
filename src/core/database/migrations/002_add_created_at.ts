import { SQLiteDatabase } from "expo-sqlite";

export async function migration002(db: SQLiteDatabase) {
  await db.execAsync(`
    ALTER TABLE articles
    ADD COLUMN created_at TEXT;
  `);

  await db.execAsync(`
    UPDATE articles
    SET created_at = updated_at
    WHERE created_at IS NULL;
  `);
}