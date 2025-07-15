import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // npm i lucide-react

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="
        fixed bottom-16 right-8 z-50 cursor-pointer
        flex items-center justify-center
        h-12 w-12 rounded-full bg-[#C61F1F] text-white
        shadow-lg hover:scale-105 active:scale-95 transition
      "
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
