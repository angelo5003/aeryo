import type * as React from "react";
import type { FlexProps } from "@chakra-ui/react";

export interface ChipOption {
  /** Unique value. Reported back through `onValueChange`. */
  value: string;
  /** What the rider reads on the chip. */
  label: React.ReactNode;
  /**
   * A second, smaller line under the label (for example "8 Nov · 18 kt").
   * Only shown when `size` is `"day"`.
   */
  detail?: React.ReactNode;
  /** A disabled chip cannot be picked. */
  disabled?: boolean;
}

/**
 * `pill` is the 44px one-line chip (default). `day` is the taller, left
 * aligned card for the day picker: a bold label and a smaller detail line.
 */
export type ChipGroupSize = "pill" | "day";

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
  /** The look of every chip in the group. */
  size?: ChipGroupSize;
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
