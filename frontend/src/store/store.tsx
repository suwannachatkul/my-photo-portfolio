import { useDispatch } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

const store = configureStore({
  reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
