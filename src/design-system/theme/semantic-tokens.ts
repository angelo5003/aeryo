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
 * Palette" addendum): the real rule is "one primary, one controlled
 * highlight, plus as many safety colors as the product needs" — not the
 * stricter-sounding "one primary, nothing else" the old comment implied.
 * `teal` is the one AERYO primary — the default for anything interactive
 * (buttons, links, active nav). There is no second, general-purpose
 * highlight token. `lime` exists ONLY inside `wind.*`, as the top of the
 * wind-intensity scale — never bind it to a button, badge, or anything
 * outside wind/data visualization. If a new UI element wants "a
 * highlight," reach for a brighter step of `teal` first and ask whether
 * it really needs one at all (§28: does this communicate wind, movement,
 * clarity, freedom or premium quality?). `danger`, `caution`, and
 * `success` are the three sanctioned safety/status-only exceptions to
 * "one primary, one highlight" — universal signal colors, never brand
 * decoration (see colors.ts for why they're named by role, not hue).
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
      // Full-bleed photographic canvas (intro, onboarding). Same value in
      // both modes on purpose: these screens always sit on a dark photo,
      // so they must not follow `bg` into off-white in light mode.
      photo: {
        value: { _light: "{colors.ink.950}", _dark: "{colors.ink.950}" },
      },
      // Chakra's Field/Input/Alert recipes read `bg.error` etc directly
      // (not via `colorPalette` — that's a separate mechanism, see the
      // `teal`/`ink`/`danger`/`caution`/`success` colorPalette blocks
      // below) — without these, an invalid Field's tinted surface would
      // silently use Chakra's stock red/orange/green/blue instead of
      // AERYO's own danger/caution/success/teal(info) families. Mirrors
      // Chakra's own choice of the lightest/darkest ramp step for a
      // background wash.
      error: {
        value: { _light: "{colors.danger.50}", _dark: "{colors.danger.950}" },
      },
      warning: {
        value: {
          _light: "{colors.caution.50}",
          _dark: "{colors.caution.950}",
        },
      },
      success: {
        value: {
          _light: "{colors.success.50}",
          _dark: "{colors.success.950}",
        },
      },
      info: {
        value: { _light: "{colors.teal.50}", _dark: "{colors.teal.950}" },
      },
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
      // Type and chrome on a photographic scrim. Same value in both modes
      // — `fg` would flip to dark ink in light mode and disappear on the
      // photo. `muted` is the inactive mark (progress dots at rest).
      photo: {
        DEFAULT: {
          value: { _light: "{colors.ink.50}", _dark: "{colors.ink.50}" },
        },
        muted: {
          value: {
            _light: "color-mix(in srgb, {colors.ink.50} 40%, transparent)",
            _dark: "color-mix(in srgb, {colors.ink.50} 40%, transparent)",
          },
        },
        // Teal text on the photo scrim (e.g. a link next to a solid CTA
        // button, meant to read as "the same brand teal"). NOT sourced
        // from `accent.solid` — that's mode-aware (teal.700 light /
        // teal.500 dark) so it matches the *button* in both modes, but
        // teal.700 only clears ~3:1 against `bg.photo` (fails 4.5:1 AA for
        // normal text). Same fix as `fg.photo` above: `bg.photo` never
        // switches with app mode, so this shouldn't either — fixed at
        // teal.500, verified ~7:1 against `bg.photo`/ink.950.
        accent: {
          value: { _light: "{colors.teal.500}", _dark: "{colors.teal.500}" },
        },
      },
      // Reuses the same shade steps as the danger/caution/success/teal
      // colorPalette `.fg` values below — deliberately, not by
      // coincidence: those were already verified against `.subtle`/
      // `.muted` colorPalette backgrounds, and separately confirmed here
      // (9.72/8.62/10.14/8.14:1 etc.) against `bg`/`bg.subtle`, since
      // Field's `errorText` renders directly on the page background, not
      // on a tinted `bg.error` surface.
      error: {
        value: {
          _light: "{colors.danger.800}",
          _dark: "{colors.danger.200}",
        },
      },
      warning: {
        value: {
          _light: "{colors.caution.800}",
          _dark: "{colors.caution.200}",
        },
      },
      success: {
        value: {
          _light: "{colors.success.800}",
          _dark: "{colors.success.200}",
        },
      },
      info: {
        value: { _light: "{colors.teal.800}", _dark: "{colors.teal.300}" },
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
      // Input's `_invalid` state reads `border.error` directly (see
      // input.js's `--error-color: colors.border.error`) — a UI-component
      // boundary, so only needs 3:1, not 4.5:1. Same shade steps as the
      // colorPalette `.border` values below.
      error: {
        value: {
          _light: "{colors.danger.500}",
          _dark: "{colors.danger.400}",
        },
      },
      warning: {
        value: {
          _light: "{colors.caution.500}",
          _dark: "{colors.caution.400}",
        },
      },
      success: {
        value: {
          _light: "{colors.success.500}",
          _dark: "{colors.success.400}",
        },
      },
      info: {
        value: { _light: "{colors.teal.500}", _dark: "{colors.teal.400}" },
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
    // `session.planning` intentionally matches `rider.planning` exactly:
    // both name "not yet happening, but on the calendar" on the same
    // shade principle, so the same step is the correct answer twice, not
    // an accidental duplication (flagged and cleared by a critique pass).
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

    // colorPalette entries: `colorPalette="<name>"` (Button, Badge, Tag, …)
    // only resolves to real colors for the ~12 families Chakra hardcodes in
    // its own theme/semantic-tokens/colors.js (gray, red, teal, …) — a
    // custom family with no matching entry here silently renders as an
    // unstyled native element (confirmed: colorPalette="ink" with no block
    // below produced a bare white/black button, not a themed one). `ink`,
    // `danger`, and `caution` need their own block for the same reason
    // Chakra ships one for every default family; `teal` already gets one
    // from Chakra's defaults (deep-merged with AERYO's redefined teal.*
    // raw values), but only `fg`/`solid`/`contrast` are overridden below —
    // `solid`/`contrast` so brand-accent components actually use the
    // WCAG-verified `accent.*` tokens above instead of Chakra's stock
    // teal formula (solid: teal.600, contrast: literal "white" in both
    // modes — never checked against AERYO's own teal hex values).
    //
    // Every text/background pairing below is a real solid/subtle/muted
    // combination a component variant can produce (see button.recipe.js:
    // solid pairs .solid+.contrast, subtle/outline/ghost pair
    // .subtle-or-.muted+.fg) and is contrast-verified per the WCAG NOTE
    // above — several of Chakra's own stock shade picks (e.g. fg.700 on
    // muted.200) landed just under 4.5:1 for AERYO's specific hex values
    // and needed a shade bumped a step darker/lighter than Chakra's
    // default formula to clear AA.
    teal: {
      fg: {
        value: { _light: "{colors.teal.800}", _dark: "{colors.teal.300}" },
      },
      solid: {
        value: { _light: "{colors.teal.700}", _dark: "{colors.teal.500}" },
      },
      contrast: {
        value: { _light: "{colors.ink.50}", _dark: "{colors.ink.950}" },
      },
    },
    ink: {
      contrast: {
        value: { _light: "{colors.ink.50}", _dark: "{colors.ink.950}" },
      },
      fg: {
        value: { _light: "{colors.ink.800}", _dark: "{colors.ink.200}" },
      },
      subtle: {
        value: { _light: "{colors.ink.100}", _dark: "{colors.ink.900}" },
      },
      muted: {
        value: { _light: "{colors.ink.200}", _dark: "{colors.ink.800}" },
      },
      emphasized: {
        value: { _light: "{colors.ink.300}", _dark: "{colors.ink.700}" },
      },
      solid: {
        value: { _light: "{colors.ink.900}", _dark: "{colors.ink.50}" },
      },
      focusRing: {
        value: { _light: "{colors.ink.400}", _dark: "{colors.ink.400}" },
      },
      border: {
        value: { _light: "{colors.ink.200}", _dark: "{colors.ink.800}" },
      },
    },
    danger: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: {
          _light: "{colors.danger.800}",
          _dark: "{colors.danger.200}",
        },
      },
      subtle: {
        value: {
          _light: "{colors.danger.100}",
          _dark: "{colors.danger.900}",
        },
      },
      muted: {
        value: {
          _light: "{colors.danger.200}",
          _dark: "{colors.danger.800}",
        },
      },
      emphasized: {
        value: {
          _light: "{colors.danger.300}",
          _dark: "{colors.danger.700}",
        },
      },
      solid: {
        value: {
          _light: "{colors.danger.600}",
          _dark: "{colors.danger.600}",
        },
      },
      focusRing: {
        value: {
          _light: "{colors.danger.500}",
          _dark: "{colors.danger.500}",
        },
      },
      border: {
        value: {
          _light: "{colors.danger.500}",
          _dark: "{colors.danger.400}",
        },
      },
    },
    caution: {
      contrast: { value: { _light: "white", _dark: "white" } },
      fg: {
        value: {
          _light: "{colors.caution.800}",
          _dark: "{colors.caution.300}",
        },
      },
      subtle: {
        value: {
          _light: "{colors.caution.100}",
          _dark: "{colors.caution.900}",
        },
      },
      muted: {
        value: {
          _light: "{colors.caution.200}",
          _dark: "{colors.caution.800}",
        },
      },
      emphasized: {
        value: {
          _light: "{colors.caution.300}",
          _dark: "{colors.caution.700}",
        },
      },
      solid: {
        value: {
          _light: "{colors.caution.600}",
          _dark: "{colors.caution.600}",
        },
      },
      focusRing: {
        value: {
          _light: "{colors.caution.500}",
          _dark: "{colors.caution.500}",
        },
      },
      border: {
        value: {
          _light: "{colors.caution.500}",
          _dark: "{colors.caution.400}",
        },
      },
    },
    // Unlike danger/caution (dark enough at .600 for white text, verified
    // 5.23:1/4.57:1 above), success's ramp is bright enough at every step
    // that white-on-.600 only clears 2.48:1 — a hard AA fail. Dark text
    // (ink.950, same device teal.contrast already uses) on the solid step
    // clears easily instead: 7.66:1.
    success: {
      contrast: {
        value: { _light: "{colors.ink.950}", _dark: "{colors.ink.950}" },
      },
      fg: {
        value: {
          _light: "{colors.success.800}",
          _dark: "{colors.success.200}",
        },
      },
      subtle: {
        value: {
          _light: "{colors.success.100}",
          _dark: "{colors.success.900}",
        },
      },
      muted: {
        value: {
          _light: "{colors.success.200}",
          _dark: "{colors.success.800}",
        },
      },
      emphasized: {
        value: {
          _light: "{colors.success.300}",
          _dark: "{colors.success.700}",
        },
      },
      solid: {
        value: {
          _light: "{colors.success.600}",
          _dark: "{colors.success.600}",
        },
      },
      focusRing: {
        value: {
          _light: "{colors.success.500}",
          _dark: "{colors.success.500}",
        },
      },
      border: {
        value: {
          _light: "{colors.success.500}",
          _dark: "{colors.success.400}",
        },
      },
    },
  },
  // Safe-area insets as spacing tokens, so any component can write
  // `pt="safe.top"` the same way it writes any other spacing value instead
  // of reaching for a raw CSS var. The underlying --safe-* custom
  // properties are defined once in src/app/globals.css and stay correct on
  // both iOS and Android — see the comment there for how.
  spacing: {
    safe: {
      top: { value: "var(--safe-top)" },
      bottom: { value: "var(--safe-bottom)" },
      left: { value: "var(--safe-left)" },
      right: { value: "var(--safe-right)" },
    },
  },
} as const;
