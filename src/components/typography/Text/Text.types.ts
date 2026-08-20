import type { TextProps as ChakraTextProps } from "@chakra-ui/react";

/**
 * Semantic text roles. Each maps directly to one of AERYO's named
 * `textStyle` bundles (src/design-system/tokens/typography.ts) — not a
 * separate styling system, just AERYO's own vocabulary for them.
 */
export type TextVariant = "body" | "label" | "caption";

export interface TextProps extends Omit<ChakraTextProps, "textStyle"> {
  /**
   * Semantic text role — selects the token-backed `textStyle`.
   * @default "body"
   */
  variant?: TextVariant;
}
