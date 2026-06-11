import { useState } from "react";
import logoAsset from "@/assets/cucharon-logo.png.asset.json";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "./AuthDialog";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function Header() {
  const { user, signOut } = useAuth();
  const [openAuth, setOpenAuth] = useState(false);

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0];
  const initial = (displayName || "?").charAt(0).toUpperCase();

  return (
    <>
      <header className="flex items-center gap-3">
        <img
          src={logoAsset.url}
          alt="Un Cucharón de Amor"
          className="object-contain h-[72px] w-auto shrink-0"
        />
        <div className="flex flex-col leading-tight min-w-0 flex-1">
          <h1
            className="font-serif text-[17px] md:text-[20px] truncate"
            style={{ color: "#3A2A20", fontWeight: 600, letterSpacing: "0.005em" }}
          >
            Un Cucharón de Amor
          </h1>
          <p
            className="italic text-[11.5px] md:text-[13px] mt-0.5"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#8A6B55" }}
          >
            {user ? `Hola, ${displayName} 💛` : "Recetas que viajan por generaciones"}
          </p>
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-[15px] font-semibold transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #E85D2F, #A84E22)",
                  color: "#FFFFFF",
                  fontFamily: "Montserrat, sans-serif",
                  boxShadow: "0 6px 14px -8px rgba(201,106,43,0.55)",
                }}
                aria-label="Menú de usuario"
              >
                {initial}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-3.5 h-3.5" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold" style={{ color: "#3A2A20" }}>
                      {displayName}
                    </p>
                    <p className="truncate text-[11px]" style={{ color: "#8A6B55" }}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await signOut();
                  toast.success("Sesión cerrada");
                }}
              >
                <LogOut className="w-3.5 h-3.5 mr-2" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => setOpenAuth(true)}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] transition-all hover:scale-[1.02] active:scale-95"
            style={{
              background: "linear-gradient(135deg, #E85D2F, #A84E22)",
              color: "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              boxShadow: "0 6px 14px -8px rgba(201,106,43,0.55)",
            }}
          >
            <LogIn className="w-3.5 h-3.5" />
            Entrar
          </button>
        )}
      </header>
      <AuthDialog open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
}
