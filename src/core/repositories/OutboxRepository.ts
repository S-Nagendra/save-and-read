import { PendingAction } from "@/core/models/PendingAction";

export interface OutboxRepository {
  add(action: PendingAction): Promise<void>;

  getPendingActions(): Promise<PendingAction[]>;

  remove(id: string): Promise<void>;

  clear(): Promise<void>;
}
