import {
  Box,
  Skeleton as ChakraSkeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import type { AvatarSize } from "@/components/data-display/Avatar";
import type { AeryoCardSize } from "@/components/surfaces/Card";
import type { SkeletonProps } from "./Skeleton.types";

/** `avatar` variant's diameter per size — mirrors `Avatar`'s own scale (`src/components/data-display/Avatar/Avatar.tsx`'s underlying Chakra recipe), so a standalone avatar-shaped placeholder matches the real `Avatar` it stands in for. */
const AVATAR_BOX_SIZE: Record<AvatarSize, string> = {
  xs: "8",
  sm: "9",
  md: "10",
  lg: "11",
  xl: "12",
};

/** `card` variant's overall width per size — reuses `AeryoCard`'s own named size scale for a consistent footprint, without coupling to `AeryoCard` itself. */
const CARD_WIDTH: Record<AeryoCardSize, string> = {
  sm: "xs",
  md: "sm",
  lg: "md",
};

/**
 * AERYO's loading placeholder — a thin wrapper around Chakra UI's
 * `Skeleton`/`SkeletonText`/`SkeletonCircle`. Chakra is an implementation
 * detail consumers never import directly. `variant` selects one of three
 * common pre-shaped placeholders (`text`/`avatar`/`card`), or `custom` to
 * apply the same shimmer/pulse treatment to arbitrary `children`, sized
 * by whatever they/the passed-through style props give it.
 *
 * Distinct from `AeryoCard`'s own `loading` prop
 * (`src/components/surfaces/Card/AeryoCard.tsx`), which shapes each of
 * *its own* slots from props that component already knows (aspect
 * ratio, line counts, …) — this is a standalone primitive for loading
 * states anywhere else in the app (a profile page, a forecast list, …),
 * not coupled to any other component's internals.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const {
      variant = "custom",
      lines = 3,
      avatarSize = "md",
      cardSize = "md",
      children,
      ...rest
    } = props;

    if (variant === "text") {
      return <SkeletonText ref={ref} noOfLines={lines} {...rest} />;
    }

    if (variant === "avatar") {
      return (
        <SkeletonCircle
          ref={ref}
          size={AVATAR_BOX_SIZE[avatarSize]}
          {...rest}
        />
      );
    }

    if (variant === "card") {
      return (
        <Box ref={ref} width={CARD_WIDTH[cardSize]} {...rest}>
          <Stack gap="3">
            <ChakraSkeleton borderRadius="xl" aspectRatio={4 / 3} />
            <SkeletonText noOfLines={2} />
          </Stack>
        </Box>
      );
    }

    return (
      <ChakraSkeleton ref={ref} {...rest}>
        {children}
      </ChakraSkeleton>
    );
  },
);
