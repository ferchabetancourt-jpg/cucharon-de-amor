import { useState } from "react";
import { CATEGORIES, COOKING_METHODS } from "@/lib/cucharon-data";
import { recipesStore, type SavedRecipe } from "@/lib/recipes-store";
import { useRecipes } from "@/hooks/use-recipes";
import { cn } from "@/lib/utils";
import { ArrowLeft, Trash2, Star, Pencil } from "lucide-react";
import { RecipeFormModal } from "./RecipeFormModal";
import { toast } from "sonner";
import { useRecipeNotes } from "@/hooks/use-recipe-notes";
import { track } from "@/lib/analytics";
import favoritaCard from "@/assets/favorita-card.png.asset.json";
import favoritaStar from "@/assets/favorita-star.png.asset.json";
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

function RecipeDetail({
  recipe,
  onBack,
  onEdit,
  onAskDelete,
}: {
  recipe: SavedRecipe;
  onBack: () => void;
  onEdit: () => void;
  onAskDelete: () => void;
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
              <Star className={cn("w-4 h-4", isFav ? "fill-ochre text-ochre" : "text-muted-foreground")} />
            </button>
            <button
              onClick={onEdit}
              className="bg-cream rounded-lg w-9 h-9 inline-flex items-center justify-center hover:bg-verde/10 hover:text-verde transition-colors"
              aria-label="Editar"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onAskDelete}
              className="bg-cream rounded-lg w-9 h-9 inline-flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
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

function FavoriteCard({
  recipe,
  onSelect,
  onEdit,
  onAskDelete,
}: {
  recipe: SavedRecipe;
  onSelect: () => void;
  onEdit: () => void;
  onAskDelete: () => void;
}) {
  const catLabel = CATEGORIES.find((c) => c.key === recipe.category)?.label ?? "📌 Especiales";

  return (
    <li>
      <div
        onClick={onSelect}
        className="group relative rounded-2xl p-5 md:p-6 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_30px_-18px_rgba(201,106,43,0.35)]"
        style={{
          background: "#FFFFFF",
          border: "1px solid #EDE8DC",
          boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 6px 18px -14px rgba(201,106,43,0.25)",
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const wasFav = recipesStore.isFavorite(recipe.id);
              recipesStore.toggleFavorite(recipe.id);
              if (!wasFav) track("recipe_favorited", { recipe_name: recipe.name });
            }}
            aria-label="Quitar favorita"
            className="text-2xl leading-none transition-transform hover:scale-110"
            style={{ color: "#E85D2F" }}
          >
            ★
          </button>
          <span
            className="rounded-full px-2.5 py-1 text-[11px]"
            style={{ background: "#FFF6EA", color: "#5E8C4A", fontFamily: "Montserrat, sans-serif", fontWeight: 500, border: "1px solid #EDE8DC" }}
          >
            {catLabel}
          </span>
        </div>

        <h3
          className="font-serif text-[19px] md:text-[21px] leading-[1.2] mt-3 mb-3"
          style={{ color: "#3A2A20", fontWeight: 600, letterSpacing: "-0.005em" }}
        >
          {recipe.name}
        </h3>

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

        <div className="flex justify-end gap-1.5 mt-4 pt-3 border-t" style={{ borderColor: "#F2ECE0" }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="rounded-lg w-8 h-8 inline-flex items-center justify-center"
            style={{ background: "#FFF6EA", color: "#5E8C4A" }}
            aria-label="Editar"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onAskDelete(); }}
            className="rounded-lg w-8 h-8 inline-flex items-center justify-center"
            style={{ background: "#FFF6EA", color: "#E85D2F" }}
            aria-label="Eliminar"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function FavoritesPage() {
  const allRecipes = useRecipes();
  const favorites = allRecipes
    .filter((r) => recipesStore.isFavorite(r.id))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const [selected, setSelected] = useState<SavedRecipe | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SavedRecipe | null>(null);

  const openEdit = (r: SavedRecipe) => { setEditing(r); setOpenForm(true); };
  const closeForm = () => { setOpenForm(false); setEditing(null); };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    recipesStore.remove(id);
    toast.success("Receta eliminada");
    setPendingDelete(null);
    if (selected?.id === id) setSelected(null);
  };

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
          <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Borrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (selected) {
    const fresh = allRecipes.find((r) => r.id === selected.id);
    if (!fresh) { setSelected(null); return null; }
    return (
      <>
        <RecipeDetail
          recipe={fresh}
          onBack={() => setSelected(null)}
          onEdit={() => openEdit(fresh)}
          onAskDelete={() => setPendingDelete(fresh)}
        />
        <RecipeFormModal open={openForm} onClose={closeForm} editing={editing} />
        {deleteDialog}
      </>
    );
  }

  return (
    <>
      {/* Hero Favoritos */}
      <section
        className="relative overflow-hidden rounded-[20px] mb-7 px-5 py-6 md:px-7 md:py-7"
        style={{
          background:
            "linear-gradient(135deg, #FFF6EA 0%, #EDE8DC 100%), radial-gradient(circle at 80% 20%, rgba(201,106,43,0.06), transparent 60%)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 8px 24px -16px rgba(47,42,38,0.12)",
        }}
      >
        <div className="relative z-10 flex items-center gap-4 md:gap-5">
          <div className="flex-1 min-w-0">
            <h2
              className="font-serif text-[24px] md:text-[30px] leading-[1.15]"
              style={{ color: "#3A2A20", letterSpacing: "-0.005em", fontWeight: 600 }}
            >
              ⭐ Mis Favoritas
            </h2>
            <p
              className="mt-2 text-[13px] md:text-[14px] italic leading-[1.5]"
              style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
            >
              Las recetas que siempre encuentran el camino de vuelta a tu mesa.
            </p>
          </div>
          <img
            src={favoritaCard.url}
            alt=""
            aria-hidden
            className="pointer-events-none select-none flex-shrink-0 w-[110px] md:w-[140px] h-auto object-contain opacity-95"
            style={{ filter: "drop-shadow(0 6px 14px rgba(107,98,87,0.15))" }}
          />
        </div>
      </section>

      {favorites.length === 0 ? (
        <div className="relative text-center py-14 px-6 flex flex-col items-center overflow-hidden">
          <img
            src={favoritaStar.url}
            alt=""
            aria-hidden
            width={512}
            height={512}
            loading="lazy"
            className="pointer-events-none select-none w-[170px] md:w-[200px] mb-5 opacity-95"
          />
          <h3
            className="font-serif text-[22px] md:text-[24px] mb-3"
            style={{ color: "#3A2A20", fontWeight: 600 }}
          >
            ⭐ Aún no has marcado favoritos
          </h3>
          <p
            className="text-[13.5px] max-w-sm leading-[1.7]"
            style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
          >
            Las recetas especiales aparecerán aquí.<br />
            Marca tus preferidas tocando la estrella.
          </p>
          <p
            className="mt-7 italic text-[13px]"
            style={{ color: "#5E8C4A", fontFamily: "Playfair Display, serif" }}
          >
            Las recetas que amas viven aquí 💛
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-4 px-1">
            <span className="h-px flex-1" style={{ background: "#EDE8DC" }} />
            <span
              className="text-[11px] uppercase tracking-[0.22em] font-medium"
              style={{ color: "#E85D2F", fontFamily: "Montserrat, sans-serif" }}
            >
              ⭐ Tus recetas favoritas
            </span>
            <span className="h-px flex-1" style={{ background: "#EDE8DC" }} />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {favorites.map((r) => (
              <FavoriteCard
                key={r.id}
                recipe={r}
                onSelect={() => { track("recipe_viewed", { recipe_name: r.name }); setSelected(r); }}
                onEdit={() => openEdit(r)}
                onAskDelete={() => setPendingDelete(r)}
              />
            ))}
          </ul>

          <p
            className="text-center text-[12px] italic mt-8"
            style={{ color: "#5E8C4A", fontFamily: "Playfair Display, serif" }}
          >
            Las recetas que amas viven aquí 💛
          </p>
        </>
      )}

      <RecipeFormModal open={openForm} onClose={closeForm} editing={editing} />
      {deleteDialog}
    </>
  );
}
