import React from "react";

function SearchBar({ searchTerm, getAllResults }) {
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
        ref={searchTerm}
        onKeyDown={(e)=>handleKeypress(e)}
      />
    </div>
  );
}

export default SearchBar;
