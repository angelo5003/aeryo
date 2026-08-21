import type { FlexProps } from "@chakra-ui/react";
import type { AvatarProps } from "@/components/data-display/Avatar";
import type { RiderPresenceProps } from "@/components/data-display/RiderPresence";

export interface RiderCardProps extends Omit<FlexProps, "children"> {
  /** The rider's display name. */
  name: string;
  /** Avatar image URL — falls back to initials, same as `Avatar`. */
  avatarSrc?: string;
  /** e.g. `"Freeride"`, `"Big Air"` — the guide's §26 "Freeride · Intermediate" line, first half. */
  discipline?: string;
  /** e.g. `"Intermediate"`, `"Advanced"` — second half of that line. */
  skillLevel?: string;
  /** The rider's presence — rendered as a `RiderPresence` pill. Omit for a row with no presence indicator. */
  presence?: Pick<RiderPresenceProps, "status" | "time">;
  /** Avatar size.
   * @default "md"
   */
  avatarSize?: AvatarProps["size"];
}
