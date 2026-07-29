import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Article } from "@/core/models/Article";
import { getArticleImageUri } from "@/shared/utils";

interface Props {
  article: Article;
  onReadToggle: (id: string) => void;
  onSaveToggle: (id: string) => void;
  onDownload: (id: string) => void;
  onPress: (id: string) => void;
}

export function ArticleCard({
  article,
  onReadToggle,
  onSaveToggle,
  onDownload,
  onPress,
}: Props) {
  const imageUri = getArticleImageUri(article);
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onPress(article.id)} style={styles.content}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        <View style={styles.info}>
          <Text
            style={[styles.title, article.isRead && styles.readTitle]}
            numberOfLines={2}
          >
            {article.title}
          </Text>

          <Text style={styles.summary} numberOfLines={3}>
            {article.summary}
          </Text>

          <View style={styles.statusRow}>
            {article.isRead && <Text style={styles.status}>Read</Text>}

            {article.isSaved && <Text style={styles.status}>Saved</Text>}

            {article.isDownloaded && <Text style={styles.status}>Offline</Text>}
          </View>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => onReadToggle(article.id)}
        >
          <Text>{article.isRead ? "Mark unread" : "Mark read"}</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => onSaveToggle(article.id)}
        >
          <Text>{article.isSaved ? "Unsave" : "Save"}</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => onDownload(article.id)}
          disabled={article.isDownloaded}
        >
          <Text>{article.isDownloaded ? "Downloaded" : "Download"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  content: {
    flexDirection: "row",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  readTitle: {
    fontWeight: "400",
  },

  summary: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  statusRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },

  status: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },

  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
