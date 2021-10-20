import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipesId } from "../../Actions/index.js";

export default function DetailsRecipe() {
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.id_Recipe);

  let { id } = useParams();

  useEffect(() => {
    dispatch(recipesId(id));
  }, []);

  return (
    <>
      {recipe.length > 0 ? (
        <div>
          <h1>Hola</h1>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
