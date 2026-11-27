import type { FC } from "react";
import { LuTriangleAlert, LuX } from "react-icons/lu";
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
import { Box } from "@/components/primitives/Box";
import { Icon } from "@/components/primitives/Icon/Icon";
import { Stack } from "@/components/primitives/Stack";

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
          <DrawerTitle>
            <Box
              display="inline-flex"
              bg="bg.error"
              color="fg.error"
              borderRadius="full"
              p="4"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={LuTriangleAlert} boxSize="6" />
            </Box>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="4">
            <DrawerTitle fontWeight="extrabold">
              Delete your account?
            </DrawerTitle>
            <Stack as="ul" gap="2">
              <Box as="li" iconLeft={<Icon as={LuX} color="danger.solid" />}>
                <Text variant="body" fontSize="sm" color="fg.emphasized">
                  42 sessions and your stats
                </Text>
              </Box>
              <Box as="li" iconLeft={<Icon as={LuX} color="danger.solid" />}>
                <Text variant="body" fontSize="sm" color="fg.emphasized">
                  9 saved spots
                </Text>
              </Box>
              <Box as="li" iconLeft={<Icon as={LuX} color="danger.solid" />}>
                <Text variant="body" fontSize="sm" color="fg.emphasized">
                  Your posts in Community
                </Text>
              </Box>
            </Stack>
          </Stack>
        </DrawerBody>
        <DrawerFooter
          gap="4"
          justifyContent="center"
          flexDirection="column"
          p="4"
          alignItems="center"
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
            w="full"
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
            w="full"
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteAccountBottomSheet;
