import { useState } from "react";
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundObjects, setFoundObjects] = useState([]);
  const [searching, setSearching] = useState(false);
  const METurl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=";

  async function getResults(e) {
    e.preventDefault();
    setSearching(true);
    try {
      const apiResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`
      );
      const returnedIDs = await apiResponse.json();
      const { objectIDs } = returnedIDs;
      const artObjectArray = await Promise.all(
        objectIDs.map(async (id) => {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          return await response.json();
        })
      );
      setSearching(false);
      setFoundObjects(artObjectArray.slice(0, 9));
    } catch {
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
      <p>{searching ? "searching" : null}</p>
      <ResultDisplay foundObjects={foundObjects} />
    </div>
  );
}

export default App;
