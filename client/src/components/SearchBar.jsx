import React from "react";

function SearchBar({ searchTerm, setSearchTerm, getResults }) {
  function handleKeypress(e) {
    if (e.keyCode === 13) {
      getResults(e);
    }
  }

  return (
    <div className="search-container">
      <button className="search-button" type="submit" onClick={getResults}>
        SEARCH
      </button>
      <input
        className="search-input"
        type="text"
        id="search-term"
        name="search-term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e)=>handleKeypress(e)}
      />
    </div>
  );
}

export default SearchBar;
