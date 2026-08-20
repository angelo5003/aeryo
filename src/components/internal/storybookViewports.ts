/**
 * Shared "Responsive" story viewports, used across every AERYO component's
 * `.stories.tsx` (Mobile/Tablet/Desktop stories). Not a token system —
 * these are pixel dimensions for Storybook's preview iframe only, chosen
 * to line up with AERYO's real breakpoint tokens
 * (src/design-system/tokens/breakpoints.ts, Chakra's own defaults):
 * `aeryoTablet` (768px) sits exactly on `md` (48em), `aeryoDesktop`
 * (1280px) exactly on `xl` (80em); `aeryoMobile` (375px) is a common phone
 * width sitting below `sm` (480px). No component logic reads this file —
 * it only feeds each story's `parameters.viewport`/`globals.viewport`.
 */
export const RESPONSIVE_VIEWPORTS = {
  aeryoMobile: {
    name: "Mobile (375px)",
    styles: { width: "375px", height: "667px" },
    type: "mobile" as const,
  },
  aeryoTablet: {
    name: "Tablet (768px)",
    styles: { width: "768px", height: "1024px" },
    type: "tablet" as const,
  },
  aeryoDesktop: {
    name: "Desktop (1280px)",
    styles: { width: "1280px", height: "800px" },
    type: "desktop" as const,
  },
};
