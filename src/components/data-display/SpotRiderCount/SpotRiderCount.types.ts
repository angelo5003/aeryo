import type { StackProps } from "@chakra-ui/react";

export interface SpotRiderCountProps extends Omit<StackProps, "children"> {
  /** Number of riders currently riding at this spot. */
  riding: number;
  /** Number of riders who've marked themselves as planning to ride. Omit to hide that line entirely. */
  planning?: number;
}
