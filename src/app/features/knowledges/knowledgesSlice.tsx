import { createSlice } from "@reduxjs/toolkit";
import { getKnowledgesList, getKnowledgeBySlug } from "./knowledgesApi";
import { Knowledge } from "@/types";

export interface KnowledgeState {
  knowledges?: {
    knowledgesList?: Knowledge[];
    currentPage?: number;
    totalPages?: number;
  };
  knowledgePage?: Knowledge;
}
const initialKnowledgeState: KnowledgeState = {};

export const knowledgesSlice = createSlice({
  name: "knowledges",
  initialState: initialKnowledgeState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getKnowledgesList.fulfilled, (state, action) => {
        state.knowledges = action.payload;
      })
      .addCase(getKnowledgeBySlug.fulfilled, (state, action) => {
        state.knowledgePage = action.payload;
      });
  },
});

export default knowledgesSlice.reducer;
