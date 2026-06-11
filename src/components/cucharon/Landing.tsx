import { QuoteCard } from "./QuoteCard";
import { InspirationCard } from "./InspirationCard";
import { useParallax } from "@/hooks/use-parallax";

export function Landing() {
  const y = useParallax();
  return (
    <section className="pt-6 md:pt-8 pb-6 md:pb-10 flex flex-col gap-4 md:gap-6">
      <QuoteCard />
      <div
        className="flex items-center gap-3 text-xs text-verde-light my-1 select-none"
        aria-hidden
      >
        <span className="flex-1 h-px bg-cream-deep" />
        <span className="opacity-70">✨</span>
        <span className="flex-1 h-px bg-cream-deep" />
      </div>
      <div
        className="will-change-transform"
        style={{ transform: `translateY(${y * -0.05}px)` }}
      >
        <InspirationCard />
      </div>
    </section>
  );
}
