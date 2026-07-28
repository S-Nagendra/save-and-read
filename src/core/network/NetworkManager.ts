import NetInfo from "@react-native-community/netinfo";

type NetworkListener = (isConnected: boolean) => void;

export class NetworkManager {
  private unsubscribe?: () => void;

  subscribe(listener: NetworkListener) {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      listener(Boolean(state.isConnected));
    });
  }

  destroy() {
    this.unsubscribe?.();
  }
}
