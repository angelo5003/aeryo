import type * as React from "react";
import type { FlexProps } from "@chakra-ui/react";

export interface ChipOption {
  /** Unique value. Reported back through `onValueChange`. */
  value: string;
  /** What the rider reads on the chip. */
  label: React.ReactNode;
  /** A disabled chip cannot be picked. */
  disabled?: boolean;
}

/**
 * `wrap` puts chips on extra lines when they do not fit (default).
 * `scroll` keeps one line that scrolls sideways, like the day picker.
 */
export type ChipGroupLayout = "wrap" | "scroll";

interface ChipGroupSharedProps extends Omit<
  FlexProps,
  "children" | "defaultValue" | "onChange" | "role"
> {
  /** The chips. A plain string is shorthand for `{ value, label: value }`. */
  items: Array<string | ChipOption>;
  /** How chips behave when they do not fit on one line. */
  layout?: ChipGroupLayout;
  /** Names the group for screen readers, for example "Filter". */
  "aria-label": string;
}

/** Pick exactly one chip (a filter such as All, Wind, Sessions). */
export interface ChipGroupSingleProps extends ChipGroupSharedProps {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** Pick any number of chips (gear brands, riding styles). */
export interface ChipGroupMultipleProps extends ChipGroupSharedProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ChipGroupProps = ChipGroupSingleProps | ChipGroupMultipleProps;
