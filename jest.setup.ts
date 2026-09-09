import "@testing-library/jest-dom";

// jsdom doesn't implement matchMedia. ColorModeProvider (used by
// `@/components/ui/provider`, which wraps every Chakra-rendering test)
// calls it on mount to read the OS color-scheme preference, so any such
// render throws without this.
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
