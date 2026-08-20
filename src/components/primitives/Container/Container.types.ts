import type { ContainerProps as ChakraContainerProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Container` props — every style/responsive prop and
 * polymorphic `as`/`asChild`. `Container` is a pure pass-through: this
 * interface exists so consumers import the type from AERYO, not Chakra,
 * directly.
 */
export type ContainerProps = ChakraContainerProps;
