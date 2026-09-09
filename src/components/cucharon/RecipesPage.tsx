import { useEffect, useState } from "react";
import { CATEGORIES, COOKING_METHODS, getCategoryBlock } from "@/lib/cucharon-data";
import { recipesStore, type SavedRecipe } from "@/lib/recipes-store";
import { useRecipes } from "@/hooks/use-recipes";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  Search, Plus, Trash2, ArrowLeft, X, Star, Pencil, SlidersHorizontal, Clock, Utensils,
  Soup, Zap, Leaf, ChefHat, IceCream2, Flag, Carrot, Sparkles, Loader2,
  type LucideIcon,
} from "lucide-react";
import { RecipeFormModal } from "./RecipeFormModal";
import { toast } from "sonner";
import { useRecipeNotes } from "@/hooks/use-recipe-notes";
import { track } from "@/lib/analytics";
import cucharonSopa from "@/assets/cucharon-sopa.webp";
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

export const ADMIN_EMAIL = "ferchabetancourt@gmail.com";
const stripEmoji = (s: string) =>
  s.replace(/^[\s\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{2300}-\u{23FF}\uFE0F]+/u, "").trim();

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  sopas: Soup,
  rapido: Zap,
  cuerpo: Leaf,
  plan: ChefHat,
  dulce: IceCream2,
  colombiano: Flag,
  bases: Carrot,
  especiales: Sparkles,
};

function getRecipeImage(r: SavedRecipe): string | undefined {
  const x = r as unknown as { image?: string; imageUrl?: string; photo?: string };
  return x.image ?? x.imageUrl ?? x.photo;
}

function CategoryBlock({ catKey, className = "", iconSize = 40 }: { catKey: string; className?: string; iconSize?: number }) {
  const Icon = CATEGORY_ICONS[catKey] ?? Sparkles;
  return (
    <div
      className={cn("w-full h-full flex items-center justify-center", className)}
      style={{ background: getCategoryBlock(catKey) }}
    >
      <Icon strokeWidth={1.5} style={{ width: iconSize, height: iconSize, color: "#FFF6EA", opacity: 0.92 }} />
    </div>
  );
}

function CatChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] whitespace-nowrap"
      style={{
        background: "#3A2A20",
        color: "#FFF6EA",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
    >
      {stripEmoji(label)}
    </span>
  );
}

