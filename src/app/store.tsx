import { MakeStore, createWrapper } from "next-redux-wrapper";
import {
  AnyAction,
  Dispatch,
  Store,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import knowledgesReducer from "./features/knowledges/knowledgesSlice";
import gradeReducer from "./features/grades/gradeSlice";
import coursesReducer from "./features/courses/coursesSlice";
import topicsReducer from "./features/topics/topicsSlice";
import gamesReducer from "./features/games/gamesSlice";

const makeStore: MakeStore<Store> = () => {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      knowledges: knowledgesReducer,
      grade: gradeReducer,
      courses: coursesReducer,
      topics: topicsReducer,
      games: gamesReducer,
    },
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = Dispatch<AnyAction> &
  ThunkDispatch<AppStore, void, AnyAction>;
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
