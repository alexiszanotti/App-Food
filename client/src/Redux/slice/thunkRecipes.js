import {
  getDetails,
  orderByName,
  postRecipes,
  searchByName,
  setRecipes,
  recipeNotFound,
} from "./recipesSlice";
import recipesApi from "./../../api/recipesApi";

export const fetchAllRecipes = () => async dispatch => {
  try {
    const { data } = await recipesApi.get(`/recipes`);
    dispatch(setRecipes(data));
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
    const { data } = await recipesApi(`/recipes?name=${name}`);

    if (data.length) {
      dispatch(searchByName(data));
    } else {
      dispatch(recipeNotFound());
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetails = idRecipe => async dispatch => {
  try {
    const { data } = await recipesApi.get(`/recipes/${idRecipe}`);

    dispatch(getDetails(data));
  } catch (error) {
    console.log(error);
  }
};

export const postRecipe = payload => async dispatch => {
  try {
    dispatch(postRecipes(payload));
    await recipesApi.post("/recipes", payload);
  } catch (error) {
    console.log(error);
  }
};
