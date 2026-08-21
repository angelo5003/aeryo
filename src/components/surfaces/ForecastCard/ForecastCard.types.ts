import type { HTMLChakraProps } from "@chakra-ui/react";
import type * as React from "react";
import type {
  AeryoCardSize,
  AeryoCardVariant,
} from "@/components/surfaces/Card";

export interface ForecastCardOwnProps {
  /** E.g. "Tomorrow, 14:00". Rendered as the card's title, and used to derive the accessible name when `href`/`clickable` is set. */
  date: string;
  /** E.g. "WNW, building through the afternoon". Rendered below the date. */
  direction?: string;
  /** Pre-formatted (e.g. "22 kt") — this component does no unit conversion. */
  windSpeed?: string;
  /** Pre-formatted (e.g. "24°C"). */
  temperature?: string;
  /** Rendered in the media slot (a wind/condition glyph) — this component does not ship its own icon set. */
  icon?: React.ReactNode;
  /** Makes the whole card navigate here — see `AeryoCard`'s `href`. */
  href?: string;
  /** Makes the whole card one accessible click target without navigating — see `AeryoCard`'s `clickable`. */
  clickable?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /**
   * Visual treatment.
   * @default "interactive" when `href`/`clickable` is set, otherwise "outlined"
   */
  variant?: AeryoCardVariant;
  /** @default "md" */
  size?: AeryoCardSize;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
}

/**
 * Extends Chakra style props (`maxW`, `w`, `m`, responsive props, …) —
 * see `SpotCardProps`'s doc comment for why both `w` and `maxW` are
 * defaulted (to `"md"`) rather than just one.
 */
export type ForecastCardProps = ForecastCardOwnProps &
  Omit<HTMLChakraProps<"div">, keyof ForecastCardOwnProps>;
