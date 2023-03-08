import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, clearDetailState } from "../../Redux/slice";
import defaultImage from "../../assets/alimentos.jpg";
import Spinner from "../../Components/Spinner/Spinner.jsx";
import "./DetailRecipe.css";

export const DetailRecipe = () => {
  const recipe = useSelector(state => state.recipes.detail);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(id));

    return () => dispatch(clearDetailState());
  }, [dispatch, id]);

  if (Object.keys(recipe).length === 0) {
    return <Spinner />;
  }

  const { steps, summary, image, title, extendedIngredients } = recipe;

  return (
    <div className='detail-container'>
      <h2 className='detail-title'> {title}</h2>
      <div className='detail-header'>
        <img src={image ? image : defaultImage} alt={title} />
        <div
          className='detail-sum'
          dangerouslySetInnerHTML={{ __html: `<b>Summary:</b> ${summary}` }}
        />
      </div>
      <h2 className='detail-title'> Ingredients</h2>
      <div className='ingredients-container'>
        {extendedIngredients?.map(({ image, original, originalName }) => (
          <div key={originalName} className='ingredients'>
            <p>{original.replace(originalName, "")}</p>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
              alt={originalName}
            />
            <p>{originalName.substring(0, 15)}</p>
          </div>
        ))}
      </div>
      <h2 className='detail-title'>Steps</h2>
      <div className='steps-container'>
        {Array.isArray(steps) &&
          steps?.map(({ step, number }) => (
            <div key={step} className='timeline-item' date-is={number}>
              <p>{step}</p>
            </div>
          ))}
      </div>
      <Link to='/home'>
        <button className='btn-back'>Back</button>
      </Link>
    </div>
  );
};
