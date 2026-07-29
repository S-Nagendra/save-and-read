import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { ArticleDetailScreen, FeedScreen } from "@/features/articles";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />

        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetailScreen}
          options={{
            title: "Article",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
