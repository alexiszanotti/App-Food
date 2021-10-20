import React, { useState } from "react";
import "./App.css";
import Landing from "./Components/Landing/Landing";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import SearchBar from "./Components/SearchBar/SearchBar";
import DetailsRecipe from "./Components/DetailsRecipes/DetailsRecipe";
import CreateRecipe from "./Components/CreateRecipe/CreateRecipe";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className='App'>
      <Route exact path='/' component={Landing} />
      <Switch>
        <Route path='/home'>
          <SearchBar setCurrentPage={setCurrentPage} />
          <Home currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Route>
        <Route path='/recipes/:id' component={DetailsRecipe} />

        <Route path='/recipe'>
          <CreateRecipe />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
