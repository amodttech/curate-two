import { useState } from "react";
import ReactPaginate from 'react-paginate'
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";
import ScrollButton from "./components/ScrollButton";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import Pagination from "./components/Pagination";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundObjects, setFoundObjects] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchStatus, setSearchStatus] = useState("Contacting the Museum...");

  // For pagination:
  const [displayObjects, setDisplayObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(10);
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const currentDisplayObjects = displayObjects.slice(
    indexOfFirstObject,
    indexOfLastObject
  );

  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getResults(e) {
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

      /////  Sends all objects to pagination logic
      setDisplayObjects(artObjectArray);
      //////

      // sets the array of objects to display
      setFoundObjects(artObjectArray.slice(0, 49));
      setSearching(false);
    } catch {
      // turns off the searching indicator
      setSearchStatus("Something Has Gone Horribly Wrong!  HELP!");
      setSearching(false);
      console.log("bad response :/");
    }
  }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== Math.ceil(displayObjects.length / objectsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function paginate({selected}) {
    setCurrentPage(selected + 1)
  }

  console.log("foundObjects", foundObjects);

  return (
    <div className="App">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getResults={getResults}
      />
      <StatusBar
        searching={searching}
        numberOfResults={numberOfResults}
        searchStatus={searchStatus}
      />
      {/* <Pagination
        objectsPerPage={objectsPerPage}
        numberOfResults={numberOfResults}
        previousPage={previousPage}
        nextPage={nextPage}
        paginate={paginate}
      /> */}
      <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(displayObjects.length / objectsPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
               />
      <ResultDisplay foundObjects={currentDisplayObjects} />
      <ScrollButton />
    </div>
  );
}

export default App;
