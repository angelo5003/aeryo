import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import * as React from "react";
import type { RadioGroupProps, RadioProps } from "./RadioGroup.types";

/**
 * AERYO's radio group — a thin wrapper around Chakra UI's `RadioGroup`.
 * Always uses AERYO's one brand color (`colorPalette="teal"`, not
 * configurable) — same reasoning as `Checkbox`: Chakra's own radiomark
 * recipe defaults to a literal `colorPalette: "red"` when none is set.
 * Compose with `Radio` for each option:
 *
 * ```tsx
 * <RadioGroup defaultValue="beginner">
 *   <Radio value="beginner">Beginner</Radio>
 *   <Radio value="intermediate">Intermediate</Radio>
 * </RadioGroup>
 * ```
 *
 * Every other Chakra `RadioGroup.RootProps` field (`orientation`, style
 * props, responsive props, `as`, `asChild`, `ref`, …) passes through
 * untouched.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    return <ChakraRadioGroup.Root ref={ref} colorPalette="teal" {...props} />;
  },
);

/** One option inside a `RadioGroup`. See `RadioGroup` for usage. */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props;
    return (
      <ChakraRadioGroup.Item ref={rootRef} {...rest}>
        <ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
        <ChakraRadioGroup.ItemIndicator />
        {children && (
          <ChakraRadioGroup.ItemText>{children}</ChakraRadioGroup.ItemText>
        )}
      </ChakraRadioGroup.Item>
    );
  },
);
