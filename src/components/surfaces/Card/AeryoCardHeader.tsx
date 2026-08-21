import { Card, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import * as React from "react";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { useAeryoCardContext } from "./internal/AeryoCardContext";
import type { AeryoCardHeaderProps, AeryoCardSize } from "./AeryoCard.types";

/** Maps the card's own `size` onto `Heading`'s semantic `variant`. */
const TITLE_VARIANT: Record<AeryoCardSize, "title" | "heading"> = {
  sm: "title",
  md: "title",
  lg: "heading",
};

/**
 * A card's header slot: an optional leading `icon`, an `overline` +
 * `title` + `subtitle` text stack (built from the existing `Heading`/
 * `Text` components, sized from the card's own `size` via context), and a
 * trailing `actions` slot (typically an `AeryoCardActions`).
 *
 * While the card is `loading`, renders skeleton shapes matching whichever
 * slots were actually passed (e.g. no subtitle line if `subtitle` wasn't
 * given) instead of the real content.
 */
export const AeryoCardHeader = React.forwardRef<
  HTMLDivElement,
  AeryoCardHeaderProps
>(function AeryoCardHeader(props, ref) {
  const { overline, title, subtitle, icon, actions, ...rest } = props;
  const { size, loading } = useAeryoCardContext();

  return (
    <Card.Header ref={ref} {...rest}>
      <Flex align="center" gap="3">
        {icon &&
          (loading ? (
            <Skeleton boxSize="8" borderRadius="full" flexShrink="0" />
          ) : (
            <Flex flexShrink="0">{icon}</Flex>
          ))}
        <Flex direction="column" gap="1" flex="1" minWidth="0">
          {loading ? (
            <SkeletonText
              noOfLines={subtitle ? 2 : 1}
              rootProps={{ width: "70%" }}
            />
          ) : (
            <>
              {overline && (
                <Text variant="label" color="fg.muted">
                  {overline}
                </Text>
              )}
              {title && (
                <Heading variant={TITLE_VARIANT[size]}>{title}</Heading>
              )}
              {subtitle && (
                <Text variant="caption" color="fg.muted">
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </Flex>
        {actions &&
          (loading ? (
            <Skeleton boxSize="8" borderRadius="md" flexShrink="0" />
          ) : (
            actions
          ))}
      </Flex>
    </Card.Header>
  );
});
