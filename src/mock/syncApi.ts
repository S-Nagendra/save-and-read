import { PendingAction } from "@/core/models/PendingAction";

export async function syncActions(actions: PendingAction[]): Promise<string[]> {
  // simulate network delay

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Syncing actions:", actions);

  // return successfully processed IDs

  return actions.map((action) => action.id);
}
