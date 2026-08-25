import type { Field as ChakraField } from "@chakra-ui/react";
import type * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  /** The field's label, rendered above `children`. */
  label?: React.ReactNode;
  /** Helper text shown below `children` when there's no error. */
  helperText?: React.ReactNode;
  /**
   * Error text shown below `children` instead of `helperText`. Rendering
   * this alone does not mark the field invalid — pass `invalid` too (or
   * let Chakra's own `required`/native validation set it) so the error
   * styling (see `fg.error`/`border.error` in semantic-tokens.ts) applies.
   */
  errorText?: React.ReactNode;
  /** Replaces the default `*` required indicator for optional fields. */
  optionalText?: React.ReactNode;
}
