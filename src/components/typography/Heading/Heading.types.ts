import type { HeadingProps as ChakraHeadingProps } from "@chakra-ui/react";

/**
 * Semantic heading roles. Each maps directly to one of AERYO's named
 * `textStyle` bundles (src/design-system/tokens/typography.ts) — not
 * Chakra's own built-in `size` recipe (`xs`…`7xl`), which is
 * intentionally not exposed here so there's exactly one way to size a
 * heading. Sora never goes smaller than `title`.
 */
export type HeadingVariant = "display" | "heading" | "title";

export interface HeadingProps extends Omit<
  ChakraHeadingProps,
  "textStyle" | "size"
> {
  /**
   * Semantic heading role — selects the token-backed `textStyle`.
   * @default "heading"
   */
  variant?: HeadingVariant;
}
