import { useEffect, useState } from "react";
import { CATEGORIES, COOKING_METHODS } from "@/lib/cucharon-data";
import { recipesStore, type SavedRecipe } from "@/lib/recipes-store";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ADMIN_EMAIL = "ferchabetancourt@gmail.com";

interface Props {
  open: boolean;
  onClose: () => void;
  editing?: SavedRecipe | null;
  initial?: Partial<Omit<SavedRecipe, "id" | "createdAt">> | null;
}

export function RecipeFormModal({ open, onClose, editing, initial }: Props) {
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("especiales");
  const [methods, setMethods] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (open) {
      if (editing) {
        setName(editing.name);
        setCategory(editing.category);
        setMethods(editing.methods ?? []);
        setTime(editing.time ?? "");
        setIngredients(editing.ingredients ?? "");
        setPreparation(editing.preparation ?? "");
        setNotes(editing.notes ?? "");
        setImage(editing.image ?? "");
      } else {
        setName(initial?.name ?? "");
        setCategory(initial?.category ?? "especiales");
        setMethods(initial?.methods ?? []);
        setTime(initial?.time ?? "");
        setIngredients(initial?.ingredients ?? "");
        setPreparation(initial?.preparation ?? "");
        setNotes(initial?.notes ?? "");
        setImage("");
      }
    }
  }, [open, editing, initial]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Ponele un nombre a la receta");
      return;
    }
    const payload = {
      name: name.trim(),
      category,
      methods: methods.length ? methods : undefined,
      time: time.trim() || undefined,
      ingredients: ingredients.trim() || undefined,
      preparation: preparation.trim() || undefined,
      notes: notes.trim() || undefined,
      image: image.trim() || undefined,
    };
    if (editing) {
      recipesStore.update(editing.id, payload);
      toast.success("Receta actualizada 💛");
    } else {
      recipesStore.add(payload);
      toast.success("Receta guardada 💛");
    }
    onClose();
  };

  const toggleMethod = (k: string) =>
    setMethods((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));

  const catOptions = CATEGORIES.filter((c) => c.key !== "all");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      onClick={onClose}
      className={`fixed inset-0 z-50 bg-ink/50 flex items-end justify-center transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-paper rounded-t-[22px] w-full max-w-[720px] max-h-[90vh] overflow-y-auto px-5 pt-5 pb-9 transition-transform duration-[350ms] ease-[cubic-bezier(.32,.72,0,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-9 h-1 bg-cream-deep rounded mx-auto mb-4" />
        <h2 className="font-serif text-[19px] text-terracotta mb-4">
          {editing ? "✏️ Editar receta" : "✍️ Nueva receta"}
        </h2>

        <form onSubmit={submit}>
          <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5">
            Nombre *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 border-2 border-input rounded-xl bg-cream text-sm outline-none focus:border-terracotta-light transition-colors"
            placeholder="Ej: Bowl de quinoa con palta"
          />

          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <div>
              <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-input rounded-xl bg-cream text-sm outline-none focus:border-terracotta-light transition-colors"
              >
                {catOptions.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5">
                Tiempo aprox.
              </label>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="20 min"
                className="w-full px-3.5 py-2.5 border-2 border-input rounded-xl bg-cream text-sm outline-none focus:border-terracotta-light transition-colors"
              />
            </div>
          </div>

          <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5 mt-3">
            Métodos de cocción
          </label>
          <div className="flex flex-wrap gap-1.5">
            {COOKING_METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => toggleMethod(m.key)}
                className={cn(
                  "rounded-full px-2.5 py-1 border-2 text-[11px] font-medium transition-all",
                  methods.includes(m.key)
                    ? "bg-verde border-verde text-primary-foreground"
                    : "bg-cream border-cream-deep text-ink hover:border-verde-light"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5 mt-3">
            Ingredientes
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2.5 border-2 border-input rounded-xl bg-cream text-sm outline-none resize-y focus:border-terracotta-light transition-colors"
          />

          <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5 mt-3">
            Preparación
          </label>
          <textarea
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            rows={5}
            className="w-full px-3.5 py-2.5 border-2 border-input rounded-xl bg-cream text-sm outline-none resize-y focus:border-terracotta-light transition-colors"
          />

          <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5 mt-3">
            Notas / Secretos
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3.5 py-2.5 border-2 border-input rounded-xl bg-cream text-sm outline-none resize-y focus:border-terracotta-light transition-colors"
          />

          {isAdmin && (
            <>
              <label className="block text-[11px] font-medium text-verde uppercase tracking-[0.08em] mb-1.5 mt-3">
                Foto de la receta
              </label>
              {image && (
                <div className="mb-2 relative inline-block">
                  <img
                    src={image}
                    alt=""
                    className="rounded-xl object-cover"
                    style={{ width: 120, height: 90, border: "1px solid #EAD9C4" }}
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#EAD9C4] text-[#E85D2F] text-xs shadow-sm hover:bg-cream"
                    aria-label="Quitar foto"
                  >
                    ✕
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  if (f.size > 2 * 1024 * 1024) {
                    toast.error("La imagen debe pesar menos de 2 MB");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => setImage(String(reader.result ?? ""));
                  reader.readAsDataURL(f);
                }}
                className="block w-full text-[12px] text-ink file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-cream-deep file:text-ink file:cursor-pointer hover:file:bg-cream"
              />
              <p className="text-[10.5px] text-muted-foreground mt-1 italic">
                Visible solo para administradores. Máx 2 MB.
              </p>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-warm text-primary-foreground py-3 rounded-xl font-serif italic text-[15px] mt-4 shadow-warm hover:opacity-95 active:scale-[.98] transition-all"
          >
            💾 {editing ? "Actualizar receta" : "Guardar receta"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-transparent text-ink border-2 border-input py-2.5 rounded-xl text-[13px] mt-2 hover:bg-cream transition-colors"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
