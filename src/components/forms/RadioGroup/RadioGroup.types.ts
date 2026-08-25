import type { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import type * as React from "react";

export type RadioGroupProps = Omit<ChakraRadioGroup.RootProps, "colorPalette">;

export interface RadioProps extends Omit<
  ChakraRadioGroup.ItemProps,
  "colorPalette"
> {
  rootRef?: React.RefObject<HTMLDivElement | null>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
