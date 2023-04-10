import { useRef, useState } from "react";
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";
import ScrollButton from "./components/ScrollButton";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import Pagination from "./components/Pagination";

function App() {
  const searchTerm = useRef("");
  const fullResponse = useRef([]);
  const numberOfResults = useRef(0);
  const allIds = useRef([]);
  const objectsPerPage = 20;

  //useStates
  const [displayObjects, setDisplayObjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("currentPage", currentPage);

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;

  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getAllResults() {
    setCurrentPage(1)
    try {
      const apiResponse = await fetch(`${METurl}${searchTerm.current.value}`);
      fullResponse.current = await apiResponse.json();
      numberOfResults.current = fullResponse.current.total;
      allIds.current = fullResponse.current.objectIDs;

      getObjectsfromID(allIds.current.slice(0, objectsPerPage));
    } catch {
      console.log("bad response :/");
    }
  }

  async function getObjectsfromID(idArray) {
    const objectArray = await Promise.all(
      idArray.map(async (id) => {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        return await response.json();
      })
    );
    const imagedObjects = objectArray.filter((object) => {
      return object.primaryImageSmall;
    });
    const noImage = objectArray.filter((object) => {
      return object.primaryImageSmall === "";
    });
    await setDisplayObjects([...imagedObjects, ...noImage]);
  }

  function previousPage() {
    console.log("clicked previous");
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      getObjectsfromID(
        allIds.current.slice(indexOfFirstObject, indexOfLastObject)
      );
    }
  }
  function nextPage() {
    console.log("clicked next page");
    if (currentPage !== Math.ceil(allIds.current.length / objectsPerPage)) {
      setCurrentPage(currentPage + 1);
      getObjectsfromID(
        allIds.current.slice(indexOfFirstObject, indexOfLastObject)
      );
    }
  }

  function paginate(pageNumber) {
    console.log(`clicked page number ${pageNumber}`);
    setCurrentPage(pageNumber);
    getObjectsfromID(
      allIds.current.slice(indexOfFirstObject, indexOfLastObject)
    );
  }

  return (
    <div className="App">
      <Header />
      <SearchBar searchTerm={searchTerm} getAllResults={getAllResults} />
      <StatusBar numberOfResults={numberOfResults} />
      {displayObjects.length ? (
        <Pagination
          currentPage={currentPage}
          objectsPerPage={objectsPerPage}
          numberOfResults={numberOfResults.current}
          previousPage={previousPage}
          nextPage={nextPage}
          paginate={paginate}
        />
      ) : null}

      <ResultDisplay objectsForDisplay={displayObjects} />
      {displayObjects.length ? (
        <Pagination
          currentPage={currentPage}
          objectsPerPage={objectsPerPage}
          numberOfResults={numberOfResults.current}
          previousPage={previousPage}
          nextPage={nextPage}
          paginate={paginate}
        />
      ) : null}
      <ScrollButton />
    </div>
  );
}

export default App;
