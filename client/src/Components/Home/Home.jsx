import React from "react";
import Recipe from "../Recipe/Recipe.jsx";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllRecipes, fetchDiets } from "../../redux/recipesSlice";
import Paginado from "../Paginado/Paginado";

export default function Home({ currentPage, setCurrentPage }) {
  const allRecipes = useSelector(state => state.recipeReducer.recipes);
  const dispatch = useDispatch();
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginado = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchDiets());
  }, [dispatch]);

  return (
    <div className='home-container'>
      <h1 className='title-home'>
        <i className='fas fa-utensils'></i> Recipes
      </h1>

      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes?.length}
        paginado={paginado}
      />
      <div className='container-recipes'>
        {currentRecipes?.map(el => {
          return (
            <Recipe
              key={el.id}
              id={el.id}
              image={el.image}
              title={el.title}
              readyInMinutes={el.readyInMinutes}
              servings={el.servings}
              diet={`Diet: ${el.diets.map(el => el.name || el)}`}
            />
          );
        })}
      </div>
    </div>
  );
}
