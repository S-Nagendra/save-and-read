import { NetworkManager } from "@/core/network/NetworkManager";
import { SyncEngine } from "./SyncEngine";

export class SyncCoordinator {
  private network = new NetworkManager();

  private syncEngine = new SyncEngine();

  start() {
    console.log("Sync coordinator started");

    this.network.subscribe(async (isConnected) => {
      console.log("Network status:", isConnected);
      if (isConnected) {
        await this.syncEngine.sync();
      }
    });
  }

  stop() {
    console.log("Sync coordinator stopped");
    this.network.destroy();
  }
}
