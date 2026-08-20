import type { StackProps as ChakraStackProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Stack` props — the `align`/`justify`/`wrap`/
 * `direction`/`separator` shorthands, every style/responsive prop, and
 * polymorphic `as`/`asChild`. `Stack` is a pure pass-through: this
 * interface exists so consumers import the type from AERYO, not Chakra,
 * directly.
 */
export type StackProps = ChakraStackProps;
