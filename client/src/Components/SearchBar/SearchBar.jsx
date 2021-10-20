import React from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getRecipes,
  filterByDiet,
  orderByName,
  orderByRank,
  searchByName,
} from "../../Actions/index.js";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const [orden, setOrden] = useState("");
  const [name, setName] = useState("");

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterDiet(e) {
    dispatch(filterByDiet(e.target.value));
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleRank(e) {
    dispatch(orderByRank(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(searchByName(name));
  }

  return (
    <div className='container-nav'>
      <button
        onClick={e => {
          handleClick(e);
        }}
      >
        Reload Recipes
      </button>
      <form>
        <input onChange={e => handleInputChange(e)} type='text' placeholder='Search recipe...' />
        <button tipe='submit' onClick={e => handleSubmit(e)} className='btn-search'>
          Search
        </button>
      </form>
      <select onChange={e => handleFilterDiet(e)}>
        <option value='all'>All</option>
        <option value='gluten free'>Gluten Free</option>
        <option value='Ketogenic'>Ketogenic</option>
        <option value='lacto ovo vegetarian'>Vegetarian</option>
        <option value='lacto ovo vegetarian'>Lacto-Ovo-Vegetarian</option>
        <option value='lacto ovo vegetarian'>Ovo-Vegetarian</option>
        <option value='vegan'>Vegan</option>
        <option value='pescatarian'>Pescetarian</option>
        <option value='paleolithic'>Paleo</option>
        <option value='primal'>Primal</option>
        <option value='fodmap friendly'>Low FODMAP</option>
        <option value='whole 30'>Whole30</option>
      </select>

      <select onChange={e => handleSort(e)}>
        <option>Order by... </option>
        <option value='asc'>Ascending </option>
        <option value='des'>Descending</option>
      </select>
      <select onChange={e => handleRank(e)}>
        <option value=''>Order by</option>
        <option value='rank'>Rank</option>
      </select>

      <Link className='link' to='/recipe'>
        Create Recipe
      </Link>
    </div>
  );
}
