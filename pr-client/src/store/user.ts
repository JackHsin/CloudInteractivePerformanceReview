import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../graphql/apollo-client";

import { RootState } from "./index";
import { updateAccessToken } from "./login";

const initUserInfo = {
  id: null,
  username: null,
  role: null,
};

// export const getAccountInfoByAccessToken = createAsyncThunk(
//   "user/getAccountInfoByAccessToken",
//   async (payload, { dispatch, getState }) => {
//     const state = getState();
//     console.log("\x1b[32m", "\n--------------Debug----------------\n");
//     console.log("\x1b[36m", `state = `, payload);
//     console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
//     if (!state) return;
//     const { data } = await client.query({
//       query: gql`
//         {
//           findOne {
//             id
//             username
//             role
//           }
//         }
//       `,
//     });

//     console.log("\x1b[32m", "\n--------------Debug----------------\n");
//     console.log("\x1b[36m", `data = `, data);
//     console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");

//     return data;
//   }
// );

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
  // extraReducers: (builder) => {
  //   builder.addCase(getAccountInfoByAccessToken.fulfilled, (state, action) => {
  //     console.log("\x1b[32m", "\n--------------Debug----------------\n");
  //     console.log("\x1b[36m", `action = `, action);
  //     console.log(
  //       "\x1b[32m",
  //       "\n-----------------------------------",
  //       "\x1b[0m"
  //     );
  //     state.info = action.payload;
  //   });
  // },
});

export const userReducer = userSlice.reducer;
export const { updateUserInfo, clearUserInfo } = userSlice.actions;
