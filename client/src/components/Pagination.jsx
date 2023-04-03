import React from "react";

function Pagination({ objectsPerPage, numberOfResults }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfResults / objectsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      {objectsPerPage} items per page, {numberOfResults} results, {pageNumbers.slice(-1)} pages
    </div>
  );
}

export default Pagination;
