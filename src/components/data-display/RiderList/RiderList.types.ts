import type { StackProps } from "@chakra-ui/react";
import type * as React from "react";
import type { RiderCardProps } from "@/components/surfaces/RiderCard";

export interface RiderListItem extends RiderCardProps {
  /** A stable key for this rider — falls back to `name` if omitted. */
  id?: string;
}

export interface RiderListProps extends Omit<StackProps, "children"> {
  /** The riders to render, one `RiderCard` each, in the given order. */
  riders: RiderListItem[];
  /**
   * Heading shown above the list, e.g. `"14 riders"` (guide §26 "Rider
   * list" wireframe). Omit for no heading.
   */
  heading?: React.ReactNode;
  /** Rendered instead of the list when `riders` is empty — typically an `EmptyState`. */
  empty?: React.ReactNode;
}
