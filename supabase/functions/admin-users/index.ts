import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "ferchabetancourt@gmail.com";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "No autorizado" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) {
      console.error("getUser error:", userErr?.message);
      return json({ error: "Sesión expirada. Cierra sesión y vuelve a entrar." }, 401);
    }
    if (userData.user.email?.toLowerCase() !== ADMIN_EMAIL) {
      return json({ error: "Acceso restringido" }, 403);
    }
    const body = await req.json().catch(() => ({}));
    const action = body.action as string;

    if (action === "list") {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      if (error) throw error;
      const users = data.users.map((u) => ({
        id: u.id,
        email: u.email,
        display_name:
          (u.user_metadata as any)?.display_name ||
          (u.user_metadata as any)?.full_name ||
          null,
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
        banned_until: (u as any).banned_until ?? null,
      }));
      return json({ users });
    }

    if (action === "create") {
      const { email, password, name } = body;
      if (!email || !password) return json({ error: "Correo y contraseña requeridos" }, 400);
      const normalizedEmail = String(email).trim().toLowerCase();
      const { data: allowedRow, error: allowedErr } = await admin
        .from("allowed_emails")
        .select("id")
        .ilike("email", normalizedEmail)
        .maybeSingle();
      if (allowedErr) throw allowedErr;
      if (!allowedRow) {
        return json({
          error: "El acceso es solo por invitación. Escríbenos para solicitar tu acceso.",
        }, 403);
      }
      const { data, error } = await admin.auth.admin.createUser({
        email: normalizedEmail,
        password,
        email_confirm: true,
        user_metadata: { display_name: name || normalizedEmail.split("@")[0] },
      });
      if (error) throw error;
      return json({ user: { id: data.user?.id, email: data.user?.email } });
    }

    if (action === "deactivate") {
      const { user_id } = body;
      if (!user_id) return json({ error: "Falta user_id" }, 400);
      const { error } = await admin.auth.admin.updateUserById(user_id, {
        ban_duration: "876000h",
      } as any);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "activate") {
      const { user_id } = body;
      if (!user_id) return json({ error: "Falta user_id" }, 400);
      const { error } = await admin.auth.admin.updateUserById(user_id, {
        ban_duration: "none",
      } as any);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "reset_password") {
      const { user_id, password } = body;
      if (!user_id || !password) return json({ error: "Datos incompletos" }, 400);
      const { error } = await admin.auth.admin.updateUserById(user_id, { password });
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "delete") {
      const { user_id } = body;
      if (!user_id) return json({ error: "Falta user_id" }, 400);
      const { data: target } = await admin.auth.admin.getUserById(user_id);
      if (target?.user?.email?.toLowerCase() === ADMIN_EMAIL) {
        return json({ error: "No puedes eliminar la cuenta administradora" }, 400);
      }
      const { error } = await admin.auth.admin.deleteUser(user_id);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Acción desconocida" }, 400);
  } catch (e) {
    let msg = e instanceof Error ? e.message : "Error";
    if (/weak|pwned|known to be|easy to guess/i.test(msg)) {
      msg = "Esa contraseña es muy común o ha sido filtrada. Usa una más fuerte (mezcla mayúsculas, números y símbolos).";
    }
    return json({ error: msg }, 500);
  }
});