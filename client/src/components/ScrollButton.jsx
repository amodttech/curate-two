import { useState, useEffect } from "react";

export default function ScrollButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(document.documentElement.scrollTop > 300);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-10 h-10 bg-[#c8a96e] text-[#1a1816] flex items-center
                 justify-center hover:bg-[#d4b87a] transition-colors shadow-lg text-lg"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}