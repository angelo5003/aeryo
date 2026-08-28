/**
 * Chakra's heading recipe applies `fontFamily: heading` (Sora) at every
 * `size`, including `xs`/`sm`. AERYO's floor is `title` (1.25rem) — Sora
 * never goes smaller than that. `xs`–`xl` collapse to `title`; larger
 * Chakra sizes map onto `heading` / `display`. Prefer
 * `Heading variant="..."` over `size`.
 *
 * `base` is restated so a recipe merge cannot drop Sora from headings
 * that still use Chakra's `size` API.
 */
export const headingRecipe = {
  className: "chakra-heading",
  base: {
    fontFamily: "heading",
    fontWeight: "semibold",
  },
  variants: {
    size: {
      xs: { textStyle: "title" },
      sm: { textStyle: "title" },
      md: { textStyle: "title" },
      lg: { textStyle: "title" },
      xl: { textStyle: "title" },
      "2xl": { textStyle: "heading" },
      "3xl": { textStyle: "heading" },
      "4xl": { textStyle: "display" },
      "5xl": { textStyle: "display" },
      "6xl": { textStyle: "display" },
      "7xl": { textStyle: "display" },
    },
  },
  defaultVariants: {
    size: "xl",
  },
} as const;
