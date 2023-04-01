import React from "react";

function StatusBar({ numberOfResults, searching, searchStatus }) {
  return (
    <div className="status-bar">
      <h6>{searching ? searchStatus : null}</h6>
      <h6>{numberOfResults ? `Results: ${numberOfResults}` : null}</h6>
    </div>
  );
}

export default StatusBar;
