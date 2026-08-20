import type { GridProps as ChakraGridProps } from "@chakra-ui/react";

/**
 * All of Chakra's `Grid` props — the `templateColumns`/`templateRows`/
 * `templateAreas`/`autoFlow`/`autoRows`/`autoColumns`/`column`/`row`/
 * `inline` shorthands, every style/responsive prop, and polymorphic
 * `as`/`asChild`. `Grid` is a pure pass-through: this interface exists so
 * consumers import the type from AERYO, not Chakra, directly.
 */
export type GridProps = ChakraGridProps;
