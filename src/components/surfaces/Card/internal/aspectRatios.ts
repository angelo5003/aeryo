import type { AeryoCardAspectRatio } from "../AeryoCard.types";

/**
 * Maps `AeryoCardMedia`'s named aspect ratios onto the numeric `ratio`
 * Chakra's `AspectRatio` expects. Not a design token — these are layout
 * ratios, not colors/spacing/radii, so they don't belong in
 * `src/design-system/tokens/*`; kept local the same way
 * `src/components/internal/storybookViewports.ts` keeps its pixel
 * dimensions local.
 */
export const ASPECT_RATIOS: Record<AeryoCardAspectRatio, number> = {
  square: 1 / 1,
  portrait: 3 / 4,
  landscape: 4 / 3,
  wide: 16 / 9,
};
