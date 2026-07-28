import { Article } from "@/core/models/Article";
import { downloadFile } from "../filesystem/fileStorage";

export async function downloadArticleContent(article: Article) {
  let localImagePath;

  if (article.imageUrl) {
    localImagePath = await downloadFile(article.imageUrl, `${article.id}.jpg`);
  }

  return {
    ...article,

    localImagePath,

    isDownloaded: true,
  };
}
