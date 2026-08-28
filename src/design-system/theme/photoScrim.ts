/**
 * Gradient scrim over full-bleed photos. Use as a Chakra `bgImage` so the
 * `{colors.bg.photo}` references resolve; do not put this in a raw
 * `style={{}}` (Chakra will not expand tokens there).
 */
export const PHOTO_SCRIM_BG_IMAGE =
  "linear-gradient(to top, color-mix(in srgb, {colors.bg.photo} 90%, transparent) 0%, color-mix(in srgb, {colors.bg.photo} 35%, transparent) 45%, transparent 75%)";
