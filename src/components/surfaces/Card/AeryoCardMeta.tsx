import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@/components/typography/Text";
import { useAeryoCardContext } from "./internal/AeryoCardContext";
import type { AeryoCardMetaProps } from "./AeryoCard.types";

/**
 * A single labeled metric (e.g. "18 kt" / "Wind Speed", "4.8" / "Rating",
 * "12 km" / "Distance"). Purely presentational — no unit formatting or
 * data-fetching logic. Defaults its text size to the enclosing card's own
 * `size` (via context); pass `size` explicitly to override.
 */
export const AeryoCardMeta = React.forwardRef<
  HTMLDivElement,
  AeryoCardMetaProps
>(function AeryoCardMeta(props, ref) {
  const { icon, label, value, size, ...rest } = props;
  const context = useAeryoCardContext();
  const effectiveSize = size ?? context.size;

  if (context.loading) {
    return (
      <Flex ref={ref} align="center" gap="2" {...rest}>
        {icon && <Skeleton boxSize="4" borderRadius="full" />}
        <SkeletonText noOfLines={1} rootProps={{ width: "16" }} />
      </Flex>
    );
  }

  return (
    <Flex ref={ref} align="center" gap="2" {...rest}>
      {icon}
      {/* `tabular-nums` — this slot is always a metric ("18 kt", "4.8",
          "12 km" per this component's own doc comment), and digits at a
          fixed width stop a mixed-width readout from jittering as it
          updates (critique-flagged §11 numeral-legibility gap). Scoped to
          this component, not promoted to `body`/`caption` generally,
          since most text in those variants isn't numeric. */}
      <Text
        variant={effectiveSize === "sm" ? "caption" : "body"}
        fontWeight="semibold"
        fontVariantNumeric="tabular-nums"
      >
        {value}
      </Text>
      <Text variant="caption" color="fg.muted">
        {label}
      </Text>
    </Flex>
  );
});
