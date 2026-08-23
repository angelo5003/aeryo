import { Switch as ChakraSwitch } from "@chakra-ui/react";
import * as React from "react";
import type { SwitchProps } from "./Switch.types";

/**
 * AERYO's switch — a thin wrapper around Chakra UI's `Switch`. Always
 * uses AERYO's one brand color (`colorPalette="teal"`, not configurable):
 * Chakra's switch recipe has no built-in colorPalette fallback at all, so
 * without an explicit one the "on" state renders unstyled. Every other
 * Chakra `Switch.RootProps` field (`size`, `disabled`, style props,
 * responsive props, `as`, `asChild`, `ref`, …) passes through untouched.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const { inputProps, children, rootRef, ...rest } = props;

    return (
      <ChakraSwitch.Root ref={rootRef} colorPalette="teal" {...rest}>
        <ChakraSwitch.HiddenInput ref={ref} {...inputProps} />
        <ChakraSwitch.Control>
          <ChakraSwitch.Thumb />
        </ChakraSwitch.Control>
        {children != null && (
          <ChakraSwitch.Label>{children}</ChakraSwitch.Label>
        )}
      </ChakraSwitch.Root>
    );
  },
);
