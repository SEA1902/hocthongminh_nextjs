import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/api/client";
import { UserInfor } from "@/types";
import CryptoJS from "crypto-js";

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

export const getUserFromToken = createAsyncThunk(
  "users/getUserFromToken",
  async (token: string) => {
    const response = await client.post(
      "http://localhost:3001/users/get-user-from-token",
      {
        token: token,
      }
    );
    return response.data;
  }
);

export const fetchLogin = createAsyncThunk(
  "users/fetchLogin",
  async (loginData: loginForm) => {
    const hashedPassword = CryptoJS.SHA256(
      loginData.password + loginData.username
    ).toString();

    const response = await client.post("http://localhost:3001/users/login", {
      username: loginData.username,
      // password: loginData.password,
      password: hashedPassword,
    });
    return response.data;
  }
);

export const fetchRegister = createAsyncThunk(
  "users/fetchRegister",
  async (registerData: registerForm) => {
    const hashedPassword = CryptoJS.SHA256(
      registerData.password + registerData.username
    ).toString();
    registerData = {
      ...registerData,
      password: hashedPassword,
    };
    const response = await client.post(
      "http://localhost:3001/users/register",
      registerData
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updateData: UserInfor) => {
    const response = await client.post(
      "http://localhost:3001/users/update-information",
      updateData
    );

    return response.data;
  }
);
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (changePasswordData: changePasswordForm) => {
    try {
      const hashedCurrentPassword = CryptoJS.SHA256(
        changePasswordData.currentPassword + changePasswordData.username
      ).toString();
      const hashedNewPassword = CryptoJS.SHA256(
        changePasswordData.newPassword + changePasswordData.username
      ).toString();

      changePasswordData = {
        ...changePasswordData,
        currentPassword: hashedCurrentPassword,
        newPassword: hashedNewPassword,
      };
      const response = await client.post(
        "http://localhost:3001/users/change-password",
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
      const response = await fetch(
        "http://localhost:3001/users/change-avatar",
        {
          method: "POST",
          body: formData,
        }
      )
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
