import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CreateRecipe, DetailRecipe, Home, Landing, Login, Register } from "./pages";
import "./App.css";

function App() {
  //Pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route
        path='/home'
        element={<Home currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      />
      <Route path='/recipes/:id' element={<DetailRecipe />} />
      <Route path='/recipe' element={<CreateRecipe />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default App;
