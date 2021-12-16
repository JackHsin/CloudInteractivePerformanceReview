import { createSlice } from "@reduxjs/toolkit";

const initUserInfo = {
  id: 0,
  username: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    info: initUserInfo,
  },
  reducers: {
    updateUserInfo: (state, data) => {
      state.info = data.payload;
      state.isLoggedIn = true;
    },
    clearUserInfo: (state) => {
      state.info = initUserInfo;
      state.isLoggedIn = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { updateUserInfo, clearUserInfo } = userSlice.actions;
