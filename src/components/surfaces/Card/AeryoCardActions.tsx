import { HStack } from "@chakra-ui/react";
import * as React from "react";
import type { AeryoCardActionsProps } from "./AeryoCard.types";

/**
 * A positioning wrapper around one or more existing `Button`/`IconButton`
 * instances (Save, Share, Open, View Forecast, …) — it does not render
 * action visuals itself. `position="static"` (default) renders inline
 * wherever composed; `overlay-top-left`/`overlay-top-right` absolutely
 * position against the nearest `AeryoCardMedia` (e.g. a Save icon button
 * pinned to a photo). Always `position: relative` + `zIndex: 1`, so its
 * real `<button>`/`<a>` children stay independently clickable even when
 * the enclosing card is itself `clickable`/`href` (see `AeryoCard.tsx`'s
 * overlay control, which would otherwise paint above plain in-flow
 * content).
 */
export const AeryoCardActions = React.forwardRef<
  HTMLDivElement,
  AeryoCardActionsProps
>(function AeryoCardActions(props, ref) {
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
    <HStack
      ref={ref}
      gap="2"
      position="relative"
      zIndex="1"
      {...overlayProps}
      {...rest}
    >
      {children}
    </HStack>
  );
});
