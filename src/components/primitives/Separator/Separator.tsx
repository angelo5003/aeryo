import { Separator as ChakraSeparator } from "@chakra-ui/react";
import * as React from "react";
import type { SeparatorProps } from "./Separator.types";

/**
 * AERYO's dividing-line primitive — a thin wrapper around Chakra UI's
 * `Separator`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `SeparatorProps` field (`orientation`, style
 * props, responsive props, `as`, `asChild`, `ref`, …) passes through
 * untouched.
 */
export const Separator = React.forwardRef<HTMLSpanElement, SeparatorProps>(
  function Separator(props, ref) {
    return <ChakraSeparator ref={ref} {...props} />;
  },
);
