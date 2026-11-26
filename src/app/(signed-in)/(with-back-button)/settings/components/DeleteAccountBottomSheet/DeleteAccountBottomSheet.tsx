import type { FC } from "react";
import { LuLogOut, LuTrash2 } from "react-icons/lu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Text,
} from "@/components";
import { Button } from "@/components/actions/Button";

type DeleteAccountBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteAccountBottomSheet: FC<DeleteAccountBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer placement="bottom" open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Drawer content.</Text>
        </DrawerBody>
        <DrawerFooter
          gap="4"
          justifyContent="center"
          flexDirection="column"
          p="4"
        >
          <Button
            onClick={onClose}
            intent="danger"
            size="lg"
            variant="solid"
            loading={false}
            borderRadius="xl"
            p="5"
            fontSize="md"
            alignItems="center"
            fontWeight="800"
          >
            Delete account
          </Button>
          <Button
            onClick={onClose}
            intent="secondary"
            size="lg"
            variant="outline"
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
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteAccountBottomSheet;
