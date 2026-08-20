import type { FlexProps as ChakraFlexProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Flex` props — the `align`/`justify`/`wrap`/`direction`/
 * `basis`/`grow`/`shrink`/`inline` shorthands, every style/responsive
 * prop, and polymorphic `as`/`asChild`. `Flex` is a pure pass-through:
 * this interface exists so consumers import the type from AERYO, not
 * Chakra, directly.
 */
export type FlexProps = ChakraFlexProps;
