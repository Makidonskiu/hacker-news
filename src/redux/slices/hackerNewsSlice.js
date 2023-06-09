import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async function () {
      const response = await axios.get(apiKey + 'newstories.json');
      const newsIds = response.data.slice(0, 100);

      const newsPromises = newsIds.map((newsId) =>
        axios.get(apiKey + `item/${newsId}.json`),
      );

      const newsResponses = await Promise.all(newsPromises);
      return newsResponses.map((response) => response.data);
  },
);

export const fetchNewsItem = createAsyncThunk(
  'news/fetchNewsItem',
  async function (newsId) {
      const response = await axios.get(apiKey + `item/${newsId}.json`);
      return response.data;
  },
);

export const fetchComments = createAsyncThunk(
  'news/fetchComments',
  async function (commentIds) {
      const commentPromises = commentIds.map((commentId) =>
        axios.get(apiKey + `item/${commentId}.json`),
      );

      const responses = await Promise.all(commentPromises);
      return responses.map((response) => response.data);
  },
);

const hackerNewsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    url: '',
    newsItem: null,
    comments: [],
    status: null,
    error: null,
  },
  reducers: {
    saveUrl: (state, { payload }) => {
        state.url = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.news = action.payload;
      })

      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(fetchNewsItem.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchNewsItem.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.newsItem = action.payload;
      })

      .addCase(fetchNewsItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.comments = action.payload;
      })

      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { saveUrl } = hackerNewsSlice.actions;

export default hackerNewsSlice.reducer;
