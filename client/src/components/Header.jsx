import museumIcon from "../assets/museum.svg";

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <img src={museumIcon} alt="museum icon" className="h-8 w-8 invert opacity-80" />
      <h1
        className="text-2xl tracking-[0.3em] uppercase"
        style={{ fontFamily: "'Secular One', sans-serif" }}
      >
        Curate 3.0
      </h1>
    </div>
  );
}