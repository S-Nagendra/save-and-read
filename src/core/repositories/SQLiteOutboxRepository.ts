import { getDatabase } from "@/core/database";
import { PendingAction } from "@/core/models/PendingAction";
import { OutboxRepository } from "./OutboxRepository";

export class SQLiteOutboxRepository implements OutboxRepository {
  async add(action: PendingAction): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      INSERT INTO pending_actions
      (
        id,
        article_id,
        action,
        payload,
        created_at
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        action.id,
        action.articleId,
        action.action,
        action.payload ?? null,
        action.createdAt,
      ],
    );
  }

  async getPendingActions(): Promise<PendingAction[]> {
    const db = await getDatabase();

    const rows = await db.getAllAsync<any>(
      `
        SELECT *
        FROM pending_actions
        ORDER BY created_at ASC
        `,
    );

    return rows.map((row) => ({
      id: row.id,

      articleId: row.article_id,

      action: row.action,

      payload: row.payload,

      createdAt: row.created_at,
    }));
  }

  async remove(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      DELETE FROM pending_actions
      WHERE id = ?
      `,
      [id],
    );
  }

  async clear(): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      DELETE FROM pending_actions
      `,
    );
  }
}
