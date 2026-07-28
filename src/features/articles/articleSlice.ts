import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Article } from "@/core/models/Article";

interface ArticleState {
  items: Article[];

  loading: boolean;
}

const initialState: ArticleState = {
  items: [],

  loading: false,
};

const articleSlice = createSlice({
  name: "articles",

  initialState,

  reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.items = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setArticles, setLoading } = articleSlice.actions;

export default articleSlice.reducer;
