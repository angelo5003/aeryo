import { Stack as ChakraStack } from "@chakra-ui/react";
import * as React from "react";
import type { StackProps } from "./Stack.types";

/**
 * AERYO's stacking layout primitive — a thin wrapper around Chakra UI's
 * `Stack`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `StackProps` field (style props, responsive
 * props, `direction`, `separator`, `as`, `asChild`, `ref`, …) passes
 * through untouched.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    return <ChakraStack ref={ref} {...props} />;
  },
);
