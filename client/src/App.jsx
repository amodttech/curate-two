import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(50);

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const idsToDisplay = allObjectIDs.slice(
    indexOfFirstObject,
    indexOfLastObject
  );

  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getAllResults(e) {
    try {
      const apiResponse = await fetch(`${METurl}${searchTerm}`);
      const returnedPackage = await apiResponse.json();
      await setAllObjectIDs(returnedPackage.objectIDs);
      await setNumberOfResults(returnedPackage.total);
    } catch {
      console.log("bad response :/");
    }
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function nextPage() {
    if (currentPage !== Math.ceil(numberOfResults / objectsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  console.log("currentPage", currentPage);

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
      {allObjectIDs.length !== 0 ? (
        <Pagination
          currentPage={currentPage}
          objectsPerPage={objectsPerPage}
          paginate={paginate}
          numberOfResults={numberOfResults}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ) : null}
      <ResultDisplay idsToDisplay={idsToDisplay} />
      <ScrollButton />
    </div>
  );
}

export default App;
