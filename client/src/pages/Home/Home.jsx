import React, { useEffect } from "react";
import Recipe from "../../Components/Recipe/Recipe.jsx";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Paginado from "../../Components/Paginado/Paginado";
import Spinner from "../../Components/Spinner/Spinner";
import { fetchAllRecipes } from "../../Redux/slice";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";

export const Home = ({ currentPage, setCurrentPage }) => {
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
};
