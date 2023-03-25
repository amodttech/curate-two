import { useState } from "react";
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundObjects, setFoundObjects] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getResults(e) {
    e.preventDefault();
    // turns on the searching indicator
    setSearching(true);

    try {
      //first API call, returns json with total number of objects and array of object IDs
      const apiResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`
      );
      const returnedIDs = await apiResponse.json();

      // destructure the object IDs from the response
      const { objectIDs } = returnedIDs;

      // destructure the total number value to useState
      setNumberOfResults(returnedIDs.total.toString());

      // map objects to an array
      const artObjectArray = await Promise.all(
        objectIDs.map(async (id) => {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          return await response.json();
        })
      );
      // turns off the searching indicator
      setSearching(false);

      // sets the array of objects to display
      setFoundObjects(artObjectArray.slice(0, 49));

    } catch {
      // turns off the searching indicator
      setSearching(false);
      console.log("bad response :/");
    }
  }

  console.log("foundObjects", foundObjects);

  return (
    <div className="App">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getResults={getResults}
      />
      <p>{numberOfResults ? `Results: ${numberOfResults}` : null}</p>
      <p>{searching ? "searching" : null}</p>
      <ResultDisplay foundObjects={foundObjects} />
    </div>
  );
}

export default App;
