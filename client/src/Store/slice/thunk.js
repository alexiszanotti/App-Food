import axios from "axios";
import {
  getDetails,
  orderByName,
  postRecipes,
  searchByName,
  setDiets,
  setRecipes,
} from "./recipesSlice";

export const fetchAllRecipes = () => async dispatch => {
  try {
    const { data } = await axios(`/recipes`);
    dispatch(setRecipes(data));
  } catch (error) {
    console.log(error);
  }
};
export const fetchDiets = () => async dispatch => {
  try {
    const { data } = await axios(`/types`);
    dispatch(setDiets(data));
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
    const { data } = await axios(`/recipes?name=${name}`);
    dispatch(searchByName(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetails = idRecipe => async dispatch => {
  try {
    const { data } = await axios(`/recipes/${idRecipe}`);
    dispatch(getDetails(data));
  } catch (error) {
    console.log(error);
  }
};

export const postRecipe = payload => async dispatch => {
  try {
    dispatch(postRecipes(payload));
    await axios.post("/recipe", payload);
  } catch (error) {
    console.log(error);
  }
};
