"use client";

import type { FC } from "react";
import { Avatar } from "@/components/data-display/Avatar/Avatar";
import { Stack } from "@/components/primitives/Stack/Stack";
import { AeryoCard } from "@/components/surfaces/Card";
import { Text } from "@/components/typography/Text";

const SettingsPage: FC = () => {
  return (
    <Stack as="ul" gap="4" align="center" justify="center" p="4">
      <AeryoCard
        clickable={false}
        layout="horizontal"
        w="100%"
        selected={false}
        size="md"
        variant="default"
        borderRadius="xl"
        p="4"
      >
        <Stack flexDirection="row" gap="4" align="center">
          <Avatar size="lg" name="John Doe" outline="1px solid red" />
          <Stack flexDirection="column" gap="1">
            <Text>John Doe</Text>
            <Text as="p" fontSize="xs">
              john.doe@example.com
            </Text>
          </Stack>
        </Stack>
      </AeryoCard>
    </Stack>
  );
};

export default SettingsPage;
