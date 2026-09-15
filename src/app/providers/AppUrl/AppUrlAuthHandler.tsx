"use client";

import { toaster } from "@/components/data-display/Toaster";
import { supabase } from "@/lib/supabase/client";
import { AppUrlListener } from "./AppUrlListener";
import { sessionFromAppUrl } from "./sessionFromAppUrl";

// The exact in-app path Supabase's confirmation email is told to come back
// to — must match the `emailRedirectTo` path in accountActions.ts.
const AUTH_CONFIRM_PATH = "/auth-confirm";

/**
 * Wraps AppUrlListener with the one thing it currently does nothing with:
 * turning a confirmation-link open into an actual signed-in session.
 *
 * Security note: the custom URL scheme (`com.aeryo.app://`) has no OS-level
 * ownership check — unlike a verified Universal Link / App Link, both iOS
 * and Android let any installed app register the same scheme, so a link
 * carrying real tokens could in principle be intercepted before it reaches
 * this app. Acceptable for dev-only testing; do not ship this flow to real
 * users before the Universal Links / App Links work (parked separately,
 * needs a real domain + Apple Developer membership) is done.
 */
export function AppUrlAuthHandler() {
  const handleUrlOpen = (path: string) => {
    // Ignore every link that isn't the confirmation-email callback.
    if (!path.startsWith(AUTH_CONFIRM_PATH)) return;

    // Pull the tokens Supabase attached; bail out if they're not there.
    const tokens = sessionFromAppUrl(path);
    if (!tokens) return;

    // Hand the tokens to Supabase — this is what actually signs the user in.
    // per node_modules/@supabase/supabase-js — auth.setSession(tokens)
    void supabase.auth.setSession(tokens).then(({ error }) => {
      if (!error) return;
      console.error("AppUrlAuthHandler: setSession failed", error);
      // Surface it — without this the user is just stuck staring at
      // whatever screen was already open, with no sign anything went wrong.
      toaster.create({
        title: "Couldn't confirm your account",
        description: "That link may have expired or already been used. Try signing up again.",
        type: "error",
      });
    });
  };

  return <AppUrlListener onUrlOpen={handleUrlOpen} />;
}
