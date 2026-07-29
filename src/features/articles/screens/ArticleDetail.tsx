import { Text, Image, ScrollView, Button } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { downloadArticle } from "../articleThunks";
import { getArticleImageUri } from "@/shared/utils";

type ArticleDetailRoute = RouteProp<RootStackParamList, "ArticleDetail">;

export function ArticleDetailScreen() {
  const route = useRoute<ArticleDetailRoute>();
  const { articleId } = route.params;

  const dispatch = useAppDispatch();

  const article = useAppSelector((state: RootState) =>
    state.articles.items.find((a) => a.id === articleId),
  );

  if (!article) {
    return <Text>Article not found</Text>;
  }

  return (
    <ScrollView>
      <Image
        source={{
          uri: getArticleImageUri(article),
        }}
        style={{
          width: "100%",
          height: 220,
        }}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginVertical: 16,
        }}
      >
        {article.title}
      </Text>

      <Text>{article.body}</Text>
      <Button
        title={article.isDownloaded ? "Downloaded" : "Download for Offline"}
        disabled={article.isDownloaded}
        onPress={() => dispatch(downloadArticle(article.id))}
      />
    </ScrollView>
  );
}
