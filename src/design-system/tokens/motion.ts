/**
 * Motion tokens: durations and easing curves.
 *
 * Per docs/guides/aeryo-branding.md §19 ("fluid, directional, lightweight,
 * natural, responsive, confident"; explicitly "avoid excessive bounce"),
 * every curve here is a standard decelerating/accelerating cubic-bezier —
 * no spring or bounce easing. `easeOut` (decelerate into rest) is the
 * default choice for most UI motion — it matches the "air moving around an
 * object and settling" metaphor better than a linear or bounced curve.
 *
 * Naming (`easeIn`/`easeOut`/`easeInOut`, camelCase) is additive alongside
 * Chakra's own default `ease-in`/`ease-out`/`ease-in-out` easings (kebab
 * case) — both remain available on the merged system; this doesn't
 * override Chakra's defaults, it adds AERYO's own named set.
 */
export const durations = {
  fast: { value: "120ms" },
  normal: { value: "200ms" },
  slow: { value: "320ms" },
} as const;

export const easings = {
  easeIn: { value: "cubic-bezier(0.4, 0, 1, 1)" },
  easeOut: { value: "cubic-bezier(0, 0, 0.2, 1)" },
  easeInOut: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
} as const;

export const motion = { durations, easings } as const;
