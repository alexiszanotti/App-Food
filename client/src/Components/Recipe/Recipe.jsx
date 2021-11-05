import React from "react";
import "./Recipe.css";
import { Link } from "react-router-dom";
import Imagen from "../../Public/ImgLandingpage.jpg";

export default function Recipe({ id, title, image, readyInMinutes, servings }) {
  return (
    <div className='recipe-ind'>
      <div className='img-container'>
        <Link to={`/recipes/${id}`}>
          <img className='img-recipe' src={image ? image : Imagen} alt='Img not found' />
        </Link>
      </div>
      <div className='text-container'>
        <h3 className='title-recipe'>{title}</h3>
        <h5 className='subtitle-recipe'>
          <i class='far fa-clock'></i>
          {readyInMinutes ? " " + readyInMinutes + "  Min" : " 45 Min"} <br />
          <i class='fas fa-users'></i>
          {servings ? " " + servings : "2"}
        </h5>
        <Link to={`/recipes/${id}`}>
          <h4 className='cook'>LET'S COOK!</h4>
        </Link>
      </div>
    </div>
  );
}
