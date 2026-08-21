import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { RiderCard } from "@/components/surfaces/RiderCard";
import { Text } from "@/components/typography/Text";
import type { RiderListProps } from "./RiderList.types";

/**
 * A spot's rider list — guide §26 "Rider list" wireframe: an optional
 * count heading followed by one `RiderCard` per rider. A thin
 * `RiderCard` composition, not a new primitive; renders `empty` (e.g. an
 * `EmptyState`) instead of the list when there are no riders.
 */
export const RiderList = React.forwardRef<HTMLDivElement, RiderListProps>(
  function RiderList(props, ref) {
    const { riders, heading, empty, gap = "4", ...rest } = props;

    if (riders.length === 0 && empty) {
      return (
        <Stack ref={ref} gap={gap} {...rest}>
          {empty}
        </Stack>
      );
    }

    return (
      <Stack ref={ref} gap={gap} {...rest}>
        {heading && (
          <Text variant="label" color="fg.muted">
            {heading}
          </Text>
        )}
        {riders.map((rider, index) => {
          const { id, ...riderCardProps } = rider;
          return <RiderCard key={id ?? `${rider.name}-${index}`} {...riderCardProps} />;
        })}
      </Stack>
    );
  },
);
