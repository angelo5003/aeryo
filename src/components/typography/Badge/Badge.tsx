import { Badge as ChakraBadge } from "@chakra-ui/react";
import * as React from "react";
import { STATUS_COLOR_PALETTE } from "../internal/statusColorPalette";
import type { BadgeProps } from "./Badge.types";

/**
 * AERYO's status badge — a thin wrapper around Chakra UI's `Badge`.
 * Chakra is an implementation detail consumers never import directly. It
 * translates the semantic `intent` prop into the correct token-backed
 * colorPalette (shared with Tag via `internal/statusColorPalette.ts`);
 * every other Chakra `BadgeProps` field (`size`, style props, responsive
 * props, `as`, `asChild`, `ref`, …) passes through untouched.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const { intent = "neutral", variant = "subtle", ...rest } = props;

    return (
      <ChakraBadge
        ref={ref}
        colorPalette={STATUS_COLOR_PALETTE[intent]}
        variant={variant}
        {...rest}
      />
    );
  },
);
