import { Heading as ChakraHeading } from "@chakra-ui/react";
import * as React from "react";
import type { HeadingProps, HeadingVariant } from "./Heading.types";

/**
 * Maps each semantic variant onto a Chakra `size` whose recipe entry
 * resolves to the same `textStyle` (see `headingRecipe.ts`). Sora never
 * renders below `title` / `xl` / 1.25rem.
 */
const HEADING_SIZE: Record<HeadingVariant, "xl" | "3xl" | "5xl"> = {
  title: "xl",
  heading: "3xl",
  display: "5xl",
};

/**
 * AERYO's heading primitive — a thin wrapper around Chakra UI's
 * `Heading`. Chakra's own `size` recipe (`xs`…`7xl`, raw scale steps) is
 * intentionally not exposed: `variant` selects one of the named
 * `textStyle` bundles in src/design-system/tokens/typography.ts
 * (`display`/`heading`/`title`) instead, so there's exactly one
 * token-backed way to size a heading. Sora's floor is `title` (1.25rem).
 * Renders an `h2` by default (Chakra's own default) — pass `as="h1"` etc.
 * for real document heading level, independent of visual size. Every
 * other Chakra `HeadingProps` field (style props, responsive props, `as`,
 * `asChild`, `ref`, …) passes through untouched.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const { variant = "heading", ...rest } = props;

    return (
      <ChakraHeading
        ref={ref}
        size={HEADING_SIZE[variant]}
        textStyle={variant}
        {...rest}
      />
    );
  },
);
