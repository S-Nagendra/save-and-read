import { Article } from "@/core/models/Article";

export interface ArticleRepository {
  /**
   * Returns the feed.
   */
  getFeed(): Promise<Article[]>;

  /**
   * Returns a single article.
   */
  getArticle(id: string): Promise<Article | null>;

  /**
   * Save article.
   */
  saveArticle(id: string): Promise<void>;

  /**
   * Remove saved article.
   */
  unsaveArticle(id: string): Promise<void>;

  /**
   * Mark article as read.
   */
  markAsRead(id: string): Promise<void>;

  /**
   * Mark article as unread.
   */
  markAsUnread(id: string): Promise<void>;

  /**
   * Download article for offline reading.
   */
  downloadArticle(id: string): Promise<void>;

  /**
   * Refresh feed from remote source.
   */
  refreshFeed(): Promise<void>;
}
