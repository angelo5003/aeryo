/**
 * Radius scale, revised per docs/guides/aeryo-branding.md §12/§23: "avoid
 * excessive rounded 'SaaS card' styling", "avoid oversized pill buttons
 * everywhere", corners should feel "intentional and aerodynamic" rather
 * than generic. Pulled in tighter than the previous scale — `full` (pill)
 * is still available for the handful of things that genuinely want it
 * (avatars, small status chips/badges), but it's no longer the default
 * button shape. Prefer `md`/`lg` for buttons and form controls, `xl`/`2xl`
 * for cards.
 */
export const radii = {
  xs: { value: "4px" },
  sm: { value: "6px" },
  md: { value: "8px" },
  lg: { value: "10px" },
  xl: { value: "14px" },
  "2xl": { value: "18px" },
  "3xl": { value: "22px" },
  full: { value: "9999px" },
} as const;
