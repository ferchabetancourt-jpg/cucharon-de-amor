import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ChangePasswordDialog() {
  const { user, recoveryMode } = useAuth();
  const [mustChange, setMustChange] = useState(false);
  const [checked, setChecked] = useState(false);
  const [justChanged, setJustChanged] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) { setMustChange(false); setChecked(false); return; }
    if (justChanged) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("password_changed")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      const changed = (data as { password_changed?: boolean } | null)?.password_changed;
      setMustChange(changed === false || changed === null || changed === undefined);
      setChecked(true);
    })();
    return () => { cancelled = true; };
  }, [user, justChanged]);

  if (!user || !checked || !mustChange || recoveryMode || justChanged) return null;

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
      const { error: upErr } = await supabase.auth.updateUser({ password: pwd });
      if (upErr) throw upErr;
      const { error: pErr } = await supabase
        .from("profiles")
        .update({ password_changed: true } as never)
        .eq("id", user.id);
      if (pErr) throw pErr;
      // Check onboarding status before closing so the onboarding modal can show if needed
      const { data: prof } = await supabase
        .from("profiles")
        .select("onboarding_visto")
        .eq("id", user.id)
        .maybeSingle();
      const onboardingVisto = (prof as { onboarding_visto?: boolean } | null)?.onboarding_visto;
      toast.success("Contraseña actualizada 💛");
      setPwd(""); setPwd2("");
      setMustChange(false);
      setJustChanged(true);
      window.dispatchEvent(
        new CustomEvent("cucharon:password-changed", {
          detail: { onboardingVisto: onboardingVisto === true },
        })
      );
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
            background: "linear-gradient(135deg, #FFF6EA 0%, #FFF6EA 100%)",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
            boxShadow: "0 20px 50px -20px rgba(47,42,38,0.25)",
          }}
        >
          <div className="text-center mb-5">
            <div className="text-[40px] leading-none mb-2">🔐</div>
            <DialogTitle asChild>
              <h2 className="font-serif text-[22px] md:text-[24px]" style={{ color: "#3A2A20", fontWeight: 600 }}>
                Crea tu contraseña personal
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <p className="text-[13px] mt-1 italic" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
                Por seguridad, elige una contraseña que solo tú conozcas
              </p>
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#5E8C4A" }}>
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
              <label className="block text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: "#5E8C4A" }}>
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
                boxShadow: "0 8px 20px -10px rgba(232,93,47,0.55)",
              }}
            >
              {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Guardar y entrar
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
        </div>
      </DialogContent>
    </Dialog>
  );
}