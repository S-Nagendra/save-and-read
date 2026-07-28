import { Article } from "@/core/models/Article";
import { mockArticles } from "./articles";

export async function fetchArticles(): Promise<Article[]> {
  // simulate network delay

  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockArticles;
}
