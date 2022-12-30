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
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      state.allRecipes = action.payload;
    },

    setDiets: (state, action) => {
      state.diets = action.payload;
    },

    filterByDiet: (state, action) => {
      const allRecipe = state.recipes;
      const dietFilter =
        action.payload === "all"
          ? state.allRecipes
          : allRecipe.filter(({ diets }) => diets.includes(action.payload));

      state.recipes = dietFilter;
    },

    orderByName: (state, action) => {
      const arrSorted =
        action.payload === "asc"
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

    orderByRank: (state, action) => {
      const arrSorted1 =
        action.payload === "score"
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

    searchByName: (state, action) => {
      state.recipes = action.payload;
    },

    getDetails: (state, action) => {
      state.details = action.payload;
    },

    postRecipes: state => {
      return state;
    },

    clearDetailState: state => {
      state.details = [];
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
