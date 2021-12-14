import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { RootState } from "./index";
import { Itokens } from "../interfaces/shop";
import * as LOGIN_TYPE from "../constants/login";

// import { v1AuthApi } from "../apis/adapter";

// export const setTokensBy3rdPartyCode = createAsyncThunk(
//   "login/setTokensBy3rdPartyCode",
//   async (payload: { state: string; code: string }) => {
//     let tokens: Itokens = null;
//     let res: AxiosResponse<>;
//     const { state, code } = payload;

//     res = await v1AuthApi.webLoginByFacebook({ code });
//     tokens = res.data;

//     return tokens;
//   }
// );

// export const signOutAndRemoveToken = createAsyncThunk(
//   "login/signOutAndRemoveToken",
//   async (_, { getState }) => {
//     const states = getState() as RootState;
//     await v1AuthApi.webLogout({
//       token: states.login.tokens.accessToken,
//       refreshToken: states.login.tokens.refreshToken,
//     });
//   }
// );

const initTokens = {
  accessToken: null,
  refreshToken: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    tokens: initTokens,
  },
  reducers: {
    updateAccessToken(state, action) {
      state.tokens.accessToken = action.payload;
    },
    updateRefreshToken(state, action) {
      state.tokens.refreshToken = action.payload;
    },
    clearTokens(state) {
      state.tokens = initTokens;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(setTokensBy3rdPartyCode.fulfilled, (state, action) => {
  //     if (action.payload) {
  //       state.tokens.accessToken = action.payload.accessToken;
  //       state.tokens.refreshToken = action.payload.refreshToken;
  //     }
  //   });
  //   builder.addCase(signOutAndRemoveToken.fulfilled, (state) => {
  //     state.tokens = initTokens;
  //   });
  // },
});

export const loginReducer = loginSlice.reducer;
export const tokens = (state: RootState) => state.login.tokens;

export const { updateAccessToken, updateRefreshToken } = loginSlice.actions;
