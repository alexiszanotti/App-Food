import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  allRecipes: [],
  detail: {},
  diets: [],
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
      console.log(payload);
      const arrSorted1 =
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

      state.recipes = arrSorted1;
    },

    searchByName: (state, { payload }) => {
      state.recipes = payload;
    },

    getDetails: (state, { payload }) => {
      state.detail = payload;
    },

    postRecipes: state => {
      return state;
    },

    clearDetailState: state => {
      state.detail = initialState.detail;
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
} = recipeSlice.actions;
