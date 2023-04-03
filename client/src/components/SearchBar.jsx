import React from "react";

function SearchBar({ searchTerm, setSearchTerm, getAllResults }) {
  function handleKeypress(e) {
    if (e.keyCode === 13) {
      getAllResults(e);
    }
  }

  return (
    <div className="search-container">
      <button className="search-button" type="submit" onClick={getAllResults}>
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
