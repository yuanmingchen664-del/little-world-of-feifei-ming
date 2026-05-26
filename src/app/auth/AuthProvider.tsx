import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getAccountByEmail, getAccountByLoginName, type AppAccount } from "../lib/accounts";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

interface AuthContextValue {
  account: AppAccount | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseConfigured: boolean;
  signIn: (loginName: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const account = useMemo(() => getAccountByEmail(session?.user.email), [session]);

  const signIn = async (loginName: string, password: string) => {
    if (!supabase) {
      return { error: "Supabase 还没有配置好" };
    }

    const nextAccount = getAccountByLoginName(loginName);

    if (!nextAccount) {
      return { error: "账号名不正确" };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: nextAccount.email,
      password,
    });

    if (error) {
      return { error: "账号或密码不正确" };
    }

    return {};
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        isAuthenticated: Boolean(account),
        isLoading,
        isSupabaseConfigured,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
}
