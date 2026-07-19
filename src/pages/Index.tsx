import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NavBar } from "@/components/cucharon/NavBar";
import { Header } from "@/components/cucharon/Header";
import { InspirationCard } from "@/components/cucharon/InspirationCard";
import { RecipeGenerator } from "@/components/cucharon/RecipeGenerator";
import { RecipesPage } from "@/components/cucharon/RecipesPage";
import { FavoritesPage } from "@/components/cucharon/FavoritesPage";
import { useRecipes } from "@/hooks/use-recipes";
import { recipesStore } from "@/lib/recipes-store";
import { useAuth } from "@/contexts/AuthContext";
import { WelcomeScreen } from "@/components/cucharon/WelcomeScreen";
import { OnboardingModal } from "@/components/cucharon/OnboardingModal";
import { InstallPWAButton } from "@/components/cucharon/InstallPWAButton";

const Index = () => {
  const [tab, setTab] = useState<"chef" | "recipes" | "favorites">("chef");
  const [initialCat, setInitialCat] = useState<string | undefined>(undefined);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const recipes = useRecipes();
  const favoriteCount = recipes.filter((r) => recipesStore.isFavorite(r.id)).length;
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const check = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("onboarding_visto, password_changed")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled || !data) return;
      const d = data as { onboarding_visto?: boolean; password_changed?: boolean | null };
      if (!d.onboarding_visto && d.password_changed === true) {
        setShowOnboarding(true);
      }
    };
    check();
    const onPwd = () => check();
    window.addEventListener("cucharon:password-changed", onPwd);
    return () => {
      cancelled = true;
      window.removeEventListener("cucharon:password-changed", onPwd);
    };
  }, [user]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    if (user) {
      supabase
        .from("profiles")
        .update({ onboarding_visto: true } as never)
        .eq("id", user.id)
        .then(() => {});
    }
  };

  const handlePickCategory = (categoryKey: string) => {
    setInitialCat(categoryKey);
    setTab("recipes");
  };

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }
  if (!user) {
    return <WelcomeScreen />;
  }


  // Sticky header wrapper
  return (
    <div className="min-h-screen bg-background">
      <div
        className="sticky top-0 z-50 border-b shadow-sm"
        style={{
          background: "linear-gradient(to bottom, #F5F1E8, #FFFFFF)",
          borderColor: "#E5E7EB",
        }}
      >
        <div className="max-w-[720px] mx-auto px-4 py-2 md:py-3">
          <Header />
        </div>
        <NavBar
          active={tab}
          onChange={(t) => {
            setTab(t);
            if (t !== "recipes") setInitialCat(undefined);
          }}
          recipeCount={recipes.length}
          favoriteCount={favoriteCount}
        />
      </div>

      <main className="max-w-[720px] mx-auto px-4 sm:px-5 pt-6 pb-24">
        {tab === "chef" ? (
          <>
            <InstallPWAButton />
            <RecipeGenerator />
            <InspirationCard />

            <section className="my-12 md:my-16 px-4 text-center relative">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-10 bg-cream-deep" />
                <p className="text-[10px] uppercase tracking-[0.28em] text-verde font-medium">
                  Filosofía Cucharón
                </p>
                <span className="h-px w-10 bg-cream-deep" />
              </div>
              <p
                className="font-serif italic text-[22px] md:text-[26px] leading-[1.6]"
                style={{ color: "#3A2A20" }}
              >
                Sabor sobre complejidad.<br />
                Intención sobre perfección.<br />
                Amor sobre todo.
              </p>
              <p className="text-center text-[11px] text-verde italic mt-6 tracking-wide">
                Hecho con amor 🍳
              </p>
            </section>
          </>
        ) : tab === "recipes" ? (
          <RecipesPage initialCategory={initialCat} />
        ) : (
          <FavoritesPage />
        )}
      </main>
      {showOnboarding && (
        <OnboardingModal onClose={handleCloseOnboarding} onPickCategory={handlePickCategory} />
      )}
    </div>
  );
};

export default Index;
