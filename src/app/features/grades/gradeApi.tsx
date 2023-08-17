import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/api/client";

export const getGradeAndCourseList = createAsyncThunk(
  "grades/getGradeAndCourseList",
  async (classNumber: number) => {
    try {
      const response = await client.get(
        "grades/get-grade-and-course-list/?classNumber=" + classNumber
      );
      return response.data;
    } catch (error) {
      console.log("có lỗi getGradeAndCourseList:", error);
    }
  }
);
