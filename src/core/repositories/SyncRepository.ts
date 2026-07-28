import { PendingAction } from "@/core/models/PendingAction";

export interface SyncRepository {
  getPendingActions(): Promise<PendingAction[]>;

  completeAction(id: string): Promise<void>;
}
