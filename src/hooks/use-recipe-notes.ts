import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const STORAGE_KEY = "cucharon-personal-notes-v1";

function loadAll(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function persistAll(map: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function useRecipeNotes(recipeId: string | undefined) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [note, setNote] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load initial value
  useEffect(() => {
    if (!recipeId) {
      setNote("");
      return;
    }
    if (userId) {
      let cancelled = false;
      supabase
        .from("recipe_notes")
        .select("content")
        .eq("user_id", userId)
        .eq("recipe_id", recipeId)
        .maybeSingle()
        .then(({ data }) => {
          if (!cancelled) setNote((data?.content as string | undefined) ?? "");
        });
      return () => {
        cancelled = true;
      };
    }
    const all = loadAll();
    setNote(all[recipeId] ?? "");
  }, [recipeId, userId]);

  const saveNote = useCallback((value: string) => {
    if (!recipeId) return;
    if (userId) {
      if (!value.trim()) {
        supabase
          .from("recipe_notes")
          .delete()
          .eq("user_id", userId)
          .eq("recipe_id", recipeId)
          .then(() => {});
      } else {
        supabase
          .from("recipe_notes")
          .upsert(
            { user_id: userId, recipe_id: recipeId, content: value },
            { onConflict: "user_id,recipe_id" }
          )
          .then(() => {});
      }
      return;
    }
    const all = loadAll();
    if (!value.trim()) delete all[recipeId];
    else all[recipeId] = value;
    persistAll(all);
  }, [recipeId, userId]);

  const handleChange = useCallback((value: string) => {
    setNote(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveNote(value), 500);
  }, [saveNote]);

  return [note, handleChange] as const;
}
