import { useState } from "react";
import { recipesStore, type SavedRecipe } from "@/lib/recipes-store";
import { useRecipes } from "@/hooks/use-recipes";
import { useAuth } from "@/contexts/AuthContext";
import { RecipeFormModal } from "./RecipeFormModal";
import { toast } from "sonner";
import { track } from "@/lib/analytics";
import { RecipeDetail, RecipeListItem, ADMIN_EMAIL } from "./RecipesPage";
import paellaHero from "@/assets/paella-favoritos.webp";
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

export function FavoritesPage() {
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
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
          isAdmin={isAdmin}
        />
        <RecipeFormModal open={openForm} onClose={closeForm} editing={editing} />
        {deleteDialog}
      </>
    );
  }

  return (
    <>
      {/* Hero Favoritos — estilo cacao igual al de Mis Recetas */}
      <section
        className="relative overflow-hidden rounded-[32px] mb-6 px-5 pt-7 pb-7 md:px-9 md:pt-10 md:pb-10"
        style={{
          background:
            "radial-gradient(120% 80% at 100% 0%, rgba(232,93,47,0.18), transparent 55%), linear-gradient(135deg, #3A2A20 0%, #4D3A2C 100%)",
          boxShadow: "0 20px 50px -20px rgba(58,42,32,0.45)",
        }}
      >
        <img
          src={paellaHero}
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
            Mis Favoritas
          </h2>
          <p
            className="mt-3 text-[14px] md:text-[16px] italic leading-[1.5]"
            style={{ color: "#C9B5A4", fontFamily: "Montserrat, sans-serif" }}
          >
            Las recetas que siempre encuentran el camino de vuelta a tu mesa.
          </p>
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
            Aún no has marcado favoritos
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
              style={{ color: "#5E8C4A", fontFamily: "Montserrat, sans-serif" }}
            >
              Tus recetas favoritas
            </span>
            <span className="h-px flex-1" style={{ background: "#EDE8DC" }} />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {favorites.map((r) => (
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
