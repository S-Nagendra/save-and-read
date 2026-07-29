import {
  SQLiteArticleRepository,
  SQLiteOutboxRepository,
} from "@/core/repositories";

import { syncActions } from "@/mock";
import { eventBus } from "../events/EventBus";

export class SyncEngine {
  private outbox = new SQLiteOutboxRepository();
  private articleRepository = new SQLiteArticleRepository();
  private isSyncing = false;

  async sync(): Promise<void> {
    if (this.isSyncing) {
      console.log("Sync already running...");
      return;
    }

    this.isSyncing = true;

    try {
      console.log("Sync started");

      const actions = await this.outbox.getPendingActions();

      if (actions.length === 0) {
        console.log("No pending actions");

        return;
      }

      console.log("Pending actions:", actions.length);

      const completedActions = await syncActions(actions);

      // Remove from outbox using pending action IDs
      for (const action of completedActions) {
        await this.outbox.remove(action.id);
      }

      // Update articles using article IDs
      await this.articleRepository.updateSyncStatus(
        completedActions.map((action) => action.articleId),
      );

      // Now reload articles from SQLite
      const articles = await this.articleRepository.getFeed();

      console.log("Articles after sync", articles);

      console.log("Sync completed");
      eventBus.emit("syncCompleted");
    } catch (error) {
      console.log("Sync failed", error);
    } finally {
      this.isSyncing = false;
    }
  }
}
