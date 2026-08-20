import type { BoxProps as ChakraBoxProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Box` props — style props (which resolve to AERYO's
 * tokens automatically, since they read from the theme in
 * src/design-system/theme), responsive props, and polymorphic `as`/
 * `asChild`. `Box` is a pure pass-through: this interface exists so
 * consumers import the type from AERYO, not Chakra, directly.
 */
export type BoxProps = ChakraBoxProps;
