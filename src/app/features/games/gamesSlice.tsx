import { createSlice } from "@reduxjs/toolkit";

export interface GameState {
  results?: number[];
  numberCorrect: number;
  numberInCorrect: number;
  working: boolean;
  history: boolean;
  showReport: boolean;
}
const initialGameState: GameState = {
  numberCorrect: 0,
  numberInCorrect: 0,
  working: false,
  history: false,
  showReport: false,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState: initialGameState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setNumberCorrect: (state, action) => {
      state.numberCorrect = action.payload;
    },
    setNumberInCorrect: (state, action) => {
      state.numberInCorrect = action.payload;
    },
    setWorking: (state, action) => {
      state.working = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setShowReport: (state, action) => {
      state.showReport = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
  },
});

export const {
  setResults,
  setNumberCorrect,
  setNumberInCorrect,
  setWorking,
  setHistory,
  setShowReport,
} = gamesSlice.actions;

export default gamesSlice.reducer;
