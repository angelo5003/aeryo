import * as React from "react";
import { StatusPill } from "@/components/data-display/StatusPill";
import type {
  RiderPresenceProps,
  RiderPresenceStatus,
} from "./RiderPresence.types";

/** Maps each presence status onto the `StatusPill` variant that renders it. */
const PRESENCE_VARIANT: Record<
  RiderPresenceStatus,
  "success" | "primary" | "neutral"
> = {
  riding: "success",
  planning: "primary",
  offline: "neutral",
};

/** Maps each presence status onto its label text — `planning` appends the given `time`, per the guide's "Planning 16:00" wireframe. */
function presenceLabel(status: RiderPresenceStatus, time?: string): string {
  switch (status) {
    case "riding":
      return "Riding now";
    case "planning":
      return time ? `Planning ${time}` : "Planning";
    case "offline":
      return "Offline";
  }
}

/**
 * AERYO's rider-presence pill — a thin `StatusPill` composition (see
 * `StatusPill.tsx`) fixed to the kitesurf-app's own three presence
 * states (`riding`/`planning`/`offline`, guide §32). Chakra/StatusPill
 * are implementation details consumers never need to reach past: pass
 * `status` (and `time` for `planning`) directly, no manual variant or
 * label needed.
 */
export const RiderPresence = React.forwardRef<
  HTMLSpanElement,
  RiderPresenceProps
>(function RiderPresence(props, ref) {
  const { status, time, ...rest } = props;

  return (
    <StatusPill ref={ref} variant={PRESENCE_VARIANT[status]} {...rest}>
      {presenceLabel(status, time)}
    </StatusPill>
  );
});
