import { Preferences } from "@capacitor/preferences";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Capacitor-friendly storage adapter — swaps out localStorage
// per .claude/rules/02-supabase-data-architecture.md

const capacitorPreferencesStorage = {
  getItem: async (key: string) => {
    if (typeof window === "undefined") return null;
    return (await Preferences.get({ key })).value;
  },
  setItem: async (key: string, value: string) => {
    if (typeof window === "undefined") return;
    await Preferences.set({ key, value });
  },
  removeItem: async (key: string) => {
    if (typeof window === "undefined") return;
    await Preferences.remove({ key });
  },
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    auth: {
      storage: capacitorPreferencesStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
