import type { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import type * as React from "react";

export interface CheckboxProps extends Omit<
  ChakraCheckbox.RootProps,
  "colorPalette"
> {
  /** Replaces the default check icon. */
  icon?: React.ReactElement;
  /** Props forwarded to the native `<input type="checkbox">`. */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.RefObject<HTMLLabelElement | null>;
}
