"use client";

import { type FC, useState } from "react";
import { LuLogOut, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { Stack } from "@/components/primitives/Stack/Stack";
import { Text } from "@/components/typography/Text/Text";
import SettingsList from "./components/SettingsList/SettingsList";
import { AccountCard, DeleteAccountBottomSheet } from "./index";

const SettingsPage: FC = () => {
  const [isDeleteAccountBottomSheetOpen, setIsDeleteAccountBottomSheetOpen] =
    useState(false);

  const handleDeleteAccount = () => {
    setIsDeleteAccountBottomSheetOpen(true);
  };

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
        <Stack
          as="section"
          bgGradient="panel.danger"
          borderRadius="xl"
          p="4"
          border="1px solid"
          borderColor="border.error"
        >
          <Stack gap="2" flexDirection="column">
            <Text
              as="h2"
              fontSize="md"
              fontWeight="extrabold"
              variant="body"
              color="fg.error"
            >
              Delete your account
            </Text>
            <Text fontSize="sm" variant="caption" color="fg.emphasized">
              This permanently deletes your account and all your data.
            </Text>
          </Stack>
          <Button
            intent="danger"
            onClick={handleDeleteAccount}
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
        {isDeleteAccountBottomSheetOpen && (
          <DeleteAccountBottomSheet
            isOpen={isDeleteAccountBottomSheetOpen}
            onClose={() => setIsDeleteAccountBottomSheetOpen(false)}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default SettingsPage;
