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

export default function SearchBar({ setCurrentPage, setOrden }) {
  const dispatch = useDispatch();
  const diet = useSelector(state => state.diets);

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
        <option value='all'>All</option>
        {diet.map(el => {
          return (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </select>

      <select className='input-search' onChange={e => handleSort(e)}>
        <option value='all'>Order by </option>
        <option value='asc'>A - Z </option>
        <option value='des'>Z - A</option>
      </select>
      <select className='input-search' onChange={e => handleRank(e)}>
        <option value=''>Order by </option>
        <option value='all'>Score -</option>
        <option value='score'>Score +</option>
      </select>

      <Link className='link' to='/recipe'>
        Create Recipe
      </Link>
    </div>
  );
}
