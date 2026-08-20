/**
 * Elevation scale tuned for a near-black surface (Chakra's default shadows
 * assume a light bg and read as almost invisible on `ink.900`/`ink.800`).
 * Kept to plain black at higher opacity — elevation on dark surfaces reads
 * mostly through the lighter surface color + border, so shadows only need
 * to carry depth for floating elements (menus, dialogs, popovers).
 */
export const shadows = {
  xs: { value: "0 1px 2px rgba(2, 8, 10, 0.4)" },
  sm: { value: "0 2px 8px rgba(2, 8, 10, 0.45)" },
  md: { value: "0 8px 24px rgba(2, 8, 10, 0.5)" },
  lg: { value: "0 16px 40px rgba(2, 8, 10, 0.55)" },
  xl: { value: "0 24px 64px rgba(2, 8, 10, 0.6)" },
} as const;
