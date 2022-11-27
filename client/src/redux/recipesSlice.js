import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    setRecipes(state, action) {
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    },
    setDiets(state, action) {
      return {
        ...state,
        diets: action.payload,
      };
    },
    filterByDiet(state, action) {
      const allRecipe = state.allRecipes;
      var arregloRecetas = [];
      var dietFilter =
        action.payload === "all"
          ? allRecipe
          : allRecipe.filter(el => {
              if (el.diets.includes(action.payload)) return el;
              if (typeof el.diets[0] === "object") {
                el.diets.forEach(elem => {
                  if (elem.name === action.payload) {
                    arregloRecetas.push(el);
                  }
                });
              }
            });

      return {
        ...state,
        recipes: dietFilter.concat(arregloRecetas),
      };
    },
    orderByName: (state, action) => {
      let arrSorted =
        action.payload === "asc"
          ? state.allRecipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });

      console.log(arrSorted);
      return {
        ...state,
        recipes: arrSorted,
      };
    },
    orderByRank(state, action) {
      let arrSorted1 =
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

      return {
        ...state,
        recipes: arrSorted1,
      };
    },
    searchByName(state, action) {
      return {
        ...state,
        recipes: action.payload,
      };
    },
    getDetails(state, action) {
      return {
        ...state,
        details: action.payload,
      };
    },
    postRecipes(state, action) {
      return state;
    },
    clearDetailState(state) {
      return {
        ...state,
        details: [],
      };
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

export const fetchAllRecipes = () => async dispatch => {
  try {
    let res = await axios(`/recipes`);
    dispatch(setRecipes(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const fetchDiets = () => async dispatch => {
  try {
    let res = await axios(`/types`);
    dispatch(setDiets(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const orderRecipesByName = payload => async dispatch => {
  try {
    dispatch(orderByName(payload));
  } catch (error) {
    console.log(error);
  }
};

export const searchRecipeByName = name => async dispatch => {
  try {
    let res = await axios(`/recipes?name=${name}`);
    dispatch(searchByName(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const fetchDetails = idRecipe => async dispatch => {
  try {
    let res = await axios(`/recipes/${idRecipe}`);
    dispatch(getDetails(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const postRecipe = payload => async dispatch => {
  try {
    await axios.post(`/recipe`, payload);
    dispatch(postRecipes());
  } catch (error) {
    console.log(error);
  }
};

export default recipeSlice.reducer;
