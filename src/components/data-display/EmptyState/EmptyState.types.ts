import type { EmptyStateRootProps as ChakraEmptyStateRootProps } from "@chakra-ui/react";
import type * as React from "react";

/** A subset of Chakra's own EmptyState recipe sizes. */
export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateProps extends Omit<
  ChakraEmptyStateRootProps,
  "size" | "title"
> {
  /**
   * A small icon (e.g. a react-icons glyph) or a larger illustration
   * (a custom SVG/image element) — both just render in the same slot;
   * an icon-sized glyph and a bigger illustration graphic both make
   * sense here depending on context, and neither needs a different prop.
   */
  icon?: React.ReactNode;
  /** The main message (e.g. "No spots found"). */
  title: React.ReactNode;
  /** Secondary, more detailed text below the title. */
  description?: React.ReactNode;
  /** Typically a `Button` — e.g. "Clear filters", "Add a spot". */
  action?: React.ReactNode;
  /**
   * Size.
   * @default "md"
   */
  size?: EmptyStateSize;
}
