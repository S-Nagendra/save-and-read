import React, { useEffect } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import {
  ArticleCard,
  markArticleRead,
  markArticleUnread,
  saveArticle,
  unsaveArticle,
  loadArticles,
} from "@/features/articles";

export function FeedScreen() {
  const dispatch = useAppDispatch();

  const { items, loading } = useAppSelector((state) => state.articles);

  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);

  if (loading && items.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const handleReadToggle = (id: string, isRead: boolean) => {
    if (isRead) {
      dispatch(markArticleUnread(id));
    } else {
      dispatch(markArticleRead(id));
    }
  };

  const handleSaveToggle = (id: string, isSaved: boolean) => {
    if (isSaved) {
      dispatch(unsaveArticle(id));
    } else {
      dispatch(saveArticle(id));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onReadToggle={() => handleReadToggle(item.id, item.isRead)}
            onSaveToggle={() => handleSaveToggle(item.id, item.isSaved)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
