import { SQLiteDatabase } from "expo-sqlite";
import { migrations } from "./migrations";

export async function runMigrations(db: SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);

  const applied = await db.getAllAsync<{ id: string }>(
    `
    SELECT id
    FROM schema_migrations
    `,
  );

  const appliedIds = new Set(applied.map((item) => item.id));

  for (const migration of migrations) {
    if (!appliedIds.has(migration.id)) {
      console.log("Running migration:", migration.id);

      await migration.run(db);

      await db.runAsync(
        `
        INSERT INTO schema_migrations
        (
          id,
          applied_at
        )
        VALUES (?, ?)
        `,
        [migration.id, new Date().toISOString()],
      );

      console.log("Migration completed:", migration.id);
    }
  }
}
