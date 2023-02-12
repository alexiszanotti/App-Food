import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
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

    setDiets: (state, { payload }) => {
      state.diets = payload;
    },

    filterByDiet: (state, { payload }) => {
      const allRecipe = state.recipes;
      const dietFilter =
        payload === "all"
          ? state.allRecipes
          : allRecipe.filter(({ diets }) => diets.includes(payload));

      state.recipes = dietFilter;
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
      const arrSorted1 =
        payload === "score"
          ? state.recipes.sort((a, b) => {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
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
      state.details = payload;
    },

    postRecipes: state => {
      return state;
    },

    clearDetailState: state => {
      state.details = initialState.details;
    },
  },
});

export const {
  setRecipes,
  setDiets,
  getDetails,
  filterByDiet,
  orderByName,
  orderByRank,
  searchByName,
  postRecipes,
  clearDetailState,
} = recipeSlice.actions;
