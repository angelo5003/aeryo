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

    // `Style.Dark` = dark icons, for a light background (light mode).
    // `Style.Light` = light icons, for a dark background (dark mode).
    // (Naming is the icon color, not the background it's drawn on.)
    const style =
      colorMode === "dark" ? SystemBarsStyle.Light : SystemBarsStyle.Dark;

    SystemBars.setStyle({ style }).catch((error: unknown) => {
      console.error("StatusBarSync: failed to set status bar style", error);
    });
  }, [colorMode]);

  return null;
}
