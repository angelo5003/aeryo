import { Input as ChakraInput } from "@chakra-ui/react";
import * as React from "react";
import type { InputProps } from "./Input.types";

/**
 * AERYO's text input — a thin wrapper around Chakra UI's `Input`. Chakra
 * is an implementation detail consumers never import directly; every
 * Chakra `InputProps` field (`variant`, `size`, style props, responsive
 * props, `as`, `asChild`, `ref`, …) passes through untouched. Compose
 * inside `Field` for the label/helper/error text, since `Input` itself
 * has no notion of either.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return <ChakraInput ref={ref} {...props} />;
  },
);
