import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Hola de nuevo 💛");
      reset();
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Algo salió mal";
      const friendly =
        msg.includes("Invalid login")
          ? "Acceso solo por invitación. Contacta a la administradora."
          : msg;
      toast.error(friendly);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("No pudimos conectar con Google");
        setBusy(false);
        return;
      }
      if (result.redirected) return; // browser redirects
      toast.success("Hola de nuevo 💛");
      onClose();
    } catch {
      toast.error("No pudimos conectar con Google");
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
              "linear-gradient(135deg, #FEFCF8 0%, #F7F3EB 100%)",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
            boxShadow: "0 20px 50px -20px rgba(47,42,38,0.25)",
          }}
        >
          <div className="text-center mb-5">
            <div className="text-[40px] leading-none mb-2">🥄</div>
            <DialogTitle asChild>
              <h2
                className="font-serif text-[22px] md:text-[24px]"
                style={{ color: "#2F2A26", fontWeight: 600 }}
              >
                Bienvenida de vuelta
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <p
                className="text-[13px] mt-1 italic"
                style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}
              >
                Tus recetas y favoritos te están esperando
              </p>
            </DialogDescription>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[13.5px] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE8DC",
              color: "#2F2A26",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.1 35.6 44 30.3 44 24c0-1.3-.1-2.4-.4-3.5z"/>
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 my-4">
            <span className="h-px flex-1" style={{ background: "#EDE8DC" }} />
            <span
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}
            >
              o con tu correo
            </span>
            <span className="h-px flex-1" style={{ background: "#EDE8DC" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#6F8B72" }}>
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
                  color: "#2F2A26",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#6F8B72" }}>
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
                  color: "#2F2A26",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[13.5px] mt-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #C96A2B, #A84E22)",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                boxShadow: "0 8px 20px -10px rgba(201,106,43,0.55)",
              }}
            >
              {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Entrar
            </button>
          </form>

          <p
            className="text-center text-[12.5px] mt-4"
            style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}
          >
            El registro es solo por invitación. Pide acceso a la administradora.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
