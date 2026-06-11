import { useRef, useState } from "react";
import { QUOTES } from "@/lib/cucharon-data";
import { RotateCw, Heart, Loader2 } from "lucide-react";

const HISTORY_SIZE = Math.min(8, Math.max(1, QUOTES.length - 1));

export function QuoteCard() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [loading, setLoading] = useState(false);
  const history = useRef<number[]>([]);
  const quote = QUOTES[idx];

  const next = () => {
    if (loading) return;
    setLoading(true);
    setPhase("out");
    setTimeout(() => {
      const recent = new Set([idx, ...history.current]);
      const candidates = QUOTES.map((_, i) => i).filter((i) => !recent.has(i));
      const pool = candidates.length ? candidates : QUOTES.map((_, i) => i).filter((i) => i !== idx);
      const n = pool[Math.floor(Math.random() * pool.length)];
      history.current = [idx, ...history.current].slice(0, HISTORY_SIZE);
      setIdx(n);
      setPhase("in");
      setLoading(false);
      setTimeout(() => setPhase("idle"), 400);
    }, 300);
  };

  return (
    <article className="relative overflow-hidden rounded-[var(--radius)] p-5 mb-4 bg-gradient-verde text-primary-foreground shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl cursor-default">
      <Heart
        className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 opacity-10 fill-current"
        aria-hidden
      />
      <span
        className="absolute top-2 right-3 text-2xl opacity-20 pointer-events-none select-none rotate-12"
        aria-hidden
      >
        🌿
      </span>
      <div className="relative z-10 min-h-[60px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin opacity-80" />
          </div>
        )}
        <p
          key={idx}
          className={`font-serif italic text-[16px] transition-opacity duration-300 ${
            phase === "out" ? "opacity-0" : phase === "in" ? "animate-fade-in-up" : "opacity-100"
          }`}
          style={{ lineHeight: 1.6 }}
        >
          "{quote.text}"
        </p>
      </div>

      <button
        onClick={next}
        disabled={loading}
        className="mt-3 inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/30 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 ease-out cursor-pointer disabled:opacity-70 disabled:cursor-wait relative z-10"
      >
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCw className="w-3 h-3" />}
        {loading ? "Generando..." : "Otra cita"}
      </button>
    </article>
  );
}
