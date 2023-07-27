import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import knowledgesReducer from "./features/knowledges/knowledgesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    knowledges: knowledgesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
