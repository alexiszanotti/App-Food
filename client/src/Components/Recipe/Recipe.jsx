import React from "react";
import "./Recipe.css";
import { Link } from "react-router-dom";
import Imagen from "../../Public/ImgLandingpage.jpg";

export default function Recipe({ id, title, image, diet }) {
  return (
    <div className='recipe-ind'>
      <h3 className='title-recipe'>{title}</h3>
      <Link to={`/recipes/${id}`}>
        <img className='img-recipe' src={image ? image : Imagen} alt='Image not found' />
      </Link>
      <h5 className='subtitle-recipe'>{diet}</h5>
    </div>
  );
}
