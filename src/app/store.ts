import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipeSlice";
import authReducer from "../features/auth/authSlice";
import followReducer from "../features/followSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
    follow: followReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
