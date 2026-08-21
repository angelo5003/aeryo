import type {
  CardRootProps,
  FlexProps,
  HTMLChakraProps,
  StackProps,
  WrapProps,
} from "@chakra-ui/react";
import type * as React from "react";

/**
 * Visual treatments. `elevated`/`outlined` map onto Chakra's own Card
 * recipe variants (`elevated`/`outline`); `default`/`filled`/`interactive`
 * are supplied locally (see `internal/cardVariantStyles.ts`) since
 * Chakra's stock Card recipe doesn't ship them. `interactive` is a purely
 * visual affordance (hover/active feedback) — independent of the
 * `clickable`/`href` behavior props below. A card can be visually
 * `interactive` without navigating anywhere, or `clickable`/`href` with
 * any other variant.
 */
export type AeryoCardVariant =
  "default" | "elevated" | "outlined" | "filled" | "interactive";

/** Sizes. Passed straight through to Chakra Card's own `size` recipe. */
export type AeryoCardSize = "sm" | "md" | "lg";

/**
 * `vertical` stacks children in authored order. `horizontal` pulls
 * `AeryoCardMedia` out of the authored children and renders it as a
 * fixed-width column beside an auto-generated column wrapping everything
 * else — see `AeryoCard.tsx`'s `splitMediaChild`.
 */
export type AeryoCardLayout = "vertical" | "horizontal";

/**
 * Shared by `AeryoCardBadges`/`AeryoCardActions`: `static` renders inline
 * wherever composed; `overlay-top-left`/`overlay-top-right` absolutely
 * position against the nearest `AeryoCardMedia` (which establishes
 * `position: relative`).
 */
export type AeryoCardOverlayPosition =
  "static" | "overlay-top-left" | "overlay-top-right";

export interface AeryoCardOwnProps {
  /**
   * Visual treatment.
   * @default "default"
   */
  variant?: AeryoCardVariant;
  /**
   * Size — controls padding (via Chakra Card's own size recipe) and is
   * read by `AeryoCardHeader` to size its `Heading`/`Text` slots.
   * @default "md"
   */
  size?: AeryoCardSize;
  /**
   * Stacks children vertically, or splits `AeryoCardMedia` into its own
   * column beside the rest.
   * @default "vertical"
   */
  layout?: AeryoCardLayout;
  /** Adds a selected visual treatment and `aria-selected`. */
  selected?: boolean;
  /**
   * Dims the card, sets `aria-disabled`, and blocks the card's own
   * click/navigation. Does **not** reach into arbitrary children to
   * disable them individually — that stays the consumer's responsibility.
   */
  disabled?: boolean;
  /**
   * Every subcomponent renders its own skeleton shape (sized from its own
   * already-known props) instead of real content — see each
   * subcomponent's doc comment.
   */
  loading?: boolean;
}

/**
 * Interactive-mode props, kept as a discriminated union so TypeScript
 * enforces an accessible name for the invisible full-bleed control
 * whenever the card is actually clickable/navigable — the same
 * requirement `IconButtonProps["aria-label"]` enforces for icon-only
 * buttons, applied here because a clickable card has no visible text of
 * its own either.
 */
export type AeryoCardInteractionProps =
  | {
      clickable?: false;
      href?: undefined;
      onClick?: undefined;
      "aria-label"?: string;
    }
  | {
      /** Makes the whole card one accessible click target (button semantics), without navigation. */
      clickable: true;
      href?: undefined;
      onClick?: (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
      ) => void;
      /** Required: the overlay control has no visible text of its own. */
      "aria-label": string;
    }
  | {
      /** Makes the whole card one accessible navigation target (link semantics). Implies `clickable`. */
      clickable?: boolean;
      href: string;
      onClick?: (
        event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
      ) => void;
      /** Required: the overlay control has no visible text of its own. */
      "aria-label": string;
    };

export type AeryoCardProps = AeryoCardOwnProps &
  AeryoCardInteractionProps &
  Omit<
    CardRootProps,
    "size" | "variant" | "onClick" | "aria-label" | keyof AeryoCardOwnProps
  >;

export interface AeryoCardHeaderProps extends Omit<
  HTMLChakraProps<"div">,
  "title"
> {
  /** Small text rendered above `title`. */
  overline?: React.ReactNode;
  /** The header's main heading. */
  title?: React.ReactNode;
  /** Muted text rendered below `title`. */
  subtitle?: React.ReactNode;
  /** Leading icon, rendered before the title/subtitle stack. */
  icon?: React.ReactNode;
  /** Trailing slot, typically an `AeryoCardActions`. */
  actions?: React.ReactNode;
}

export interface AeryoCardBodyProps extends HTMLChakraProps<"div"> {
  children?: React.ReactNode;
}

export interface AeryoCardFooterProps extends HTMLChakraProps<"div"> {
  /**
   * How footer content is distributed.
   * @default "between"
   */
  justify?: "start" | "end" | "between";
  children?: React.ReactNode;
}

/** Named aspect ratios `AeryoCardMedia` accepts — see `internal/aspectRatios.ts`. */
export type AeryoCardAspectRatio = "square" | "portrait" | "landscape" | "wide";

export interface AeryoCardMediaProps extends Omit<
  HTMLChakraProps<"div">,
  "as"
> {
  /**
   * @default "landscape"
   */
  aspectRatio?: AeryoCardAspectRatio;
  /**
   * Renders `img`/`video` directly (with the rest of the props passed
   * through to it, e.g. `src`/`alt`). Omit to render `children` as
   * custom content instead. Not Chakra's own polymorphic `as` (which
   * would swap the *root* element) — this only selects the media element
   * rendered *inside* the `AspectRatio` wrapper.
   */
  as?: "img" | "video";
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

export interface AeryoCardMetaProps extends FlexProps {
  /** Leading icon (e.g. a wind/rating glyph). */
  icon?: React.ReactNode;
  /** What this metric is (e.g. "Wind Speed"). */
  label: React.ReactNode;
  /** The metric's value (e.g. "18 kt"). */
  value: React.ReactNode;
  /** Defaults to the card's own `size` via context. */
  size?: AeryoCardSize;
}

export interface AeryoCardBadgesProps extends Omit<WrapProps, "position"> {
  /**
   * `static` renders inline wherever composed; `overlay-top-left`/
   * `overlay-top-right` absolutely position against the nearest
   * `AeryoCardMedia`. Not Chakra's own `position` CSS style prop.
   * @default "static"
   */
  position?: AeryoCardOverlayPosition;
  children?: React.ReactNode;
}

export interface AeryoCardActionsProps extends Omit<StackProps, "position"> {
  /**
   * `static` renders inline wherever composed; `overlay-top-left`/
   * `overlay-top-right` absolutely position against the nearest
   * `AeryoCardMedia`. Not Chakra's own `position` CSS style prop.
   * @default "static"
   */
  position?: AeryoCardOverlayPosition;
  children?: React.ReactNode;
}
