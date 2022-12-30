import React, { useEffect } from "react";
import Recipe from "../Recipe/Recipe.jsx";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Paginado from "../Paginado/Paginado";
import Spinner from "../Spinner/Spinner";
import { fetchAllRecipes } from "../../Store/slice";
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Home({ currentPage, setCurrentPage }) {
  const allRecipes = useSelector(state => state.recipes.recipes);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(fetchAllRecipes());
    }
  }, [dispatch, allRecipes]);

  if (allRecipes?.length === 0) return <Spinner />;

  return (
    <div className='home-container'>
      <div className='div-nav'>
        <h1 className='title-home'>
          <i className='fas fa-utensils'></i> Recipes
        </h1>
      </div>
      <SearchBar setCurrentPage={setCurrentPage} />
      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className='container-recipes'>
        {currentRecipes &&
          currentRecipes?.map(({ id, image, title, readyInMinutes, servings, diets }) => {
            return (
              <Recipe
                key={id}
                id={id}
                image={image}
                title={title}
                readyInMinutes={readyInMinutes}
                servings={servings}
                diet={diets}
              />
            );
          })}
      </div>
    </div>
  );
}
