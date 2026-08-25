import type { BoxProps } from "@chakra-ui/react";
import type * as React from "react";

export interface FormErrorProps extends Omit<BoxProps, "children"> {
  /**
   * The error message. Renders nothing when empty/undefined, so it's
   * safe to always mount unconditionally — e.g.
   * `<FormError>{errors.root?.message}</FormError>` with react-hook-form.
   */
  children?: React.ReactNode;
}
