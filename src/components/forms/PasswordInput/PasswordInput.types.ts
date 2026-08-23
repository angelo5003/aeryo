import type { GroupProps, InputProps } from "@chakra-ui/react";

export interface PasswordInputProps extends InputProps {
  /** The default visibility state, for uncontrolled usage. */
  defaultVisible?: boolean;
  /** The controlled visibility state. */
  visible?: boolean;
  /** Called when the visibility toggle is pressed. */
  onVisibleChange?: (visible: boolean) => void;
  /** Props forwarded to the outer group (the element the toggle sits in). */
  rootProps?: GroupProps;
  /** Accessible label for the show/hide toggle button. */
  visibilityToggleLabel?: string;
}
