/**
 * Blocking theme bootstrap shared by the root layout (SSR HTML) and
 * `ColorModeProvider` (client state). Keep storage key, class names, and
 * the inline script in this one module so they cannot drift.
 *
 * The script must live in the root layout — not as a child of a Client
 * Component. React 19 treats in-tree `<script>` as a resource, which
 * hydrates against Emotion's SSR `<style>` and throws
 * (next-themes' ThemeProvider is what triggered that).
 *
 * per node_modules/next-themes/dist/index.mjs (attribute=class, enableSystem)
 */
export const THEME_STORAGE_KEY = "theme";

export const THEME_INIT_SCRIPT = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}")||"system";var theme=stored==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):stored;var root=document.documentElement;root.classList.remove("light","dark");root.classList.add(theme);root.style.colorScheme=theme;}catch(e){}})();`;
