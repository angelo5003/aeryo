import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import type * as React from "react";

/**
 * Semantic intents Button supports. Each intent selects an AERYO
 * colorPalette token family (see `internal/intentColorPalette.ts`) —
 * consumers never choose a colorPalette directly. `success` uses its own
 * `success` color family (src/design-system/tokens/colors.ts), not
 * `teal` — see that file's comment for why it's a sanctioned third
 * safety/status-only ramp alongside `danger`/`caution`, not a decorative
 * highlight.
 */
export type ButtonIntent =
  "primary" | "secondary" | "success" | "warning" | "danger";

/**
 * Visual treatments. A subset of Chakra's button recipe variants —
 * `surface` and `plain` are intentionally out of scope.
 */
export type ButtonVariant = "solid" | "outline" | "ghost" | "subtle";

/**
 * Sizes. A subset of Chakra's button recipe sizes — `2xs`, `xs`, `xl`, and
 * `2xl` are intentionally out of scope.
 */
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  ChakraButtonProps,
  "size" | "variant" | "colorPalette"
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
   * Icon rendered before `children`. Sized and spaced by the button's own
   * recipe (via the `gap` token for its size) — pass an already-sized icon
   * element (e.g. from `react-icons`).
   */
  iconLeft?: React.ReactElement;
  /** Icon rendered after `children`. See `iconLeft`. */
  iconRight?: React.ReactElement;
  /** Stretches the button to 100% of its container's width. */
  fullWidth?: boolean;
}
