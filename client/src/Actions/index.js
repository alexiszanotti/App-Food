import axios from "axios";
import { GET_RECIPES } from "./ActionsCreate";

export function getRecipes() {
  return async function (dispatch) {
    let res = await axios("http://localhost:3001/recipes");

    dispatch({ type: GET_RECIPES, payload: res.data });
  };
}
