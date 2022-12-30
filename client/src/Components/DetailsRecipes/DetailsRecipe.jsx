import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, clearDetailState } from "../../Store/slice";
import Spinner from "../Spinner/Spinner.jsx";
import "./DetailsRecipe.css";

export default function DetailsRecipe({ match }) {
  const recipe = useSelector(state => state.recipes.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails(match.params.id));

    return () => dispatch(clearDetailState());
  }, [dispatch, match.params.id]);

  if (recipe?.length === 0) {
    return <Spinner />;
  }

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
            <i className='icon fas fa-utensils'></i> {recipe.dishTypes + "  "}
          </h5>
          <h5 className='detail-subtitle'>
            <i className='icon fas fa-heartbeat'></i> {recipe.healthScore + " Pts."}
          </h5>
          <h5 className='detail-subtitle'>
            <i className='icon fas fa-balance-scale'></i>{" "}
            {recipe.diets?.map(({ name }) => name + " ")}
          </h5>
        </div>
        <Link to='/home'>
          <button className='btn-back'>Go Back</button>
        </Link>
      </div>
    </div>
  );
}
