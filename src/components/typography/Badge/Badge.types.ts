import type { BadgeProps as ChakraBadgeProps } from "@chakra-ui/react";
import type {
  StatusIntent,
  StatusVariant,
} from "../internal/statusColorPalette";

export interface BadgeProps extends Omit<
  ChakraBadgeProps,
  "colorPalette" | "variant"
> {
  /**
   * Semantic status intent — selects the token-backed colorPalette for
   * this badge.
   * @default "neutral"
   */
  intent?: StatusIntent;
  /**
   * Visual treatment.
   * @default "subtle"
   */
  variant?: StatusVariant;
}
