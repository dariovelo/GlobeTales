import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/authSlice";
import storyReducer from "../store/storySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    story: storyReducer,
  },
  // Enable Redux DevTools extension
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
