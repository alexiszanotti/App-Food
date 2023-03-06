import React from "react";
import "./Recipe.css";
import { Link } from "react-router-dom";
import Imagen from "../../assets/alimentos.jpg";

export default function Recipe({ id, title, image, healthScore, servings, diet }) {
  return (
    <div className='recipe-container'>
      <div className='img-container'>
        <Link to={`/recipes/${id}`}>
          <img className='img-recipe' src={image ? image : Imagen} alt='Img not found' />
        </Link>
      </div>
      <div className='text-container'>
        <h3 className='title-recipe'>{title}</h3>
        <div className='subtitle-recipe'>
          <span>
            <i className='icon fas fa-heartbeat'></i>
            {healthScore}
          </span>
          <span>
            <i className='fas fa-users'></i>
            {servings ? " " + servings : "2"}
          </span>
        </div>
        {diet?.map((diet, index) => (
          <span className='diets' key={index + 1}>
            {diet}
          </span>
        ))}
      </div>
    </div>
  );
}
