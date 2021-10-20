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
      const allRecipes = state.allRecipes;
      const dietFilter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter(el => el.Diet.includes(action.payload));

      return {
        ...state,
        recipes: dietFilter,
      };
    case ORDER_BY_NAME:
      let arrSorted =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.Title > b.Title) {
                return 1;
              }
              if (b.Title > a.Title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.Title > b.Title) {
                return -1;
              }
              if (b.Title > a.Title) {
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
        action.payload === "rank"
          ? state.recipes.sort((a, b) => {
              if (a.spoonacularScore > b.spoonacularScore) {
                return 1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.spoonacularScore > b.spoonacularScore) {
                return -1;
              }
              if (b.spoonacularScore > a.spoonacularScore) {
                return 1;
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
