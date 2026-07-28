import { Article } from "@/core/models/Article";
import { ArticleRepository } from "./ArticleRepository";
import { getDatabase } from "@/core/database";
import { fetchArticles } from "@/mock";

export class SQLiteArticleRepository implements ArticleRepository {
  async getFeed(): Promise<Article[]> {
    const db = await getDatabase();

    const result = await db.getAllAsync<Article>(
      `
      SELECT *
      FROM articles
      ORDER BY updated_at DESC
      `,
    );

    return result.map(this.mapToArticle);
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

    await db.runAsync(
      `
      UPDATE articles
      SET 
        is_saved = 1,
        sync_status = 'pending',
        updated_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id],
    );
  }

  async unsaveArticle(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      UPDATE articles
      SET 
        is_saved = 0,
        sync_status = 'pending',
        updated_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id],
    );
  }

  async markAsRead(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      UPDATE articles
      SET
        is_read = 1,
        sync_status = 'pending',
        updated_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id],
    );
  }

  async markAsUnread(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      UPDATE articles
      SET
        is_read = 0,
        sync_status = 'pending',
        updated_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id],
    );
  }

  async downloadArticle(id: string): Promise<void> {
    const db = await getDatabase();

    await db.runAsync(
      `
      UPDATE articles
      SET
        is_downloaded = 1,
        updated_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id],
    );
  }

  async refreshFeed(): Promise<void> {
    const articles = await fetchArticles();

    const db = await getDatabase();

    for (const article of articles) {
      await db.runAsync(
        `
        INSERT OR REPLACE INTO articles
        (
          id,
          title,
          summary,
          body,
          image_url,
          local_image_path,
          is_saved,
          is_read,
          is_downloaded,
          updated_at,
          version,
          sync_status
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          article.id,
          article.title,
          article.summary,
          article.body ?? null,
          article.imageUrl,
          article.localImagePath ?? null,
          article.isSaved ? 1 : 0,
          article.isRead ? 1 : 0,
          article.isDownloaded ? 1 : 0,
          article.updatedAt,
          article.version,
          article.syncStatus,
        ],
      );
    }
  }

  private mapToArticle(row: any): Article {
    return {
      id: row.id,

      title: row.title,

      summary: row.summary,

      body: row.body,

      imageUrl: row.image_url,

      localImagePath: row.local_image_path,

      isSaved: Boolean(row.is_saved),

      isRead: Boolean(row.is_read),

      isDownloaded: Boolean(row.is_downloaded),

      updatedAt: row.updated_at,

      version: row.version,

      syncStatus: row.sync_status,
    };
  }
}
