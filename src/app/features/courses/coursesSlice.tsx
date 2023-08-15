import { createSlice } from "@reduxjs/toolkit";
import { getCourseAndTopicList } from "./coursesApi";
import { Course, Topic } from "@/types";

export interface CourseState {
  course?: Course;
  topicList?: [Topic];
}
const initialCourseState: CourseState = {};

export const coursesSlice = createSlice({
  name: "courses",
  initialState: initialCourseState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCourseAndTopicList.fulfilled, (state, action) => {
      state = {
        ...state,
        course: action.payload.course,
        topicList: action.payload.topicList,
      };
      return state;
    });
  },
});

export default coursesSlice.reducer;