import { Card, SkeletonText } from "@chakra-ui/react";
import * as React from "react";
import { useAeryoCardContext } from "./internal/AeryoCardContext";
import type { AeryoCardBodyProps } from "./AeryoCard.types";

/** Caps the guessed skeleton line count so very long real content doesn't produce an enormous placeholder. */
const MAX_LOADING_LINES = 3;

/**
 * A card's body slot — deliberately unopinionated: descriptions,
 * `AeryoCardMeta`, `AeryoCardBadges`, statistics, or any rich content all
 * just pass through as `children` inside Chakra's `Card.Body`.
 *
 * While the card is `loading`, renders a handful of `SkeletonText` lines
 * (roughly matching how many children were passed) instead of the real
 * content.
 */
export const AeryoCardBody = React.forwardRef<
  HTMLDivElement,
  AeryoCardBodyProps
>(function AeryoCardBody(props, ref) {
  const { children, ...rest } = props;
  const { loading } = useAeryoCardContext();

  const lineCount = Math.max(
    1,
    Math.min(MAX_LOADING_LINES, React.Children.count(children)),
  );

  return (
    <Card.Body ref={ref} {...rest}>
      {loading ? <SkeletonText noOfLines={lineCount} /> : children}
    </Card.Body>
  );
});
