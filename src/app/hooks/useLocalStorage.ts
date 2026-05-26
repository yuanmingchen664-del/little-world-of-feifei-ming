import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../lib/supabase";

type AppStateRow<T> = {
  key: string;
  value: T;
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const { isAuthenticated } = useAuth();
  const isCloudReadyRef = useRef(false);
  const valueRef = useRef<T>(initialValue);
  const lastRemoteJsonRef = useRef("");

  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    isCloudReadyRef.current = false;

    if (!supabase || !isAuthenticated) {
      return;
    }

    const client = supabase;

    let isCancelled = false;

    async function loadCloudValue() {
      const { data, error } = await client
        .from("app_state")
        .select("key,value")
        .eq("key", key)
        .maybeSingle<AppStateRow<T>>();

      if (isCancelled) {
        return;
      }

      if (!error && data?.value !== undefined) {
        const remoteValue = data.value;
        lastRemoteJsonRef.current = JSON.stringify(remoteValue);
        setValue(remoteValue);
      } else {
        const localJson = JSON.stringify(valueRef.current);
        lastRemoteJsonRef.current = localJson;
        await client.from("app_state").upsert({
          key,
          value: valueRef.current,
        });
      }

      isCloudReadyRef.current = true;
    }

    loadCloudValue();

    const channel = client
      .channel(`app-state-${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "app_state",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          const nextValue = (payload.new as AppStateRow<T> | null)?.value;

          if (nextValue === undefined) {
            return;
          }

          const nextJson = JSON.stringify(nextValue);

          if (nextJson === lastRemoteJsonRef.current) {
            return;
          }

          lastRemoteJsonRef.current = nextJson;
          setValue(nextValue);
        },
      )
      .subscribe();

    return () => {
      isCancelled = true;
      client.removeChannel(channel);
    };
  }, [isAuthenticated, key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage failures so the UI can keep working in private mode.
    }
  }, [key, value]);

  useEffect(() => {
    if (!supabase || !isAuthenticated || !isCloudReadyRef.current) {
      return;
    }

    const client = supabase;

    const nextJson = JSON.stringify(value);

    if (nextJson === lastRemoteJsonRef.current) {
      return;
    }

    lastRemoteJsonRef.current = nextJson;
    client.from("app_state").upsert({ key, value });
  }, [isAuthenticated, key, value]);

  return [value, setValue] as const;
}
