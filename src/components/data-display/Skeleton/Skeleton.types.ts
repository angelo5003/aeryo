import type { HTMLChakraProps } from "@chakra-ui/react";
import type * as React from "react";
import type { AvatarSize } from "@/components/data-display/Avatar";
import type { AeryoCardSize } from "@/components/surfaces/Card";

/**
 * Which shape this placeholder renders. `custom` wraps arbitrary
 * `children` in the shimmer/pulse treatment, sized by whatever the
 * children/style props give it — the other three are pre-shaped presets
 * for the most common loading placeholders.
 */
export type SkeletonVariant = "text" | "avatar" | "card" | "custom";

export interface SkeletonProps extends HTMLChakraProps<"div"> {
  /**
   * @default "custom"
   */
  variant?: SkeletonVariant;
  /** `variant="text"` only: number of lines. @default 3 */
  lines?: number;
  /** `variant="avatar"` only: reuses `Avatar`'s own size scale. @default "md" */
  avatarSize?: AvatarSize;
  /** `variant="card"` only: reuses `AeryoCard`'s own size scale (controls overall footprint, not `AeryoCard` itself — this is a generic card-shaped placeholder, not coupled to it). @default "md" */
  cardSize?: AeryoCardSize;
  /** `variant="custom"` only: the real content this stands in for, while it's loading. */
  children?: React.ReactNode;
}
