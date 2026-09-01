import type React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/data-display/Drawer";
import { Text } from "@/components/typography/Text";

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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Bottom-placed drawer content.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountBottomSheet;
