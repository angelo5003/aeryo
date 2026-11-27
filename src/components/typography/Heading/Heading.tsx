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
 * Default visual size for each HTML heading tag, used when the caller does
 * not pass `variant`. Same idea as Primer and DS0: the tag alone tells you
 * the size, and `variant` overrides it.
 */
const DEFAULT_VARIANT_BY_TAG: Record<string, HeadingVariant> = {
  h1: "display",
  h2: "heading",
  h3: "title",
  h4: "title",
  h5: "title",
  h6: "title",
};

/**
 * AERYO's heading primitive — a thin wrapper around Chakra UI's
 * `Heading`. Chakra's own `size` recipe (`xs`…`7xl`, raw scale steps) is
 * intentionally not exposed: `variant` selects one of the named
 * `textStyle` bundles in src/design-system/tokens/typography.ts
 * (`display`/`heading`/`title`) instead, so there's exactly one
 * token-backed way to size a heading. Sora's floor is `title` (1.25rem).
 * Renders an `h2` by default (Chakra's own default). When `variant` is
 * omitted, the size follows the tag: h1 = display, h2 = heading,
 * h3–h6 = title. Pass `variant` to size a heading independently of its
 * document level. Every
 * other Chakra `HeadingProps` field (style props, responsive props, `as`,
 * `asChild`, `ref`, …) passes through untouched.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const { as: tagName, variant: variantFromCaller, ...rest } = props;
    const variant =
      variantFromCaller ??
      (typeof tagName === "string" ? DEFAULT_VARIANT_BY_TAG[tagName] : undefined) ??
      "heading";

    return (
      <ChakraHeading
        ref={ref}
        as={tagName}
        size={HEADING_SIZE[variant]}
        textStyle={variant}
        {...rest}
      />
    );
  },
);
