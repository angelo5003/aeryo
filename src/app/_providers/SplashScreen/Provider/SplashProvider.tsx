"use client";

import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import * as React from "react";

interface SplashScreenContextValue {
  /** True once the native (OS-level) splash screen has been hidden. */
  isNativeSplashHidden: boolean;
  /**
   * Call once the JS intro screen's background has painted and is ready to
   * take over from the native splash. Safe to call more than once — only
   * the first call has an effect.
   */
  hideNativeSplash: () => void;
}

const SplashScreenContext =
  React.createContext<SplashScreenContextValue | null>(null);

// If nothing calls `hideNativeSplash()` in time — a thrown render error, a
// background image that never loads — don't leave the app stuck behind the
// native splash forever.
const SAFETY_NET_MS = 4000;

export interface SplashProviderProps {
  children?: React.ReactNode;
}

/**
 * Bridges the native (OS-level) splash screen — configured with
 * `launchAutoHide: false` in capacitor.config.ts — to the JS "intro" screen
 * (`src/app/intro/page.tsx`) that takes over immediately after it.
 *
 * We don't let Capacitor auto-hide the native splash on a timer, because
 * that risks a blank flash between "native splash gone" and "React has
 * painted the intro screen's background." Instead, the intro screen calls
 * `hideNativeSplash()` (via `useSplashScreen()`) once its own background
 * image (assets/splash.png — same crop as the native one) has painted, so
 * the two line up pixel-for-pixel and the handoff is invisible.
 *
 * No-op in a normal browser (including `next dev` without Capacitor) since
 * there's no native splash screen to control there — `isNativeSplashHidden`
 * starts `true` so web-only code paths never wait on it.
 */
export function SplashProvider({ children }: SplashProviderProps) {
  const [isNativeSplashHidden, setIsNativeSplashHidden] = React.useState(
    () => !Capacitor.isNativePlatform(),
  );
  const hasHiddenRef = React.useRef(isNativeSplashHidden);

  const hideNativeSplash = React.useCallback(() => {
    if (hasHiddenRef.current) return;
    hasHiddenRef.current = true;

    SplashScreen.hide({ fadeOutDuration: 200 })
      .catch((error: unknown) => {
        console.error("SplashProvider: failed to hide native splash", error);
      })
      .finally(() => setIsNativeSplashHidden(true));
  }, []);

  React.useEffect(() => {
    if (hasHiddenRef.current) return;
    const timeout = setTimeout(hideNativeSplash, SAFETY_NET_MS);
    return () => clearTimeout(timeout);
  }, [hideNativeSplash]);

  const value = React.useMemo(
    () => ({ isNativeSplashHidden, hideNativeSplash }),
    [isNativeSplashHidden, hideNativeSplash],
  );

  return (
    <SplashScreenContext.Provider value={value}>
      {children}
    </SplashScreenContext.Provider>
  );
}

/**
 * Read splash-screen state or trigger the native splash to hide. Must be
 * used within a `SplashProvider` (mounted once near the root — see
 * `src/app/layout.tsx`).
 */
export function useSplashScreen(): SplashScreenContextValue {
  const context = React.useContext(SplashScreenContext);
  if (!context) {
    throw new Error("useSplashScreen must be used within a SplashProvider");
  }
  return context;
}
