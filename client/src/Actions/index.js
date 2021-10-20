import axios from "axios";
import {
  GET_RECIPES,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_RANK,
  SEARCH_BY_NAME,
  RECIPE_ID,
  GET_DIET,
} from "./ActionsCreate";

export function getRecipes() {
  return async function (dispatch) {
    try {
      let res = await axios("http://localhost:3001/recipes");

      return dispatch({ type: GET_RECIPES, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRank(payload) {
  return {
    type: ORDER_BY_RANK,
    payload,
  };
}

export function searchByName(name) {
  try {
    return async function (dispatch) {
      let res = await axios(`http://localhost:3001/recipes?name=${name}`);

      return dispatch({ type: SEARCH_BY_NAME, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
}

export function recipesId(idRecipe) {
  try {
    return async function (dispatch) {
      let res = await axios(`http://localhost:3001/recipes/${idRecipe}`);

      return dispatch({ type: RECIPE_ID, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
}

export function getDiets() {
  try {
    return async function (dispatch) {
      let res = await axios(`http://localhost:3001/types`);

      return dispatch({ type: GET_DIET, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
}

export function postRecipe(payload) {
  try {
    return async function (dispatch) {
      let res = await axios(`http://localhost:3001/recipe`, payload);

      return res;
    };
  } catch (error) {
    console.log(error);
  }
}
