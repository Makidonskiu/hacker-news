import { configureStore } from "@reduxjs/toolkit";
import hackerNewsReducer from '../slices/hackerNewsSlice';

export const store = configureStore({
    reducer: {
        news : hackerNewsReducer,
    }
})