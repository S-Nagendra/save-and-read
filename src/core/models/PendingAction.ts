export type SyncAction =
  | "MARK_READ"
  | "MARK_UNREAD"
  | "SAVE_ARTICLE"
  | "UNSAVE_ARTICLE";

export interface PendingAction {
  id: string;

  articleId: string;

  action: SyncAction;

  payload?: string;

  createdAt: string;
}
