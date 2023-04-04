import { useState, useTransition } from "react";
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";
import ScrollButton from "./components/ScrollButton";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import Pagination from "./components/Pagination";

function App() {
  //search State
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState("Contacting the Museum...");
  const [numberOfResults, setNumberOfResults] = useState(null);

  //API Call State
  const [allObjectIDs, setAllObjectIDs] = useState([]);
  const [objectsToDisplay, setObjectsToDisplay] = useState([]);

  //Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [objectsPerPage, setObjectsPerPage] = useState(10)

  // const indexOfLastObject = currentPage * objectsPerPage
  // const indexOfFirstObject = indexOfLastObject - objectsPerPage
  // const currentObjectIDs = allObjects.slice

  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getAllResults(e) {
    e.preventDefault();
    setSearching(true)
    try {
      const apiResponse = await fetch(`${METurl}${searchTerm}`);
      const returnedPackage = await apiResponse.json();
      setSearchStatus("Found relevant objects")
      setAllObjectIDs(returnedPackage.objectIDs)
      setNumberOfResults(returnedPackage.total)
      setSearchStatus("Rendering results")
      getFirstPage()
    } catch {
      console.log("bad response :/");
      setSearchStatus('Sorry, there was an error.')
    }
  }

  async function getFirstPage() {
    const first50 = allObjectIDs.slice(0, 49)
    console.log('first50', first50)
    getObjectData(first50)
  }

  async function getObjectData(arrayOfIDs) {

          // map objects to an array
          const artObjectArray = await Promise.all(
            arrayOfIDs.map(async (id) => {
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

  }

  console.log('allObjectIDs', allObjectIDs)
  console.log('objectsToDisplay', objectsToDisplay)
  console.log('numberOfResults', numberOfResults)

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
