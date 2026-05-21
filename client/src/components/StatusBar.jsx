export default function StatusBar({ total, query, loading, error }) {
  if (error) {
    return <div className="text-sm text-red-400 mb-4 px-1">{error}</div>;
  }
  if (loading) {
    return <div className="text-sm text-[#a09890] mb-4 px-1 animate-pulse">Loading…</div>;
  }
  if (query && total > 0) {
    return (
      <div className="text-sm text-[#a09890] mb-4 px-1">
        {total.toLocaleString()} results for <span className="text-[#e8e4de]">"{query}"</span>
      </div>
    );
  }
  return null;
}