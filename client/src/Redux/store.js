import { configureStore } from "@reduxjs/toolkit";
import { authSlice, recipeSlice } from "./slice";

export const store = configureStore({
  reducer: {
    recipes: recipeSlice.reducer,
    auth: authSlice.reducer,
  },
});
