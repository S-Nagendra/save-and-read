import { View, Text, Pressable, StyleSheet } from "react-native";

import { Article } from "@/core/models/Article";

interface Props {
  article: Article;

  onReadToggle: (id: string) => void;

  onSaveToggle: (id: string) => void;
}

export function ArticleCard({ article, onReadToggle, onSaveToggle }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{article.title}</Text>

      <Text>{article.summary}</Text>

      <View style={styles.actions}>
        <Pressable onPress={() => onReadToggle(article.id)}>
          <Text>{article.isRead ? "Mark unread" : "Mark read"}</Text>
        </Pressable>

        <Pressable onPress={() => onSaveToggle(article.id)}>
          <Text>{article.isSaved ? "Unsave" : "Save"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,

    marginBottom: 12,

    borderRadius: 8,

    backgroundColor: "#eeeeee",
  },

  title: {
    fontSize: 18,

    fontWeight: "600",

    marginBottom: 8,
  },

  actions: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 12,
  },
});
