import { Flex as ChakraFlex } from "@chakra-ui/react";
import * as React from "react";
import type { FlexProps } from "./Flex.types";

/**
 * AERYO's flexbox layout primitive — a thin wrapper around Chakra UI's
 * `Flex`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `FlexProps` field (style props, responsive
 * props, `as`, `asChild`, `ref`, …) passes through untouched.
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  function Flex(props, ref) {
    return <ChakraFlex ref={ref} {...props} />;
  },
);
