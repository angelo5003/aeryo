import Link from "next/link";
import type { FC } from "react";
import { LuChevronRight } from "react-icons/lu";
import { routes } from "@/app/_routes/routes";
import { Avatar } from "@/components/data-display/Avatar/Avatar";
import { Stack } from "@/components/primitives/Stack/Stack";
import { AeryoCard } from "@/components/surfaces/Card";
import { Text } from "@/components/typography/Text";

const AccountCard: FC = () => {
  return (
    <AeryoCard
      asChild
      layout="horizontal"
      w="100%"
      selected={false}
      size="md"
      variant="default"
      borderRadius="xl"
      p="4"
      justifyContent="space-between"
      bgGradient="panel.accent"
      aria-label="Account"
      alignItems="center"
    >
      <Link href={routes.account.href}>
        <Stack
          flexDirection="row"
          gap="4"
          align="center"
          justify="space-between"
        >
          <Avatar
            size="lg"
            name="John Doe"
            color="fg"
            bgImage="avatar"
            border="1px solid"
            borderColor="photo.accent"
          />
          <Stack flexDirection="column" gap="1">
            <Text>John Doe</Text>
            <Text as="p" fontSize="xs" variant="body">
              john.doe@example.com
            </Text>
          </Stack>
        </Stack>
        <LuChevronRight />
      </Link>
    </AeryoCard>
  );
};

export default AccountCard;
