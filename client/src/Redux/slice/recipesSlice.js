import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  allRecipes: [],
  detail: {},
  error: "",
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, { payload }) => {
      state.recipes = payload;
      state.allRecipes = payload;
    },

    orderByName: (state, { payload }) => {
      const arrSorted =
        payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });

      state.recipes = arrSorted;
    },

    orderByRank: (state, { payload }) => {
      const arrSorted =
        payload === "score"
          ? state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            });

      state.recipes = arrSorted;
    },

    searchByName: (state, { payload }) => {
      state.recipes = payload;
    },

    getDetails: (state, { payload }) => {
      state.detail = payload.detailRecipe;
    },

    postRecipes: state => {
      return state;
    },

    clearDetailState: state => {
      state.detail = initialState.detail;
    },

    recipeNotFound: state => {
      state.error = "Recipe not found";
    },
  },
});

export const {
  setRecipes,
  getDetails,
  orderByName,
  orderByRank,
  searchByName,
  postRecipes,
  clearDetailState,
  recipeNotFound,
} = recipeSlice.actions;
