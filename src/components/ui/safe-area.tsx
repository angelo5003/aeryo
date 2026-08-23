"use client";

import * as React from "react";

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const ZERO_INSETS: SafeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 };

const SafeAreaContext = React.createContext<SafeAreaInsets>(ZERO_INSETS);

/**
 * Reads the same `--safe-top`/`--safe-bottom`/`--safe-left`/`--safe-right`
 * CSS custom properties defined in `src/app/globals.css` and returns them
 * as numbers (px). CSS `env()`/`var()` values aren't otherwise readable
 * from JavaScript, so this uses the standard workaround: a zero-size probe
 * element with `padding: var(--safe-*)` set on it, whose *computed* style
 * we can read back with `getComputedStyle`.
 *
 * Most layout should use the `safe.*` Chakra spacing tokens directly (pure
 * CSS, no JS needed). Reach for this hook only when a component needs the
 * actual number to do math with — e.g. positioning a floating button a
 * fixed number of pixels above the home indicator.
 */
function readInsets(probe: HTMLDivElement): SafeAreaInsets {
  const style = getComputedStyle(probe);
  return {
    top: parseFloat(style.paddingTop) || 0,
    bottom: parseFloat(style.paddingBottom) || 0,
    left: parseFloat(style.paddingLeft) || 0,
    right: parseFloat(style.paddingRight) || 0,
  };
}

export interface SafeAreaProviderProps {
  children?: React.ReactNode;
}

export function SafeAreaProvider({ children }: SafeAreaProviderProps) {
  const probeRef = React.useRef<HTMLDivElement>(null);
  const [insets, setInsets] = React.useState<SafeAreaInsets>(ZERO_INSETS);

  React.useEffect(() => {
    const probe = probeRef.current;
    if (!probe) return;

    const measure = () => setInsets(readInsets(probe));
    measure();

    // Orientation changes and dynamic-island-style layout shifts change the
    // insets without necessarily firing a `resize` on the probe itself, so
    // listen on both window resize and orientation change.
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return (
    <SafeAreaContext.Provider value={insets}>
      {/* Invisible, zero-footprint: exists only so its computed padding can
       * be read back as the current safe-area inset values. */}
      <div
        ref={probeRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          overflow: "hidden",
          paddingTop: "var(--safe-top)",
          paddingBottom: "var(--safe-bottom)",
          paddingLeft: "var(--safe-left)",
          paddingRight: "var(--safe-right)",
          pointerEvents: "none",
          visibility: "hidden",
        }}
      />
      {children}
    </SafeAreaContext.Provider>
  );
}

export function useSafeArea(): SafeAreaInsets {
  return React.useContext(SafeAreaContext);
}
