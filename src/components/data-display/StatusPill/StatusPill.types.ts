import type { BadgeProps as ChakraBadgeProps } from "@chakra-ui/react";

/**
 * Visual/semantic variants. Each selects a token-backed colorPalette (see
 * `internal/statusPillColorPalette.ts`) — consumers never choose a
 * colorPalette directly.
 */
export type StatusPillVariant =
  "neutral" | "primary" | "success" | "warning" | "danger";

/**
 * Sizes. A subset of Chakra's own Badge recipe sizes (`xs` is
 * intentionally out of scope, matching Button's narrowed size subset).
 */
export type StatusPillSize = "sm" | "md" | "lg";

export interface StatusPillProps extends Omit<
  ChakraBadgeProps,
  "colorPalette" | "variant" | "size"
> {
  /**
   * Visual/semantic variant — selects the token-backed colorPalette.
   * @default "neutral"
   */
  variant?: StatusPillVariant;
  /**
   * Size.
   * @default "md"
   */
  size?: StatusPillSize;
}
