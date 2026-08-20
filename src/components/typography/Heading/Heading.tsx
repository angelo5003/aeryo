import { Heading as ChakraHeading } from "@chakra-ui/react";
import * as React from "react";
import type { HeadingProps } from "./Heading.types";

/**
 * AERYO's heading primitive — a thin wrapper around Chakra UI's
 * `Heading`. Chakra's own `size` recipe (`xs`…`7xl`, raw scale steps) is
 * intentionally not exposed: `variant` selects one of the named
 * `textStyle` bundles in src/design-system/tokens/typography.ts
 * (`display`/`heading`/`title`) instead, so there's exactly one
 * token-backed way to size a heading. Renders an `h2` by default (Chakra's
 * own default) — pass `as="h1"` etc. for real document heading level,
 * independent of visual size. Every other Chakra `HeadingProps` field
 * (style props, responsive props, `as`, `asChild`, `ref`, …) passes
 * through untouched.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const { variant = "heading", ...rest } = props;

    return <ChakraHeading ref={ref} textStyle={variant} {...rest} />;
  },
);
