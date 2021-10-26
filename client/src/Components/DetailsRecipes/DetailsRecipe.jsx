import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Actions/index.js";
import { useEffect } from "react";
import "./DetailsRecipe.css";
import Imagen from "../../Public/ImgLandingpage.jpg";

export default function DetailsRecipe(props) {
  const recipe = useSelector(state => state.details);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch]);

  return (
    <div className='d-container'>
      <div className='detail-container'>
        <h2 className='detail-title'> {recipe.title}</h2>
        <img
          className='detail-img'
          src={recipe.image ? recipe.image : Imagen}
          alt='Image not found'
        />

        <div
          className='detail-par'
          dangerouslySetInnerHTML={{ __html: `<b>Summary:</b> ${recipe.summary}` }}
        />

        <div
          className='detail-par'
          dangerouslySetInnerHTML={{
            __html: `<b>Instruction:</b>  ${recipe.instructions}`,
          }}
        />
        <div className='subtitle-cont'>
          <h5 className='detail-subtitle'>Dish Type: {recipe.dishTypes}</h5>
          <h5 className='detail-subtitle'>Spoonacular Score: {recipe.spoonacularScore}</h5>
          <h5 className='detail-subtitle'>HealthScore: {recipe.healthScore}</h5>
          <h5 className='detail-subtitle'>Diet: {recipe.diets?.map(el => el.name + " ")}</h5>
        </div>
        <Link to='/home'>
          <button className='btn-back'>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
