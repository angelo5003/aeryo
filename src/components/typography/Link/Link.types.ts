import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Link` props (the `variant: "underline" | "plain"`
 * recipe, style/responsive props, `as`/`asChild`), minus `colorPalette` —
 * Link always uses AERYO's one brand color (`teal`), matching the
 * restraint principle in semantic-tokens.ts.
 */
export type LinkProps = Omit<ChakraLinkProps, "colorPalette">;
