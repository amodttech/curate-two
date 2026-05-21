import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import ResultDisplay from "./components/ResultDisplay";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import ScrollButton from "./components/ScrollButton";

const OBJECTS_PER_PAGE = 20;
const MET_SEARCH_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search";
const MET_OBJECT_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

export const DEPARTMENTS = [
  { id: 1,  name: "American Decorative Arts" },
  { id: 3,  name: "Ancient Near Eastern Art" },
  { id: 4,  name: "Arms and Armor" },
  { id: 5,  name: "Arts of Africa, Oceania, and the Americas" },
  { id: 6,  name: "Asian Art" },
  { id: 7,  name: "The Cloisters" },
  { id: 8,  name: "The Costume Institute" },
  { id: 9,  name: "Drawings and Prints" },
  { id: 10, name: "Egyptian Art" },
  { id: 11, name: "European Paintings" },
  { id: 12, name: "European Sculpture and Decorative Arts" },
  { id: 13, name: "Greek and Roman Art" },
  { id: 14, name: "Islamic Art" },
  { id: 15, name: "The Robert Lehman Collection" },
  { id: 16, name: "The Libraries" },
  { id: 17, name: "Medieval Art" },
  { id: 18, name: "Musical Instruments" },
  { id: 19, name: "Photographs" },
  { id: 21, name: "Modern Art" },
];

function buildSearchUrl(params) {
  const url = new URL(MET_SEARCH_URL);
  url.searchParams.set("q", params.q || "");
  url.searchParams.set("hasImages", params.hasImages === "false" ? "false" : "true");
  if (params.departmentId) url.searchParams.set("departmentId", params.departmentId);
  if (params.dateBegin && params.dateEnd) {
    url.searchParams.set("dateBegin", params.dateBegin);
    url.searchParams.set("dateEnd", params.dateEnd);
  }
  return url.toString();
}

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allIds, setAllIds] = useState([]);
  const [displayObjects, setDisplayObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("q") || "";
  const hasImages = searchParams.get("hasImages") || "true";
  const departmentId = searchParams.get("departmentId") || "";
  const dateBegin = searchParams.get("dateBegin") || "";
  const dateEnd = searchParams.get("dateEnd") || "";
  const mediumFilter = searchParams.get("medium") || "";
  const nationalityFilter = searchParams.get("artistNationality") || "";

  const fetchPage = useCallback(async (ids, page, medium, nationality) => {
    if (!ids.length) return;
    setLoading(true);
    setError(null);
    const start = (page - 1) * OBJECTS_PER_PAGE;
    const end = start + OBJECTS_PER_PAGE * 3;
    const slice = ids.slice(start, Math.min(end, ids.length));
    try {
      const objects = await Promise.all(
        slice.map((id) => fetch(`${MET_OBJECT_URL}/${id}`).then((r) => r.json()))
      );
      let filtered = objects;
      if (medium) filtered = filtered.filter((o) => o.medium?.toLowerCase().includes(medium.toLowerCase()));
      if (nationality) filtered = filtered.filter((o) => o.artistNationality?.toLowerCase().includes(nationality.toLowerCase()));
      const withImage = filtered.filter((o) => o.primaryImageSmall);
      const noImage = filtered.filter((o) => !o.primaryImageSmall);
      setDisplayObjects([...withImage, ...noImage].slice(0, OBJECTS_PER_PAGE));
    } catch {
      setError("Failed to load artworks. The Met API may be temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  const runSearch = useCallback(async (params) => {
    if (!params.q?.trim()) return;
    setLoading(true);
    setError(null);
    setDisplayObjects([]);
    try {
      const url = buildSearchUrl(params);
      const res = await fetch(url);
      const data = await res.json();
      if (!data.objectIDs || data.objectIDs.length === 0) {
        setAllIds([]);
        setDisplayObjects([]);
        setLoading(false);
        setError("No results found. Try a different search term or adjust your filters.");
        return;
      }
      setAllIds(data.objectIDs);
      await fetchPage(data.objectIDs, 1, params.medium, params.artistNationality);
    } catch {
      setError("Search failed. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [fetchPage]);

  useEffect(() => {
    if (!query) return;
    runSearch({ q: query, hasImages, departmentId, dateBegin, dateEnd, medium: mediumFilter, artistNationality: nationalityFilter });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, hasImages, departmentId, dateBegin, dateEnd, mediumFilter, nationalityFilter]);

  useEffect(() => {
    if (!allIds.length || currentPage === 1) return;
    fetchPage(allIds, currentPage, mediumFilter, nationalityFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function handleSearch(newQuery) {
    const next = new URLSearchParams(searchParams);
    next.set("q", newQuery);
    next.set("page", "1");
    setSearchParams(next);
  }

  function handleFilterChange(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) { next.set(key, value); } else { next.delete(key); }
    next.set("page", "1");
    setSearchParams(next);
  }

  function handlePageChange(page) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalPages = Math.ceil(allIds.length / OBJECTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#1a1816] text-[#e8e4de]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Header />
        <SearchBar
          initialValue={query}
          onSearch={handleSearch}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen((o) => !o)}
          hasActiveFilters={!!(departmentId || dateBegin || mediumFilter || nationalityFilter || hasImages === "false")}
        />
        {filtersOpen && (
          <FilterPanel
            departmentId={departmentId}
            dateBegin={dateBegin}
            dateEnd={dateEnd}
            medium={mediumFilter}
            artistNationality={nationalityFilter}
            hasImages={hasImages}
            onChange={handleFilterChange}
          />
        )}
        <StatusBar total={allIds.length} query={query} loading={loading} error={error} />
        {totalPages > 1 && !loading && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
        <ResultDisplay objects={displayObjects} loading={loading} />
        {totalPages > 1 && !loading && displayObjects.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
        <ScrollButton />
      </div>
    </div>
  );
}