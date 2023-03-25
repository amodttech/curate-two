import React from "react";
import ObjectCard from "./ObjectCard";

function ResultDisplay({ foundObjects }) {
  const objectList = foundObjects.map((artObject, index) => (
    <ObjectCard key={index} artObject={artObject}/>
  ));
  return <ul className="object-display">{objectList}</ul>;
}

export default ResultDisplay;
