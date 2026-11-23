"use client";

import type { FC } from "react";
import { Box } from "@/components/primitives/Box/Box";
import { Stack } from "@/components/primitives/Stack/Stack";
import SettingsList from "./components/SettingsList/SettingsList";
import { AccountCard } from "./index";

const SettingsPage: FC = () => {
  return (
    <Stack as="ul" gap="4" align="center" justify="center" p="4">
      <Box as="li" w="100%">
        <AccountCard />
        <SettingsList />
      </Box>
    </Stack>
  );
};

export default SettingsPage;
