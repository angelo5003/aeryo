import type { InputProps } from "@chakra-ui/react";
import type { InputGroupProps } from "@/components/forms/InputGroup";

export interface PasswordInputProps extends InputProps {
  /** The default visibility state, for uncontrolled usage. */
  defaultVisible?: boolean;
  /** The controlled visibility state. */
  visible?: boolean;
  /** Called when the visibility toggle is pressed. */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Props forwarded to the outer `InputGroup` (the element the toggle
   * sits in). `endElement`/`endOffset`/`children` are already controlled
   * by this component — set here, they'd be silently overridden.
   */
  rootProps?: Omit<InputGroupProps, "endElement" | "endOffset" | "children">;
  /** Accessible label for the show/hide toggle button. */
  visibilityToggleLabel?: string;
}
