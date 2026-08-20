/**
 * Raw color tokens — the concrete palette everything else references.
 *
 * This is the AERYO brand reference's actual palette (the teal/mint/lime
 * moodboard the project started from), reconciled with the restraint
 * principle in docs/guides/aeryo-branding.md §9 — see the "Resolved
 * Palette" addendum there for the full reasoning. Short version:
 *
 *   - `teal` is the ONE primary, anchored at the reference's literal
 *     #19AEB5. Restraint comes from disciplined USE (one primary, not
 *     three), not from muting the hue — on the reference's own near-black
 *     base it reads instrument/premium, not tropical.
 *   - The reference's "mint" (#63E6D5) is not a separate family anymore —
 *     it's `teal.300`, a lighter step of the same primary.
 *   - `lime` (#D7FF3F) survives, but ONLY for wind-intensity data (see
 *     semantic-tokens.ts `wind.*`) — never a general UI accent. This
 *     matches the reference's own wind-flow gradient bar, which runs
 *     teal → lime as knots increase.
 *
 * `ink` is the neutral/atmospheric scale, anchored at the reference's
 * literal background (#071216), surface (#0D2931), and off-white
 * (#EDF8F6). It's additive — Chakra's built-in `gray` scale is untouched.
 *
 * `teal` intentionally reclaims Chakra's default palette name (so
 * `colorPalette="teal"` resolves to AERYO's actual brand color, not
 * Chakra's stock teal); `lime` is a net-new, non-colliding family.
 *
 * `danger` and `caution` (added after a critique flagged that
 * `session.cancelled`/`wind.extreme` were quietly reaching for Chakra's
 * unanchored stock red/orange) are real AERYO-anchored ramps, atmospheric
 * and muted like the rest of the palette rather than stock-alert colors —
 * but named by ROLE, not hue, on purpose: unlike `teal`/`lime`, nothing
 * should ever reach for `colorPalette="danger"` decoratively. They exist
 * for exactly one job — safety/status signals — see semantic-tokens.ts.
 */
export const colors = {
  ink: {
    50: { value: "#EDF8F6" },
    100: { value: "#DDEBEC" },
    200: { value: "#C0D6D9" },
    300: { value: "#96B8BE" },
    400: { value: "#6B99A2" },
    500: { value: "#3D7784" },
    600: { value: "#285C68" },
    700: { value: "#1B4650" },
    800: { value: "#123640" },
    900: { value: "#0D2931" },
    950: { value: "#071216" },
  },
  teal: {
    50: { value: "#E9FBF8" },
    100: { value: "#C7F3EA" },
    200: { value: "#98E7D9" },
    300: { value: "#63E6D5" },
    400: { value: "#2FC3B8" },
    500: { value: "#19AEB5" },
    600: { value: "#148A90" },
    700: { value: "#106B70" },
    800: { value: "#0B4D52" },
    900: { value: "#073638" },
    950: { value: "#042224" },
  },
  lime: {
    50: { value: "#FBFFE9" },
    100: { value: "#F2FFC0" },
    200: { value: "#E7FF92" },
    300: { value: "#D7FF3F" },
    400: { value: "#BEE82A" },
    500: { value: "#9FC71E" },
    600: { value: "#7DA017" },
    700: { value: "#5F7A12" },
    800: { value: "#44580D" },
    900: { value: "#2D3B09" },
    950: { value: "#1B2405" },
  },
  danger: {
    50: { value: "#FBEEEC" },
    100: { value: "#F5D2CD" },
    200: { value: "#EBAFA7" },
    300: { value: "#E08D82" },
    400: { value: "#D96F62" },
    500: { value: "#D45B52" },
    600: { value: "#B84740" },
    700: { value: "#963731" },
    800: { value: "#6E2823" },
    900: { value: "#4A1B17" },
    950: { value: "#2E110E" },
  },
  caution: {
    50: { value: "#FCF1E2" },
    100: { value: "#F7DEB9" },
    200: { value: "#EFC488" },
    300: { value: "#E6A75C" },
    400: { value: "#DD9247" },
    500: { value: "#C97F35" },
    600: { value: "#A6672A" },
    700: { value: "#825121" },
    800: { value: "#5E3A18" },
    900: { value: "#3F2710" },
    950: { value: "#26170A" },
  },
  // Added alongside danger/caution's own reasoning above: a third
  // safety/status-only ramp, not a stock alert-green. Same construction
  // method as danger/caution — same per-step saturation/lightness curve,
  // just rotated to a moss/sea-green hue (152°) distinct from both the
  // teal primary (183°) and the wind-only lime — so all three status
  // ramps read as one consistent, atmospheric family rather than one
  // brand-tuned pair plus a bolted-on stock green. Named by role, same as
  // danger/caution: never reach for `colorPalette="success"` decoratively.
  success: {
    50: { value: "#EAFBF3" },
    100: { value: "#CCF5E2" },
    200: { value: "#A8EBCC" },
    300: { value: "#81DFB3" },
    400: { value: "#63D9A2" },
    500: { value: "#54D498" },
    600: { value: "#41B981" },
    700: { value: "#319667" },
    800: { value: "#226D4A" },
    900: { value: "#174A32" },
    950: { value: "#0E2F20" },
  },
} as const;
