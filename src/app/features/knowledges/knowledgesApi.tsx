import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@/api/client";

export const getKnowledgesList = createAsyncThunk(
  "knowledges/getKnowledgesList",
  async (page: number) => {
    const response = await client.get(
      "http://localhost:3001/knowledges/get-knowledge-list/?page=" + page
    );
    return response.data;
  }
);
export const getKnowledgeBySlug = createAsyncThunk(
  "knowledges/getKnowledgeBySlug",
  async (slug: string) => {
    const response = await client.get(
      "http://localhost:3001/knowledges/get-by-slug?slug=" + slug
    );
    return response.data;
  }
);
