import { Card, Skeleton } from "@chakra-ui/react";
import * as React from "react";
import { useAeryoCardContext } from "./internal/AeryoCardContext";
import type { AeryoCardFooterProps } from "./AeryoCard.types";

const JUSTIFY_CONTENT = {
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
} as const;

/**
 * A card's footer slot — buttons, links, metadata, or actions, laid out
 * in a row via Chakra's `Card.Footer`. `justify` controls distribution.
 *
 * While the card is `loading`, renders one button-shaped `Skeleton` per
 * child instead of the real content.
 */
export const AeryoCardFooter = React.forwardRef<
  HTMLDivElement,
  AeryoCardFooterProps
>(function AeryoCardFooter(props, ref) {
  const { justify = "between", children, ...rest } = props;
  const { loading } = useAeryoCardContext();
  const childCount = Math.max(1, React.Children.count(children));

  return (
    <Card.Footer ref={ref} justifyContent={JUSTIFY_CONTENT[justify]} {...rest}>
      {loading
        ? Array.from({ length: childCount }, (_, index) => (
            <Skeleton key={index} height="8" width="20" borderRadius="md" />
          ))
        : children}
    </Card.Footer>
  );
});
