import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/api/client";

export const getCourseAndTopicList = createAsyncThunk(
  "courses/getCourseAndTopicList",
  async (data: {
    classNumber: number;
    courseSlug: string;
    typeTopic: number;
    userId: string;
  }) => {
    try {
      const response = await client.post(
        "courses/get-course-and-topic-list",
        data
      );
      return response.data;
    } catch (err) {
      console.log("có lỗi getCourseAndTopicList:", err);
    }
  }
);
