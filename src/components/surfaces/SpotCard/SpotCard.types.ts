import type { HTMLChakraProps } from "@chakra-ui/react";
import type * as React from "react";
import type {
  AeryoCardSize,
  AeryoCardVariant,
} from "@/components/surfaces/Card";

export interface SpotCardOwnProps {
  /** The spot's name (e.g. "Tarifa"). Rendered as the card's title, and used to derive the accessible name when `href`/`clickable` is set. */
  name: string;
  /** Where it is (e.g. "Andalusia, Spain"). Rendered above the title. */
  region?: string;
  /** A short description of the conditions/access. */
  description?: string;
  /** Photo shown in the media slot. Omit to render a generic placeholder icon instead. */
  imageSrc?: string;
  imageAlt?: string;
  /** Pre-formatted (e.g. "18 kt") — this component does no unit conversion. */
  windSpeed?: string;
  /** Pre-formatted (e.g. "4.8"). */
  rating?: string;
  /** Status badges (e.g. `<Badge intent="info">Best Wind</Badge>`), pinned over the top-left of the photo. */
  badges?: React.ReactNode;
  /** Renders a Save icon button pinned over the top-right of the photo. */
  onSave?: () => void;
  /** Makes the whole card navigate here — see `AeryoCard`'s `href`. */
  href?: string;
  /** Makes the whole card one accessible click target without navigating — see `AeryoCard`'s `clickable`. */
  clickable?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  /**
   * Visual treatment.
   * @default "interactive" when `href`/`clickable` is set, otherwise "default"
   */
  variant?: AeryoCardVariant;
  /** @default "md" */
  size?: AeryoCardSize;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
}

/**
 * Extends Chakra style props (`maxW`, `w`, `m`, responsive props, …) so a
 * consumer dropping this into a grid/list can size or space it like any
 * other box — `SpotCard.tsx` defaults both `w` and `maxW` to `"sm"` when
 * the caller doesn't set them. Both, not just one: a card with no
 * image/description (or one that's `loading`, where every slot is a
 * width-100% skeleton) has no intrinsic content width, so a `maxW` cap
 * alone doesn't give it an actual width to resolve against — and in a
 * shrink-to-fit ancestor (e.g. Storybook's `layout: "centered"`), even
 * `w="full"` has nothing definite to be 100% *of*, and collapses to
 * near-zero. A fixed default `w` fixes that in any context; a consumer
 * placing this in a real responsive grid can still override just `w`
 * (e.g. `w="full"`) while keeping the default `maxW` as a cap.
 */
export type SpotCardProps = SpotCardOwnProps &
  Omit<HTMLChakraProps<"div">, keyof SpotCardOwnProps>;
