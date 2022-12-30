import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "../Store/slice";

export const store = configureStore({
  reducer: {
    recipes: recipeSlice.reducer,
  },
});
