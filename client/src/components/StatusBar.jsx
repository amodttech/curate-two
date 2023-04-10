import React from "react";

function StatusBar({ numberOfResults}) {
  return (
    <div className="status-bar">
      <h6>{numberOfResults ? `Results: ${numberOfResults.current}` : null}</h6>
    </div>
  );
}

export default StatusBar;
