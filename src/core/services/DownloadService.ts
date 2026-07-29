import { Article } from "@/core/models/Article";
import { downloadFile } from "../filesystem/fileStorage";

export async function downloadArticleContent(
  article: Article,
): Promise<Article> {
  try {
    // Already downloaded
    if (article.localImagePath) {
      return article;
    }

    let localImagePath: string | undefined;

    if (article.imageUrl) {
      const extension =
        article.imageUrl.split(".").pop()?.split("?")[0] ?? "jpg";

      localImagePath = await downloadFile(
        article.imageUrl,
        `${article.id}.${extension}`,
      );
    }

    return {
      ...article,
      localImagePath,
      isDownloaded: true,
    };
  } catch (error) {
    console.error("Failed to download article:", error);
    throw error;
  }
}
