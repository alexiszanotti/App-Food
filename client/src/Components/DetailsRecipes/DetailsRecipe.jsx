import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Actions/index.js";
import { useEffect } from "react";

export default function DetailsRecipe(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch]);

  const recipe = useSelector(state => state.details);

  return (
    <>
      <div>
        <h2>Title: {recipe.title}</h2>
        <img src={recipe.image} alt='Image not found' />
        <h5>Dish Type: {recipe.dishTypes}</h5>
        <h5>Spoonacular Score: {recipe.spoonacularScore}</h5>
        <h5>HealthScore: {recipe.healthScore}</h5>
        <h5>Summary: {recipe.summary}</h5>
        <p>Instructions: {recipe.instructions}</p>
      </div>

      <Link to='/home'>
        <button>Go Back</button>
      </Link>
    </>
  );
}
