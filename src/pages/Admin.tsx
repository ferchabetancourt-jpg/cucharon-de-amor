import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, UserPlus, KeyRound, Ban, CheckCircle2, ArrowLeft } from "lucide-react";

const ADMIN_EMAIL = "ferchabetancourt@gmail.com";

type AdminUser = {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  banned_until: string | null;
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [busy, setBusy] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const allowed = !!user && user.email?.toLowerCase() === ADMIN_EMAIL;

  const call = async (action: string, payload: Record<string, unknown> = {}) => {
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action, ...payload },
    });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const refresh = async () => {
    setFetching(true);
    try {
      const data = await call("list");
      setUsers(data.users ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al cargar usuarios");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (allowed) refresh();
  }, [allowed]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FEFCF8" }}>
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#C96A2B" }} />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#FEFCF8" }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-3">🔒</div>
          <h1 className="font-serif text-2xl mb-2" style={{ color: "#2F2A26" }}>Acceso restringido</h1>
          <p className="text-sm mb-5" style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}>
            Esta área es solo para la administradora.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: "#C96A2B", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await call("create", { name: newName, email: newEmail, password: newPassword });
      toast.success("Usuario creado");
      setNewName(""); setNewEmail(""); setNewPassword("");
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al crear");
    } finally {
      setBusy(false);
    }
  };

  const handleDeactivate = async (u: AdminUser) => {
    if (!confirm(`¿Desactivar a ${u.email}?`)) return;
    setBusy(true);
    try {
      await call("deactivate", { user_id: u.id });
      toast.success("Usuario desactivado");
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const handleActivate = async (u: AdminUser) => {
    setBusy(true);
    try {
      await call("activate", { user_id: u.id });
      toast.success("Usuario reactivado");
      refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async (u: AdminUser) => {
    const pwd = prompt(`Nueva contraseña temporal para ${u.email}:`);
    if (!pwd) return;
    if (pwd.length < 6) { toast.error("Mínimo 6 caracteres"); return; }
    setBusy(true);
    try {
      await call("reset_password", { user_id: u.id, password: pwd });
      toast.success("Contraseña actualizada");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1.5px solid #EDE8DC",
    color: "#2F2A26",
    fontFamily: "Montserrat, sans-serif",
  };

  return (
    <div className="min-h-screen" style={{ background: "#FEFCF8" }}>
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="text-xs inline-flex items-center gap-1 mb-2" style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}>
              <ArrowLeft className="w-3 h-3" /> Volver
            </Link>
            <h1 className="font-serif text-3xl" style={{ color: "#2F2A26", fontWeight: 600 }}>
              Panel de administración
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}>
              Gestiona las cuentas de tu cocina.
            </p>
          </div>
        </div>

        <section
          className="p-6 mb-8"
          style={{
            background: "linear-gradient(135deg, #FEFCF8 0%, #F7F3EB 100%)",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
          }}
        >
          <h2 className="font-serif text-lg mb-4 flex items-center gap-2" style={{ color: "#2F2A26" }}>
            <UserPlus className="w-4 h-4" style={{ color: "#C96A2B" }} /> Crear nuevo usuario
          </h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              required
              placeholder="Nombre"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
              style={inputStyle}
            />
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
              style={inputStyle}
            />
            <input
              type="text"
              required
              minLength={6}
              placeholder="Contraseña temporal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={busy}
              className="py-2.5 rounded-full text-[13.5px] flex items-center justify-center gap-2 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #C96A2B, #A84E22)",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
              Crear
            </button>
          </form>
        </section>

        <section
          className="p-6"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg" style={{ color: "#2F2A26" }}>Usuarios</h2>
            <span className="text-xs" style={{ color: "#6B6257", fontFamily: "Montserrat, sans-serif" }}>
              {users.length} cuenta(s)
            </span>
          </div>

          {fetching ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#C96A2B" }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <thead>
                  <tr style={{ color: "#6B6257" }} className="text-[11px] uppercase tracking-wider">
                    <th className="py-2 pr-3">Nombre</th>
                    <th className="py-2 pr-3">Correo</th>
                    <th className="py-2 pr-3">Estado</th>
                    <th className="py-2 pr-3">Último ingreso</th>
                    <th className="py-2 pr-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const banned = u.banned_until && new Date(u.banned_until) > new Date();
                    return (
                      <tr key={u.id} className="border-t" style={{ borderColor: "#EDE8DC", color: "#2F2A26" }}>
                        <td className="py-3 pr-3">{u.display_name || "—"}</td>
                        <td className="py-3 pr-3">{u.email}</td>
                        <td className="py-3 pr-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-[11px]"
                            style={{
                              background: banned ? "#FDECEC" : "#E8F1E8",
                              color: banned ? "#A33B3B" : "#3F6B43",
                            }}
                          >
                            {banned ? "Desactivado" : "Activo"}
                          </span>
                        </td>
                        <td className="py-3 pr-3 text-[12px]" style={{ color: "#6B6257" }}>
                          {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString("es") : "—"}
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleReset(u)}
                              disabled={busy}
                              title="Resetear contraseña"
                              className="p-2 rounded-full hover:bg-[#F7F3EB] disabled:opacity-50"
                              style={{ color: "#6F8B72" }}
                            >
                              <KeyRound className="w-4 h-4" />
                            </button>
                            {banned ? (
                              <button
                                onClick={() => handleActivate(u)}
                                disabled={busy}
                                title="Reactivar"
                                className="p-2 rounded-full hover:bg-[#F7F3EB] disabled:opacity-50"
                                style={{ color: "#3F6B43" }}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeactivate(u)}
                                disabled={busy || u.email?.toLowerCase() === ADMIN_EMAIL}
                                title="Desactivar"
                                className="p-2 rounded-full hover:bg-[#FDECEC] disabled:opacity-30"
                                style={{ color: "#A33B3B" }}
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}