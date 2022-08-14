import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../redux/recipesSlice.js";

export default configureStore({
  reducer: {
    recipeReducer,
  },
});
