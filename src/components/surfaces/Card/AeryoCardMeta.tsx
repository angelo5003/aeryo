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
      <Text
        variant={effectiveSize === "sm" ? "caption" : "body"}
        fontWeight="semibold"
      >
        {value}
      </Text>
      <Text variant="caption" color="fg.muted">
        {label}
      </Text>
    </Flex>
  );
});
