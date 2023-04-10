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

  // // For pagination:
  const [displayObjects, setDisplayObjects] = useState([]);
  console.log('displayObjects', displayObjects)
  const [currentPage, setCurrentPage] = useState(1);
  const [objectsPerPage, setObjectsPerPage] = useState(25);
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  // const objectsForDisplay = displayObjects.slice(
  //   indexOfFirstObject,
  //   indexOfLastObject
  // );

  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getAllResults() {
    try {
      const apiResponse = await fetch(`${METurl}${searchTerm.current.value}`);
      fullResponse.current = await apiResponse.json();
      // setNumberOfResults(fullResponse.current.total)
      numberOfResults.current = fullResponse.current.total;
      allIds.current = fullResponse.current.objectIDs;

      getObjectsfromID(allIds.current.slice(0, 24));

      // setFoundObjects(artObjectArray.slice(0, 49));
      // setSearching(false);
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
    await setDisplayObjects(objectArray);
  }

  // function previousPage() {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }

  // function nextPage() {
  //   if (currentPage !== Math.ceil(displayObjects.length / objectsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }

  // function paginate({ selected }) {
  //   setCurrentPage(selected + 1);
  // }

  // console.log("foundObjects", foundObjects);

  return (
    <div className="App">
      <Header />
      <SearchBar searchTerm={searchTerm} getAllResults={getAllResults} />
      <StatusBar numberOfResults={numberOfResults} />
      {/* <Pagination
        currentPage={currentPage}
        objectsPerPage={objectsPerPage}
        numberOfResults={numberOfResults}
        previousPage={previousPage}
        nextPage={nextPage}
        paginate={paginate}
      /> */}
      <ResultDisplay objectsForDisplay={displayObjects} />
      <ScrollButton />
    </div>
  );
}

export default App;
