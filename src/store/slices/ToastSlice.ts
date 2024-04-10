import { createSlice } from "@reduxjs/toolkit";

const initialToastMessage = {
  message: "",
};

export const toastSlice = createSlice({
  initialState: initialToastMessage,
  name: "toastMessage",
  reducers: {
    setToastMessage: (state, action: { payload: string }) => {
      state.message = action.payload;
    },
  },
});

export const { setToastMessage } = toastSlice.actions;
