import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { recipesStore } from "@/lib/recipes-store";
import { identifyUser, track } from "@/lib/analytics";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  recoveryMode: boolean;
  clearRecoveryMode: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null,
  session: null,
  loading: true,
  recoveryMode: false,
  clearRecoveryMode: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    // Listener first (sync only — defer async work)
    const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryMode(true);
      }
      const uid = sess?.user?.id ?? null;
      setTimeout(() => {
        recipesStore.setUser(uid).catch(() => {});
        if (event === "SIGNED_IN" && sess?.user?.email) {
          identifyUser(sess.user.email);
          track("user_login", { email: sess.user.email });
        } else if (event === "SIGNED_OUT") {
          identifyUser(null);
          setRecoveryMode(false);
        }
      }, 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      const uid = data.session?.user?.id ?? null;
      recipesStore.setUser(uid).catch(() => {});
      if (data.session?.user?.email) identifyUser(data.session.user.email);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        recoveryMode,
        clearRecoveryMode: () => setRecoveryMode(false),
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
