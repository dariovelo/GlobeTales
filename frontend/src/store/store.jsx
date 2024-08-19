import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Enable Redux DevTools extension
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
