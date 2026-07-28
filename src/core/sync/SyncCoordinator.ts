import { NetworkManager } from "@/core/network/NetworkManager";
import { SyncEngine } from "./SyncEngine";

export class SyncCoordinator {
  private network = new NetworkManager();

  private syncEngine = new SyncEngine();

  start() {
    this.network.subscribe(async (isConnected) => {
      if (isConnected) {
        await this.syncEngine.sync();
      }
    });
  }

  stop() {
    this.network.destroy();
  }
}
