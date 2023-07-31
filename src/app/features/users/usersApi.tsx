import { createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { client, localApi } from "@/api/client";
import { UserInfor } from "@/types";

interface loginForm {
  username: string;
  password: string;
}

interface registerForm {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  classNumber: number;
}

interface changePasswordForm {
  userId: string;
  username: string;
  currentPassword: string;
  newPassword: string;
}
const secretKey = "hocthongminh";

export const getUserFromToken = createAsyncThunk(
  "users/getUserFromToken",
  async (token: string) => {
    const response = await client.post("users/get-user-from-token", {
      token: token,
    });

    return response.data;
  }
);

export const fetchLogin = createAsyncThunk(
  "users/fetchLogin",
  async (loginData: loginForm) => {
    const hashedPassword = CryptoJS.AES.encrypt(
      loginData.password + loginData.username,
      secretKey
    ).toString();

    try {
      const response = await client.post("users/login", {
        username: loginData.username,
        password: hashedPassword,
      });
      return response.data;
    } catch (err) {
      console.log("có lỗi login:", err);
    }
  }
);
export const fetchLogout = createAsyncThunk("users/fetchLogout", async () => {
  const response = await client.post("users/logout", {});
  return response.data;
});
export const fetchRegister = createAsyncThunk(
  "users/fetchRegister",
  async (registerData: registerForm) => {
    const hashedPassword = CryptoJS.AES.encrypt(
      registerData.password + registerData.username,
      secretKey
    ).toString();
    registerData = {
      ...registerData,
      password: hashedPassword,
    };
    const response = await client.post("users/register", registerData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updateData: UserInfor) => {
    const response = await client.post("users/update-information", updateData);

    return response.data;
  }
);
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (changePasswordData: changePasswordForm) => {
    try {
      const hashedCurrentPassword = CryptoJS.AES.encrypt(
        changePasswordData.currentPassword + changePasswordData.username,
        secretKey
      ).toString();
      const hashedNewPassword = CryptoJS.AES.encrypt(
        changePasswordData.newPassword + changePasswordData.username,
        secretKey
      ).toString();

      changePasswordData = {
        ...changePasswordData,
        currentPassword: hashedCurrentPassword,
        newPassword: hashedNewPassword,
      };
      const response = await client.post(
        "users/change-password",
        changePasswordData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const changeAvatar = createAsyncThunk(
  "users/changeAvatar",
  async (formData: FormData) => {
    try {
      const response = await fetch(localApi + "users/change-avatar", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
