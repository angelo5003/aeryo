import { Box, Flex, Stack } from "@chakra-ui/react";
import * as React from "react";
import { LuUsers } from "react-icons/lu";
import { Text } from "@/components/typography/Text";
import type { SpotRiderCountProps } from "./SpotRiderCount.types";

/**
 * A spot's live rider count — guide §5/§26 "🟢 14 riding / 👥 6 planning"
 * wireframe. Purely presentational: pass the two numbers, no polling or
 * data-fetching logic here. The riding count uses a small `rider.onwater`
 * presence dot instead of an emoji; planning uses `LuUsers`.
 */
export const SpotRiderCount = React.forwardRef<
  HTMLDivElement,
  SpotRiderCountProps
>(function SpotRiderCount(props, ref) {
  const { riding, planning, gap = "1", ...rest } = props;

  return (
    <Stack ref={ref} gap={gap} {...rest}>
      <Flex align="center" gap="2">
        <Box boxSize="2.5" borderRadius="full" bg="rider.onwater" />
        <Text variant="body" fontWeight="semibold">
          {riding} riding
        </Text>
      </Flex>
      {planning !== undefined && (
        <Flex align="center" gap="2">
          <LuUsers />
          <Text variant="body" color="fg.muted">
            {planning} planning
          </Text>
        </Flex>
      )}
    </Stack>
  );
});
