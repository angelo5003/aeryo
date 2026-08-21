import type * as React from "react";
import type {
  AeryoCardInteractionProps,
  AeryoCardSize,
  AeryoCardVariant,
} from "@/components/surfaces/Card";

export interface SessionCardOwnProps {
  /** Session name, e.g. `"Saturday Session"` (guide §26 "Create session" wireframe). */
  title: string;
  /** The spot this session is at, e.g. `"IJmuiden"`. */
  spot: string;
  /** Start time text, e.g. `"15:00"`. */
  startTime: string;
  /** Current participant count. */
  participants: number;
  /** Optional cap, rendered as `"{participants} / {maxParticipants} riders"` when given. */
  maxParticipants?: number;
  /**
   * The join/leave action, e.g. a `Button`. Rendered in the card's
   * footer — not a `boolean` toggle, since whether it reads "Join" or
   * "Leave" is the consumer's own membership-state concern.
   */
  action?: React.ReactNode;
  /**
   * @default "md"
   */
  size?: AeryoCardSize;
  /**
   * @default "default"
   */
  variant?: AeryoCardVariant;
  /** Every slot renders a skeleton shape instead of real content. */
  loading?: boolean;
}

export type SessionCardProps = SessionCardOwnProps &
  AeryoCardInteractionProps;
