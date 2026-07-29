export interface Article {
  id: string;

  title: string;

  summary: string;

  body?: string;

  imageUrl: string;

  localImagePath?: string;

  isSaved: boolean;

  isRead: boolean;

  isDownloaded: boolean;

  createdAt: string;

  updatedAt: string;

  // version helps with conflict resolution
  version: number;

  syncStatus: "synced" | "pending";
}
