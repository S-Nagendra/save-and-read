import { Article } from "@/core/models/Article";
import { ArticleRepository } from "./ArticleRepository";
import { getDatabase } from "@/core/database";
import { SQLiteOutboxRepository } from "./SQLiteOutboxRepository";
import { downloadArticleContent } from "@/core/services/DownloadService";
import { generateId } from "@/shared/utils";
import { fetchArticles } from "@/mock";

export class SQLiteArticleRepository implements ArticleRepository {
  private outboxRepository = new SQLiteOutboxRepository();

  async getFeed(): Promise<Article[]> {
    const db = await getDatabase();

    const rows = await db.getAllAsync<any>(
      `
      SELECT *
      FROM articles
      ORDER BY created_at DESC
      `,
    );

    return rows.map((row) => this.mapToArticle(row));
  }

  async getArticle(id: string): Promise<Article | null> {
    const db = await getDatabase();

    const result = await db.getFirstAsync<Article>(
      `
      SELECT *
      FROM articles
      WHERE id = ?
      `,
      [id],
    );

    if (!result) {
      return null;
    }

    return this.mapToArticle(result);
  }

  async saveArticle(id: string): Promise<void> {
    const db = await getDatabase();

    const now = new Date().toISOString();

    await db.runAsync(
      `
      UPDATE articles
      SET 
        is_saved = 1,
        sync_status = 'pending',
        updated_at = ?
      WHERE id = ?
      `,
      [now, id],
    );

    await this.outboxRepository.add({
      id: generateId(),
      articleId: id,
      action: "SAVE_ARTICLE",
      createdAt: now,
    });
  }

  async unsaveArticle(id: string): Promise<void> {
    const db = await getDatabase();

    const now = new Date().toISOString();

    await db.runAsync(
      `
      UPDATE articles
      SET 
        is_saved = 0,
        sync_status = 'pending',
        updated_at = ?
      WHERE id = ?
      `,
      [now, id],
    );

    await this.outboxRepository.add({
      id: generateId(),
      articleId: id,
      action: "UNSAVE_ARTICLE",
      createdAt: now,
    });
  }

  async markAsRead(id: string): Promise<void> {
    const db = await getDatabase();

    const now = new Date().toISOString();

    await db.runAsync(
      `
    UPDATE articles
    SET
      is_read = 1,
      sync_status = 'pending',
      updated_at = ?
    WHERE id = ?
    `,
      [now, id],
    );

    await this.outboxRepository.add({
      id: generateId(),
      articleId: id,
      action: "MARK_READ",
      createdAt: now,
    });
  }

  async markAsUnread(id: string): Promise<void> {
    const db = await getDatabase();

    const now = new Date().toISOString();

    await db.runAsync(
      `
    UPDATE articles
    SET
      is_read = 0,
      sync_status = 'pending',
      updated_at = ?
    WHERE id = ?
    `,
      [now, id],
    );

    await this.outboxRepository.add({
      id: generateId(),
      articleId: id,
      action: "MARK_UNREAD",
      createdAt: now,
    });
  }

  async downloadArticle(id: string): Promise<void> {
    const db = await getDatabase();

    const article = await this.getArticle(id);

    if (!article) {
      throw new Error("Article not found");
    }

    const downloadedArticle = await downloadArticleContent(article);

    console.log(downloadedArticle.localImagePath);
    
    await db.runAsync(
      `
    UPDATE articles

    SET
      local_image_path = ?,
      is_downloaded = ?,
      updated_at = ?

    WHERE id = ?
    `,
      [
        downloadedArticle.localImagePath ?? null,
        downloadedArticle.isDownloaded ? 1 : 0,
        downloadedArticle.updatedAt,
        id,
      ],
    );
  }

  async refreshFeed(): Promise<void> {
    const remoteArticles = await fetchArticles();

    const db = await getDatabase();

    for (const article of remoteArticles) {
      await db.runAsync(
        `
        INSERT INTO articles
        (
          id,
          title,
          summary,
          body,
          image_url,
          local_image_path,
          created_at,
          updated_at,
          is_saved,
          is_read,
          is_downloaded,
          version,
          sync_status
        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        ON CONFLICT(id)
        DO UPDATE SET

          title = excluded.title,
          summary = excluded.summary,
          body = excluded.body,
          image_url = excluded.image_url,
          updated_at = excluded.updated_at,
          version = excluded.version,
          sync_status = excluded.sync_status
        `,
        [
          article.id,
          article.title,
          article.summary,
          article.body ?? null,
          article.imageUrl,
          article.localImagePath ?? null,
          article.createdAt,
          article.updatedAt,
          article.isSaved ? 1 : 0,
          article.isRead ? 1 : 0,
          article.isDownloaded ? 1 : 0,
          article.version,
          article.syncStatus,
        ],
      );
    }

    this.debugArticles();
  }

  private mapToArticle(row: any): Article {
    return {
      id: row.id,
      title: row.title,
      summary: row.summary,
      body: row.body,
      imageUrl: row.image_url,
      localImagePath: row.local_image_path,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      isSaved: Boolean(row.is_saved),
      isRead: Boolean(row.is_read),
      isDownloaded: Boolean(row.is_downloaded),
      version: row.version,
      syncStatus: row.sync_status,
    };
  }

  async updateSyncStatus(ids: string[]): Promise<void> {
    const db = await getDatabase();

    for (const id of ids) {
      await db.runAsync(
        `
    UPDATE articles
    SET
      sync_status = 'synced'
    WHERE id = ?
    `,
        [id],
      );
    }
  }

  async debugArticles() {
    const db = await getDatabase();

    const rows = await db.getAllAsync("SELECT * FROM articles");

    console.log("SQLite Articles:", rows);
  }
}
