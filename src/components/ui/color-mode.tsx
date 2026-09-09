"use client";

import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { THEME_STORAGE_KEY } from "./theme-init-script";

export type ColorModeProviderProps = {
  children?: React.ReactNode;
};

export type ColorMode = "light" | "dark";

type ThemePreference = ColorMode | "system";

interface ThemeContextValue {
  theme: ThemePreference | undefined;
  resolvedTheme: ColorMode | undefined;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: undefined,
  resolvedTheme: undefined,
  setTheme: () => {},
});

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

type ThemeSnapshot = {
  theme: ThemePreference | undefined;
  resolved: ColorMode | undefined;
};

const SERVER_SNAPSHOT: ThemeSnapshot = {
  theme: undefined,
  resolved: undefined,
};

const listeners = new Set<() => void>();

function emitThemeChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getSystemTheme(): ColorMode {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";
}

function readStoredPreference(): ThemePreference {
  let stored: string | undefined;
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY) || undefined;
  } catch {
    stored = undefined;
  }
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

let cachedSnapshot: ThemeSnapshot = SERVER_SNAPSHOT;

function getSnapshot(): ThemeSnapshot {
  const theme = readStoredPreference();
  const resolved = theme === "system" ? getSystemTheme() : theme;
  if (
    cachedSnapshot.theme === theme &&
    cachedSnapshot.resolved === resolved
  ) {
    return cachedSnapshot;
  }
  cachedSnapshot = { theme, resolved };
  return cachedSnapshot;
}

function getServerSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const media = window.matchMedia(COLOR_SCHEME_QUERY);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };
  media.addEventListener("change", onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setTheme(next: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // private mode — still apply for this session via in-memory cache
  }
  cachedSnapshot = {
    theme: next,
    resolved: next === "system" ? getSystemTheme() : next,
  };
  emitThemeChange();
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
    ),
  );
  document.head.appendChild(style);
  return () => {
    window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };
}

function applyThemeClass(theme: ColorMode) {
  const restore = disableTransitionsTemporarily();
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
  restore();
}

/**
 * Color-mode state for Chakra's class-based dark mode.
 *
 * The FOUC-prevention script lives in `src/app/layout.tsx` (a Server
 * Component), not here. Rendering `<script>` from this Client Component is
 * what made React 19 hydrate next-themes' script against Emotion's SSR
 * `<style>` (`src/components/ui/color-mode.test.tsx`).
 */
export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const snapshot = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  React.useEffect(() => {
    if (snapshot.resolved === undefined) return;
    applyThemeClass(snapshot.resolved);
  }, [snapshot.resolved]);

  const value = React.useMemo(
    () => ({
      theme: snapshot.theme,
      resolvedTheme: snapshot.resolved,
      setTheme,
    }),
    [snapshot],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export type UseColorModeReturn = {
  colorMode: ColorMode | undefined;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
};

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = React.useContext(ThemeContext);
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return {
    colorMode: resolvedTheme,
    setColorMode: (colorMode) => setTheme(colorMode),
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    );
  },
);
