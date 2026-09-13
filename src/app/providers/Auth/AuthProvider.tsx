"use client";

import type { Session } from "@supabase/supabase-js";
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

// The shape of the data we share with every screen.
type AuthContextValue = {
  session: Session | null;
  isReady: boolean;
};

// A shared box at the top of the app. Screens call useAuth() to read what is inside.
const AuthContext = React.createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children?: React.ReactNode;
}

// Wrap the app with this (already done in layout.tsx) so every screen can ask "is someone logged in?"
export function AuthProvider({ children }: AuthProviderProps) {
  // Remember the logged-in user. Starts as null = nobody, until Supabase answers.
  const [session, setSession] = useState<Session | null>(null);
  // False until Supabase has answered once. Without this, "still loading" looks the same as "logged out".
  const [isReady, setIsReady] = useState(false);

  // Run once when the app starts ([] = do not run again on every redraw).
  useEffect(() => {
    // Ask Supabase to call us whenever login status changes (app open, sign up, log out).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // Save the new answer: a user object if they are logged in, null if they are not.
      setSession(nextSession);
      // We have an answer now, even if that answer is "nobody is logged in".
      setIsReady(true);
    });
    // When this wrapper is removed, stop asking Supabase so we do not keep a leftover listener.
    return () => subscription.unsubscribe();
  }, []);

  // Build the shared object. Only make a new one when session or isReady changes.
  const value = useMemo(() => ({ session, isReady }), [session, isReady]);

  // Put that object in the shared box, and render the rest of the app inside it.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Any screen can call this to get the current session and whether we have heard from Supabase yet.
 * It only works if AuthProvider is wrapped around the app (see layout.tsx).
 */
export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
