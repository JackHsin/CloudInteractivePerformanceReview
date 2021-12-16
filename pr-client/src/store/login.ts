import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../apis/adapter";
import { RootState } from "./index";

export const loginAndSaveToken = createAsyncThunk(
  "login/loginAndSaveToken",
  async (payload: { username: string; password: string }) => {
    const { username, password } = payload;

    const res = (await axios.post("/auth/login", {
      username,
      password,
    })) as AxiosResponse;

    const { accessToken } = res.data;

    return { accessToken };
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    accessToken: "",
  },
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    clearTokens(state) {
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAndSaveToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
      }
    });
  },
});

export const loginReducer = loginSlice.reducer;
export const accessToken = (state: RootState) => state.login.accessToken;

export const { updateAccessToken, clearTokens } = loginSlice.actions;
