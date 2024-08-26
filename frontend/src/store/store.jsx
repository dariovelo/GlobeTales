import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/authSlice";
import experienceReducer from "../store/experienceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    experience: experienceReducer,
  },
  // Enable Redux DevTools extension
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
