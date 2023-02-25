import React, { useEffect, useState } from "react";
import Recipe from "../../Components/Recipe/Recipe.jsx";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Paginado from "../../Components/Paginado/Paginado";
import Spinner from "../../Components/Spinner/Spinner";
import { fetchAllRecipes } from "../../Redux/slice";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import Swal from "sweetalert2";

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { recipes: allRecipes, error } = useSelector(state => state.recipes);
  const recipesPerPage = 10;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(fetchAllRecipes());
    }
  }, [dispatch, allRecipes]);

  if (error) {
    Swal.fire(error, "", "error");
  }

  if (allRecipes?.length === 0) return <Spinner />;

  return (
    <div className='home-container'>
      <SearchBar setCurrentPage={setCurrentPage} />
      <Paginado
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes?.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className='container-recipes'>
        {currentRecipes &&
          currentRecipes?.map(({ id, image, title, healthScore, servings, diets }) => {
            return (
              <Recipe
                key={id}
                id={id}
                image={image}
                title={title}
                healthScore={healthScore}
                servings={servings}
                diet={diets}
              />
            );
          })}
      </div>
    </div>
  );
};
