import { useState } from "react";
import { MOODS, PREFERENCES, type MoodKey } from "@/lib/cucharon-data";
import { supabase } from "@/integrations/supabase/client";
import { RecipeFormModal } from "./RecipeFormModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Save, Leaf, Refrigerator, Feather, Heart, Timer, Cookie, Sparkles, Gift } from "lucide-react";
import sartenHero from "@/assets/sarten-hero.png.asset.json";
import moodLiviano from "@/assets/mood-liviano.png.asset.json";
import moodConfort from "@/assets/mood-confort.png.asset.json";
import moodRapido from "@/assets/mood-rapido.png.asset.json";
import moodDulce from "@/assets/mood-dulce.png.asset.json";
import moodSinculpa from "@/assets/mood-sinculpa.png.asset.json";
import moodSorpresa from "@/assets/mood-sorpresa.png.asset.json";
import { track } from "@/lib/analytics";

type GeneratedRecipe = {
  nombre: string;
  categoria: string;
  ingredientes: string[];
  preparacion: string[];
  secreto_cucharon: string;
  sentimiento: string;
};

const MOOD_PHOTOS: Record<string, string> = {
  liviano: moodLiviano.url,
  confort: moodConfort.url,
  rapido: moodRapido.url,
  dulce: moodDulce.url,
  sinculpa: moodSinculpa.url,
  sorpresa: moodSorpresa.url,
};

