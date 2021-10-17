import React from "react";

export default function Recipe(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <h5>{props.diet}</h5>
      <img src={props.image} alt='Image not found' width='250px' height='200' />
    </div>
  );
}
