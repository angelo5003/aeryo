import type { FlexProps } from "@chakra-ui/react";
import type { Route } from "next";

/**
 * Props for `SettingsRow`. Style props pass through, but the row decides its
 * own children and element type: it is always a link to another screen.
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
   * The screen this row opens. Typed as Next's `Route` (typed routes are
   * on), same as `Link`.
   */
  href: Route;
}
