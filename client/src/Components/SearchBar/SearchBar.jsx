import React from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getRecipes,
  filterByDiet,
  orderByName,
  orderByRank,
  searchByName,
  getDiets,
} from "../../Actions/index.js";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const diet = useSelector(state => state.diets);

  const [orden, setOrden] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getDiets());
  }, []);

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
    e.preventDefault(e);
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
      <form onClick={e => handleSubmit(e)}>
        <input
          className='input-search'
          onChange={e => handleInputChange(e)}
          type='text'
          placeholder='Search recipe...'
        />
        <button type='submit' className='btn-search'>
          Search
        </button>
      </form>
      <select className='input-search' onChange={e => handleFilterDiet(e)}>
        {diet.map(el => {
          return <option value={el.name}>{el.name}</option>;
        })}
      </select>

      <select className='input-search' onChange={e => handleSort(e)}>
        <option>Order by... </option>
        <option value='asc'>Ascending </option>
        <option value='des'>Descending</option>
      </select>
      <select className='input-search' onChange={e => handleRank(e)}>
        <option value=''>Order by</option>
        <option value='rank'>Rank</option>
      </select>

      <Link className='link' to='/recipe'>
        Create Recipe
      </Link>
    </div>
  );
}
