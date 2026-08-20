import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import * as React from "react";
import { INTENT_COLOR_PALETTE } from "../internal/intentColorPalette";
import type { IconButtonProps } from "./IconButton.types";

/**
 * AERYO's icon-only action button.
 *
 * A thin wrapper around Chakra UI's `IconButton` — Chakra is an
 * implementation detail consumers never import directly. It translates the
 * semantic `intent` prop into the correct token-backed `colorPalette` and
 * narrows `variant`/`size` to AERYO's supported subset (identical mapping
 * to `Button`, via the shared `INTENT_COLOR_PALETTE`); every other Chakra
 * `IconButtonProps` field (responsive style props, `loading`, `disabled`,
 * `asChild`, `ref`, …) passes through untouched.
 *
 * The icon itself is passed as `children` — Chakra v3 has no separate
 * `icon` prop (that was a v2 API) — and `aria-label` is required, not
 * optional, since this control has no other accessible name.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      intent = "primary",
      variant = "solid",
      size = "md",
      children,
      ...rest
    } = props;

    return (
      <ChakraIconButton
        ref={ref}
        colorPalette={INTENT_COLOR_PALETTE[intent]}
        variant={variant}
        size={size}
        {...rest}
      >
        {children}
      </ChakraIconButton>
    );
  },
);
