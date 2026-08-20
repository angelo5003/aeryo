import type { IconButtonProps as ChakraIconButtonProps } from "@chakra-ui/react";
import type {
  ButtonIntent,
  ButtonSize,
  ButtonVariant,
} from "../Button/Button.types";

export interface IconButtonProps extends Omit<
  ChakraIconButtonProps,
  "size" | "variant" | "colorPalette" | "aria-label"
> {
  /**
   * Semantic intent — selects the token-backed colorPalette for this
   * button.
   * @default "primary"
   */
  intent?: ButtonIntent;
  /**
   * Visual treatment.
   * @default "solid"
   */
  variant?: ButtonVariant;
  /**
   * Size.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * Required, not optional: this is an icon-only control with no visible
   * text label, so it has no other accessible name (see Step 6 of the
   * chakra-ui-builder skill, and `ColorModeButton` in
   * src/components/ui/color-mode.tsx for the existing precedent).
   */
  "aria-label": string;
}
