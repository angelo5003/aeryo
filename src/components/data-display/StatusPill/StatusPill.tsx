import { Badge as ChakraBadge } from "@chakra-ui/react";
import * as React from "react";
import { STATUS_PILL_COLOR_PALETTE } from "../internal/statusPillColorPalette";
import type { StatusPillProps } from "./StatusPill.types";

/**
 * AERYO's status pill — a thin wrapper around Chakra UI's `Badge`. Chakra
 * is an implementation detail consumers never import directly. It
 * translates the semantic `variant` prop into the correct token-backed
 * `colorPalette` (see `internal/statusPillColorPalette.ts`) and narrows
 * `size` to AERYO's supported subset; every other Chakra `BadgeProps`
 * field (style props, responsive props, `as`, `asChild`, `ref`, …) passes
 * through untouched.
 *
 * Distinct from `src/components/typography/Badge` (which exposes a
 * separate `intent` + visual `variant` axis, e.g. `outline`/`surface`) —
 * this component collapses to one semantic axis only, per its own spec:
 * `variant` selects both the meaning *and* the look, always rendered as
 * Chakra's `subtle` visual treatment.
 */
export const StatusPill = React.forwardRef<HTMLSpanElement, StatusPillProps>(
  function StatusPill(props, ref) {
    const { variant = "neutral", size = "md", ...rest } = props;

    return (
      <ChakraBadge
        ref={ref}
        colorPalette={STATUS_PILL_COLOR_PALETTE[variant]}
        variant="subtle"
        size={size}
        {...rest}
      />
    );
  },
);
