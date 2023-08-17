import { createSlice } from "@reduxjs/toolkit";

export interface ErrorState {
  hasError?: boolean;
}
const initialErrorState: ErrorState = {
  hasError: false,
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState: initialErrorState,
  reducers: {
    setError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

export const { setError } = errorsSlice.actions;

export default errorsSlice.reducer;
