import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../../Actions";
import "./Landing.css";
import { useDispatch } from "react-redux";
import Video from "../../Public/VideoLanding.mp4";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <main className='landing'>
      <h1 className='title'>
        A healthy outside <br /> starts from <br /> the inside...
      </h1>
      <video autoplay='autoplay'>
        <source src={Video} type='video/mp4' />
      </video>
      <Link to='/home'>
        <button className='btnLanding'>Home</button>
      </Link>
      <div className='capa'></div>
    </main>
  );
}
