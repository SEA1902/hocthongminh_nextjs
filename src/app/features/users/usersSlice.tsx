import { createSlice } from "@reduxjs/toolkit";
import { UserInfor } from "@/types";
import {
  changeAvatar,
  changePassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
  getUserFromToken,
  updateUser,
} from "./usersApi";
import { setCookie } from "@/utils/cookies";

export interface UserState {
  userInfor?: UserInfor;
  loginStatus?: string;
  registerStatus?: string;
  updateStatus?: string;
  changePasswordStatus?: string;
}
const initialUserState: UserState = {
  loginStatus: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state = {
          loginStatus: "succeeded",
          userInfor: action.payload,
        };
        setCookie("token", action.payload.token, 60 * 60 * 24);
        return state;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state = { loginStatus: "idle" };
        document.cookie = "";
        return state;
      })
      .addCase(fetchRegister.pending, (state, action) => {
        state.registerStatus = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state = {
          loginStatus: "succeeded",
          registerStatus: "succeeded",
          userInfor: action.payload,
        };
        setCookie("token", action.payload.token, 60 * 60 * 24);
        return state;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.registerStatus = "failed";
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.userInfor = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
      })
      .addCase(getUserFromToken.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userInfor = action.payload;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.changePasswordStatus = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordStatus = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = "failed";
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.userInfor = action.payload;
      });
  },
});

export default usersSlice.reducer;
