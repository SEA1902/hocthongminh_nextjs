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

const makeStore: MakeStore<Store> = () => {
  const store = configureStore({
    reducer: {
      users: usersReducer,
      knowledges: knowledgesReducer,
    },
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = Dispatch<AnyAction> &
  ThunkDispatch<AppStore, void, AnyAction>;
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
