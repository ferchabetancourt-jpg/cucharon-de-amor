import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ChangePasswordDialog() {
  const { user } = useAuth();
  const mustChange = !!user?.user_metadata?.must_change_password;

  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!user || !mustChange) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pwd.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (pwd !== pwd2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: pwd,
        data: { must_change_password: false },
      });
      if (error) throw error;
      toast.success("Contraseña actualizada 💛");
      setPwd(""); setPwd2("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent
        className="max-w-[420px] p-0 overflow-hidden border-0 [&>button]:hidden"
        style={{ background: "transparent" }}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div
          className="p-6 md:p-7"
          style={{
            background: "linear-gradient(135deg, #FEFCF8 0%, #FFF6EA 100%)",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
            boxShadow: "0 20px 50px -20px rgba(47,42,38,0.25)",
          }}
        >
          <div className="text-center mb-5">
            <div className="text-[40px] leading-none mb-2">🔐</div>
            <DialogTitle asChild>
              <h2 className="font-serif text-[22px] md:text-[24px]" style={{ color: "#3A2A20", fontWeight: 600 }}>
                Crea tu contraseña
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <p className="text-[13px] mt-1 italic" style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}>
                Estás usando una contraseña temporal. Defínela antes de continuar.
              </p>
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#6F8B72" }}>
                Nueva contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
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
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#6F8B72" }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
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
                boxShadow: "0 8px 20px -10px rgba(201,106,43,0.55)",
              }}
            >
              {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Guardar contraseña
            </button>

            {error && (
              <div
                className="mt-3 px-3.5 py-2.5 rounded-xl text-[12.5px] text-center leading-relaxed"
                style={{
                  background: "linear-gradient(135deg, #FEFCF8, #FFF6EA)",
                  border: "1px solid #E85D2F",
                  color: "#A84E22",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}