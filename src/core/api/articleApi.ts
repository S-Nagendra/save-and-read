import { Article } from "@/core/models/Article";

export async function fetchArticles(): Promise<Article[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const now = new Date().toISOString();

  return [
    {
      id: "1",

      title: "Understanding Offline First Apps",

      summary: "How modern apps work without internet.",

      body: "Offline first architecture...",

      imageUrl: "https://example.com/image1.jpg",

      isRead: false,

      isSaved: false,

      isDownloaded: false,

      updatedAt: now,

      version: 1,

      syncStatus: "synced",
    },

    {
      id: "2",

      title: "React Native Performance",

      summary: "Optimizing large lists.",

      body: "FlatList virtualization...",

      imageUrl: "https://example.com/image2.jpg",

      isRead: false,

      isSaved: false,

      isDownloaded: false,

      updatedAt: now,

      version: 1,

      syncStatus: "synced",
    },
  ];
}
