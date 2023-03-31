import React from "react";

function SearchBar({ searchTerm, setSearchTerm, getResults }) {
  return (
    <div className="search-container">
      <button className="search-button" onClick={getResults}>
        SEARCH
      </button>
      <input
        className="search-input"
        type="text"
        id="search-term"
        name="search-term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
