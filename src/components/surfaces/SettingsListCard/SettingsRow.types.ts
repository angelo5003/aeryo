import type { FlexProps } from "@chakra-ui/react";
import type { Route } from "next";

/**
 * Props for `SettingsRow`. Style props pass through, but the row decides its
 * own children and element type: a link when `href` is set, otherwise a
 * button.
 */
export interface SettingsRowProps extends Omit<
  FlexProps,
  "title" | "children" | "onClick" | "as" | "asChild" | "ref"
> {
  /** What the setting is called, for example "Riding preferences". */
  title: string;
  /** The current choice, shown on the right, for example "14–28 kt · Sea". */
  value?: string;
  /**
   * Makes the whole row a link to another screen. Typed as Next's `Route`
   * (typed routes are on), same as `Link`.
   */
  href?: Route;
  /** Makes the whole row a button, for example to open a dialog. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Shows a small arrow on the right to tell the rider the row opens
   * another screen.
   * @default false
   */
  showChevron?: boolean;
}
