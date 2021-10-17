import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../Actions/index.js";
import { Link } from "react-router-dom";
import Recipe from "../Recipe/Recipe.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      <Link to='/recipe'>Create Recipe</Link>
      <h1>Recipe List</h1>
      <button
        onClick={e => {
          handleClick(e);
        }}
      >
        Reload recipes
      </button>

      <div>
        {allRecipes.length &&
          allRecipes.map(el => {
            return (
              <Recipe key={el.Id} image={el.Image} title={el.Title} diet={`Diet:  ${el.Diet}`} />
            );
          })}
      </div>
    </div>
  );
}
