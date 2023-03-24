import React from "react";

function ResultDisplay({ foundObjects }) {
  const objectList = foundObjects.map((artObject, index) => (
    <li key={index} className="object-card">
      <p>
        objectID:{" "}
        <a href={artObject.objectURL} target="_blank">
          {artObject.objectID}
        </a>
      </p>

      <p>title: {artObject.title}</p>

      {artObject.artistDisplayName ? (
        <p>artistDisplayName: {artObject.artistDisplayName}</p>
      ) : (
        <p>artistDisplayName: Unknown</p>
      )}

      <p>artistdisplayBio: {artObject.artistDisplayBio}</p>

      <p>artistNationality: {artObject.artistNationality}</p>

      <p>objectDate: {artObject.objectDate}</p>

      <p>dimensions: {artObject.dimensions}</p>

      <p>medium: {artObject.medium}</p>

      <p>department: {artObject.department}</p>

      {artObject.artistDisplayName ? (
        <p>artistDisplayName: {artObject.artistDisplayName}</p>
      ) : null}

      {artObject.primaryImageSmall ? (
        <a href={artObject.primaryImage} target="_blank">
          <img src={artObject.primaryImageSmall} alt={artObject.title} />
        </a>
      ) : (
        "no image available"
      )}
    </li>
  ));
  return <ul className="object-display">{objectList}</ul>;
}

export default ResultDisplay;
