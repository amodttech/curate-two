import { useState } from "react";

export default function ObjectCard({ artObject }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="bg-[#221f1c] border border-[#3a3530] flex flex-col hover:border-[#c8a96e]
                    transition-colors duration-200 group">
      <div className="aspect-square overflow-hidden bg-[#1a1816] flex items-center justify-center">
        {artObject.primaryImageSmall ? (
          <a href={artObject.primaryImage || artObject.primaryImageSmall} target="_blank" rel="noreferrer">
            <img
              src={artObject.primaryImageSmall}
              alt={artObject.title}
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
            />
          </a>
        ) : (
          <p className="text-xs text-[#6b6560] text-center px-4 leading-relaxed">
            Image not available due to copyright restrictions
          </p>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-sm font-semibold text-[#e8e4de] leading-snug line-clamp-2">
          {artObject.title || "Untitled"}
        </p>
        {artObject.artistDisplayName && (
          <p className="text-xs text-[#a09890]">{artObject.artistDisplayName}</p>
        )}
        {artObject.objectDate && (
          <p className="text-xs text-[#6b6560]">{artObject.objectDate}</p>
        )}

        <button
          onClick={() => setDetailsOpen((o) => !o)}
          className="mt-2 text-xs text-[#c8a96e] hover:text-[#d4b87a] text-left transition-colors"
        >
          {detailsOpen ? "Hide details ↑" : "More details ↓"}
        </button>

        {detailsOpen && (
          <div className="mt-1 pt-2 border-t border-[#3a3530] flex flex-col gap-1">
            {artObject.medium && (
              <p className="text-xs text-[#a09890]">
                <span className="text-[#6b6560]">Medium: </span>{artObject.medium}
              </p>
            )}
            {artObject.dimensions && (
              <p className="text-xs text-[#a09890]">
                <span className="text-[#6b6560]">Dimensions: </span>{artObject.dimensions}
              </p>
            )}
            {artObject.department && (
              <p className="text-xs text-[#a09890]">
                <span className="text-[#6b6560]">Department: </span>{artObject.department}
              </p>
            )}
            {artObject.artistNationality && (
              <p className="text-xs text-[#a09890]">
                <span className="text-[#6b6560]">Nationality: </span>{artObject.artistNationality}
              </p>
            )}
            {artObject.creditLine && (
              <p className="text-xs text-[#a09890]">
                <span className="text-[#6b6560]">Credit: </span>{artObject.creditLine}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto pt-2">
          
            <a href={artObject.objectURL}
            target="_blank"
            rel="noreferrer"
            className="text-[0.65rem] text-[#6b6560] hover:text-[#c8a96e] transition-colors"
          >
            View on Met website →
          </a>
        </div>
      </div>
    </div>
  );
}