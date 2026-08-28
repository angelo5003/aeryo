/**
 * Typography tokens: font families (Sora display, Manrope body, Geist Mono) plus the
 * full type scale (size/weight/line-height/letter-spacing) and the named
 * `textStyles` bundles (`display`/`heading`/`title`/`body`/`caption`/
 * `label`/`body.photo`/`label.photo`) components reach for via
 * `textStyle="..."` instead of composing fontSize+fontWeight+lineHeight
 * by hand. Sora is display-only: never below `title` (1.25rem).
 *
 * Sizes/weights/line-heights/letter-spacings use Chakra's own proven rem
 * scale rather than a brand-invented one — nothing in
 * docs/guides/aeryo-branding.md specifies custom numerals (e.g. a bespoke
 * stat-numeral scale) that would justify deviating from it. Add a
 * brand-specific override here if a real typographic need shows up.
 *
 * The categories below list the *sanctioned* steps, not an exhaustive set:
 * because this system is built via `createSystem(defaultConfig, config)`,
 * the merge is additive per key, so Chakra's full default scale (e.g.
 * `fontSizes.6xl`, `lineHeights.tall`) still resolves alongside these.
 * Prefer the named steps below. `letterSpacings.wider` is ours (photo
 * labels), not Chakra's default.
 */
export const fonts = {
  heading: { value: "var(--font-sora), 'Sora', sans-serif" },
  body: { value: "var(--font-manrope), 'Manrope', sans-serif" },
  mono: { value: "var(--font-geist-mono), ui-monospace, monospace" },
} as const;

export const fontSizes = {
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
  "4xl": { value: "2.25rem" },
  "5xl": { value: "3rem" },
} as const;

export const fontWeights = {
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
  extrabold: { value: "800" },
} as const;

export const lineHeights = {
  tight: { value: 1.2 },
  normal: { value: 1.5 },
  relaxed: { value: 1.65 },
} as const;

export const letterSpacings = {
  tight: { value: "-0.02em" },
  normal: { value: "0" },
  wide: { value: "0.04em" },
  wider: { value: "0.08em" },
} as const;

/**
 * Named text-style bundles. Use as `textStyle="display"` etc. instead of
 * setting fontSize/fontWeight/lineHeight/letterSpacing individually.
 *
 * `label` intentionally reuses the name of one of Chakra's own default
 * `textStyles` entries — this is a deliberate override (same pattern as
 * `colors.teal` reclaiming Chakra's stock teal palette name elsewhere in
 * this system), not an accidental collision. `textStyle="label"` resolves
 * to AERYO's definition below, not Chakra's default.
 */
export const textStyles = {
  display: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.5xl}",
      fontWeight: "{fontWeights.extrabold}",
      lineHeight: "{lineHeights.tight}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  heading: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.3xl}",
      fontWeight: "{fontWeights.bold}",
      lineHeight: "{lineHeights.tight}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  title: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.xl}",
      fontWeight: "{fontWeights.semibold}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  body: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.md}",
      fontWeight: "{fontWeights.normal}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  caption: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.normal}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  label: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.xs}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.wide}",
    },
  },
  /**
   * Light type on a dark photograph. More weight, more leading, more
   * tracking than the chrome twins — the three perceptual axes typeset
   * wants when ink sits on a photo, not on a panel.
   */
  "body.photo": {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.md}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "{lineHeights.relaxed}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  "label.photo": {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.xs}",
      fontWeight: "{fontWeights.semibold}",
      lineHeight: "{lineHeights.relaxed}",
      letterSpacing: "{letterSpacings.wider}",
    },
  },
} as const;
