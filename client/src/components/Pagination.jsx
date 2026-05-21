export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const delta = 2;
  const range = [];
  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  const showLeftEllipsis = range[0] > 2;
  const showRightEllipsis = range[range.length - 1] < totalPages - 1;

  const btnClass = (active) =>
    `px-3 py-1.5 text-sm border transition-colors ${
      active
        ? "border-[#c8a96e] text-[#c8a96e] bg-[#2a2724]"
        : "border-[#3a3530] text-[#a09890] hover:border-[#c8a96e] hover:text-[#c8a96e]"
    }`;

  return (
    <div className="flex items-center gap-1 flex-wrap my-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 text-sm border border-[#3a3530] text-[#a09890]
                   hover:border-[#c8a96e] hover:text-[#c8a96e] disabled:opacity-30
                   disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {range[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={btnClass(currentPage === 1)}>1</button>
          {showLeftEllipsis && <span className="text-[#6b6560] px-1">…</span>}
        </>
      )}

      {range.map((n) => (
        <button key={n} onClick={() => onPageChange(n)} className={btnClass(currentPage === n)}>
          {n}
        </button>
      ))}

      {range[range.length - 1] < totalPages && (
        <>
          {showRightEllipsis && <span className="text-[#6b6560] px-1">…</span>}
          <button onClick={() => onPageChange(totalPages)} className={btnClass(currentPage === totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 text-sm border border-[#3a3530] text-[#a09890]
                   hover:border-[#c8a96e] hover:text-[#c8a96e] disabled:opacity-30
                   disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}