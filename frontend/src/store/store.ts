import { configureStore } from "@reduxjs/toolkit";
import { submitSlice } from "./slice";

export const store = configureStore({
  reducer: {
    submit: submitSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
