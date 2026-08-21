import type { StackProps } from "@chakra-ui/react";
import type * as React from "react";

export interface SpotHeaderProps extends Omit<StackProps, "children"> {
  /** The spot's name, e.g. `"IJmuiden"`. */
  name: string;
  /** e.g. `"North Holland"` — rendered above `name` as an overline. */
  region?: string;
  /** Banner image URL. Renders a placeholder (a muted panel with a pin icon) when omitted, same fallback pattern as `SpotCard`. */
  imageSrc?: string;
  /** Alt text for `imageSrc`. Defaults to `name`. */
  imageAlt?: string;
  /** Riders currently riding at this spot — rendered via `SpotRiderCount`. */
  riding: number;
  /** Riders planning to ride — rendered via `SpotRiderCount`. */
  planning?: number;
  /**
   * The primary action, typically the guide's §26 "I'm riding" `Button`.
   * Not a `boolean` toggle — whether it reads "I'm riding" or something
   * else once the rider has checked in is the consumer's own concern.
   */
  action?: React.ReactNode;
}
