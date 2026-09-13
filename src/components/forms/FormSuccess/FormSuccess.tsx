import { Box } from "@chakra-ui/react";
import * as React from "react";
import { LuMailCheck } from "react-icons/lu";
import type { FormSuccessProps } from "./FormSuccess.types";

/**
 * A form-wide success banner — for a positive outcome that isn't an error
 * (e.g. "Check your inbox to confirm your email"), not a per-field message
 * (use `Field`'s own `errorText`/helper text for that). Renders nothing
 * when `children` is empty, so it's safe to always mount unconditionally.
 *
 * Uses `bg.success`/`border.success`/`fg.success` (semantic-tokens.ts) —
 * matches `FormError`'s `bg.error`/`border.error`/`fg.error` pattern, just
 * in AERYO's `success` family instead of `danger`.
 */
export const FormSuccess = React.forwardRef<HTMLDivElement, FormSuccessProps>(
  function FormSuccess(props, ref) {
    const { children, ...rest } = props;

    if (!children) return null;

    return (
      <Box
        ref={ref}
        role="status"
        display="flex"
        alignItems="flex-start"
        gap="2"
        bg="bg.success"
        borderWidth="1px"
        borderColor="border.success"
        color="fg.success"
        rounded="l2"
        px="3"
        py="2"
        textStyle="sm"
        fontWeight="medium"
        {...rest}
      >
        <Box asChild flexShrink="0" mt="0.5">
          <LuMailCheck size={16} />
        </Box>
        <Box>{children}</Box>
      </Box>
    );
  },
);
