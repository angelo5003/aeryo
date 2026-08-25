import { Box } from "@chakra-ui/react";
import * as React from "react";
import { LuCircleAlert } from "react-icons/lu";
import type { FormErrorProps } from "./FormError.types";

/**
 * A form-wide error banner — for a failed submission (e.g. "Invalid
 * email or password" from the server), not a per-field error (use
 * `Field`'s own `errorText` for that). Renders nothing when `children`
 * is empty, so it's safe to always mount unconditionally.
 *
 * Uses `bg.error`/`border.error`/`fg.error` (semantic-tokens.ts) — added
 * there specifically so this renders in AERYO's own `danger` family
 * instead of Chakra's stock red.
 */
export const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  function FormError(props, ref) {
    const { children, ...rest } = props;

    if (!children) return null;

    return (
      <Box
        ref={ref}
        role="alert"
        display="flex"
        alignItems="flex-start"
        gap="2"
        bg="bg.error"
        borderWidth="1px"
        borderColor="border.error"
        color="fg.error"
        rounded="l2"
        px="3"
        py="2"
        textStyle="sm"
        fontWeight="medium"
        {...rest}
      >
        <Box asChild flexShrink="0" mt="0.5">
          <LuCircleAlert size={16} />
        </Box>
        <Box>{children}</Box>
      </Box>
    );
  },
);
