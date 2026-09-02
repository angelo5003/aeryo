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
