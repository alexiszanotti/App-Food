import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../../Actions";
import "./Landing.css";
import { useDispatch } from "react-redux";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <div className='container'>
      <main className='landing'>
        <Link to='/home'>
          <button className='btnLanding'>Home</button>
        </Link>
        <h1 className='title'>
          A healthy outside <br /> starts from <br /> the inside...
        </h1>
      </main>
    </div>
  );
}
