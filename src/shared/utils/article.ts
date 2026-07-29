import { Article } from "@/core/models/Article";
import { fileExists } from "@/core/filesystem/fileStorage";

export function getArticleImageUri(article: Article): string {
  if (article.localImagePath && fileExists(article.localImagePath)) {
    return article.localImagePath;
  }

  return article.imageUrl;
}
