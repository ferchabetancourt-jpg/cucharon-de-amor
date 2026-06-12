import { useEffect, useState } from "react";
import { CATEGORIES, COOKING_METHODS, getCategoryStyle } from "@/lib/cucharon-data";
import { recipesStore, type SavedRecipe } from "@/lib/recipes-store";
import { useRecipes } from "@/hooks/use-recipes";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Search, Plus, Trash2, ArrowLeft, BookOpen, X, Star, Pencil } from "lucide-react";
import { RecipeFormModal } from "./RecipeFormModal";
import { toast } from "sonner";
import { useRecipeNotes } from "@/hooks/use-recipe-notes";
import { track } from "@/lib/analytics";
import cucharonSopa from "@/assets/cucharon-sopa.png.asset.json";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ADMIN_EMAIL = "ferchabetancourt@gmail.com";
const SOFT_CHIP_STYLES = [
  { bg: "#F8D8CB", text: "#7A2E12" },
  { bg: "#F8E3C8", text: "#7A4E0E" },
  { bg: "#E2EDD8", text: "#2F4A1F" },
];

function RecipeDetail({
  recipe,
  onBack,
  onEdit,
  onAskDelete,
  isAdmin,
}: {
  recipe: SavedRecipe;
  onBack: () => void;
  onEdit: () => void;
  onAskDelete: () => void;
  isAdmin: boolean;
}) {
  const catLabel = CATEGORIES.find((c) => c.key === recipe.category)?.label ?? "📌 Especiales";
  const isFav = recipesStore.isFavorite(recipe.id);
  const [personalNote, setPersonalNote] = useRecipeNotes(recipe.id);

  return (
    <>
      <button
        onClick={onBack}
        className="bg-cream-deep border-none rounded-full px-3.5 py-1.5 text-sm inline-flex items-center gap-1.5 mb-3.5 hover:bg-cream transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Volver
      </button>
      <article className="bg-card rounded-[var(--radius)] p-5 shadow-soft animate-fade-in">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="font-serif text-[21px] text-terracotta leading-tight">{recipe.name}</h2>
            <div className="flex gap-2 items-center flex-wrap mt-1.5">
              <span className="bg-cream-deep text-verde rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                {catLabel}
              </span>
              {recipe.methods?.map((m) => {
                const ml = COOKING_METHODS.find((x) => x.key === m)?.label;
                return ml ? (
                  <span key={m} className="bg-cream text-ink rounded-full px-2 py-0.5 text-[11px] font-medium border border-cream-deep">
                    {ml}
                  </span>
                ) : null;
              })}
              {recipe.time && <span className="text-[11px] text-muted-foreground">⏱ {recipe.time}</span>}
            </div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button
              onClick={() => {
                const wasFav = recipesStore.isFavorite(recipe.id);
                recipesStore.toggleFavorite(recipe.id);
                if (!wasFav) track("recipe_favorited", { recipe_name: recipe.name });
              }}
              className="bg-cream rounded-lg w-9 h-9 inline-flex items-center justify-center hover:bg-ochre/20 transition-colors"
              aria-label={isFav ? "Quitar favorita" : "Marcar favorita"}
            >
              <Star className={cn("w-4 h-4", isFav ? "fill-[#E85D2F] text-[#E85D2F]" : "text-muted-foreground")} />
            </button>
            {isAdmin && (
              <button
                onClick={onEdit}
                className="bg-cream rounded-lg w-9 h-9 inline-flex items-center justify-center hover:bg-verde/10 hover:text-verde transition-colors"
                aria-label="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            {isAdmin && (
              <button
                onClick={onAskDelete}
                className="bg-cream rounded-lg w-9 h-9 inline-flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                aria-label="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {recipe.ingredients && (
          <section className="mb-4">
            <h3 className="text-[11px] uppercase tracking-[0.12em] text-verde font-medium mb-1.5">Ingredientes</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{recipe.ingredients}</p>
          </section>
        )}
        {recipe.preparation && (
          <section className="mb-4">
            <h3 className="text-[11px] uppercase tracking-[0.12em] text-verde font-medium mb-1.5">Preparación</h3>
            <pre className="font-sans text-sm leading-[1.8] whitespace-pre-wrap text-ink">{recipe.preparation}</pre>
          </section>
        )}
        {recipe.notes && (
          <section className="bg-cream rounded-xl p-3.5 border-l-[3px] border-ochre">
            <h3 className="text-[11px] uppercase tracking-[0.12em] text-verde font-medium mb-1">💛 Secretos</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{recipe.notes}</p>
          </section>
        )}
        <section className="mt-4 pt-4 border-t border-cream-deep">
          <h3 className="text-[11px] uppercase tracking-[0.12em] text-terracotta font-medium mb-2">📝 Mis notas</h3>
          <textarea
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            placeholder="Anota aquí tus cambios, sustituciones o trucos personales..."
            className="w-full rounded-xl p-3.5 text-sm leading-relaxed outline-none transition-colors resize-y min-h-[120px]"
            style={{
              background: "#FFF6EA",
              border: "1.5px solid #EDE8DC",
              color: "#3A2A20",
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          />
          {personalNote.trim() && (
            <p className="text-[10px] text-muted-foreground mt-1.5 italic">Guardado automáticamente en este dispositivo</p>
          )}
        </section>
      </article>
    </>
  );
}

function RecipeListItem({
  recipe,
  onSelect,
  onEdit,
  onAskDelete,
  isAdmin,
}: {
  recipe: SavedRecipe;
  onSelect: () => void;
  onEdit: () => void;
  onAskDelete: () => void;
  isAdmin: boolean;
}) {
  const isFav = recipesStore.isFavorite(recipe.id);
  const catLabel = CATEGORIES.find((c) => c.key === recipe.category)?.label ?? "📌 Especiales";
  const catStyle = getCategoryStyle(recipe.category);

  return (
    <li>
      <div
        onClick={onSelect}
        className="group relative rounded-[24px] overflow-hidden transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_30px_-18px_rgba(47,42,38,0.25)]"
        style={{
          background: "#FFFFFF",
          border: "1px solid #EDE8DC",
          boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 6px 18px -14px rgba(47,42,38,0.15)",
        }}
      >
        {/* Bloque de color superior según categoría */}
        <div
          aria-hidden
          className="h-20 md:h-24 w-full"
          style={{ background: catStyle.bar }}
        />

        <div className="p-5 md:p-6">
          {/* Top row: star + category badge */}
          <div className="flex items-start justify-between gap-2 -mt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const wasFav = recipesStore.isFavorite(recipe.id);
                recipesStore.toggleFavorite(recipe.id);
                if (!wasFav) track("recipe_favorited", { recipe_name: recipe.name });
              }}
              aria-label={isFav ? "Quitar favorita" : "Marcar favorita"}
              className="text-2xl leading-none transition-transform hover:scale-110 cursor-pointer"
              style={{ color: isFav ? "#E85D2F" : "#D6CFC1" }}
            >
              {isFav ? "★" : "☆"}
            </button>
            <span
              className="rounded-full px-2.5 py-1 text-[11px]"
              style={{
                background: catStyle.chipBg,
                color: catStyle.chipText,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {catLabel}
            </span>
          </div>

          {/* Recipe name */}
          <h3
            className="font-serif text-[19px] md:text-[21px] leading-[1.2] mt-3 mb-3"
            style={{ color: "#3A2A20", fontWeight: 600, letterSpacing: "-0.005em" }}
          >
            {recipe.name}
          </h3>

          {/* Metadata */}
          <div
            className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[12.5px]"
            style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
          >
            {recipe.methods?.map((m, i) => {
              const ml = COOKING_METHODS.find((x) => x.key === m)?.label;
              if (!ml) return null;
              return (
                <span key={m} className="inline-flex items-center gap-1">
                  {i > 0 && <span style={{ color: "#C9C0AE" }}>•</span>}
                  <span>{ml}</span>
                </span>
              );
            })}
            {recipe.time && (
              <>
                {(recipe.methods?.length ?? 0) > 0 && <span style={{ color: "#C9C0AE" }}>•</span>}
                <span className="inline-flex items-center gap-1">⏱️ {recipe.time}</span>
              </>
            )}
          </div>

          {/* Actions */}
          {isAdmin && (
            <div className="flex justify-end gap-1.5 mt-4 pt-3 border-t" style={{ borderColor: "#F2ECE0" }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="rounded-lg w-8 h-8 inline-flex items-center justify-center transition-colors"
                style={{ background: "#FFF6EA", color: "#5E8C4A" }}
                aria-label="Editar receta"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAskDelete(); }}
                className="rounded-lg w-8 h-8 inline-flex items-center justify-center transition-colors"
                style={{ background: "#FFF6EA", color: "#E85D2F" }}
                aria-label="Eliminar receta"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export function RecipesPage({ favoritesOnly = false, initialCategory }: { favoritesOnly?: boolean; initialCategory?: string } = {}) {
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
  const allRecipes = useRecipes();
  const recipes = favoritesOnly
    ? allRecipes.filter((r) => recipesStore.isFavorite(r.id))
    : allRecipes;
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(initialCategory ?? "all");
  const [methods, setMethods] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const [selected, setSelected] = useState<SavedRecipe | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SavedRecipe | null>(null);

  useEffect(() => {
    if (initialCategory) setCat(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const t = setTimeout(() => track("recipe_search", { query: q }), 600);
    return () => clearTimeout(t);
  }, [query]);

  const toggleMethod = (k: string) =>
    setMethods((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));

  const openEdit = (r: SavedRecipe) => {
    setEditing(r);
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    recipesStore.remove(id);
    toast.success("Receta eliminada");
    setPendingDelete(null);
    if (selected?.id === id) setSelected(null);
  };

  const filtered = recipes
    .filter((r) => {
      const matchCat = cat === "all" || r.category === cat;
      const matchMethod = methods.length === 0 || (r.methods && r.methods.some((m) => methods.includes(m)));
      const q = query.trim().toLowerCase();
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.ingredients?.toLowerCase().includes(q) || r.preparation?.toLowerCase().includes(q);
      return matchCat && matchMethod && matchQ;
    })
    .sort((a, b) => {
      const favA = recipesStore.isFavorite(a.id) ? 0 : 1;
      const favB = recipesStore.isFavorite(b.id) ? 0 : 1;
      if (favA !== favB) return favA - favB;
      return a.name.localeCompare(b.name, "es");
    });

  const deleteDialog = (
    <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Borrar receta?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás segura de que quieres borrar esta receta? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Borrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (selected) {
    const fresh = recipes.find((r) => r.id === selected.id);
    if (!fresh) {
      setSelected(null);
      return null;
    }
    return (
      <>
        <RecipeDetail
          recipe={fresh}
          onBack={() => setSelected(null)}
          onEdit={() => openEdit(fresh)}
          onAskDelete={() => setPendingDelete(fresh)}
          isAdmin={isAdmin}
        />
        <RecipeFormModal open={openForm} onClose={closeForm} editing={editing} />
        {deleteDialog}
      </>
    );
  }

  return (
    <>
      {/* Header recetario emocional */}
      <section
        className="relative overflow-hidden rounded-[24px] mb-8 px-5 pt-8 pb-9 md:px-9 md:pt-12 md:pb-14"
        style={{
          background: "#FFF6EA",
        }}
      >
        <img
          src={cucharonSopa.url}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 right-0 md:right-2 w-[170px] md:w-[260px] h-auto object-contain"
        />
        <div className="relative z-10 max-w-[62%] md:max-w-[65%]">
          <h2
            className="font-serif text-[30px] md:text-[44px] leading-[1.08]"
            style={{ color: "#3A2A20", letterSpacing: "-0.015em", fontWeight: 600 }}
          >
            ¿Qué te provoca hoy?
          </h2>
          <p
            className="mt-3 text-[14px] md:text-[16px] italic leading-[1.5]"
            style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
          >
            {favoritesOnly
              ? "Las recetas que más quieres, siempre a mano."
              : "Tus recetas, tus sabores, tus recuerdos."}
          </p>
          {!favoritesOnly && (
            <button
              onClick={() => { setEditing(null); setOpenForm(true); }}
              className="mt-6 rounded-full px-5 py-2.5 text-[13px] font-medium inline-flex items-center gap-1.5 hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-out cursor-pointer"
              style={{
                background: "#E85D2F",
                color: "#FFF6EA",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                boxShadow: "0 8px 20px -10px rgba(232,93,47,0.55)",
              }}
            >
              <Plus className="w-3.5 h-3.5" /> Nueva receta
            </button>
          )}
        </div>
      </section>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" style={{ color: "#8A6B55" }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca una receta, ingrediente o recuerdo…"
          className="w-full py-3 pl-11 pr-10 rounded-full text-[13.5px] outline-none transition-colors"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EDE8DC",
            color: "#3A2A20",
            fontFamily: "Montserrat, sans-serif",
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 inline-flex items-center justify-center rounded-full bg-cream-deep text-ink hover:bg-terracotta hover:text-primary-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-medium"
            style={{ color: "#5E8C4A" }}
          >
            Método de cocción
          </span>
          {methods.length > 0 && (
            <button
              onClick={() => setMethods([])}
              className="text-[11px] font-medium inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors"
              style={{ background: "#EDE8DC", color: "#8A6B55" }}
            >
              <X className="w-3 h-3" /> Limpiar
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COOKING_METHODS.map((m, i) => (
            <button
              key={m.key}
              onClick={() => toggleMethod(m.key)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] transition-all border",
              )}
              style={
                methods.includes(m.key)
                  ? { background: "#5E8C4A", borderColor: "#5E8C4A", color: "#FFFFFF", fontWeight: 500 }
                  : { background: SOFT_CHIP_STYLES[i % 3].bg, borderColor: SOFT_CHIP_STYLES[i % 3].bg, color: SOFT_CHIP_STYLES[i % 3].text }
              }
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <span
          className="block text-[10px] uppercase tracking-[0.18em] font-medium mb-2"
          style={{ color: "#5E8C4A" }}
        >
          Colecciones
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => {
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className="rounded-full px-3.5 py-1.5 text-[12.5px] transition-all border"
                style={
                  active
                    ? {
                        background: "#E85D2F",
                        borderColor: "#E85D2F",
                        color: "#FFF6EA",
                        fontWeight: 600,
                        boxShadow: "0 6px 14px -8px rgba(232,93,47,0.55)",
                        fontFamily: "Montserrat, sans-serif",
                      }
                    : {
                        background: SOFT_CHIP_STYLES[i % 3].bg,
                        borderColor: SOFT_CHIP_STYLES[i % 3].bg,
                        color: SOFT_CHIP_STYLES[i % 3].text,
                        fontWeight: 500,
                        fontFamily: "Montserrat, sans-serif",
                      }
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 px-6 flex flex-col items-center">
          <div
            className="text-[64px] leading-none mb-4 select-none"
            style={{ opacity: 0.3 }}
            aria-hidden
          >
            {favoritesOnly && recipes.length === 0 ? "⭐" : recipes.length === 0 ? "📖" : "🔍"}
          </div>
          <h3 className="font-serif text-xl text-ink mb-2" style={{ fontWeight: 600 }}>
            {favoritesOnly && recipes.length === 0
              ? "Aún no has marcado favoritos 💛"
              : recipes.length === 0
              ? "Aún no tienes recetas guardadas"
              : "No encontramos esa receta"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm" style={{ lineHeight: 1.6 }}>
            {favoritesOnly && recipes.length === 0
              ? "Las recetas especiales aparecerán aquí. Marca tus preferidas con ⭐"
              : recipes.length === 0
              ? "Genera una en el Chef o suma una propia con + Nueva."
              : "Intenta con otro nombre, ingrediente o categoría."}
          </p>
        </div>

      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filtered.map((r) => (
            <RecipeListItem
              key={r.id}
              recipe={r}
              onSelect={() => { track("recipe_viewed", { recipe_name: r.name }); setSelected(r); }}
              onEdit={() => openEdit(r)}
              onAskDelete={() => setPendingDelete(r)}
              isAdmin={isAdmin}
            />
          ))}
        </ul>
      )}

      <p className="text-center text-[11px] text-verde-light mt-5 italic">Tus recetas se guardan en esta sesión 💛</p>

      <RecipeFormModal open={openForm} onClose={closeForm} editing={editing} />
      {deleteDialog}
    </>
  );
}
