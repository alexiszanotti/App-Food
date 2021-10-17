import React from "react";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className='container-nav'>
      <div className='NavBar'>
        <div className='selects-nav'>
          <form>
            <input value='' type='text' placeholder='Search recipe...' />
            <button>Search</button>
          </form>
          <select>
            <option value=''>Diets Types...</option>
            <option value='Gluten_Free'>Gluten Free</option>
            <option value='Ketogenic'>Ketogenic</option>
            <option value='Vegetarian'>Vegetarian</option>
            <option value='Lacto_Vegetarian'>Lacto-Vegetarian</option>
            <option value='Ovo_Vegetarian'>Ovo-Vegetarian</option>
            <option value='Vegan'>Vegan</option>
            <option value='Pescetarian'>Pescetarian</option>
            <option value='Paleo'>Paleo</option>
            <option value='Primal'>Primal</option>
            <option value='Low_FODMAP'>Low FODMAP</option>
            <option value='Whole30'>Whole30</option>
          </select>
          <select>
            <option value='asc'>Order by... </option>
            <option value='asc'>Ascending </option>
            <option value='des'>Descending</option>
          </select>
          <select>
            <option value='rank'>By Rank</option>
          </select>
        </div>
      </div>
    </div>
  );
}
