import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../redux/recipesSlice";
import { useEffect } from "react";
import "./DetailsRecipe.css";

export default function DetailsRecipe(props) {
  const recipe = useSelector(state => state.recipeReducer.details);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className='d-container'>
      <div className='detail-container'>
        <div className='title-cont'>
          <h2 className='detail-title'> {recipe.title}</h2>
        </div>
        <div
          className='detail-sum'
          dangerouslySetInnerHTML={{ __html: `<b>Summary:</b> ${recipe.summary}` }}
        />

        <div
          className='detail-par'
          dangerouslySetInnerHTML={{
            __html: `<b>Instruction:</b>  ${recipe.instructions}`,
          }}
        />
        <div className='subtitle-cont'>
          <h5 className='detail-subtitle'>
            <i className='icon' class='fas fa-utensils'></i> {recipe.dishTypes + "  "}
          </h5>
          <h5 className='detail-subtitle'>
            <i className='icon' class='fas fa-heartbeat'></i> {recipe.healthScore + " Pts."}
          </h5>
          <h5 className='detail-subtitle'>
            <i className='icon' class='fas fa-balance-scale'></i>{" "}
            {recipe.diets?.map(el => el.name + " ")}
          </h5>
        </div>
        <Link to='/home'>
          <button className='btn-back'>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
