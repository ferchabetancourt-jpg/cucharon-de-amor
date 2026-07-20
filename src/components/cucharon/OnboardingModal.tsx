import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ajiacoAsset from "@/assets/onboarding-ajiaco.webp.asset.json";
import appRecetasAsset from "@/assets/onboarding-app-recetas.webp.asset.json";
import { CATEGORIES } from "@/lib/cucharon-data";
import { supabase } from "@/integrations/supabase/client";

const FONT = "'Montserrat', 'DM Sans', system-ui, sans-serif";

type Props = {
  onClose: () => void;
  onPickCategory: (categoryKey: string) => void;
};

const MAP_ROWS = [
  { icon: "👩‍🍳", title: "Chef — ¿Qué cocinamos hoy?", body: "Cuéntale qué tienes en casa, elige cómo está tu cuerpo hoy, y te sugiere qué cocinar." },
  { icon: "📖", title: "Mis Recetas", body: "Busca, filtra y explora por colecciones." },
  { icon: "✍️", title: "Sube tus propias recetas", body: "Y decide si las compartes o las guardas solo para ti." },
  { icon: "📝", title: "Anota tus toques", body: "Cada receta tiene espacio para tus cambios y trucos personales." },
  { icon: "⭐", title: "Favoritos", body: "Guarda las que amas con un toque." },
];

export function OnboardingModal({ onClose, onPickCategory }: Props) {
  const [step, setStep] = useState(1);
  const collections = CATEGORIES.filter((c) => c.key !== "all");

  const markSeenAndClose = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("profiles")
          .update({ onboarding_visto: true } as never)
          .eq("id", user.id);
      }
    } catch {
      // no-op
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(58, 42, 32, 0.55)" }}
    >
      <div
        className="w-full max-w-[400px] rounded-2xl bg-cream shadow-2xl animate-fade-in-up overflow-hidden flex flex-col"
        style={{ borderTop: "4px solid #F2A93B", maxHeight: "92vh", background: "#FFF6EA" }}
      >
        {/* Progress dots + skip */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: step === n ? 20 : 6,
                  background: step === n ? "#E85D2F" : "#E5D5C0",
                }}
              />
            ))}
          </div>
          <button
            onClick={markSeenAndClose}
            className="text-[12px] transition-opacity hover:opacity-70"
            style={{ color: "#8A6B55", fontFamily: FONT }}
          >
            Saltar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="w-full rounded-2xl overflow-hidden mb-5" style={{ aspectRatio: "1 / 1", background: "#F5E8D0" }}>
                <img src={ajiacoAsset.url} alt="Ajiaco casero humeante" className="w-full h-full object-cover" />
              </div>
              <h2
                className="text-[24px] leading-[1.15] mb-3"
                style={{ color: "#3A2A20", fontFamily: FONT, fontWeight: 700 }}
              >
                ¡Bienvenida a tu cocina! 💛
              </h2>
              <p className="text-[15px] leading-[1.6]" style={{ color: "#3A2A20", fontFamily: FONT }}>
                Aquí viven más de 230 recetas probadas de verdad — con el sabor de casa que conoces.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2
                className="text-[22px] leading-[1.2] mb-4"
                style={{ color: "#3A2A20", fontFamily: FONT, fontWeight: 700 }}
              >
                Así de fácil:
              </h2>
              <ul className="space-y-3 mb-5">
                {MAP_ROWS.map((r) => (
                  <li key={r.title} className="flex gap-3">
                    <span className="text-[20px] leading-none shrink-0 mt-0.5">{r.icon}</span>
                    <div>
                      <p className="text-[13.5px] leading-[1.35]" style={{ color: "#3A2A20", fontFamily: FONT, fontWeight: 600 }}>
                        {r.title}
                      </p>
                      <p className="text-[12.5px] leading-[1.45] mt-0.5" style={{ color: "#8A6B55", fontFamily: FONT }}>
                        {r.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: "#EAD9C4", background: "#FFF" }}>
                <img src={appRecetasAsset.url} alt="Pantalla de Mis Recetas" className="w-full h-auto object-cover" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2
                className="text-[22px] leading-[1.2] mb-2"
                style={{ color: "#3A2A20", fontFamily: FONT, fontWeight: 700 }}
              >
                ¿Qué se te provoca hoy?
              </h2>
              <p className="text-[13px] mb-4" style={{ color: "#8A6B55", fontFamily: FONT }}>
                Toca una colección para explorarla.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {collections.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => {
                      onPickCategory(c.key);
                      markSeenAndClose();
                    }}
                    className="text-left rounded-xl px-3 py-3 text-[12.5px] leading-[1.3] transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #EAD9C4",
                      color: "#3A2A20",
                      fontFamily: FONT,
                      fontWeight: 600,
                      boxShadow: "0 2px 8px -6px rgba(47,42,38,0.15)",
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="px-6 pb-6 pt-1">
            <button
              onClick={() => setStep((s) => s + 1)}
              className="w-full py-3 rounded-full text-[14px] transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2"
              style={{
                background: "#E85D2F",
                color: "#FFF6EA",
                fontFamily: FONT,
                fontWeight: 600,
                boxShadow: "0 10px 25px -10px rgba(232, 93, 47, 0.5)",
              }}
            >
              {step === 1 ? "Empecemos" : "Ya entendí"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
