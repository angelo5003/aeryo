"use client";

import type React from "react";
import CreateAccountForm from "@/app/ui/pages/account/CreateAccountForm/CreateAccountForm";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/data-display/Drawer";

export type AccountBottomSheetProps = {
  open: boolean;
};

const AccountBottomSheet: React.FC<AccountBottomSheetProps> = ({ open }) => {
  return (
    <Drawer
      open={open}
      placement="bottom"
      size="full"
      closeOnEscape={false}
      closeOnInteractOutside={false}
      onOpenChange={() => {}}
      // Ark UI's dialog focus-trap otherwise auto-focuses the first
      // tabbable element (the Email input) the instant this sheet opens,
      // popping the keyboard open mid-slide-in. Per the web-interface
      // guidelines, autoFocus on an input is "avoid on mobile" — this is a
      // 100%-mobile app, so let the user tap in deliberately instead.
      // `() => null` skips auto-focusing any descendant; focus lands on
      // the dialog content itself, the standard WAI-ARIA-safe default.
      initialFocusEl={() => null}
    >
      <DrawerContent padding="8">
        <DrawerHeader>
          <DrawerTitle fontSize="2xl" fontWeight="bold" color="fg">
            AERYO
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <CreateAccountForm />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountBottomSheet;
