import React from "react";

function Pagination({
  currentPage,
  objectsPerPage,
  numberOfResults,
  paginate,
  previousPage,
  nextPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(numberOfResults / objectsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li onClick={previousPage} className="page-number">
          Previous
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className="page-number"
          >
            {number}
          </li>
        ))}
        {(currentPage === pageNumbers.slice(-1)) ? null : (
          <li className="page-number" onClick={nextPage}>
            Next
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;


//using: https://hygraph.com/blog/react-pagination