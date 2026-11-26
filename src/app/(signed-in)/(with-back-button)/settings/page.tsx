"use client";

import type { FC } from "react";
import { LuLogOut, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { Stack } from "@/components/primitives/Stack/Stack";
import SettingsList from "./components/SettingsList/SettingsList";
import { AccountCard } from "./index";

const SettingsPage: FC = () => {
  return (
    <Stack gap="4" align="stretch" justify="center" p="4">
      <AccountCard />
      <SettingsList />
      <Stack gap="3" justify="center" p="4">
        <Button
          intent="secondary"
          onClick={() => {}}
          size="lg"
          variant="outline"
          iconLeft={<LuLogOut size={16} />}
          loading={false}
          borderRadius="xl"
          p="5"
          fontSize="md"
          bg="bg.panel"
          color="neutral.fg"
          alignItems="center"
          border="1px solid "
          borderColor="border.emphasized"
          fontWeight="800"
        >
          Sign out
        </Button>
        <Button
          intent="danger"
          onClick={() => {}}
          size="lg"
          variant="solid"
          iconLeft={<LuTrash2 size={16} />}
          loading={false}
          borderRadius="xl"
          p="5"
          fontSize="md"
          alignItems="center"
          fontWeight="800"
        >
          Delete account
        </Button>
      </Stack>
    </Stack>
  );
};

export default SettingsPage;
