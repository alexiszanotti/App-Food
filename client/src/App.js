import React from "react";
import "./App.css";
import Landing from "./Components/Landing/Landing";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import SearchBar from "./Components/SearchBar/SearchBar";

function App() {
  return (
    <div className='App'>
      <Route path='/' component={SearchBar} />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
