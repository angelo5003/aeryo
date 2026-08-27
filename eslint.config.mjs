// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Chakra's default color palette families we don't theme (src/design-system/theme
// overrides/adds `teal`, `lime`, `ink`, `danger`, and `caution` — those stay
// allowed). `red`/`orange` are back in this disallowed list: danger/caution
// states now use the AERYO-anchored `danger`/`caution` families instead of
// Chakra's stock red/orange.
const UNTHEMED_CHAKRA_PALETTES =
  "gray|blue|red|orange|cyan|purple|pink|yellow|green|whiteAlpha|blackAlpha";
const COLOR_PROP_NAMES =
  "bg|bgColor|background|backgroundColor|color|textColor|borderColor|borderTopColor|borderBottomColor|borderLeftColor|borderRightColor|fill|stroke|colorPalette";
const RAW_COLOR_LITERAL =
  "^(#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b|(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\\()";

const noDefaultChakraColors = [
  "error",
  {
    selector: `JSXAttribute[name.name=/^(${COLOR_PROP_NAMES})$/] Literal[value=/^(${UNTHEMED_CHAKRA_PALETTES})(\\.[0-9]+)?$/]`,
    message:
      'Don\'t use Chakra\'s default color palette. Use an Aeryo token instead — colorPalette="teal" (the one primary), "danger"/"caution" for safety states, or a semantic token like bg="bg.subtle", color="fg.muted" (`lime` is reserved for wind data, see semantic-tokens.ts). See src/design-system/theme.',
  },
  {
    selector: `Property[key.name=/^(${COLOR_PROP_NAMES})$/] Literal[value=/^(${UNTHEMED_CHAKRA_PALETTES})(\\.[0-9]+)?$/]`,
    message:
      'Don\'t use Chakra\'s default color palette. Use an Aeryo token instead — colorPalette="teal" (the one primary), "danger"/"caution" for safety states, or a semantic token like bg="bg.subtle", color="fg.muted" (`lime` is reserved for wind data, see semantic-tokens.ts). See src/design-system/theme.',
  },
  {
    selector: `JSXAttribute[name.name=/^(${COLOR_PROP_NAMES})$/] Literal[value=/${RAW_COLOR_LITERAL}/]`,
    message:
      "Don't hardcode a raw color value in a component. Use an Aeryo design token — add one in src/design-system/theme if it doesn't exist yet.",
  },
  {
    selector: `Property[key.name=/^(${COLOR_PROP_NAMES})$/] Literal[value=/${RAW_COLOR_LITERAL}/]`,
    message:
      "Don't hardcode a raw color value in a component. Use an Aeryo design token — add one in src/design-system/theme if it doesn't exist yet.",
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Native platform trees: generated Capacitor scaffolding plus the
    // web build copied in by `cap sync` (android/**/assets/public,
    // android/**/build). None of it is hand-written app source.
    "android/**",
    "ios/**",
    // Test / coverage output.
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
  ...storybook.configs["flat/recommended"],
  {
    // Keep components (and stories) on Aeryo design tokens instead of
    // Chakra's stock palette or raw hex/rgb/hsl values. Exempt:
    //  - src/design-system/theme/**  — where the raw values live and get named
    //  - src/components/ui/**        — Chakra CLI-generated primitives
    //    (provider, toaster, tooltip, color-mode); infrastructure, not
    //    brand-surfaced app UI. Components we build for the app live in
    //    src/design-system/components and src/features instead.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/design-system/theme/**", "src/components/ui/**"],
    rules: {
      "no-restricted-syntax": noDefaultChakraColors,
    },
  },
]);

export default eslintConfig;
