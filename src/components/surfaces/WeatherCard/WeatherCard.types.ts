import type { HTMLChakraProps } from "@chakra-ui/react";
import type * as React from "react";
import type { BadgeProps } from "@/components/typography/Badge";
import type {
  AeryoCardSize,
  AeryoCardVariant,
} from "@/components/surfaces/Card";

export interface WeatherCardOwnProps {
  /** E.g. "Now", "Today". Rendered above `temperature`. */
  overline?: string;
  /** Pre-formatted (e.g. "24°C"). Rendered as the card's title. */
  temperature: string;
  /** Pre-formatted (e.g. "18 kt") — this component does no unit conversion. */
  windSpeed?: string;
  /** Pre-formatted (e.g. "23°C"). */
  feelsLike?: string;
  /** Short human-readable condition summary (e.g. "Good conditions"), rendered as a status badge in the footer — see docs/guides/aeryo-branding.md §25 (wind conditions can't rely on color alone). */
  condition?: string;
  /** @default "success" */
  conditionIntent?: BadgeProps["intent"];
  /** Makes the whole card navigate here — see `AeryoCard`'s `href`. */
  href?: string;
  /** Makes the whole card one accessible click target without navigating — see `AeryoCard`'s `clickable`. */
  clickable?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /** @default "filled" */
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
 * defaulted (to `"xs"`) rather than just one.
 */
export type WeatherCardProps = WeatherCardOwnProps &
  Omit<HTMLChakraProps<"div">, keyof WeatherCardOwnProps>;
