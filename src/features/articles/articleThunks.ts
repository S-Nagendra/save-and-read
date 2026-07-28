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
