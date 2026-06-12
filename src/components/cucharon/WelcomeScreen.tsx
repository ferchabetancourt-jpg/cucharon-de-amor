import { useState } from "react";
import { Lock } from "lucide-react";
import { AuthDialog } from "./AuthDialog";
import logoFull from "@/assets/cucharon-logo-full.png.asset.json";
import bg from "@/assets/welcome-bg.png.asset.json";

export function WelcomeScreen() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="min-h-screen w-full relative flex flex-col"
      style={{
        backgroundImage: `url(${bg.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 flex flex-col items-center px-6 pt-[12vh] text-center">
        <img
          src={logoFull.url}
          alt="Un Cucharón de Amor"
          className="object-contain mb-4"
          style={{ width: "200px", height: "auto" }}
        />
        <h1
          className="font-serif text-[28px] md:text-[32px] leading-tight"
          style={{ color: "#FFF6EA", fontWeight: 600 }}
        >
          Un Cucharón de Amor
        </h1>
        <p
          className="italic mt-2 text-[15px] md:text-[16px]"
          style={{ color: "#C9B5A4", fontFamily: "Playfair Display, serif" }}
        >
          Las recetas de mamá, pero ligeras
        </p>
        <p
          className="mt-3 text-[12px] tracking-wide"
          style={{ color: "#C9B5A4", fontFamily: "Montserrat, sans-serif" }}
        >
          149 recetas que viajan por generaciones
        </p>
      </div>

      <div className="pb-[10vh] px-6 flex flex-col items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 rounded-full text-[14px] transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background: "#E85D2F",
            color: "#FFF6EA",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            boxShadow: "0 10px 25px -10px rgba(232,93,47,0.6)",
          }}
        >
          Tengo invitación
        </button>
        <div
          className="flex items-center gap-1.5 text-[12px]"
          style={{ color: "#C9B5A4", fontFamily: "Montserrat, sans-serif" }}
        >
          <Lock className="w-3 h-3" />
          <span>Una cocina privada, solo por invitación</span>
        </div>
      </div>

      <AuthDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}