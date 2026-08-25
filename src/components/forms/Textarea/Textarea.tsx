import { Textarea as ChakraTextarea } from "@chakra-ui/react";
import * as React from "react";
import type { TextareaProps } from "./Textarea.types";

/**
 * AERYO's multi-line text input — a thin wrapper around Chakra UI's
 * `Textarea`. Chakra is an implementation detail consumers never import
 * directly; every Chakra `TextareaProps` field (`variant`, `size`, style
 * props, responsive props, `as`, `asChild`, `ref`, …) passes through
 * untouched. Compose inside `Field` for the label/helper/error text.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return <ChakraTextarea ref={ref} {...props} />;
  },
);
