/**
 * Typography tokens: font families (brand-anchored, unchanged) plus the
 * full type scale (size/weight/line-height/letter-spacing) and the named
 * `textStyles` bundles (`display`/`heading`/`title`/`body`/`caption`/
 * `label`) components reach for via `textStyle="..."` instead of composing
 * fontSize+fontWeight+lineHeight by hand.
 *
 * Sizes/weights/line-heights/letter-spacings use Chakra's own proven rem
 * scale rather than a brand-invented one — nothing in
 * docs/guides/aeryo-branding.md specifies custom numerals (e.g. a bespoke
 * stat-numeral scale) that would justify deviating from it. Add a
 * brand-specific override here if a real typographic need shows up.
 */
export const fonts = {
  heading: { value: "var(--font-sora), 'Sora', sans-serif" },
  body: { value: "var(--font-inter), 'Inter', sans-serif" },
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
  wide: { value: "0.02em" },
} as const;

/**
 * Named text-style bundles. Use as `textStyle="display"` etc. instead of
 * setting fontSize/fontWeight/lineHeight/letterSpacing individually.
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
} as const;
