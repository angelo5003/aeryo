import type { Tag as ChakraTag } from "@chakra-ui/react";
import type * as React from "react";
import type {
  StatusIntent,
  StatusVariant,
} from "../internal/statusColorPalette";

export interface TagProps extends Omit<
  ChakraTag.RootProps,
  "colorPalette" | "variant"
> {
  /**
   * Semantic status intent — selects the token-backed colorPalette for
   * this tag.
   * @default "neutral"
   */
  intent?: StatusIntent;
  /**
   * Visual treatment.
   * @default "subtle"
   */
  variant?: StatusVariant;
  /**
   * Icon rendered at the start of the tag, before the label.
   */
  startElement?: React.ReactElement;
  /**
   * Icon rendered at the end of the tag, after the label (before the
   * close button, if `closable`).
   */
  endElement?: React.ReactElement;
  /** Shows a close button. */
  closable?: boolean;
  /** Called when the close button is clicked. Requires `closable`. */
  onClose?: () => void;
}
