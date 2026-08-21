import type {
  TabsContentProps as ChakraTabsContentProps,
  TabsListProps as ChakraTabsListProps,
  TabsRootProps as ChakraTabsRootProps,
  TabsTriggerProps as ChakraTabsTriggerProps,
} from "@chakra-ui/react";
import type * as React from "react";

/**
 * Horizontal only, per this component's spec — Chakra's own Tabs also
 * supports `orientation="vertical"`, but that's out of scope here (no
 * `orientation` prop is exposed).
 */
export type TabsProps = ChakraTabsRootProps;

export interface TabsListProps extends ChakraTabsListProps {
  /**
   * Scrolls horizontally (hidden scrollbar, tabs keep their natural
   * width and never wrap) instead of the default behavior of shrinking
   * every trigger to fit — use when the tab set is long or unbounded
   * (e.g. per-spot session history) rather than a small fixed set.
   */
  scrollable?: boolean;
}

export interface TabsTriggerProps extends ChakraTabsTriggerProps {
  /** Leading icon, rendered before the label. */
  icon?: React.ReactNode;
}

export type TabsContentProps = ChakraTabsContentProps;
