import type { SegmentGroup } from "@chakra-ui/react";
import type * as React from "react";

export interface SegmentedControlItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps extends SegmentGroup.RootProps {
  /** The options. A plain string is shorthand for `{ value, label: value }`. */
  items: Array<string | SegmentedControlItem>;
}
