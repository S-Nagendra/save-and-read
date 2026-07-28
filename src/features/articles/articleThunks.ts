import { createAsyncThunk } from "@reduxjs/toolkit";

import { articleRepository } from "@/core/container";

import { setArticles, setLoading } from "./articleSlice";

export const loadArticles = createAsyncThunk(
  "articles/load",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    // First read local database

    let articles = await articleRepository.getFeed();

    // Show cached data immediately

    dispatch(setArticles(articles));

    // Refresh from remote

    await articleRepository.refreshFeed();

    // Read updated local data

    articles = await articleRepository.getFeed();

    dispatch(setArticles(articles));

    dispatch(setLoading(false));
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
