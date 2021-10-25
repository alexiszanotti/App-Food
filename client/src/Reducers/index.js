import {
  GET_RECIPES,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_RANK,
  SEARCH_BY_NAME,
  GET_DIET,
  POST_RECIPE,
  GET_DETAILS,
} from "../Actions/ActionsCreate";

const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case FILTER_BY_DIET:
      const allRecipe = state.allRecipes;
      const dietFilter =
        action.payload === "all"
          ? allRecipe
          : allRecipe.filter(el =>
              el.diets ? el.diets.includes(action.payload) : el.diets.name === action.payload
            );

      return {
        ...state,
        recipes: dietFilter,
      };
    case ORDER_BY_NAME:
      let arrSorted =
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
      return {
        ...state,
        recipes: arrSorted,
      };
    case ORDER_BY_RANK:
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
    case SEARCH_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_DIET:
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
