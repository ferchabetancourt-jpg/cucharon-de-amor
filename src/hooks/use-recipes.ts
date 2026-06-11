import { useEffect, useState } from "react";
import { recipesStore, SavedRecipe } from "@/lib/recipes-store";

export function useRecipes(): SavedRecipe[] {
  const [recipes, setRecipes] = useState<SavedRecipe[]>(() => recipesStore.list());
  useEffect(() => recipesStore.subscribe(setRecipes), []);
  return recipes;
}

export function useFavorites(): Set<string> {
  const [favs, setFavs] = useState<Set<string>>(() => recipesStore.getFavorites());
  useEffect(() => recipesStore.subscribe(() => setFavs(recipesStore.getFavorites())), []);
  return favs;
}
