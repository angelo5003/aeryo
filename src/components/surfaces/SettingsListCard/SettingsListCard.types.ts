import type * as React from "react";
import type { AeryoCardProps } from "../Card/AeryoCard.types";

/**
 * Props for `SettingsListCard`. Everything `AeryoCard` accepts passes
 * through except the pieces this card decides for itself: it is always the
 * `default` variant, stacked vertically, and the card as a whole is not a
 * click target (each row you put inside is).
 */
export interface SettingsListCardProps extends Omit<
  AeryoCardProps,
  "variant" | "layout" | "clickable" | "href" | "onClick" | "children"
> {
  /**
   * Small heading shown above the card, for example "Riding". It also
   * names the group for screen readers.
   */
  label?: string;
  /** The rows. A divider is drawn between neighbouring rows. */
  children: React.ReactNode;
}
