import { useEffect, useRef, useState, type SetStateAction } from "react";
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
  const pendingWriteJsonRef = useRef("");
  const localChangeVersionRef = useRef(0);
  const writeVersionRef = useRef(0);

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

  const setSyncedValue = (nextValue: SetStateAction<T>) => {
    localChangeVersionRef.current += 1;
    setValue(nextValue);
  };

  useEffect(() => {
    isCloudReadyRef.current = false;

    if (!supabase || !isAuthenticated) {
      return;
    }

    const client = supabase;

    let isCancelled = false;

    async function loadCloudValue() {
      const loadStartedAtVersion = localChangeVersionRef.current;
      const { data, error } = await client
        .from("app_state")
        .select("key,value")
        .eq("key", key)
        .maybeSingle<AppStateRow<T>>();

      if (isCancelled) {
        return;
      }

      if (localChangeVersionRef.current !== loadStartedAtVersion) {
        const localJson = JSON.stringify(valueRef.current);
        lastRemoteJsonRef.current = localJson;
        await client.from("app_state").upsert({
          key,
          value: valueRef.current,
        });
        isCloudReadyRef.current = true;
        return;
      }

      if (!error && data?.value !== undefined) {
        const remoteValue = data.value;
        lastRemoteJsonRef.current = JSON.stringify(remoteValue);
        setValue(remoteValue);
      } else {
        const localJson = JSON.stringify(valueRef.current);
        const initialJson = JSON.stringify(initialValue);

        if (localJson !== initialJson) {
          lastRemoteJsonRef.current = localJson;
          await client.from("app_state").upsert({
            key,
            value: valueRef.current,
          });
        } else {
          lastRemoteJsonRef.current = initialJson;
          setValue(initialValue);
        }
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
          if (payload.eventType === "DELETE") {
            const initialJson = JSON.stringify(initialValue);
            pendingWriteJsonRef.current = "";
            lastRemoteJsonRef.current = initialJson;
            setValue(initialValue);
            return;
          }

          const nextValue = (payload.new as AppStateRow<T> | null)?.value;

          if (nextValue === undefined) {
            return;
          }

          const nextJson = JSON.stringify(nextValue);

          if (pendingWriteJsonRef.current && nextJson !== pendingWriteJsonRef.current) {
            return;
          }

          if (nextJson === lastRemoteJsonRef.current) {
            pendingWriteJsonRef.current = "";
            return;
          }

          lastRemoteJsonRef.current = nextJson;
          pendingWriteJsonRef.current = "";
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

    const writeVersion = writeVersionRef.current + 1;
    writeVersionRef.current = writeVersion;
    pendingWriteJsonRef.current = nextJson;
    lastRemoteJsonRef.current = nextJson;

    client
      .from("app_state")
      .upsert({ key, value })
      .then(({ error }) => {
        if (writeVersionRef.current !== writeVersion) {
          return;
        }

        if (!error) {
          pendingWriteJsonRef.current = "";
        }
      });
  }, [isAuthenticated, key, value]);

  return [value, setSyncedValue] as const;
}
