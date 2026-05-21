import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function SearchBar({ initialValue, onSearch, filtersOpen, onToggleFilters, hasActiveFilters }) {
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  function handleKeyDown(e) {
    if (e.key === "Enter") onSearch(value);
  }

  return (
    <div className="flex gap-2 mb-3">
      <input
        className="flex-1 bg-[#2a2724] border border-[#4a4540] text-[#e8e4de] px-4 py-2 text-sm
                   focus:outline-none focus:border-[#c8a96e] placeholder-[#6b6560] transition-colors"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search the Met collection…"
      />
      <button
        onClick={() => onSearch(value)}
        className="px-5 py-2 bg-[#c8a96e] text-[#1a1816] text-sm font-semibold tracking-widest uppercase
                   hover:bg-[#d4b87a] transition-colors"
        style={{ fontFamily: "'Secular One', sans-serif" }}
      >
        Search
      </button>
      <button
        onClick={onToggleFilters}
        title="Toggle filters"
        className={`px-3 py-2 border transition-colors flex items-center gap-1.5 text-sm
          ${filtersOpen || hasActiveFilters
            ? "border-[#c8a96e] text-[#c8a96e] bg-[#2a2724]"
            : "border-[#4a4540] text-[#a09890] hover:border-[#c8a96e] hover:text-[#c8a96e]"
          }`}
      >
        <SlidersHorizontal size={15} />
        {hasActiveFilters && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
        )}
      </button>
    </div>
  );
}