import { useRef, useState } from "react";
import { INSPIRATIONS } from "@/lib/cucharon-data";
import { RotateCw, Loader2 } from "lucide-react";
import sprig from "@/assets/inspiration-sprig.png";

const HISTORY_SIZE = Math.min(8, Math.max(1, INSPIRATIONS.length - 1));

export function InspirationCard() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * INSPIRATIONS.length));
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [loading, setLoading] = useState(false);
  const history = useRef<number[]>([]);
  const item = INSPIRATIONS[idx];

  const next = () => {
    if (loading) return;
    setLoading(true);
    setPhase("out");
    setTimeout(() => {
      const recent = new Set([idx, ...history.current]);
      const candidates = INSPIRATIONS.map((_, i) => i).filter((i) => !recent.has(i));
      const pool = candidates.length ? candidates : INSPIRATIONS.map((_, i) => i).filter((i) => i !== idx);
      const n = pool[Math.floor(Math.random() * pool.length)];
      history.current = [idx, ...history.current].slice(0, HISTORY_SIZE);
      setIdx(n);
      setPhase("in");
      setLoading(false);
      setTimeout(() => setPhase("idle"), 400);
    }, 300);
  };

  return (
    <article
      className="relative overflow-hidden rounded-[18px] px-5 py-6 mb-4 border border-cream-deep shadow-sm transition-all duration-300 ease-out hover:shadow-md"
      style={{ background: "#FFF6EA" }}
    >
      <img
        src={sprig}
        alt=""
        aria-hidden
        loading="lazy"
        width={512}
        height={512}
        className="pointer-events-none select-none absolute -top-2 -right-3 w-[88px] md:w-[104px] opacity-80 mix-blend-multiply"
      />
      <p className="relative text-[11px] uppercase tracking-[0.16em] text-verde font-medium mb-3">
        ✨ Inspiración del momento
      </p>
      <div className="relative min-h-[80px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-terracotta opacity-70" />
          </div>
        )}
        <div
          key={idx}
          className={`transition-opacity duration-300 ${
            phase === "out" ? "opacity-0" : phase === "in" ? "animate-fade-in-up" : "opacity-100"
          }`}
        >
          <h3
            className="font-serif text-[20px] mb-2 leading-snug"
            style={{ color: "#3A2A20", fontWeight: 600 }}
          >
            {item.title}
          </h3>
          <p
            className="text-[14.5px] leading-[1.7]"
            style={{ color: "#6B6258", fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif" }}
          >
            {item.body}
          </p>
        </div>
      </div>

      <button
        onClick={next}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-1.5 text-terracotta hover:text-terracotta-deep text-[12px] font-medium transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCw className="w-3 h-3" />}
        {loading ? "Generando…" : "Otra inspiración"}
      </button>
    </article>
  );
}
