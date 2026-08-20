import { Grid as ChakraGrid } from "@chakra-ui/react";
import * as React from "react";
import type { GridProps } from "./Grid.types";

/**
 * AERYO's CSS Grid layout primitive — a thin wrapper around Chakra UI's
 * `Grid`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `GridProps` field (style props, responsive
 * props, `as`, `asChild`, `ref`, …) passes through untouched.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  function Grid(props, ref) {
    return <ChakraGrid ref={ref} {...props} />;
  },
);
