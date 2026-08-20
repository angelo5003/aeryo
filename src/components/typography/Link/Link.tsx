import { Link as ChakraLink } from "@chakra-ui/react";
import * as React from "react";
import type { LinkProps } from "./Link.types";

/**
 * AERYO's link primitive — a thin wrapper around Chakra UI's `Link`.
 * Always uses AERYO's one brand color (`colorPalette="teal"`, not
 * configurable — matches the restraint principle in semantic-tokens.ts).
 * Chakra's own recipe already covers default (`colorPalette.fg`) and
 * hover (underline) styling; `_active` and `_visited` are added here
 * using existing semantic tokens (`accent.solid`, `fg.muted`) since
 * Chakra's link recipe doesn't define either. Every other Chakra
 * `LinkProps` field (the `variant: "underline" | "plain"` recipe, style
 * props, responsive props, `as`, `asChild`, `ref`, …) passes through
 * untouched.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    return (
      <ChakraLink
        ref={ref}
        colorPalette="teal"
        _active={{ color: "accent.solid" }}
        _visited={{ color: "fg.muted" }}
        {...props}
      />
    );
  },
);