export function RecipeDetail({
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
  const catLabel = CATEGORIES.find((c) => c.key === recipe.category)?.label ?? "Especiales";
  const isFav = recipesStore.isFavorite(recipe.id);
  const [personalNote, setPersonalNote] = useRecipeNotes(recipe.id);
  const image = getRecipeImage(recipe);

  return (
    <>
      <button
        onClick={onBack}
        className="bg-cream-deep border-none rounded-full px-3.5 py-1.5 text-sm inline-flex items-center gap-1.5 mb-3.5 hover:bg-cream transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Volver
      </button>
      <article
        className="rounded-[20px] overflow-hidden animate-fade-in"
        style={{ background: "#FFFFFF", border: "1px solid #EAD9C4", boxShadow: "0 8px 24px -16px rgba(47,42,38,0.18)" }}
      >
        {/* Top media zone */}
        <div className="relative w-full" style={{ height: 200 }}>
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            <CategoryBlock catKey={recipe.category} iconSize={64} />
          )}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <button
              onClick={() => {
                const wasFav = recipesStore.isFavorite(recipe.id);
                recipesStore.toggleFavorite(recipe.id);
                if (!wasFav) track("recipe_favorited", { recipe_name: recipe.name });
              }}
              className="rounded-full w-9 h-9 inline-flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: "rgba(255,246,234,0.95)", boxShadow: "0 4px 10px -4px rgba(0,0,0,0.25)" }}
              aria-label={isFav ? "Quitar favorita" : "Marcar favorita"}
            >
              <Star className={cn("w-4 h-4", isFav ? "fill-[#E85D2F] text-[#E85D2F]" : "text-[#8A6B55]")} />
            </button>
            {isAdmin && (
              <button
                onClick={onEdit}
                className="rounded-full w-9 h-9 inline-flex items-center justify-center transition-transform hover:scale-105"
                style={{ background: "rgba(255,246,234,0.95)", color: "#5E8C4A", boxShadow: "0 4px 10px -4px rgba(0,0,0,0.25)" }}
                aria-label="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            {isAdmin && (
              <button
                onClick={onAskDelete}
                className="rounded-full w-9 h-9 inline-flex items-center justify-center transition-transform hover:scale-105"
                style={{ background: "rgba(255,246,234,0.95)", color: "#E85D2F", boxShadow: "0 4px 10px -4px rgba(0,0,0,0.25)" }}
                aria-label="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <h2
            className="text-[22px] md:text-[24px] leading-[1.2] mb-3"
            style={{ color: "#3A2A20", fontFamily: "Montserrat, sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            {recipe.name}
          </h2>
          <div className="flex gap-2 items-center flex-wrap mb-5">
            <CatChip label={catLabel} />
            {recipe.methods?.map((m) => {
              const ml = COOKING_METHODS.find((x) => x.key === m)?.label;
              return ml ? <CatChip key={m} label={ml} /> : null;
            })}
            {recipe.time && (
              <span
                className="inline-flex items-center gap-1 text-[11.5px]"
                style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
              >
                <Clock className="w-3 h-3" strokeWidth={1.75} /> {recipe.time}
              </span>
            )}
          </div>

          {recipe.ingredients && (
            <section className="mb-5">
              <h3
                className="text-[11px] uppercase font-medium mb-2"
                style={{ color: "#5E8C4A", letterSpacing: "0.22em", fontFamily: "Montserrat, sans-serif" }}
              >
                Ingredientes
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#3A2A20" }}>
                {recipe.ingredients}
              </p>
            </section>
          )}
          {recipe.preparation && (
            <section className="mb-5">
              <h3
                className="text-[11px] uppercase font-medium mb-2"
                style={{ color: "#5E8C4A", letterSpacing: "0.22em", fontFamily: "Montserrat, sans-serif" }}
              >
                Preparación
              </h3>
              <pre className="font-sans text-sm leading-[1.8] whitespace-pre-wrap" style={{ color: "#3A2A20" }}>
                {recipe.preparation}
              </pre>
            </section>
          )}
          {recipe.notes && (
            <section className="bg-cream rounded-xl p-3.5 border-l-[3px] border-ochre mb-2">
              <h3
                className="text-[11px] uppercase font-medium mb-1"
                style={{ color: "#5E8C4A", letterSpacing: "0.22em", fontFamily: "Montserrat, sans-serif" }}
              >
                Secretos
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#3A2A20" }}>
                {recipe.notes}
              </p>
            </section>
          )}
          {(recipe as any).sirve_con && (
            <section className="bg-cream rounded-xl p-3.5 border-l-[3px] border-ochre mb-2">
              <h3
                className="text-[11px] uppercase font-medium mb-1"
                style={{ color: "#5E8C4A", letterSpacing: "0.22em", fontFamily: "Montserrat, sans-serif" }}
              >
                Sirve con
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#3A2A20" }}>
                {(recipe as any).sirve_con}
              </p>
            </section>
          )}
          <section className="mt-5 pt-4" style={{ borderTop: "2px solid #E85D2F" }}>
            <h3
              className="text-[11px] uppercase font-semibold mb-2"
              style={{ color: "#B5431E", letterSpacing: "0.22em", fontFamily: "Montserrat, sans-serif" }}
            >
              Mis notas
            </h3>
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
        </div>
      </article>
    </>
  );
}

export function RecipeListItem({
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
  const catLabel = CATEGORIES.find((c) => c.key === recipe.category)?.label ?? "Especiales";
  const image = getRecipeImage(recipe);
  const methodLabel = recipe.methods?.[0]
    ? COOKING_METHODS.find((x) => x.key === recipe.methods![0])?.label
    : undefined;

  return (
    <li>
      <div
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") onSelect(); }}
        className="group relative flex rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-14px_rgba(47,42,38,0.22)]"
        style={{
          height: 110,
          background: "#FFFFFF",
          border: "1px solid #EAD9C4",
          boxShadow: "0 1px 2px rgba(47,42,38,0.03), 0 4px 12px -10px rgba(47,42,38,0.08)",
        }}
      >
        {/* Left 42% — photo or color block */}
        <div className="relative shrink-0" style={{ width: "42%" }}>
          {image ? (
            <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <CategoryBlock catKey={recipe.category} iconSize={36} />
          )}
        </div>

        {/* Right 58% — content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between p-3">
          <div className="flex items-start justify-between gap-2 min-w-0">
            <CatChip label={catLabel} />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const wasFav = recipesStore.isFavorite(recipe.id);
                recipesStore.toggleFavorite(recipe.id);
                if (!wasFav) track("recipe_favorited", { recipe_name: recipe.name });
              }}
              aria-label={isFav ? "Quitar favorita" : "Marcar favorita"}
              className="text-[18px] leading-none transition-transform hover:scale-110 shrink-0"
              style={{ color: isFav ? "#E85D2F" : "#D6CFC1" }}
            >
              {isFav ? "★" : "☆"}
            </button>
          </div>

          <div className="min-w-0">
            <h3
              className="text-[14.5px] leading-[1.2] mb-1 overflow-hidden text-ellipsis whitespace-nowrap"
              style={{
                color: "#3A2A20",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.005em",
              }}
              title={recipe.name}
            >
              {recipe.name}
            </h3>
            <div
              className="flex items-center gap-x-1.5 text-[11px] whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
            >
              {methodLabel && (
                <span className="inline-flex items-center gap-1">
                  <Utensils className="w-3 h-3" strokeWidth={1.75} />
                  <span>{stripEmoji(methodLabel)}</span>
                </span>
              )}
              {recipe.time && (
                <>
                  {methodLabel && <span style={{ color: "#C9C0AE" }}>·</span>}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" strokeWidth={1.75} />
                    {recipe.time}
                  </span>
                </>
              )}
              {isAdmin && (
                <span className="ml-auto inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="rounded-md w-6 h-6 inline-flex items-center justify-center transition-colors"
                    style={{ color: "#5E8C4A" }}
                    aria-label="Editar receta"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onAskDelete(); }}
                    className="rounded-md w-6 h-6 inline-flex items-center justify-center transition-colors"
                    style={{ color: "#E85D2F" }}
                    aria-label="Eliminar receta"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function RecipesPage({ favoritesOnly = false, initialCategory }: { favoritesOnly?: boolean; initialCategory?: string } = {}) {
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
  const allRecipes = useRecipes();
  const [publishedRecipes, setPublishedRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      // For admin we rely on the local store (useRecipes) which hydrates quickly.
      const t = setTimeout(() => setLoading(false), 250);
      return () => clearTimeout(t);
    }
    setLoading(true);
    supabase
      .from("recipes_staging")
      .select("id, name, category, methods, time, ingredients, preparation, notes, image_url, created_at, status")
      .eq("status", "published")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error cargando recetas publicadas", error);
          setLoading(false);
          return;
        }
        setPublishedRecipes(
          (data ?? []).map((row: any) => ({
            id: row.id,
            name: row.name,
            category: row.category,
            methods: row.methods ?? [],
            time: row.time ?? undefined,
            ingredients: row.ingredients ?? undefined,
            preparation: row.preparation ?? undefined,
            notes: row.notes ?? undefined,
            image: row.image_url ?? undefined,
            createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
          }))
        );
        setLoading(false);
      });
  }, [isAdmin]);

  const sourceRecipes = isAdmin ? allRecipes : publishedRecipes;
  const recipes = favoritesOnly
    ? sourceRecipes.filter((r) => recipesStore.isFavorite(r.id))
    : sourceRecipes;
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(initialCategory ?? "all");
  const [methods, setMethods] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const [selected, setSelected] = useState<SavedRecipe | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SavedRecipe | null>(null);
  const [showMethodFilter, setShowMethodFilter] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#E85D2F" }} />
      </div>
    );
  }

  return (
    <>
      {/* Header recetario emocional */}
      <section
        className="relative overflow-hidden rounded-[32px] mb-6 px-5 pt-7 pb-7 md:px-9 md:pt-10 md:pb-10"
        style={{
          background:
            "radial-gradient(120% 80% at 100% 0%, rgba(232,93,47,0.18), transparent 55%), linear-gradient(135deg, #3A2A20 0%, #4D3A2C 100%)",
          boxShadow: "0 20px 50px -20px rgba(58,42,32,0.45)",
        }}
      >
        <img
          src={cucharonSopa}
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 right-0 md:right-2 w-[170px] md:w-[240px] h-auto object-contain"
          style={{ filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.35))" }}
        />
        <div className="relative z-10 max-w-[62%] md:max-w-[65%]">
          <h2
            className="font-serif text-[28px] md:text-[40px] leading-[1.08]"
            style={{ color: "#FFF6EA", letterSpacing: "-0.015em", fontWeight: 600 }}
          >
            ¿Qué te provoca hoy?
          </h2>
          <p
            className="mt-3 text-[14px] md:text-[16px] italic leading-[1.5]"
            style={{ color: "#C9B5A4", fontFamily: "Montserrat, sans-serif" }}
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

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#8A6B55" }} />
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
        <button
          type="button"
          onClick={() => setShowMethodFilter((v) => !v)}
          className="relative shrink-0 rounded-full inline-flex items-center gap-1.5 px-4 py-3 text-[13px] transition-all"
          style={
            showMethodFilter || methods.length > 0
              ? { background: "#E85D2F", color: "#FFF6EA", border: "1px solid #E85D2F", fontWeight: 600, fontFamily: "Montserrat, sans-serif" }
              : { background: "#FFFFFF", color: "#3A2A20", border: "1px solid #EDE8DC", fontWeight: 500, fontFamily: "Montserrat, sans-serif" }
          }
          aria-label="Filtrar"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtrar</span>
          {methods.length > 0 && (
            <span
              className="ml-0.5 inline-flex items-center justify-center text-[10px] rounded-full w-4 h-4"
              style={{ background: "#FFF6EA", color: "#E85D2F", fontWeight: 700 }}
            >
              {methods.length}
            </span>
          )}
        </button>
      </div>

      {showMethodFilter && (
        <div
          className="mb-5 rounded-2xl p-3.5"
          style={{ background: "#FFFFFF", border: "1px solid #EDE8DC" }}
        >
          <div className="flex items-center justify-between mb-2.5">
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
          <div className="flex flex-wrap gap-2">
            {COOKING_METHODS.map((m) => (
              <button
                key={m.key}
                onClick={() => toggleMethod(m.key)}
                className="rounded-full px-3.5 py-1.5 text-[12px] transition-all border"
                style={
                  methods.includes(m.key)
                    ? { background: "#E85D2F", borderColor: "#E85D2F", color: "#FFF6EA", fontWeight: 600, fontFamily: "Montserrat, sans-serif" }
                    : { background: "#FFFFFF", borderColor: "#EAD9C4", color: "#3A2A20", fontWeight: 500, fontFamily: "Montserrat, sans-serif" }
                }
              >
                {stripEmoji(m.label)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <span
          className="block text-[10px] uppercase tracking-[0.18em] font-medium mb-2"
          style={{ color: "#5E8C4A" }}
        >
          Colecciones
        </span>
        <div className="relative -mx-5">
          <div
            className="flex gap-2 overflow-x-auto flex-nowrap px-5 pb-1 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
          {CATEGORIES.map((c) => {
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] transition-all border whitespace-nowrap"
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
                        background: "#FFFFFF",
                        borderColor: "#EAD9C4",
                        color: "#3A2A20",
                        fontWeight: 500,
                        fontFamily: "Montserrat, sans-serif",
                      }
                }
              >
                {stripEmoji(c.label)}
              </button>
            );
          })}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-full w-10"
            style={{ background: "linear-gradient(to left, #FFF6EA 0%, rgba(255,246,234,0) 100%)" }}
          />
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