const CHIP_PALETTE = [
  { bg: "#E85D2F", text: "#FFFFFF" }, // papaya
  { bg: "#F2A93B", text: "#3A2A20" }, // golden honey
  { bg: "#5E8C4A", text: "#FFFFFF" }, // olive green
];
const MOOD_ACCENTS = ["#5E8C4A", "#E85D2F", "#F2A93B"];
const MOOD_ICONS: Record<string, typeof Feather> = {
  liviano: Feather,
  confort: Heart,
  rapido: Timer,
  dulce: Cookie,
  sinculpa: Sparkles,
  sorpresa: Gift,
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

  const cook = async (overrides?: { ingredient?: string; mood?: MoodKey | null }) => {
    const ingredientToUse =
      overrides?.ingredient !== undefined ? overrides.ingredient : ingredients.trim();
    const moodToUse = overrides?.mood !== undefined ? overrides.mood : mood;
    if (!ingredientToUse && !moodToUse) {
      toast.error("Cuéntame qué ingrediente tienes o elige cómo te sientes");
      return;
    }
    const finalIngredient = ingredientToUse || "sorpréndeme";
    setLoading(true);
    setRecipe(null);
    track("ingredient_assistant_used", {
      ingredients: finalIngredient,
      mood: moodToUse,
      preferences: prefs,
    });
    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: { ingredient: finalIngredient, mood: moodToUse, prefs },
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

  const handleMoodSelect = (key: MoodKey) => {
    const isDeselect = mood === key;
    const next = isDeselect ? null : key;
    setMood(next);
    if (!isDeselect && !loading) {
      cook({ mood: key });
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
      {/* Hero emocional premium - dark cacao + foto sartén */}
      <section
        className="relative overflow-hidden rounded-[32px] px-5 pt-5 pb-5 md:px-7 md:pt-7 md:pb-6 mb-5"
        style={{
          background:
            "radial-gradient(120% 80% at 100% 0%, rgba(232,93,47,0.18), transparent 55%), linear-gradient(135deg, #3A2A20 0%, #4D3A2C 100%)",
          boxShadow: "0 20px 50px -20px rgba(58,42,32,0.45)",
        }}
      >
        {/* Fotografía hiperrealista del sartén */}
        <img
          src={sartenHero.url}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute -top-2 -right-4 md:-right-6 w-[150px] md:w-[210px] object-contain"
          style={{ maxHeight: "95%", filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.35))" }}
        />

        {/* Texto */}
        <div className="relative z-10 pr-[130px] md:pr-[200px] mb-4">
          <h2
            className="font-serif text-[26px] md:text-[32px] leading-[1.08] mb-2"
            style={{ color: "#FFF6EA", letterSpacing: "-0.005em", fontWeight: 600 }}
          >
            ¿Qué cocinamos hoy?
          </h2>
          <p
            className="text-[13px] md:text-[14.5px] leading-relaxed"
            style={{ fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif", color: "#C9B5A4" }}
          >
            Cuéntame qué tienes en casa y encontraremos algo rico para ti.
          </p>
        </div>

        {/* Input con iconos */}
        <div className="relative z-10 mb-3 md:w-[62%]">
          <Leaf
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            strokeWidth={2}
            style={{ color: "#C9B5A4" }}
          />
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Abre la nevera y cuéntame qué encontraste…"
            className="w-full pl-10 pr-10 py-3 rounded-2xl text-sm outline-none transition placeholder:text-[#C9B5A4]"
            style={{
              background: "#4D3A2C",
              border: "1px solid rgba(201,181,164,0.18)",
              color: "#FFF6EA",
            }}
          />
          <Refrigerator
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            strokeWidth={2}
            style={{ color: "#E85D2F" }}
          />
        </div>


        {/* Botón principal */}
        <button
          onClick={() => cook()}
          disabled={loading}
          className="relative z-10 w-full py-3.5 rounded-full text-[15px] hover:opacity-95 hover:scale-[1.01] active:scale-[.98] transition-all duration-200 ease-out cursor-pointer disabled:opacity-65 disabled:cursor-wait inline-flex items-center justify-center gap-2"
          style={{
            background: "#E85D2F",
            color: "#FFF6EA",
            fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            boxShadow: "0 12px 28px -10px rgba(232,93,47,0.7), 0 2px 6px rgba(168,78,34,0.25)",
          }}
        >
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

      {/* Chips de preferencias - fuera del cacao, sobre crema */}
      <section className="rounded-[32px] px-5 py-4 md:px-7 md:py-5 mb-5 -mt-1" style={{ background: "#FFF6EA" }}>
        <div className="flex flex-wrap gap-2">
          {PREFERENCES.map((p) => {
            const selected = prefs.includes(p.key);
            return (
              <button
                key={p.key}
                onClick={() => togglePref(p.key)}
                className={cn(
                  "rounded-full px-3.5 py-[5px] text-[11px] font-medium transition-all active:scale-95"
                )}
                style={{
                  fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
                  background: selected ? "#E85D2F" : "#FFFFFF",
                  color: selected ? "#FFF6EA" : "#3A2A20",
                  border: selected ? "1px solid #E85D2F" : "1px solid #EAD9C4",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </section>


      {/* Estado emocional - Grid 3x2 */}
      <section className="mb-4">
        <h3 className="text-[11px] uppercase tracking-[0.16em] font-medium mb-3 px-1" style={{ color: "#5E8C4A" }}>
          ¿Cómo está tu cuerpo hoy?
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          {MOODS.map((m, i) => {
            const accent = MOOD_ACCENTS[i % MOOD_ACCENTS.length];
            const selected = mood === m.key;
            return (
              <button
                key={m.key}
                onClick={() => handleMoodSelect(m.key)}
                className={cn(
                  "rounded-[24px] px-2 pt-3 pb-2.5 text-center transition-all flex flex-col items-center gap-1.5 active:scale-95 hover:shadow-md",
                  selected ? "ring-2 ring-[#E85D2F]" : ""
                )}
                style={{
                  background: "#FFFFFF",
                  boxShadow: selected
                    ? "0 8px 18px -8px rgba(232,93,47,0.45)"
                    : "0 2px 6px rgba(58,42,32,0.08)",
                  border: "1px solid rgba(58,42,32,0.08)",
                }}
              >
                {(() => {
                  const Icon = MOOD_ICONS[m.key] ?? Sparkles;
                  return (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: `${accent}14` }}
                    >
                      <Icon size={24} strokeWidth={1.5} style={{ color: accent }} />
                    </div>
                  );
                })()}
                <span className="text-[11.5px] font-medium leading-tight" style={{ color: "#3A2A20" }}>
                  {m.label}
                </span>
              </button>
            );
          })}
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
