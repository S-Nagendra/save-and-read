import { SyncCoordinator } from "@/core/sync/SyncCoordinator";

const syncCoordinator = new SyncCoordinator();

export function bootstrap() {
  syncCoordinator.start();
}
