import { Button as ChakraButton } from "@chakra-ui/react";
import * as React from "react";
import { INTENT_COLOR_PALETTE } from "../internal/intentColorPalette";
import type { ButtonProps } from "./Button.types";

/**
 * AERYO's primary action button.
 *
 * A thin wrapper around Chakra UI's `Button` — Chakra is an implementation
 * detail consumers never import directly. It translates the semantic
 * `intent` prop into the correct token-backed `colorPalette` and narrows
 * `variant`/`size` to AERYO's supported subset; every other Chakra
 * `ButtonProps` field (responsive style props, `loading`, `loadingText`,
 * `disabled`, `asChild`, `ref`, …) passes through untouched.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      intent = "primary",
      variant = "solid",
      size = "md",
      iconLeft,
      iconRight,
      fullWidth,
      children,
      width,
      ...rest
    } = props;

    return (
      <ChakraButton
        ref={ref}
        colorPalette={INTENT_COLOR_PALETTE[intent]}
        variant={variant}
        size={size}
        width={width ?? (fullWidth ? "full" : undefined)}
        {...rest}
      >
        {iconLeft}
        {children}
        {iconRight}
      </ChakraButton>
    );
  },
);
