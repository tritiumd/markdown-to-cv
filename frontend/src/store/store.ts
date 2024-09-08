import { configureStore } from "@reduxjs/toolkit";
import { submitSlice, previewSlice } from "./slice";

export const store = configureStore({
  reducer: {
    submit: submitSlice.reducer,
    preview: previewSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
