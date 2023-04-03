import { useState } from "react";
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";
import ScrollButton from "./components/ScrollButton";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import Pagination from "./components/Pagination";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [objectsToDisplay, setObjectsToDisplay] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState("Contacting the Museum...");

  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getAllResults(e) {
    e.preventDefault();
    // turns on the searching indicator
    setSearching(true);

    try {
      //first API call, returns json with total number of objects and array of object IDs
      const apiResponse = await fetch(`${METurl}${searchTerm}`);
      const returnedIDs = await apiResponse.json();
      setSearchStatus("Receiving Results...");

      // destructure the object IDs from the response
      const { objectIDs } = returnedIDs;

      // destructure the total number value to useState
      setSearchStatus("Building Response...");
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
      setSearchStatus("Rendering Display...");

      // sets the array of objects to display
      setObjectsToDisplay(artObjectArray.slice(0, 49));
      setSearching(false);
    } catch {
      // turns off the searching indicator
      setSearchStatus("Something Has Gone Horribly Wrong!  HELP!");
      setSearching(false);
      console.log("bad response :/");
    }
  }


  return (
    <div className="App">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getAllResults={getAllResults}
      />
      <StatusBar
        searching={searching}
        numberOfResults={numberOfResults}
        searchStatus={searchStatus}
      />
      <Pagination />
      <ResultDisplay objectsToDisplay={objectsToDisplay} />
      <ScrollButton />
    </div>
  );
}

export default App;
