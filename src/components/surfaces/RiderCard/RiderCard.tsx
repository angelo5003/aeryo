import { Flex, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Avatar } from "@/components/data-display/Avatar";
import { RiderPresence } from "@/components/data-display/RiderPresence";
import { Text } from "@/components/typography/Text";
import type { RiderCardProps } from "./RiderCard.types";

/**
 * A single rider row for a spot's rider list — guide §26 "Rider list"
 * wireframe: avatar, name, `discipline · skillLevel`, and a presence
 * pill. A composition of `Avatar`/`RiderPresence`/`Text`, not a new
 * primitive — deliberately not built on `AeryoCard` since the wireframe
 * shows a plain row, not a bordered card.
 */
export const RiderCard = React.forwardRef<HTMLDivElement, RiderCardProps>(
  function RiderCard(props, ref) {
    const {
      name,
      avatarSrc,
      discipline,
      skillLevel,
      presence,
      avatarSize = "md",
      ...rest
    } = props;

    const meta = [discipline, skillLevel].filter(Boolean).join(" · ");

    return (
      <Flex ref={ref} align="center" gap="3" {...rest}>
        <Avatar src={avatarSrc} name={name} size={avatarSize} />
        <Stack gap="0" flex="1" minWidth="0">
          <Text variant="body" fontWeight="semibold">
            {name}
          </Text>
          {meta && (
            <Text variant="caption" color="fg.muted">
              {meta}
            </Text>
          )}
        </Stack>
        {presence && <RiderPresence {...presence} />}
      </Flex>
    );
  },
);
