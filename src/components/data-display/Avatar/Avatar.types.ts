import type { AvatarRootProps as ChakraAvatarRootProps } from "@chakra-ui/react";
import type * as React from "react";

/**
 * Sizes. A subset of Chakra's own Avatar recipe sizes (`2xs`/`full`/`2xl`
 * are intentionally out of scope, matching Button's narrowed size
 * subset).
 */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Presence status. No default — omit `status` for an avatar with no
 * presence indicator at all (most avatars).
 */
export type AvatarStatus = "online" | "offline";

export interface AvatarProps extends Omit<ChakraAvatarRootProps, "size"> {
  /** Image URL. Falls back to initials (from `name`), then a generic icon, if it fails to load or is omitted — see `Avatar.tsx`. */
  src?: string;
  /** The person/entity's name — derives initials for the fallback, and the image's `alt` text. */
  name?: string;
  /** Custom fallback icon, shown instead of initials when there's no image and no `name`. Omit for Chakra's own generic person icon. */
  icon?: React.ReactNode;
  /**
   * Size.
   * @default "md"
   */
  size?: AvatarSize;
  /** Presence status — renders a small dot indicator. Omit for none. */
  status?: AvatarStatus;
  /** Renders a small verified-checkmark badge. */
  verified?: boolean;
}
