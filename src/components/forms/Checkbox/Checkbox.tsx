import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import * as React from "react";
import type { CheckboxProps } from "./Checkbox.types";

/**
 * AERYO's checkbox — a thin wrapper around Chakra UI's `Checkbox`.
 * Always uses AERYO's one brand color (`colorPalette="teal"`, not
 * configurable): Chakra's own checkmark recipe defaults to a literal
 * `colorPalette: "red"` when none is set, which would render an
 * off-brand red check — confirmed in
 * `node_modules/@chakra-ui/react/.../recipes/checkmark.js`. Every other
 * Chakra `Checkbox.RootProps` field (`size`, `variant`, `disabled`,
 * style props, responsive props, `as`, `asChild`, `ref`, …) passes
 * through untouched.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;

    return (
      <ChakraCheckbox.Root ref={rootRef} colorPalette="teal" {...rest}>
        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
        <ChakraCheckbox.Control>
          {icon ?? <ChakraCheckbox.Indicator />}
        </ChakraCheckbox.Control>
        {children != null && (
          <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
        )}
      </ChakraCheckbox.Root>
    );
  },
);
