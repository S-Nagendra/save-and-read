import { bootstrap, syncCoordinator } from "@/app/bootstrap";
import { store } from "@/app/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "@/app/navigation";

export default function App() {
  useEffect(() => {
    bootstrap();

    return () => {
      syncCoordinator.stop();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
