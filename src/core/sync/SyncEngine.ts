import { SQLiteOutboxRepository } from "@/core/repositories";

import { syncActions } from "@/mock";

export class SyncEngine {
  private outbox = new SQLiteOutboxRepository();

  async sync(): Promise<void> {
    const actions = await this.outbox.getPendingActions();

    if (actions.length === 0) {
      return;
    }

    const completedIds = await syncActions(actions);

    for (const id of completedIds) {
      await this.outbox.remove(id);
    }
  }
}
