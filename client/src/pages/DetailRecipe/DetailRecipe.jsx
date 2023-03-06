import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, clearDetailState } from "../../Redux/slice";
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

  const { healthScore, servings, diets, steps, summary, title, instructions, extendedIngredients } =
    recipe;

  return (
    <>
      <div className='d-container'></div>
      <div className='detail-container'>
        <div className='title-cont'>
          <h2 className='detail-title'> {title}</h2>
        </div>
        <div
          className='detail-sum'
          dangerouslySetInnerHTML={{ __html: `<b>Summary:</b> ${summary}` }}
        />
        <p>{instructions}</p>
        <div className='subtitle-cont'>
          <h5 className='detail-subtitle'>
            <i className='icon fas fa-heartbeat'></i> {healthScore + " Pts."}
          </h5>
          <h5 className='detail-subtitle'>
            <i className='icon fas fa-heartbeat'></i> {servings}
          </h5>
          <h5 className='detail-subtitle'>
            <i className='icon fas fa-balance-scale'></i> {diets?.map(name => name + " ")}
          </h5>
        </div>
        <Link to='/home'>
          <button className='btn-back'>Go Back</button>
        </Link>
      </div>
      <div className='steps'>
        {Array.isArray(steps) &&
          steps?.map(({ step, number }) => (
            <>
              <span key={number}>
                <i className='fa-sharp fa-solid fa-thumbtack'></i> {number}:
              </span>
              <p>{step}</p>
            </>
          ))}
      </div>
      {extendedIngredients?.map(({ image, originalName }) => (
        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`} alt={originalName} />
      ))}
    </>
  );
};
