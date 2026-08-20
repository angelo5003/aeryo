import { Container as ChakraContainer } from "@chakra-ui/react";
import * as React from "react";
import type { ContainerProps } from "./Container.types";

/**
 * AERYO's max-width, centered content primitive — a thin wrapper around
 * Chakra UI's `Container`. Chakra is an implementation detail consumers
 * never import directly; every Chakra `ContainerProps` field (style
 * props, responsive props, `as`, `asChild`, `ref`, …) passes through
 * untouched.
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    return <ChakraContainer ref={ref} {...props} />;
  },
);
