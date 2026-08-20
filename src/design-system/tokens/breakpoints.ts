/**
 * Responsive breakpoints. Chakra's own standard 5-step scale — nothing in
 * docs/guides/aeryo-branding.md specifies custom breakpoints, so there's no
 * reason to deviate from the proven default. Note the shape here is plain
 * strings, not `{ value }` objects — `theme.breakpoints` is a distinct
 * top-level Chakra config key, unlike the `theme.tokens.*` categories.
 */
export const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
} as const;
