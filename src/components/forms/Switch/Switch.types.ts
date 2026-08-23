import type { Switch as ChakraSwitch } from "@chakra-ui/react";
import type * as React from "react";

export interface SwitchProps extends Omit<
  ChakraSwitch.RootProps,
  "colorPalette"
> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.RefObject<HTMLLabelElement | null>;
}
