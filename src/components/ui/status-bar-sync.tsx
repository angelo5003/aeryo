"use client";

import * as React from "react";
import { Capacitor, SystemBars, SystemBarsStyle } from "@capacitor/core";

import { useColorMode } from "./color-mode";

/**
 * Keeps the native status bar's icon color in sync with the app's Chakra
 * color mode (light/dark), the same way a native app would. Mount once,
 * inside `ColorModeProvider` (see `src/components/ui/provider.tsx`), so it
 * has access to the resolved color mode.
 *
 * `SystemBars` is bundled with `@capacitor/core` (no separate package) and
 * is the current, Android-16-safe replacement for the older
 * `@capacitor/status-bar` plugin — see
 * docs/superpowers/specs/2026-08-22-safe-area-provider-design.md for why.
 *
 * Guarded by `Capacitor.isNativePlatform()` so this is a no-op in a regular
 * browser (including `next dev`) — there's no status bar to control there.
 */
export function StatusBarSync() {
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // `colorMode` is `undefined` for a brief moment on every mount — until
    // ColorModeProvider has read the persisted/system preference on the
    // client (hydration-safety). Guard against that instead of
    // letting it silently fall through to the light-mode style below: that
    // would flash (or on some mount timings, get stuck showing) dark
    // status bar icons on this app's dark background, unreadable against
    // it. Wait for a real value instead of guessing.
    if (colorMode !== "light" && colorMode !== "dark") return;

    // Counterintuitively, `@capacitor/core`'s own type definitions name
    // these for the *background* they're meant for, not the icon color:
    // `Style.Dark` = "light system bar content on a dark background", and
    // `Style.Light` = "dark system bar content on a light background". So
    // dark mode (a dark background) needs `Style.Dark` — reading this as
    // "Dark = dark icons" (the intuitive-but-wrong reading) is exactly
    // backwards and was the bug here: it set unreadable dark icons on this
    // app's dark background.
    const style =
      colorMode === "dark" ? SystemBarsStyle.Dark : SystemBarsStyle.Light;

    SystemBars.setStyle({ style }).catch((error: unknown) => {
      console.error("StatusBarSync: failed to set status bar style", error);
    });
  }, [colorMode]);

  return null;
}
