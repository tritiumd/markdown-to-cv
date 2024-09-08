import { OUTPUT_URL } from "@/constants/variables";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const submitSlice = createSlice({
  name: "submit",
  initialState: {
    currentID: "",
  },
  reducers: {
    resetUID: (state) => {
      state.currentID = "";
    },
    submitUID: (state, action: PayloadAction<string>) => {
      state.currentID = action.payload;
    },
  },
});

export const previewSlice = createSlice({
  name: "preview",
  initialState: {
    currentID: "",
  },
  reducers: {
    resetApiUrl: (state) => {
      state.currentID = "";
    },
    setApiUrl: (state, action: PayloadAction<string>) => {
      state.currentID = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { submitUID, resetUID } = submitSlice.actions;

export const getCurrentUID = (state: RootState) => state.submit.currentID;
