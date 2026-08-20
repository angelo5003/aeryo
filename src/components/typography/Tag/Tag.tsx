import { Tag as ChakraTag } from "@chakra-ui/react";
import * as React from "react";
import { STATUS_COLOR_PALETTE } from "../internal/statusColorPalette";
import type { TagProps } from "./Tag.types";

/**
 * AERYO's status tag — a convenience wrapper around Chakra UI's compound
 * `Tag` (`Tag.Root`/`Tag.Label`/`Tag.CloseTrigger`/`Tag.StartElement`/
 * `Tag.EndElement`). Chakra is an implementation detail consumers never
 * import directly: `children` becomes the tag's label, `intent` selects
 * the token-backed colorPalette (shared with Badge via
 * `internal/statusColorPalette.ts`, since Chakra's own Tag recipe reuses
 * Badge's variant styling), and `startElement`/`endElement`/`closable`/
 * `onClose` compose the remaining slots. Every other Chakra
 * `Tag.RootProps` field (`size`, style props, responsive props, `as`,
 * `asChild`, `ref`, …) passes through untouched.
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  function Tag(props, ref) {
    const {
      intent = "neutral",
      variant = "subtle",
      startElement,
      endElement,
      closable,
      onClose,
      children,
      ...rest
    } = props;

    return (
      <ChakraTag.Root
        ref={ref}
        colorPalette={STATUS_COLOR_PALETTE[intent]}
        variant={variant}
        {...rest}
      >
        {startElement && (
          <ChakraTag.StartElement>{startElement}</ChakraTag.StartElement>
        )}
        <ChakraTag.Label>{children}</ChakraTag.Label>
        {endElement && (
          <ChakraTag.EndElement>{endElement}</ChakraTag.EndElement>
        )}
        {closable && <ChakraTag.CloseTrigger onClick={onClose} />}
      </ChakraTag.Root>
    );
  },
);
