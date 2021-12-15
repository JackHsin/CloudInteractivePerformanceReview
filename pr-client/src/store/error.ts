import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * error 處理，之後要實作細節
 */

interface errorMessagePayload {
  message: string;
  errorCode?: string;
}

const initState = {
  show: false,
  message: "",
  errorCode: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState: initState,
  reducers: {
    setMessage: (state, action: PayloadAction<errorMessagePayload>) => {
      state.show = true;
      state.message = action.payload.message;
      state.errorCode = action.payload.errorCode as string;
    },
    removeMessage: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const errorReducer = errorSlice.reducer;
export const { setMessage, removeMessage } = errorSlice.actions;
