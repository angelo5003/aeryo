import { InputGroup as ChakraInputGroup } from "@chakra-ui/react";
import * as React from "react";
import type { InputGroupProps } from "./InputGroup.types";

/**
 * AERYO's input group — a thin wrapper around Chakra UI's `InputGroup`.
 * Chakra is an implementation detail consumers never import directly;
 * every Chakra `InputGroupProps` field passes through untouched. Wraps a
 * single `Input` to add an icon, icon button, or addon on either side —
 * e.g. `<InputGroup startElement={<LuMail />}><Input /></InputGroup>`.
 * See `PasswordInput.tsx` for a real usage (its visibility toggle).
 */
export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(props, ref) {
    return <ChakraInputGroup ref={ref} {...props} />;
  },
);
