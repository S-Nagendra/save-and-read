import { bootstrap } from "@/app/bootstrap";
import { store } from "@/app/store";
import { FeedScreen } from "@/features/articles";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

export default function App() {
  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <FeedScreen />
      </Provider>
    </SafeAreaProvider>
  );
}
