"use client";

import * as React from "react";
import { hasSeenOnboarding, markOnboardingSeen } from "./onboardingStorage";

interface OnboardingContextValue {
  /**
   * `null` while the persisted flag is still being read (true for one tick
   * on every mount — reading Preferences is async even on web). Callers
   * that gate rendering on this must treat `null` as "not ready yet", not
   * as `false`.
   */
  hasCompletedOnboarding: boolean | null;
  /** Marks onboarding complete (persists it) and updates state immediately. */
  completeOnboarding: () => void;
}

const OnboardingContext = React.createContext<OnboardingContextValue | null>(
  null,
);

export interface OnboardingProviderProps {
  children?: React.ReactNode;
}

/**
 * Tracks whether the user has ever completed (or skipped) the onboarding
 * carousel, backed by `@capacitor/preferences` (see `onboardingStorage.ts`).
 * Mounted once near the root (`src/app/layout.tsx`), alongside
 * `SplashProvider` — `page.tsx`'s boot sequence reads
 * `hasCompletedOnboarding` to decide whether to show the carousel after
 * the intro screen.
 */
export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    let cancelled = false;
    hasSeenOnboarding().then((seen) => {
      if (!cancelled) setHasCompletedOnboarding(seen);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const completeOnboarding = React.useCallback(() => {
    setHasCompletedOnboarding(true);
    void markOnboardingSeen();
  }, []);

  const value = React.useMemo(
    () => ({ hasCompletedOnboarding, completeOnboarding }),
    [hasCompletedOnboarding, completeOnboarding],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * Read onboarding-completion state or mark it complete. Must be used
 * within an `OnboardingProvider` (mounted once near the root — see
 * `src/app/layout.tsx`).
 */
export function useOnboarding(): OnboardingContextValue {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
