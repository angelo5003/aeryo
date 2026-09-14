/**
 * Chakra's own toast recipe hardcodes unthemed Chakra palette values
 * (`orange.solid`, `green.solid`, `red.solid`) for the warning/success/
 * error `data-type` states — raw Chakra palettes are forbidden in this
 * repo's UI (`.claude/rules/04-frontend-architecture-performance.md`).
 * This swaps those three for AERYO's own `caution`/`success`/`danger`
 * families and adds an `info` state (`teal`) the default recipe doesn't
 * have at all. Every other layout property (padding, radius, transition,
 * the `loading`/default state's `bg.panel`/`fg`, …) is untouched — Chakra
 * deep-merges this over its own recipe (see `theme/index.ts`), same
 * pattern as `headingRecipe.ts`.
 */
export const toastRecipe = {
  // Chakra's own toast anatomy — not exported from the package root, so
  // restated here. Required by `SlotRecipeDefinition`; layout for each
  // slot still comes entirely from Chakra's default recipe, this only
  // adds the `base.root` overrides below.
  slots: [
    "root",
    "closeTrigger",
    "title",
    "description",
    "indicator",
    "actionTrigger",
  ],
  className: "chakra-toast",
  base: {
    root: {
      "&[data-type=warning]": {
        bg: "caution.solid",
        color: "caution.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
      "&[data-type=success]": {
        bg: "success.solid",
        color: "success.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
      "&[data-type=error]": {
        bg: "danger.solid",
        color: "danger.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
      "&[data-type=info]": {
        bg: "teal.solid",
        color: "teal.contrast",
        "--toast-trigger-bg": "{white/10}",
        "--toast-border-color": "{white/40}",
      },
    },
  },
} as const;
