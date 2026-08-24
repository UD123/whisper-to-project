import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const STORAGE_BUCKET = "site-media";
export const STORAGE_PREFIX = "storage:";

export type MediaRecord = { url: string; kind: string };

type SiteMediaContextValue = {
  /** slot_id -> resolved, directly playable URL */
  resolved: Record<string, string>;
  /** slot_id -> raw stored value (external URL or storage:<path>) */
  raw: Record<string, MediaRecord>;
  isAdmin: boolean;
  session: Session | null;
  refresh: () => Promise<void>;
};

const SiteMediaContext = createContext<SiteMediaContextValue>({
  resolved: {},
  raw: {},
  isAdmin: false,
  session: null,
  refresh: async () => {},
});

async function resolveUrl(value: string): Promise<string> {
  if (!value.startsWith(STORAGE_PREFIX)) return value;
  const path = value.slice(STORAGE_PREFIX.length);
  const { data } = await supabase.storage.from(STORAGE_BUCKET).createSignedUrl(path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? "";
}

export function SiteMediaProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Record<string, MediaRecord>>({});
  const [resolved, setResolved] = useState<Record<string, string>>({});
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from("site_media").select("slot_id, url, kind");
    const nextRaw: Record<string, MediaRecord> = {};
    for (const row of data ?? []) {
      nextRaw[row.slot_id] = { url: row.url, kind: row.kind };
    }
    setRaw(nextRaw);

    const entries = await Promise.all(
      Object.entries(nextRaw).map(async ([slot, rec]) => [slot, await resolveUrl(rec.url)] as const),
    );
    setResolved(Object.fromEntries(entries.filter(([, url]) => url)));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      return;
    }
    let cancelled = false;
    void supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setIsAdmin(Boolean(data));
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  const value = useMemo(
    () => ({ resolved, raw, isAdmin, session, refresh }),
    [resolved, raw, isAdmin, session, refresh],
  );

  return <SiteMediaContext.Provider value={value}>{children}</SiteMediaContext.Provider>;
}

export function useSiteMedia() {
  return useContext(SiteMediaContext);
}

export function detectKind(value: string) {
  if (/youtube\.com|youtu\.be/.test(value)) return "youtube";
  if (/\.(mp4|webm|mov)(\?|$)/i.test(value)) return "video";
  return "image";
}
