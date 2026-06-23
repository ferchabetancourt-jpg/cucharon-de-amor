import { ChefHat, BookOpen, Star, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "chef" | "recipes" | "favorites";

const ADMIN_EMAIL = "ferchabetancourt@gmail.com";

interface NavBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  recipeCount: number;
  favoriteCount: number;
}


export function NavBar({ active, onChange, recipeCount, favoriteCount }: NavBarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  const tabBtn = (key: Tab, label: string, Icon: typeof ChefHat, count?: number) => (
    <button
      onClick={() => onChange(key)}
      className={cn(
        "flex-1 py-3.5 px-2 text-[13px] font-medium flex items-center justify-center gap-1.5 border-b-[3px] transition-colors",
        active === key
          ? "text-terracotta border-terracotta"
          : "text-muted-foreground border-transparent hover:text-ink"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
      {typeof count === "number" && (
        <span className="bg-terracotta text-primary-foreground rounded-full px-1.5 py-px text-[11px] leading-none ml-0.5">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <nav className="sticky top-0 z-40 bg-paper border-b border-border shadow-nav">
      <div className="max-w-[720px] mx-auto flex">
        {tabBtn("chef", "Chef", ChefHat)}
        {tabBtn("recipes", "Mis Recetas", BookOpen, recipeCount)}
        {tabBtn("favorites", "Favoritos", Star, favoriteCount)}
        {isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className={cn(
              "flex-1 py-3.5 px-2 text-[13px] font-medium flex items-center justify-center gap-1.5 border-b-[3px] transition-colors text-muted-foreground border-transparent hover:text-ink"
            )}
          >
            <KeyRound className="w-4 h-4" />
            Admin
          </button>
        )}
      </div>
    </nav>
  );
}

