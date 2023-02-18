import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import { useDispatch } from "react-redux";
import Video from "../../assets/VideoLanding.mp4";
import { fetchAllRecipes, fetchDiets } from "../../Redux/slice";

export const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchDiets());
  }, [dispatch]);

  return (
    <main className='landing'>
      <h1 className='title'>
        A healthy outside <br /> starts from <br /> the inside...
      </h1>
      <video src={Video} autoPlay={true} />

      <Link to='/home'>
        <button className='btnLanding'>Home</button>
      </Link>
      <div className='capa'></div>
    </main>
  );
};
