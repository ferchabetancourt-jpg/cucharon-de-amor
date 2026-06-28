import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2, UserPlus, KeyRound, Ban, CheckCircle2, ArrowLeft, ChefHat, Search, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ADMIN_EMAIL = "ferchabetancourt@gmail.com";

type AdminUser = {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  banned_until: string | null;
};

type AdminRole = {
  id: string;
  email: string;
  role: string;
  created_at: string | null;
};

type PendingRecipe = {
  id: string;
  name: string;
  category: string | null;
  created_by: string | null;
};

type EditableRecipe = {
  id: string;
  name: string;
  category: string | null;
  ingredients: string | null;
  preparation: string | null;
  notes: string | null;
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [usersExpanded, setUsersExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [adminRoles, setAdminRoles] = useState<AdminRole[]>([]);
  const [fetchingRoles, setFetchingRoles] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  const [pendingRecipes, setPendingRecipes] = useState<PendingRecipe[]>([]);
  const [fetchingPending, setFetchingPending] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const [editingRecipe, setEditingRecipe] = useState<EditableRecipe | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [approvingEdit, setApprovingEdit] = useState(false);

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

  const refreshAdmins = async () => {
    setFetchingRoles(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("id, email, role, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setAdminRoles((data ?? []) as AdminRole[]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al cargar administradores");
    } finally {
      setFetchingRoles(false);
    }
  };

  useEffect(() => {
    if (allowed) refreshAdmins();
  }, [allowed]);

  const refreshPendingRecipes = async () => {
    setFetchingPending(true);
    try {
      const { data, error } = await supabase
        .from("recipes_staging")
        .select("id, name, category, created_by")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPendingRecipes((data ?? []) as PendingRecipe[]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al cargar recetas pendientes");
    } finally {
      setFetchingPending(false);
    }
  };

  useEffect(() => {
    if (allowed) refreshPendingRecipes();
  }, [allowed]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newAdminEmail.trim().toLowerCase();
    if (!email) return;
    setAddingAdmin(true);
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ email, role: "admin" });
      if (error) throw error;
      toast.success("Administrador agregado");
      setNewAdminEmail("");
      refreshAdmins();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al agregar");
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleApprove = async (recipe: PendingRecipe) => {
    setApprovingId(recipe.id);
    try {
      const { error } = await supabase
        .from("recipes_staging")
        .update({ status: "published" })
        .eq("id", recipe.id);
      if (error) throw error;
      toast.success(`"${recipe.name}" aprobada`);
      refreshPendingRecipes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al aprobar");
    } finally {
      setApprovingId(null);
    }
  };

  const openEditRecipe = async (recipe: PendingRecipe) => {
    setLoadingEdit(true);
    setEditingRecipe({
      id: recipe.id,
      name: recipe.name,
      category: recipe.category,
      ingredients: "",
      preparation: "",
      notes: "",
    });
    try {
      const { data, error } = await supabase
        .from("recipes_staging")
        .select("id, name, category, ingredients, preparation, notes")
        .eq("id", recipe.id)
        .maybeSingle();
      if (error) throw error;
      if (data) setEditingRecipe(data as EditableRecipe);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al cargar receta");
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleSaveEdit = async (alsoPublish: boolean) => {
    if (!editingRecipe) return;
    if (alsoPublish) setApprovingEdit(true);
    else setSavingEdit(true);
    try {
      const payload = {
        name: editingRecipe.name,
        category: editingRecipe.category ?? null,
        ingredients: editingRecipe.ingredients ?? null,
        preparation: editingRecipe.preparation ?? null,
        notes: editingRecipe.notes ?? null,
        ...(alsoPublish ? { status: "published" } : {}),
      };
      const { error } = await supabase
        .from("recipes_staging")
        .update(payload)
        .eq("id", editingRecipe.id);
      if (error) throw error;
      toast.success(alsoPublish ? "Receta aprobada" : "Cambios guardados");
      setEditingRecipe(null);
      refreshPendingRecipes();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSavingEdit(false);
      setApprovingEdit(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FFF6EA" }}>
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#E85D2F" }} />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#FFF6EA" }}>
        <div className="max-w-md text-center">
          <div className="text-5xl mb-3">🔒</div>
          <h1 className="font-serif text-2xl mb-2" style={{ color: "#3A2A20" }}>Acceso restringido</h1>
          <p className="text-sm mb-5" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
            Esta área es solo para la administradora.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: "#E85D2F", color: "#fff", fontFamily: "Montserrat, sans-serif" }}>
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
    if (pwd.length < 8) { toast.error("Mínimo 8 caracteres"); return; }
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
    color: "#3A2A20",
    fontFamily: "Montserrat, sans-serif",
  };

  const filteredUsers = users.filter((u) => {
    const term = userSearch.toLowerCase();
    return (u.display_name?.toLowerCase().includes(term) ?? false) || (u.email?.toLowerCase().includes(term) ?? false);
  });

  return (
    <div className="min-h-screen" style={{ background: "#FFF6EA" }}>
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="text-xs inline-flex items-center gap-1 mb-2" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
              <ArrowLeft className="w-3 h-3" /> Volver
            </Link>
            <h1 className="font-serif text-3xl" style={{ color: "#3A2A20", fontWeight: 600 }}>
              Panel de administración
            </h1>
            <p className="text-sm mt-1" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
              Gestiona las cuentas de tu cocina.
            </p>
          </div>
        </div>

        <section
          className="p-6 mb-8"
          style={{
            background: "linear-gradient(135deg, #FFF6EA 0%, #FFF6EA 100%)",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
          }}
        >
          <h2 className="font-serif text-lg mb-4 flex items-center gap-2" style={{ color: "#3A2A20" }}>
            <UserPlus className="w-4 h-4" style={{ color: "#E85D2F" }} /> Crear nuevo usuario
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
              minLength={8}
              placeholder="Contraseña temporal (mín. 8, evita comunes)"
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
                background: "linear-gradient(135deg, #E85D2F, #A84E22)",
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
            <h2 className="font-serif text-lg flex items-center gap-2" style={{ color: "#3A2A20" }}>
              <KeyRound className="w-4 h-4" style={{ color: "#E85D2F" }} /> Administradores
            </h2>
            <span className="text-xs" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
              {adminRoles.length} registro(s)
            </span>
          </div>

          <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 mb-5">
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={addingAdmin}
              className="px-5 py-2.5 rounded-full text-[13.5px] flex items-center justify-center gap-2 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #E85D2F, #A84E22)",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {addingAdmin ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
              Agregar
            </button>
          </form>

          {fetchingRoles ? (
            <div className="flex justify-center py-6">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#E85D2F" }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <thead>
                  <tr style={{ color: "#8A6B55" }} className="text-[11px] uppercase tracking-wider">
                    <th className="py-2 pr-3">Correo</th>
                    <th className="py-2 pr-3">Rol</th>
                    <th className="py-2 pr-3">Agregado</th>
                  </tr>
                </thead>
                <tbody>
                  {adminRoles.map((r) => (
                    <tr key={r.id} className="border-t" style={{ borderColor: "#EDE8DC", color: "#3A2A20" }}>
                      <td className="py-3 pr-3">{r.email}</td>
                      <td className="py-3 pr-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-[11px]"
                          style={{ background: "#FFE9DD", color: "#A84E22" }}
                        >
                          {r.role}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-[12px]" style={{ color: "#8A6B55" }}>
                        {r.created_at ? new Date(r.created_at).toLocaleString("es") : "—"}
                      </td>
                    </tr>
                  ))}
                  {adminRoles.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-[13px]" style={{ color: "#8A6B55" }}>
                        Sin administradores registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section
          className="p-6 mt-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg" style={{ color: "#3A2A20" }}>Usuarios</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
                {usersExpanded ? `${filteredUsers.length} de ${users.length} cuenta(s)` : `${users.length} cuenta(s)`}
              </span>
              <button
                type="button"
                onClick={() => setUsersExpanded((v) => !v)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11.5px]"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #EDE8DC",
                  color: "#3A2A20",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                }}
              >
                {usersExpanded ? <><ChevronUp className="w-3 h-3" /> Ocultar</> : <><ChevronDown className="w-3 h-3" /> Ver lista</>}
              </button>
            </div>
          </div>

          {usersExpanded && (
          <>
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#8A6B55" }} />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Buscar por nombre o correo electrónico…"
              className="w-full py-3 pl-11 pr-10 rounded-full text-[13.5px] outline-none transition-colors"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EDE8DC",
                color: "#3A2A20",
                fontFamily: "Montserrat, sans-serif",
                boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
              }}
            />
            {userSearch && (
              <button
                type="button"
                onClick={() => setUserSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full"
                style={{ color: "#8A6B55" }}
              >
                <span className="sr-only">Limpiar búsqueda</span>
                ×
              </button>
            )}
          </div>

          {fetching ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#E85D2F" }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <thead>
                  <tr style={{ color: "#8A6B55" }} className="text-[11px] uppercase tracking-wider">
                    <th className="py-2 pr-3">Nombre</th>
                    <th className="py-2 pr-3">Correo</th>
                    <th className="py-2 pr-3">Estado</th>
                    <th className="py-2 pr-3">Último ingreso</th>
                    <th className="py-2 pr-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                      const banned = u.banned_until && new Date(u.banned_until) > new Date();
                      return (
                        <tr key={u.id} className="border-t" style={{ borderColor: "#EDE8DC", color: "#3A2A20" }}>
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
                          <td className="py-3 pr-3 text-[12px]" style={{ color: "#8A6B55" }}>
                            {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString("es") : "—"}
                          </td>
                          <td className="py-3 pr-3">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleReset(u)}
                                disabled={busy}
                                title="Establecer contraseña temporal"
                                className="px-2.5 py-1.5 rounded-full text-[11px] inline-flex items-center gap-1.5 hover:bg-[#FFF6EA] disabled:opacity-50"
                                style={{ color: "#5E8C4A", border: "1px solid #EDE8DC", fontWeight: 600 }}
                              >
                                <KeyRound className="w-3 h-3" /> Cambiar contraseña
                              </button>
                              {banned ? (
                                <button
                                  onClick={() => handleActivate(u)}
                                  disabled={busy}
                                  title="Reactivar"
                                  className="px-2.5 py-1.5 rounded-full text-[11px] inline-flex items-center gap-1.5 hover:bg-[#FFF6EA] disabled:opacity-50"
                                  style={{ color: "#3F6B43", border: "1px solid #EDE8DC", fontWeight: 600 }}
                                >
                                  <CheckCircle2 className="w-3 h-3" /> Reactivar
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleDeactivate(u)}
                                  disabled={busy || u.email?.toLowerCase() === ADMIN_EMAIL}
                                  title="Desactivar usuario"
                                  className="px-2.5 py-1.5 rounded-full text-[11px] inline-flex items-center gap-1.5 hover:bg-[#FDECEC] disabled:opacity-30"
                                  style={{ color: "#A33B3B", border: "1px solid #EDE8DC", fontWeight: 600 }}
                                >
                                  <Ban className="w-3 h-3" /> Desactivar usuario
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  {filteredUsers.length === 0 && !fetching && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[13px]" style={{ color: "#8A6B55" }}>
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          </>
          )}
        </section>


        <section
          className="p-6 mt-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EDE8DC",
            borderRadius: "20px",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg flex items-center gap-2" style={{ color: "#3A2A20" }}>
              <ChefHat className="w-4 h-4" style={{ color: "#E85D2F" }} /> Recetas pendientes
            </h2>
            <span className="text-xs" style={{ color: "#8A6B55", fontFamily: "Montserrat, sans-serif" }}>
              {pendingRecipes.length} receta(s)
            </span>
          </div>

          {fetchingPending ? (
            <div className="flex justify-center py-6">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#E85D2F" }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <thead>
                  <tr style={{ color: "#8A6B55" }} className="text-[11px] uppercase tracking-wider">
                    <th className="py-2 pr-3">Nombre</th>
                    <th className="py-2 pr-3">Categoría</th>
                    <th className="py-2 pr-3">Creada por</th>
                    <th className="py-2 pr-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRecipes.map((recipe) => (
                    <tr key={recipe.id} className="border-t" style={{ borderColor: "#EDE8DC", color: "#3A2A20" }}>
                      <td className="py-3 pr-3">{recipe.name}</td>
                      <td className="py-3 pr-3">{recipe.category || "—"}</td>
                      <td className="py-3 pr-3 text-[12px]" style={{ color: "#8A6B55" }}>
                        {recipe.created_by || "—"}
                      </td>
                      <td className="py-3 pr-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openEditRecipe(recipe)}
                            className="px-3 py-1.5 rounded-full text-[11px] inline-flex items-center justify-center gap-1.5"
                            style={{
                              background: "#FFFFFF",
                              border: "1.5px solid #E85D2F",
                              color: "#A84E22",
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            <Pencil className="w-3 h-3" />
                            Ver/Editar
                          </button>
                          <button
                            onClick={() => handleApprove(recipe)}
                            disabled={approvingId === recipe.id}
                            className="px-3 py-1.5 rounded-full text-[11px] inline-flex items-center justify-center gap-1.5 disabled:opacity-60"
                            style={{
                              background: "#3F6B43",
                              color: "#FFFFFF",
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {approvingId === recipe.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                            Aprobar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pendingRecipes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-[13px]" style={{ color: "#8A6B55" }}>
                        No hay recetas pendientes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <Dialog open={!!editingRecipe} onOpenChange={(o) => { if (!o) setEditingRecipe(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ background: "#FFF6EA" }}>
          <DialogHeader>
            <DialogTitle className="font-serif" style={{ color: "#3A2A20" }}>
              Editar receta
            </DialogTitle>
          </DialogHeader>
          {loadingEdit || !editingRecipe ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#E85D2F" }} />
            </div>
          ) : (
            <div className="space-y-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
              <div>
                <label className="text-[12px] uppercase tracking-wider" style={{ color: "#8A6B55" }}>Nombre</label>
                <input
                  type="text"
                  value={editingRecipe.name ?? ""}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] uppercase tracking-wider" style={{ color: "#8A6B55" }}>Categoría</label>
                <input
                  type="text"
                  value={editingRecipe.category ?? ""}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] uppercase tracking-wider" style={{ color: "#8A6B55" }}>Ingredientes</label>
                <textarea
                  rows={6}
                  value={editingRecipe.ingredients ?? ""}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] uppercase tracking-wider" style={{ color: "#8A6B55" }}>Preparación</label>
                <textarea
                  rows={8}
                  value={editingRecipe.preparation ?? ""}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, preparation: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] uppercase tracking-wider" style={{ color: "#8A6B55" }}>Notas</label>
                <textarea
                  rows={4}
                  value={editingRecipe.notes ?? ""}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, notes: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-2">
            <button
              onClick={() => handleSaveEdit(false)}
              disabled={savingEdit || approvingEdit || loadingEdit || !editingRecipe}
              className="px-4 py-2 rounded-full text-[13px] inline-flex items-center justify-center gap-2 disabled:opacity-60"
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #E85D2F",
                color: "#A84E22",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {savingEdit ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Pencil className="w-3.5 h-3.5" />}
              Guardar cambios
            </button>
            <button
              onClick={() => handleSaveEdit(true)}
              disabled={savingEdit || approvingEdit || loadingEdit || !editingRecipe}
              className="px-4 py-2 rounded-full text-[13px] inline-flex items-center justify-center gap-2 disabled:opacity-60"
              style={{
                background: "#3F6B43",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {approvingEdit ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              Aprobar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}