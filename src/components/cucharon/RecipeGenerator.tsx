import { useState } from "react";
import { MOODS, PREFERENCES, type MoodKey } from "@/lib/cucharon-data";
import { supabase } from "@/integrations/supabase/client";
import { RecipeFormModal } from "./RecipeFormModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Save, Leaf, Refrigerator } from "lucide-react";
import heroPot from "@/assets/hero-pot.png";
import { track } from "@/lib/analytics";

type GeneratedRecipe = {
  nombre: string;
  categoria: string;
  ingredientes: string[];
  preparacion: string[];
  secreto_cucharon: string;
  sentimiento: string;
};

export function RecipeGenerator() {
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [prefs, setPrefs] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [saveOpen, setSaveOpen] = useState(false);

  const togglePref = (k: string) =>
    setPrefs((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  const cook = async () => {
    if (!ingredients.trim()) {
      toast.error("Cuéntame qué ingrediente tienes");
      return;
    }
    setLoading(true);
    setRecipe(null);
    track("ingredient_assistant_used", {
      ingredients: ingredients.trim(),
      mood,
      preferences: prefs,
    });
    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: { ingredient: ingredients.trim(), mood, prefs },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      if (!data?.recipe) throw new Error("Sin receta");
      setRecipe(data.recipe);
    } catch (e) {
      console.error(e);
      toast.error("No pude crear la receta ahora. Intenta de nuevo en un momento 💛");
    } finally {
      setLoading(false);
    }
  };

  const initialFromGenerated = recipe
    ? {
        name: recipe.nombre,
        ingredients: recipe.ingredientes.map((i) => `- ${i}`).join("\n"),
        preparation: recipe.preparacion.map((p, i) => `${i + 1}. ${p}`).join("\n"),
        notes: recipe.secreto_cucharon,
        time: prefs.includes("rapido") || mood === "rapido" ? "≤ 20 min" : "",
        methods: prefs.includes("airfryer") ? ["airfryer"] : [],
      }
    : null;

  return (
    <>
      {/* Hero emocional - watercolor editorial */}
      <section
        className="relative overflow-hidden rounded-[24px] px-5 pt-5 pb-5 md:px-7 md:pt-7 md:pb-6 mb-5 shadow-card border border-cream-deep"
        style={{
          background:
            "radial-gradient(140% 90% at 100% 0%, rgba(201,106,43,0.10), transparent 55%), radial-gradient(120% 80% at 0% 100%, rgba(111,139,114,0.08), transparent 60%), linear-gradient(135deg, #F7F3EB 0%, #EDE8DC 100%)",
        }}
      >
        {/* Ilustración oficial - flotando integrada al fondo */}
        <img
          src={heroPot}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute top-1 right-0 w-[140px] md:w-[180px] object-contain opacity-95 mix-blend-multiply"
          style={{ maxHeight: "78%" }}
        />

        {/* Texto */}
        <div className="relative z-10 pr-[120px] md:pr-[170px] mb-4">
          <h2
            className="font-serif text-[26px] md:text-[32px] leading-[1.08] mb-2"
            style={{ color: "#2F2A26", letterSpacing: "-0.005em" }}
          >
            ¿Qué cocinamos hoy?
          </h2>
          <p
            className="text-[13px] md:text-[14.5px] leading-relaxed"
            style={{ fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif", color: "#6B6257" }}
          >
            Cuéntame qué tienes en casa y encontraremos algo rico para ti.
          </p>
        </div>

        {/* Input con iconos */}
        <div className="relative z-10 mb-3">
          <Leaf
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-verde/70"
            strokeWidth={2}
          />
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Abre la nevera y cuéntame qué encontraste…"
            className="w-full pl-10 pr-10 py-3 border border-cream-deep rounded-2xl bg-white text-sm outline-none focus:border-terracotta-light focus:ring-2 focus:ring-terracotta/15 transition shadow-sm placeholder:text-[#A89F92]"
            style={{ color: "#2F2A26" }}
          />
          <Refrigerator
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta/70"
            strokeWidth={2}
          />
        </div>

        {/* Chips de preferencias */}
        <div className="relative z-10 flex flex-wrap gap-1.5 mb-3">
          {PREFERENCES.map((p) => (
            <button
              key={p.key}
              onClick={() => togglePref(p.key)}
              className={cn(
                "rounded-full px-2.5 py-[3px] border text-[10.5px] font-medium transition-all",
                prefs.includes(p.key)
                  ? "bg-verde/90 border-verde/90 text-primary-foreground"
                  : "bg-white/80 border-cream-deep text-muted-foreground hover:border-verde-light hover:text-ink"
              )}
              style={{ fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif" }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Botón principal */}
        <button
          onClick={cook}
          disabled={loading}
          className="relative z-10 w-full text-white py-3.5 rounded-2xl text-[15px] shadow-warm hover:opacity-95 hover:scale-[1.01] hover:shadow-lg active:scale-[.98] transition-all duration-200 ease-out cursor-pointer disabled:opacity-65 disabled:cursor-wait inline-flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #C96A2B, #A84E22)",
            fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            boxShadow: "0 10px 24px -10px rgba(201,106,43,0.55), 0 2px 6px rgba(168,78,34,0.18)",
          }}
        >
          <span className="text-base leading-none">🧡</span>
          {loading ? "Creando tu receta con amor…" : "Cocinar con amor"}
        </button>

        {loading && (
          <div className="flex gap-1.5 justify-center py-3">
            <span className="w-2.5 h-2.5 bg-terracotta-light rounded-full dot-bounce" />
            <span className="w-2.5 h-2.5 bg-terracotta-light rounded-full dot-bounce" style={{ animationDelay: ".2s" }} />
            <span className="w-2.5 h-2.5 bg-terracotta-light rounded-full dot-bounce" style={{ animationDelay: ".4s" }} />
          </div>
        )}
      </section>


      {/* Estado emocional - Grid 3x2 */}
      <section className="mb-4">
        <h3 className="text-[11px] uppercase tracking-[0.12em] text-verde font-medium mb-3 px-1">
          🌿 ¿Cómo está tu cuerpo hoy?
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood((cur) => (cur === m.key ? null : m.key))}
              className={cn(
                "rounded-[12px] px-2 py-3 text-center transition-all border bg-white shadow-sm flex flex-col items-center gap-1.5 active:scale-95 hover:shadow-md",
                mood === m.key
                  ? "border-terracotta ring-2 ring-terracotta/20"
                  : "border-cream-deep hover:border-terracotta-light"
              )}
            >
              <span className="text-2xl block leading-none">{m.emoji}</span>
              <span className="text-[11.5px] font-medium leading-tight text-ink">{m.label}</span>
            </button>
          ))}
        </div>
      </section>


      {/* Result */}
      {recipe && !loading && (
        <section className="bg-card rounded-[var(--radius)] p-5 mb-4 shadow-card border-t-4 border-ochre animate-fade-in">
          <h3 className="font-serif text-lg text-terracotta mb-1">🍽️ {recipe.nombre}</h3>
          <p className="text-[11px] uppercase tracking-[0.12em] text-verde font-medium mb-3">
            ✦ {recipe.categoria} ✦
          </p>

          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-[0.08em] text-verde font-medium mb-1.5">
              🛒 Ingredientes
            </p>
            <ul className="text-[14px] leading-[1.7] text-ink list-none space-y-0.5">
              {recipe.ingredientes.map((i, idx) => (
                <li key={idx}>• {i}</li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-[0.08em] text-verde font-medium mb-1.5">
              🔪 Preparación
            </p>
            <ol className="text-[14px] leading-[1.7] text-ink list-none space-y-1">
              {recipe.preparacion.map((p, idx) => (
                <li key={idx}>
                  <span className="font-medium text-terracotta">{idx + 1}.</span> {p}
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-3 bg-cream-deep rounded-xl p-3">
            <p className="text-[11px] uppercase tracking-[0.08em] text-verde font-medium mb-1">
              💛 Secreto Cucharón
            </p>
            <p className="text-[14px] leading-[1.6] text-ink">{recipe.secreto_cucharon}</p>
          </div>

          <div className="mb-1">
            <p className="text-[11px] uppercase tracking-[0.08em] text-verde font-medium mb-1">
              🌿 Cómo te va a hacer sentir
            </p>
            <p className="text-[14px] leading-[1.6] text-ink italic">{recipe.sentimiento}</p>
          </div>

          <button
            onClick={() => setSaveOpen(true)}
            className="mt-4 w-full bg-verde text-primary-foreground py-3 rounded-xl text-sm font-medium hover:bg-verde-deep active:opacity-90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Guardar en mis recetas
          </button>
        </section>
      )}

      <RecipeFormModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        initial={initialFromGenerated}
      />
    </>
  );
}
