import { Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";
import type { FieldProps } from "./Field.types";

/**
 * AERYO's form-field wrapper — label, helper text, error text, and a
 * required/optional indicator around any input control (`Input`,
 * `Textarea`, `Select`, …). A thin wrapper around Chakra UI's `Field`;
 * Chakra is an implementation detail consumers never import directly.
 *
 * Label color comes from `fg.emphasized`, error/helper text from
 * `fg.error`/`fg.muted` (semantic-tokens.ts) — `fg.error` was added there
 * specifically so this renders in AERYO's own `danger` family instead of
 * Chakra's stock red, and `fg.emphasized` so the label reads one step
 * stronger than helper text instead of Chakra's stock (unthemed) label
 * color. Every other Chakra `Field.RootProps` field (`invalid`, `required`,
 * `disabled`, `orientation`, style props, responsive props, `ref`, …)
 * passes through untouched.
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props;

    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label color="fg.emphasized">
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  },
);
