import React from "react";
import Recipe from "../Recipe/Recipe.jsx";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipes, filterByDiet } from "../../Actions/index.js";
import Paginado from "../Paginado/Paginado";

export default function Home({ currentPage, setCurrentPage }) {
  const allRecipes = useSelector(state => state.recipes);
  const dispatch = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginado = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(filterByDiet());
  }, [dispatch]);
  return (
    <>
      <h1 className='title-home'>Recipe List</h1>

      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
      />
      <div className='container-recipes'>
        {currentRecipes?.map(el => {
          return (
            <Recipe
              key={el.Id}
              id={el.Id}
              image={el.Image}
              title={el.Title}
              diet={`Diet:  ${el.Diet}`}
            />
          );
        })}
      </div>
    </>
  );
}
