"use client";

import type { FC } from "react";
import { Stack } from "@/components/primitives/Stack/Stack";
import SettingsList from "./components/SettingsList/SettingsList";
import { AccountCard } from "./index";

const SettingsPage: FC = () => {
  return (
    <Stack gap="4" align="stretch" justify="center" p="4">
      <AccountCard />
      <SettingsList />
    </Stack>
  );
};

export default SettingsPage;
