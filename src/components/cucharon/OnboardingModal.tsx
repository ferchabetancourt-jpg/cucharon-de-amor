import { Heart } from "lucide-react";

export function OnboardingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(58, 42, 32, 0.55)" }}>
      <div
        className="w-full max-w-[380px] rounded-2xl bg-white p-6 shadow-2xl animate-fade-in-up"
        style={{ borderTop: "4px solid #F2A93B" }}
      >
        <p className="text-[15px] leading-[1.75]" style={{ color: "#3A2A20", fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif" }}>
          Un Cucharón de Amor no es una app de recetas.
          <br /><br />
          Es un lugar donde las tradiciones de familia no se pierden.
          <br /><br />
          Aquí viven las recetas de mamá, de la abuela, de las que ya no están.
          <br /><br />
          Y las tuyas también tienen un lugar.
          <br /><br />
          Sube tus recetas. Comparte tu legado. Cocinemos juntos.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-full text-[14px] font-medium transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2"
          style={{
            background: "#E85D2F",
            color: "#FFF6EA",
            fontFamily: "'Montserrat', 'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            boxShadow: "0 10px 25px -10px rgba(232, 93, 47, 0.5)",
          }}
        >
          Entendido <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
