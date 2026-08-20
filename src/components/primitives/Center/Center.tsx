import { Center as ChakraCenter } from "@chakra-ui/react";
import * as React from "react";
import type { CenterProps } from "./Center.types";

/**
 * AERYO's centering primitive — a thin wrapper around Chakra UI's
 * `Center`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `CenterProps` field (style props, responsive
 * props, `as`, `asChild`, `ref`, …) passes through untouched.
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  function Center(props, ref) {
    return <ChakraCenter ref={ref} {...props} />;
  },
);
