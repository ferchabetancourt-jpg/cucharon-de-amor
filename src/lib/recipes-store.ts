import { SEED_RECIPES } from "./recipes-seed";
import { supabase } from "@/integrations/supabase/client";

// Recipe store with localStorage persistence + seed recipes
export type SavedRecipe = {
  id: string;
  name: string;
  category: string;
  methods?: string[];
  time?: string;
  ingredients?: string;
  preparation?: string;
  notes?: string;
  createdAt: number;
};

type Listener = (recipes: SavedRecipe[]) => void;

const STORAGE_KEY = "cucharon-recipes-v2";
const REMOVED_SEEDS_KEY = "cucharon-removed-seeds-v1";
const FAVORITES_KEY = "cucharon-favorites-v1";
const NOTES_KEY = "cucharon-personal-notes-v1";
const RESET_FLAG_KEY = "cucharon-reset-v1";

if (typeof window !== "undefined") {
  try {
    if (!localStorage.getItem(RESET_FLAG_KEY)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REMOVED_SEEDS_KEY);
      localStorage.removeItem(FAVORITES_KEY);
      sessionStorage.removeItem("cucharon-recipes-v1");
      localStorage.setItem(RESET_FLAG_KEY, "1");
    }
  } catch {
    /* ignore */
  }
}

let recipes: SavedRecipe[] = load();
const listeners = new Set<Listener>();

// --- Remote sync state ---
let currentUserId: string | null = null;
let remoteFavorites: Set<string> | null = null;

function loadRemovedSeeds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(REMOVED_SEEDS_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function persistRemovedSeeds(set: Set<string>) {
  try {
    localStorage.setItem(REMOVED_SEEDS_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

function load(): SavedRecipe[] {
  if (typeof window === "undefined") return [...SEED_RECIPES];
  let userRecipes: SavedRecipe[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    userRecipes = raw ? (JSON.parse(raw) as SavedRecipe[]) : [];
  } catch {
    userRecipes = [];
  }
  try {
    const oldRaw = sessionStorage.getItem("cucharon-recipes-v1");
    if (oldRaw && userRecipes.length === 0) {
      userRecipes = JSON.parse(oldRaw) as SavedRecipe[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userRecipes));
      sessionStorage.removeItem("cucharon-recipes-v1");
    }
  } catch {
    /* ignore */
  }

  const removed = loadRemovedSeeds();
  const seeds = SEED_RECIPES.filter((s) => !removed.has(s.id));
  const userIds = new Set(userRecipes.map((r) => r.id));
  const seedsToAdd = seeds.filter((s) => !userIds.has(s.id));
  return [...userRecipes, ...seedsToAdd].sort((a, b) => b.createdAt - a.createdAt);
}

function persist() {
  try {
    const seedMap = new Map(SEED_RECIPES.map((s) => [s.id, s]));
    const toSave = recipes.filter((r) => {
      if (!r.id.startsWith("seed-")) return true;
      const orig = seedMap.get(r.id);
      if (!orig) return true;
      return JSON.stringify(orig) !== JSON.stringify(r);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    /* ignore */
  }
}

function emit() {
  const snapshot = [...recipes];
  listeners.forEach((l) => l(snapshot));
}

function localFavoritesSet(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function persistLocalFavorites(set: Set<string>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...set]));
  } catch { /* ignore */ }
}

export const recipesStore = {
  list(): SavedRecipe[] {
    return recipes;
  },
  get(id: string): SavedRecipe | undefined {
    return recipes.find((r) => r.id === id);
  },
  add(r: Omit<SavedRecipe, "id" | "createdAt">): SavedRecipe {
    const rec: SavedRecipe = {
      ...r,
      id: Math.random().toString(36).slice(2, 10),
      createdAt: Date.now(),
    };
    recipes = [rec, ...recipes];
    persist();
    emit();
    return rec;
  },
  update(id: string, patch: Partial<Omit<SavedRecipe, "id" | "createdAt">>) {
    recipes = recipes.map((r) => (r.id === id ? { ...r, ...patch } : r));
    persist();
    emit();
  },
  remove(id: string) {
    recipes = recipes.filter((r) => r.id !== id);
    if (id.startsWith("seed-")) {
      const removed = loadRemovedSeeds();
      removed.add(id);
      persistRemovedSeeds(removed);
    }
    persist();
    emit();
  },
  // Favorites
  getFavorites(): Set<string> {
    if (remoteFavorites) return new Set(remoteFavorites);
    return localFavoritesSet();
  },
  isFavorite(id: string): boolean {
    return recipesStore.getFavorites().has(id);
  },
  toggleFavorite(id: string) {
    if (currentUserId && remoteFavorites) {
      const has = remoteFavorites.has(id);
      // optimistic
      if (has) remoteFavorites.delete(id);
      else remoteFavorites.add(id);
      emit();
      const uid = currentUserId;
      (async () => {
        try {
          if (has) {
            await supabase.from("favorites").delete().eq("user_id", uid).eq("recipe_id", id);
          } else {
            await supabase.from("favorites").upsert(
              { user_id: uid, recipe_id: id },
              { onConflict: "user_id,recipe_id" }
            );
          }
        } catch {
          // revert on failure
          if (has) remoteFavorites?.add(id);
          else remoteFavorites?.delete(id);
          emit();
        }
      })();
      return;
    }
    const favs = localFavoritesSet();
    if (favs.has(id)) favs.delete(id);
    else favs.add(id);
    persistLocalFavorites(favs);
    emit();
  },
  // Auth-aware sync. Called when user signs in/out.
  async setUser(userId: string | null) {
    if (userId === currentUserId) return;
    currentUserId = userId;
    if (!userId) {
      remoteFavorites = null;
      emit();
      return;
    }
    // Migrate any local favorites and notes into the user's account
    try {
      const localFavs = localFavoritesSet();
      if (localFavs.size > 0) {
        const rows = [...localFavs].map((recipe_id) => ({ user_id: userId, recipe_id }));
        await supabase.from("favorites").upsert(rows, { onConflict: "user_id,recipe_id" });
        localStorage.removeItem(FAVORITES_KEY);
      }
      const rawNotes = localStorage.getItem(NOTES_KEY);
      if (rawNotes) {
        const map = JSON.parse(rawNotes) as Record<string, string>;
        const rows = Object.entries(map)
          .filter(([, v]) => v && v.trim().length > 0)
          .map(([recipe_id, content]) => ({ user_id: userId, recipe_id, content }));
        if (rows.length > 0) {
          await supabase.from("recipe_notes").upsert(rows, { onConflict: "user_id,recipe_id" });
        }
        localStorage.removeItem(NOTES_KEY);
      }
    } catch {
      /* migration best-effort */
    }
    // Load remote favorites
    try {
      const { data } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", userId);
      remoteFavorites = new Set((data ?? []).map((r) => r.recipe_id as string));
    } catch {
      remoteFavorites = new Set();
    }
    emit();
  },
  subscribe(l: Listener): () => void {
    listeners.add(l);
    l(recipes);
    return () => listeners.delete(l);
  },
};
