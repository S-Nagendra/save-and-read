import { SyncCoordinator } from "@/core/sync/SyncCoordinator";

export const syncCoordinator = new SyncCoordinator();

export function bootstrap() {
  syncCoordinator.start();
}
