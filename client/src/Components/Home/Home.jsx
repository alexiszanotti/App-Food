import React, { useState, useEffect } from "react";
import Recipe from "../Recipe/Recipe.jsx";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Paginado from "../Paginado/Paginado";
import Spinner from "../Spinner/Spinner";
import { fetchAllRecipes, fetchDiets } from "../../redux/recipesSlice";
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Home({ currentPage, setCurrentPage }) {
  const allRecipes = useSelector(state => state.recipeReducer.recipes);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(fetchAllRecipes());
    }
    dispatch(fetchDiets());
  }, [dispatch, allRecipes]);

  if (allRecipes?.length === 0) return <Spinner />;

  return (
    <div className='home-container'>
      <h1 className='title-home'>
        <i className='fas fa-utensils'></i> Recipes
      </h1>
      <SearchBar setCurrentPage={setCurrentPage} />
      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className='container-recipes'>
        {currentRecipes &&
          currentRecipes?.map(el => {
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
