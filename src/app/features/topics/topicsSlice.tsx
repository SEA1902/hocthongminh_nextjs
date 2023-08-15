import { createSlice } from "@reduxjs/toolkit";
import {
  addUserTopicResult,
  getTopicById,
  getUserTopicHistory,
} from "./topicsApi";
import { Course, Grade, Question, Topic } from "@/types";

export interface TopicState {
  topic?: Topic;
  grade?: Grade;
  course?: Course;
  questions?: [Question];
  userTopicHistory?: [any];
}
const initialTopicState: TopicState = {};

export const topicsSlice = createSlice({
  name: "topics",
  initialState: initialTopicState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTopicById.fulfilled, (state, action) => {
        state = {
          ...state,
          topic: action.payload.topic,
          grade: action.payload.grade,
          course: action.payload.course,
          questions: action.payload.questions,
        };
        return state;
      })
      .addCase(addUserTopicResult.fulfilled, (state, action) => {
        state = {
          ...state,
          userTopicHistory: action.payload.userTopicHistory,
        };
        return state;
      })
      .addCase(getUserTopicHistory.fulfilled, (state, action) => {
        state = {
          ...state,
          userTopicHistory: action.payload,
        };
        return state;
      });
  },
});

export default topicsSlice.reducer;
