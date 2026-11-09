import type * as React from "react";
import type { FlexProps } from "@chakra-ui/react";

export interface NotificationRowProps extends Omit<
  FlexProps,
  "title" | "children" | "onClick"
> {
  /** Icon shown in the rounded tile on the left (a react-icons element). */
  icon: React.ReactNode;
  /**
   * Short headline. A plain string, because it is also the accessible name
   * of the whole-row link or button when `href` / `onClick` is set.
   */
  title: string;
  /** One or two lines of detail under the title. */
  message?: React.ReactNode;
  /** When it happened, already formatted for reading, for example "2h". */
  time: string;
  /**
   * Unread rows get a bold title, a teal dot and a hidden "Unread" label
   * for screen readers.
   * @default false
   */
  unread?: boolean;
  /** Makes the whole row a link. */
  href?: string;
  /** Makes the whole row a button. */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Buttons shown under the text, for example Accept and Decline. They stay
   * clickable on their own even when the row has `href` or `onClick`.
   */
  actions?: React.ReactNode;
}
