import { bootstrap } from "@/app/bootstrap";
import { store } from "@/app/store";
import { FeedScreen } from "@/features/articles";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App() {
  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <Provider store={store}>
      <FeedScreen />
    </Provider>
  );
}
