import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/api/client";

export const getTopicById = createAsyncThunk(
  "topics/getTopicById",
  async (topicId: string) => {
    try {
      const response = await client.get(
        "topics/get-topic-by-id/?topicId=" + topicId
      );
      return response.data;
    } catch (err) {
      console.log("có lỗi getTopicById:", err);
    }
  }
);
export const addUserTopicResult = createAsyncThunk(
  "topics/addUserTopicResult",
  async (data: {
    topicId: string;
    userId: string;
    answer: number[];
    score: number;
  }) => {
    try {
      const response = await client.post("topics/add-user-topic-result", data);
      return response.data;
    } catch (err) {
      console.log("có lỗi addUserTopicResult:", err);
    }
  }
);
export const getUserTopicHistory = createAsyncThunk(
  "topics/getUserTopicHistory",
  async (data: { topicId: string; userId: string }) => {
    try {
      const response = await client.post("topics/get-user-topic-history", data);
      return response.data;
    } catch (err) {
      console.log("có lỗi addUserTopicResult:", err);
    }
  }
);
