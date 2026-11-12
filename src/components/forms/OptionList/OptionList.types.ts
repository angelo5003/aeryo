import type { RadioCard } from "@chakra-ui/react";
import type * as React from "react";

/**
 * Props for `OptionList`. Everything Chakra's `RadioCard.Root` accepts
 * passes through (`value`, `defaultValue`, `onValueChange`, `name`,
 * `disabled`, …) except the look: the colour is always teal, and the size,
 * variant and layout are decided here so every list looks the same.
 */
export interface OptionListProps extends Omit<
  RadioCard.RootProps,
  | "colorPalette"
  | "variant"
  | "size"
  | "orientation"
  | "align"
  | "justify"
  | "children"
> {
  /**
   * Small heading shown above the list, for example "Choose a spot". It
   * also names the group for screen readers, so it is required.
   */
  label: string;
  /** The `OptionRow` choices. A divider is drawn between neighbouring rows. */
  children: React.ReactNode;
}

/**
 * Props for `OptionRow`. Everything Chakra's `RadioCard.Item` accepts
 * passes through (`disabled`, style props, …) except the pieces this row
 * builds itself.
 */
export interface OptionRowProps extends Omit<
  RadioCard.ItemProps,
  "colorPalette" | "children" | "title"
> {
  /** What the list reports when this row is picked. Unique in the list. */
  value: string;
  /** The row's name, shown in bold. */
  title: string;
  /** A smaller line under the title, for example "12 min away · 22 kt now". */
  description?: string;
  /**
   * Picture or icon shown before the text: a 48px spot photo or a gear
   * image. Leave it out for a text-only row. Decorative images should use
   * `alt=""` because the title already names the row.
   */
  media?: React.ReactNode;
}
