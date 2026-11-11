/**
 * Gradient tokens. Every gradient in the app flow is built from color tokens,
 * so each stop below is a `{colors.…}` reference: never a hex or rgb value.
 * Use them as `bgImage="photoScrim.bottom"` (or `bgGradient`), not in a raw
 * `style={{}}`, because Chakra only expands token references in style props.
 *
 * They replace roughly 30 hand-tuned gradients in the design with eleven named
 * ones. Photos themselves are assets, not tokens.
 *
 * Mode: `photoScrim.*` follows the overlay tokens, which are the same in both
 * modes (photos are always dark). `fade.*` and `panel.*` follow `bg` and
 * `bg.panel`, so they switch with the color mode on their own. `metric` is the
 * only one that differs by mode: dark adds a brighter teal in the middle so
 * large numerals do not look flat on a dark surface.
 */
export const gradientTokens = {
  // Dims the bottom of a photo so text on it stays readable.
  photoScrim: {
    bottom: {
      value:
        "linear-gradient(180deg, transparent 30%, {colors.bg.overlay.strong} 100%)",
    },
    // Dims both ends: top for the status bar and back button, bottom for text.
    full: {
      value:
        "linear-gradient(180deg, {colors.bg.overlay.medium} 0%, transparent 30%, {colors.bg.overlay.strong} 70%, {colors.bg.overlay.strong} 100%)",
    },
    top: {
      value: "linear-gradient(180deg, {colors.bg.overlay.medium}, transparent)",
    },
  },
  // Hides content that scrolls under a bar. Solid `bg` behind the bar itself,
  // fading to transparent on the content side.
  fade: {
    top: {
      value:
        "linear-gradient(180deg, {colors.bg} 0%, {colors.bg} 84%, transparent 100%)",
    },
    bottom: {
      value:
        "linear-gradient(0deg, {colors.bg} 0%, {colors.bg} 42%, transparent 100%)",
    },
  },
  // Cards that need to stand out: a teal tint that fades into the panel color.
  panel: {
    accent: {
      value:
        "linear-gradient(140deg, color-mix(in srgb, {colors.accent.solid} 30%, {colors.bg.panel}) 0%, {colors.bg.panel} 74%)",
    },
    // Cards and sheets: a faint lighter sheen at the top so a panel lifts off
    // the screen without a border.
    raised: {
      value:
        "linear-gradient(180deg, color-mix(in srgb, {colors.bg.panel} 94%, {colors.fg.photo}), {colors.bg.panel})",
    },
    danger: {
      value:
        "linear-gradient(140deg, color-mix(in srgb, {colors.danger.solid} 18%, {colors.bg.error}), {colors.bg.error})",
    },
  },
  // Soft teal wash at the top of a screen. Layer it over `bg`:
  // `bgImage="screenGlow" bgColor="bg"`.
  screenGlow: {
    value:
      "radial-gradient(130% 46% at 50% -8%, color-mix(in srgb, {colors.accent.solid} 9%, transparent), transparent 64%)",
  },
  // Fill for the big wind numerals. Use with `bgClip="text"`. Large text:
  // endpoints are the `fg.metric.*` tokens, whose contrast is tested.
  metric: {
    value: {
      _light:
        "linear-gradient(180deg, {colors.fg.metric.top}, {colors.fg.metric.bottom})",
      _dark:
        "linear-gradient(180deg, {colors.fg.metric.top} 0%, {colors.teal.fg} 60%, {colors.fg.metric.bottom} 100%)",
    },
  },
  avatar: {
    value:
      "linear-gradient(135deg, {colors.session.planning}, {colors.accent.solid})",
  },
} as const;
