import { Box as ChakraBox } from "@chakra-ui/react";
import * as React from "react";
import type { BoxProps } from "./Box.types";

/**
 * AERYO's most abstract layout primitive — a thin wrapper around Chakra
 * UI's `Box`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `BoxProps` field (style props, responsive props,
 * `as`, `asChild`, `ref`, …) passes through untouched.
 */
export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  function Box(props, ref) {
    return <ChakraBox ref={ref} {...props} />;
  },
);
