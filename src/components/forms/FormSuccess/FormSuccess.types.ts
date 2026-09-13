import type { BoxProps } from "@chakra-ui/react";
import type * as React from "react";

export interface FormSuccessProps extends Omit<BoxProps, "children"> {
  /**
   * The success message. Renders nothing when empty/undefined, so it's
   * safe to always mount unconditionally — e.g.
   * `<FormSuccess>{needsConfirmation && "Check your inbox"}</FormSuccess>`.
   */
  children?: React.ReactNode;
}
