import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Search } from "lucide-react";

interface HeroSectionProps {
  onNavigateToRecipes?: (opts: { query?: string; category?: string }) => void;
}

const CATEGORY_CHIPS = [
  { key: "sopas", label: "Sopas", bg: "#E85D2F", text: "#FFF6EA" },
  { key: "rapido", label: "Rápido", bg: "#F2A93B", text: "#3A2A20" },
  { key: "cuerpo", label: "Cuerpo", bg: "#5E8C4A", text: "#FFF6EA" },
  { key: "dulce", label: "Dulce", bg: "#F8D8CB", text: "#7A2E12" },
];

export function HeroSection({ onNavigateToRecipes }: HeroSectionProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "cocinera";

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onNavigateToRecipes) {
      onNavigateToRecipes({ query: query.trim() });
    }
  };

  return (
    <section
      className="w-full"
      style={{ background: "#3A2A20" }}
    >
      <div className="max-w-[720px] mx-auto px-4 sm:px-5 pt-10 pb-10 md:pt-14 md:pb-12">
        {/* Greeting */}
        <h1
          className="font-serif text-[32px] md:text-[42px] leading-[1.1] mb-2"
          style={{ color: "#FFF6EA", fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          Hola, {displayName}
        </h1>
        <p
          className="text-[15px] md:text-[17px] mb-8"
          style={{ color: "#C9B5A4", fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif" }}
        >
          ¿Qué vamos a cocinar hoy?
        </p>

        {/* Search bar */}
        <div className="relative mb-5">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: "#C9B5A4" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Busca una receta, ingrediente o recuerdo…"
            className="w-full py-3.5 pl-11 pr-4 rounded-full text-[13.5px] outline-none transition-colors"
            style={{
              background: "#4D3A2C",
              color: "#FFF6EA",
              fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
              border: "1px solid #5A4A3A",
            }}
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_CHIPS.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onNavigateToRecipes?.({ category: cat.key })}
              className="rounded-full px-4 py-2 text-[12.5px] font-semibold transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: cat.bg,
                color: cat.text,
                fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
