/**
 * Semantic tokens assign meaning to the raw palette and carry per-mode
 * values, so components that use `bg="bg"` (etc.) get correct light/dark
 * colors automatically.
 *
 * Shape note: Chakra's own default semantic tokens use nested objects with
 * an uppercase `DEFAULT` key for a family's base value
 * (`bg: { DEFAULT: {...}, subtle: {...} }`, referenced as `bg="bg"` for the
 * base and `bg="bg.subtle"` for the child) — confirmed against Chakra's
 * shipped source. Mirror that shape exactly so this genuinely overrides
 * Chakra's own `bg`/`fg`/`border` (Card, Dialog, Menu, … all inherit it)
 * instead of sitting beside them unused.
 *
 * RESTRAINT PRINCIPLE (docs/guides/aeryo-branding.md §9's "Resolved
 * Palette" addendum): `teal` is the one AERYO primary — the default for
 * anything interactive (buttons, links, active nav). There is no second,
 * general-purpose highlight token. `lime` exists ONLY inside `wind.*`, as
 * the top of the wind-intensity scale — never bind it to a button, badge,
 * or anything outside wind/data visualization. If a new UI element wants
 * "a highlight," reach for a brighter step of `teal` first and ask
 * whether it really needs one at all (§28: does this communicate wind,
 * movement, clarity, freedom or premium quality?). `danger` and `caution`
 * are the two sanctioned safety-only exceptions to "one primary, one
 * highlight" — universal danger/caution colors, never brand decoration.
 *
 * WCAG NOTE: every dark-mode text/foreground value below is verified
 * against the surface(s) it's actually paired with (WCAG 2.1 contrast
 * ratio, 4.5:1 normal text / 3:1 large text & UI components) — a critique
 * pass caught several failures a plausible-looking token still had:
 * `accent.contrast` wasn't mode-aware at all (2.49:1 in dark mode), and
 * `fg.subtle`/`fg.muted`/`wind.calm` all leaned on `ink.400`/`ink.500`
 * without checking the darker surfaces they render on. Fixed below; when
 * adding a new dark-mode text value, check it against every surface it
 * will realistically sit on, not just the darkest one.
 */
export const semanticTokens = {
  colors: {
    bg: {
      DEFAULT: {
        value: { _light: "{colors.ink.50}", _dark: "{colors.ink.950}" },
      },
      subtle: {
        value: { _light: "{colors.ink.100}", _dark: "{colors.ink.900}" },
      },
      muted: {
        value: { _light: "{colors.ink.200}", _dark: "{colors.ink.800}" },
      },
      panel: { value: { _light: "white", _dark: "{colors.ink.900}" } },
    },
    fg: {
      DEFAULT: {
        value: { _light: "{colors.ink.950}", _dark: "{colors.ink.50}" },
      },
      // Dark value is NOT ink.400 — that only clears 4.12:1 against
      // bg.muted (fails 4.5:1 AA). #76A1A9 is ink.400 nudged toward
      // ink.300, verified 4.57:1/6.72:1/5.40:1 against bg.muted/bg/bg.subtle.
      muted: {
        value: { _light: "{colors.ink.500}", _dark: "#76A1A9" },
      },
      // Dark value is NOT ink.500 (#3D7784) — that's only 3.77:1 against
      // bg and 3.02:1 against bg.subtle, both AA fails. #66969F is
      // verified 5.80:1/4.66:1 against bg/bg.subtle. Scope: verified for
      // bg/bg.subtle only — don't place fg.subtle on bg.muted, it isn't
      // light enough for that surface (use fg.muted there instead).
      subtle: {
        value: { _light: "{colors.ink.400}", _dark: "#66969F" },
      },
    },
    // Deliberately low-contrast (~1.5:1 effective in dark mode) —
    // decorative hairlines only (guide §23 "subtle borders"). Never rely
    // on `border.*` alone to signal an interactive edge (button, input,
    // focus outline); those need a stronger, dedicated boundary treatment.
    border: {
      DEFAULT: {
        value: {
          _light: "{colors.ink.200}",
          _dark: "rgba(99, 230, 213, 0.16)",
        },
      },
      muted: {
        value: {
          _light: "{colors.ink.100}",
          _dark: "rgba(99, 230, 213, 0.10)",
        },
      },
    },

    // The one brand accent. No second "emphasized" token — see the
    // restraint principle above. `solid` is a step darker in light mode
    // (teal.700, not teal.600) specifically so `contrast` can stay light
    // text in both modes rather than flipping dark/light per mode.
    accent: {
      solid: {
        value: { _light: "{colors.teal.700}", _dark: "{colors.teal.500}" },
      },
      // Was a flat ink.50 — passed in light mode (teal.600) but only
      // 2.49:1 in dark mode (teal.500 is too bright for light text).
      // Now mode-aware and verified: ink.50/teal.700 = 5.76:1 (light),
      // ink.950/teal.500 = 7.01:1 (dark).
      contrast: {
        value: { _light: "{colors.ink.50}", _dark: "{colors.ink.950}" },
      },
    },

    // Rider presence — differentiated by *shade of the one primary*, not
    // by adding more brand colors (guide §32 "Rider" states).
    rider: {
      riding: {
        value: { _light: "{colors.teal.600}", _dark: "{colors.teal.300}" },
      },
      planning: {
        value: { _light: "{colors.teal.700}", _dark: "{colors.teal.600}" },
      },
      offline: {
        value: { _light: "{colors.ink.300}", _dark: "{colors.ink.400}" },
      },
    },

    // Session status (guide §32 "Session" states) — same shade principle.
    session: {
      planning: {
        value: { _light: "{colors.teal.700}", _dark: "{colors.teal.600}" },
      },
      active: {
        value: { _light: "{colors.teal.600}", _dark: "{colors.teal.300}" },
      },
      completed: {
        value: { _light: "{colors.ink.400}", _dark: "{colors.ink.400}" },
      },
      cancelled: {
        value: { _light: "{colors.danger.600}", _dark: "{colors.danger.400}" },
      },
    },

    // Wind intensity (guide §32 "Wind" states) — mirrors the brand
    // reference's own wind-flow gradient bar (teal at low knots → lime at
    // 50+), plus a caution break the reference's plain speedometer didn't
    // need but the app does: wind conditions can't rely on color alone
    // (guide §25), and "extreme" is a safety state, not just "more wind".
    wind: {
      // Dark value is NOT ink.500 — same failure as fg.subtle above
      // (3.77:1 against bg). Reuses the same verified #66969F.
      calm: {
        value: { _light: "{colors.ink.400}", _dark: "#66969F" },
      },
      light: {
        value: { _light: "{colors.teal.700}", _dark: "{colors.teal.600}" },
      },
      good: {
        value: { _light: "{colors.teal.600}", _dark: "{colors.teal.300}" },
      },
      strong: {
        value: { _light: "{colors.lime.600}", _dark: "{colors.lime.400}" },
      },
      extreme: {
        value: {
          _light: "{colors.caution.600}",
          _dark: "{colors.caution.400}",
        },
      },
    },
  },
} as const;
