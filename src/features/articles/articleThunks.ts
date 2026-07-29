import { createAsyncThunk } from "@reduxjs/toolkit";

import { articleRepository } from "@/core/container";

import { setArticles, setLoading } from "./articleSlice";

export const loadArticles = createAsyncThunk(
  "articles/load",
  async (_, { dispatch }) => {
    // 1. Load local data first

    dispatch(setLoading(true));
    const cached = await articleRepository.getFeed();

    dispatch(setLoading(false));
    dispatch(setArticles(cached));

    // 2. Try refresh from server

    try {
      
      await articleRepository.refreshFeed();

      const updated = await articleRepository.getFeed();

      dispatch(setArticles(updated));
    } catch (error) {
      console.log("Offline mode - using cache");
    }
  },
);

export const markArticleRead = createAsyncThunk(
  "articles/markRead",
  async (id: string, { dispatch }) => {
    await articleRepository.markAsRead(id);

    const articles = await articleRepository.getFeed();

    dispatch(setArticles(articles));
  },
);

export const markArticleUnread = createAsyncThunk(
  "articles/markUnread",
  async (id: string, { dispatch }) => {
    await articleRepository.markAsUnread(id);

    const articles = await articleRepository.getFeed();

    dispatch(setArticles(articles));
  },
);

export const saveArticle = createAsyncThunk(
  "articles/save",
  async (id: string, { dispatch }) => {
    await articleRepository.saveArticle(id);

    const articles = await articleRepository.getFeed();

    dispatch(setArticles(articles));
  },
);

export const unsaveArticle = createAsyncThunk(
  "articles/unsave",
  async (id: string, { dispatch }) => {
    await articleRepository.unsaveArticle(id);

    const articles = await articleRepository.getFeed();

    dispatch(setArticles(articles));
  },
);

export const downloadArticle = createAsyncThunk(
  "articles/download",

  async (id: string, { dispatch }) => {
    await articleRepository.downloadArticle(id);

    const articles = await articleRepository.getFeed();

    dispatch(setArticles(articles));
  },
);
