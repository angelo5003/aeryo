/**
 * Elevation scale. Primitive fallbacks (and dark `_dark` semantics) tint
 * `ink.950` — never Chakra `gray`/`black`, never a one-off rgba. The live
 * `shadow="sm"` values are the mode-aware tokens in `semantic-tokens.ts`.
 */
export const shadows = {
  xs: { value: "0 1px 2px {colors.ink.950/40}" },
  sm: { value: "0 2px 8px {colors.ink.950/45}" },
  md: { value: "0 8px 24px {colors.ink.950/50}" },
  lg: { value: "0 16px 40px {colors.ink.950/55}" },
  xl: { value: "0 24px 64px {colors.ink.950/60}" },
} as const;
