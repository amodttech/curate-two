import ObjectCard from "./ObjectCard";

export default function ResultDisplay({ objects, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-[#221f1c] border border-[#3a3530] aspect-square animate-pulse" />
        ))}
      </div>
    );
  }

  if (!objects.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
      {objects.map((obj) => (
        <ObjectCard key={obj.objectID} artObject={obj} />
      ))}
    </div>
  );
}