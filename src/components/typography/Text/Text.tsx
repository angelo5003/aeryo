import { Text as ChakraText } from "@chakra-ui/react";
import * as React from "react";
import type { TextProps } from "./Text.types";

/**
 * AERYO's body-text primitive — a thin wrapper around Chakra UI's `Text`.
 * Chakra ships no default recipe for `Text` (no built-in variants), so
 * `variant` here is entirely AERYO's own: it selects one of the named
 * `textStyle` bundles in src/design-system/tokens/typography.ts
 * (`body`/`label`/`caption`/`body.photo`/`label.photo`), rather than letting consumers compose
 * font-size/weight/line-height by hand. Every other Chakra `TextProps`
 * field (style props, responsive props, `as`, `asChild`, `ref`, …)
 * passes through untouched.
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  function Text(props, ref) {
    const { variant = "body", ...rest } = props;

    return <ChakraText ref={ref} textStyle={variant} {...rest} />;
  },
);
