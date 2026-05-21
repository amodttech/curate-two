import { DEPARTMENTS } from "../App";

export default function FilterPanel({
  departmentId, dateBegin, dateEnd, medium, artistNationality, hasImages, onChange,
}) {
  return (
    <div className="bg-[#221f1c] border border-[#3a3530] p-4 mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-widest uppercase text-[#a09890]">Department</label>
        <select
          className="bg-[#2a2724] border border-[#4a4540] text-[#e8e4de] px-3 py-1.5 text-sm focus:outline-none focus:border-[#c8a96e]"
          value={departmentId}
          onChange={(e) => onChange("departmentId", e.target.value)}
        >
          <option value="">All departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-widest uppercase text-[#a09890]">Date range</label>
        <div className="flex gap-2">
          <input type="number" placeholder="From"
            className="w-full bg-[#2a2724] border border-[#4a4540] text-[#e8e4de] px-3 py-1.5 text-sm focus:outline-none focus:border-[#c8a96e] placeholder-[#6b6560]"
            value={dateBegin} onChange={(e) => onChange("dateBegin", e.target.value)} />
          <input type="number" placeholder="To"
            className="w-full bg-[#2a2724] border border-[#4a4540] text-[#e8e4de] px-3 py-1.5 text-sm focus:outline-none focus:border-[#c8a96e] placeholder-[#6b6560]"
            value={dateEnd} onChange={(e) => onChange("dateEnd", e.target.value)} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-widest uppercase text-[#a09890]">Medium</label>
        <input type="text" placeholder="e.g. oil, watercolor, bronze…"
          className="bg-[#2a2724] border border-[#4a4540] text-[#e8e4de] px-3 py-1.5 text-sm focus:outline-none focus:border-[#c8a96e] placeholder-[#6b6560]"
          value={medium} onChange={(e) => onChange("medium", e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-widest uppercase text-[#a09890]">Artist nationality</label>
        <input type="text" placeholder="e.g. French, Japanese…"
          className="bg-[#2a2724] border border-[#4a4540] text-[#e8e4de] px-3 py-1.5 text-sm focus:outline-none focus:border-[#c8a96e] placeholder-[#6b6560]"
          value={artistNationality} onChange={(e) => onChange("artistNationality", e.target.value)} />
      </div>
      <div className="flex flex-col gap-1 justify-end">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => onChange("hasImages", hasImages === "true" ? "false" : "true")}
            className={`w-9 h-5 rounded-full transition-colors relative ${hasImages === "true" ? "bg-[#c8a96e]" : "bg-[#4a4540]"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${hasImages === "true" ? "translate-x-4" : "translate-x-0"}`} />
          </div>
          <span className="text-sm text-[#a09890]">Images only</span>
        </label>
      </div>
      <div className="flex flex-col gap-1 justify-end">
        <button
          onClick={() => {
            onChange("departmentId", "");
            onChange("dateBegin", "");
            onChange("dateEnd", "");
            onChange("medium", "");
            onChange("artistNationality", "");
            onChange("hasImages", "true");
          }}
          className="text-xs tracking-widest uppercase text-[#6b6560] hover:text-[#c8a96e] transition-colors text-left"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}