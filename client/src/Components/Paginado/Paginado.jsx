import React from "react";
import "./Paginado.css";

export default function Paginado({ recipesPerPage, setCurrentPage, currentPage, allRecipes }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = pageNumbers => {
    if (pageNumbers !== 1) {
      setCurrentPage(pageNumbers - 1);
    }
    return;
  };

  const nextPage = page => {
    if (page === pageNumbers.length) return;
    if (page !== pageNumbers.length) {
      setCurrentPage(page + 1);
    }
    return;
  };

  return (
    <nav className='container'>
      <ul className='paginado'>
        <button
          onClick={() => prevPage(currentPage)}
          className={currentPage === 1 ? "btn-disabled" : "btn-paginado"}
        >
          <i className='fas fa-chevron-left'></i>
        </button>
        {pageNumbers?.map(page => {
          return (
            <button
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : "number"}
              key={page}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => nextPage(currentPage)}
          className={currentPage === pageNumbers.length ? "btn-disabled" : "btn-paginado"}
        >
          <i className='fas fa-chevron-right'></i>
        </button>
      </ul>
    </nav>
  );
}
