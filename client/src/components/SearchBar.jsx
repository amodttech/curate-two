import React from "react";

function SearchBar({ searchTerm, setSearchTerm, getResults }) {
  return (
    <>
    <input
      type="text"
      id="search-term"
      name="search-term"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button onClick={getResults}>SEARCH</button>
    </>
  );
}

export default SearchBar;
