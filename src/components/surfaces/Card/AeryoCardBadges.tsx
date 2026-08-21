import { Wrap } from "@chakra-ui/react";
import * as React from "react";
import type { AeryoCardBadgesProps } from "./AeryoCard.types";

/**
 * A positioning wrapper around one or more existing `Badge` instances —
 * it does not render badge visuals itself (compose real `Badge` elements
 * as `children`). `position="static"` (default) renders inline wherever
 * composed; `overlay-top-left`/`overlay-top-right` absolutely position
 * against the nearest `AeryoCardMedia`. Always `position: relative` +
 * `zIndex: 1`, so a closable `Tag`'s close control stays clickable even
 * when the enclosing card is itself `clickable`/`href` (see
 * `AeryoCard.tsx`'s overlay control).
 */
export const AeryoCardBadges = React.forwardRef<
  HTMLDivElement,
  AeryoCardBadgesProps
>(function AeryoCardBadges(props, ref) {
  const { position = "static", children, ...rest } = props;

  const overlayProps =
    position === "static"
      ? {}
      : {
          position: "absolute" as const,
          top: "3",
          ...(position === "overlay-top-left" ? { left: "3" } : { right: "3" }),
        };

  return (
    <Wrap
      ref={ref}
      gap="2"
      position="relative"
      zIndex="1"
      {...overlayProps}
      {...rest}
    >
      {children}
    </Wrap>
  );
});
