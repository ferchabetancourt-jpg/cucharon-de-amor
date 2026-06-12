import { useMemo } from "react";
import { Heart } from "lucide-react";
import { useRecipes } from "@/hooks/use-recipes";

export function HistoryRecipeCard() {
  const recipes = useRecipes();

  const recipe = useMemo(() => {
    const candidates = recipes.filter((r) => r.story && r.story.trim().length > 0);
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes.length]);

  if (!recipe || !recipe.story) return null;

  // Trim story to first 2-3 sentences (~240 chars max)
  const excerpt = (() => {
    const s = recipe.story.trim();
    if (s.length <= 220) return s;
    const cut = s.slice(0, 220);
    const lastDot = cut.lastIndexOf(".");
    return (lastDot > 80 ? cut.slice(0, lastDot + 1) : cut.trim() + "…");
  })();

  const openDetail = () => {
    window.dispatchEvent(
      new CustomEvent("cucharon:open-recipe", { detail: { recipeId: recipe.id } })
    );
  };

  return (
    <section className="mb-5">
      <h3
        className="text-[11px] uppercase tracking-[0.16em] font-medium mb-2.5 px-1"
        style={{ color: "#B5431E" }}
      >
        La receta con historia
      </h3>
      <article
        className="overflow-hidden bg-white"
        style={{
          borderRadius: "24px",
          boxShadow: "0 8px 22px -12px rgba(58,42,32,0.18)",
          border: "1px solid rgba(58,42,32,0.06)",
        }}
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-[170px] md:h-[210px] object-cover"
          />
        ) : (
          <div
            className="w-full h-[140px] md:h-[170px]"
            style={{ background: "#E85D2F" }}
            aria-hidden
          />
        )}
        <div className="px-5 pt-4 pb-5">
          <h4
            className="font-serif text-[20px] md:text-[22px] leading-tight mb-2"
            style={{ color: "#3A2A20", fontWeight: 700 }}
          >
            {recipe.name}
          </h4>
          <p
            className="font-serif italic text-[14.5px] leading-[1.55] mb-4"
            style={{ color: "#6B5240" }}
          >
            «{excerpt}»
          </p>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={openDetail}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-all hover:opacity-95 active:scale-[.98]"
              style={{
                background: "#3A2A20",
                color: "#FFF6EA",
                fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
              }}
            >
              Leer su historia
            </button>
            <Heart
              size={18}
              strokeWidth={2}
              fill="#E85D2F"
              style={{ color: "#E85D2F" }}
              aria-hidden
            />
          </div>
        </div>
      </article>
    </section>
  );
}