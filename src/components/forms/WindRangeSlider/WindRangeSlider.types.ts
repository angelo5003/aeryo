import type { Slider } from "@chakra-ui/react";

/** Lowest and highest wind speed the rider picked, for example `[14, 28]`. */
export type WindRange = [number, number];

export interface WindRangeSliderProps extends Omit<
  Slider.RootProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "aria-label"
  | "aria-labelledby"
  | "children"
  | "colorPalette"
  | "size"
  | "variant"
  | "orientation"
> {
  /** Visible label above the slider, for example "Wind range". */
  label: string;
  /** Controlled value. */
  value?: WindRange;
  /** Starting value when the slider manages its own state. */
  defaultValue?: WindRange;
  /** Called while the rider drags and when they use the keyboard. */
  onValueChange?: (value: WindRange) => void;
  /**
   * Unit shown after the numbers.
   * @default "kt"
   */
  unit?: string;
  /**
   * Lowest value on the slider.
   * @default 0
   */
  min?: number;
  /**
   * Highest value on the slider.
   * @default 40
   */
  max?: number;
  /**
   * Step size.
   * @default 1
   */
  step?: number;
  /**
   * Screen reader names for the two handles.
   * @default ["Minimum wind speed", "Maximum wind speed"]
   */
  thumbLabels?: [string, string];
}
