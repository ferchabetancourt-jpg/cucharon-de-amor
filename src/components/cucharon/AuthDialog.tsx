import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import logoFull from "@/assets/cucharon-logo-full.png.asset.json";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [info, setInfo] = useState("");

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setInfo("");
    setMode("login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setInfo("Revisa tu correo para restablecer tu contraseña");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Hola de nuevo 💛");
        reset();
        onClose();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Algo salió mal";
      const friendly =
        msg.includes("Invalid login")
          ? "Credenciales incorrectas. Contacta a la administradora."
          : msg;
      setError(friendly);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-[420px] p-0 overflow-hidden border-0"
        style={{ background: "transparent" }}
      >
        <div
          className="p-6 md:p-7"
          style={{
            background:
              "linear-gradient(135deg, #FFF6EA 0%, #FFF6EA 100%)",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
            boxShadow: "0 20px 50px -20px rgba(47,42,38,0.25)",
          }}
        >
          <div className="text-center mb-5">
            <img
              src={logoFull.url}
              alt="Un Cucharón de Amor"
              className="mx-auto mb-3 object-contain"
              style={{ width: "200px", height: "auto" }}
            />
            <DialogTitle asChild>
              <h2
                className="font-serif text-[22px] md:text-[24px]"
                style={{ color: "#3A2A20", fontWeight: 600 }}
              >
                Bienvenid@ de vuelta
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <p
                className="text-[13px] mt-1 italic"
                style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
              >
                Recetas que viajan por generaciones
              </p>
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#5E8C4A" }}>
                Correo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #EDE8DC",
                  color: "#3A2A20",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#5E8C4A" }}>
                Contraseña
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #EDE8DC",
                  color: "#3A2A20",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[13.5px] mt-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #E85D2F, #A84E22)",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                boxShadow: "0 8px 20px -10px rgba(232,93,47,0.55)",
              }}
            >
              {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Entrar
            </button>

            {error && (
              <div
                className="mt-3 px-3.5 py-2.5 rounded-xl text-[12.5px] text-center leading-relaxed"
                style={{
                  background: "linear-gradient(135deg, #FFF6EA, #FFF6EA)",
                  border: "1px solid #E85D2F",
                  color: "#A84E22",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {error}
              </div>
            )}
          </form>

          <p
            className="text-center text-[12.5px] mt-4"
            style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}
          >
            El registro es solo por invitación. Pide acceso a la administradora.{" "}
            <a
              href="mailto:"
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: "#E85D2F" }}
            >
              ¿Cómo funciona la invitación?
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
