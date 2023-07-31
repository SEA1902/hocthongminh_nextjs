import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/api/client";

export const getKnowledgesList = createAsyncThunk(
  "knowledges/getKnowledgesList",
  async (page: number) => {
    try {
      const response = await client.get(
        "knowledges/get-knowledge-list/?page=" + page
      );
      return response.data;
    } catch (err) {
      console.log("có lỗi getKnowledgesList:", err);
    }
  }
);
export const getKnowledgeBySlug = createAsyncThunk(
  "knowledges/getKnowledgeBySlug",
  async (slug: string) => {
    try {
      const response = await client.get("knowledges/get-by-slug?slug=" + slug);
      return response.data;
    } catch (err) {
      console.log("có lỗi:", err);
    }
  }
);
