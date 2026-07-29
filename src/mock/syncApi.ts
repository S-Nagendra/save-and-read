import { PendingAction } from "@/core/models/PendingAction";

export async function syncActions(actions: PendingAction[]): Promise<PendingAction[]> {
  // simulate network delay

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Syncing actions:", actions);

  // Assume all actions synced successfully

  return actions;
}
