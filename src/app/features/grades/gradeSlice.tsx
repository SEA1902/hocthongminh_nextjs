import { createSlice } from "@reduxjs/toolkit";
import { getGradeAndCourseList } from "./gradeApi";
import { Course, Grade } from "@/types";

export interface GradeState {
  grade?: Grade;
  courseList?: [Course];
}
const initialGradeState: GradeState = {};

export const gradeSlice = createSlice({
  name: "grade",
  initialState: initialGradeState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGradeAndCourseList.fulfilled, (state, action) => {
      state = {
        ...state,
        grade: action.payload?.grade || null,
        courseList: action.payload?.courseList || null,
      };

      return state;
    });
  },
});

export default gradeSlice.reducer;
