import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllRecipes,
  logout,
  orderByName,
  orderByRank,
  searchRecipeByName,
} from "../../Redux/slice";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const startLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const { name: userName } = useSelector(state => state.auth);

  const [name, setName] = useState("");

  function handleClick() {
    dispatch(fetchAllRecipes());
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
  }

  function handleRank(e) {
    dispatch(orderByRank(e.target.value));
    setCurrentPage(1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchRecipeByName(name));
    setName("");
    setCurrentPage(1);
  }

  return (
    <div className='container-nav'>
      <button className='button-search' onClick={handleClick}>
        <i className='fas fa-sync-alt'></i>
      </button>
      <form className='form' onClick={e => handleSubmit(e)}>
        <input
          className='input-search'
          onChange={e => setName(e.target.value)}
          value={name}
          type='text'
          placeholder='Search recipe...'
        />

        <button type='submit' className='button-search'>
          <i className='fas fa-search'></i>
        </button>
      </form>
      <select className='input-search' onChange={handleSort}>
        <option value='all'>Order by </option>
        <option value='asc'>A - Z </option>
        <option value='des'>Z - A</option>
      </select>
      <select className='input-search' onChange={handleRank}>
        <option value=''>Order by </option>
        <option value='all'>Score -</option>
        <option value='score'>Score +</option>
      </select>

      <Link className='link' to='/recipe'>
        Create your recipe
      </Link>
      <div className='user-logout'>
        <p>{userName}</p>
        <button onClick={startLogout} className='btn-logut'>
          Logout
        </button>
      </div>
    </div>
  );
}
