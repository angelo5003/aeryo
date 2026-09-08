import "@testing-library/jest-dom";

// jsdom doesn't implement matchMedia. next-themes (used by
// `@/components/ui/provider`'s ColorModeProvider, which wraps every
// Chakra-rendering test via `Provider`) calls it on mount to read the
// OS color-scheme preference, so any such render throws without this.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
