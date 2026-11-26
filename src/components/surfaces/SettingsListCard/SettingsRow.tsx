import { Box, Flex, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Text } from "@/components/typography/Text";
import type { SettingsRowProps } from "./SettingsRow.types";

/**
 * One row inside a `SettingsListCard`: an optional `icon` and the setting's `title` on the left,
 * its current `value` and an arrow on the right.
 *
 * It renders an `li`, so it belongs inside a `SettingsListCard` (a `ul`).
 *
 * A settings row always opens another screen, so it is always a link
 * (`next/link`, same approach as `../../typography/Link/Link.tsx`) and
 * always shows the arrow. The whole row is the tap target and is at least
 * 3.5rem (56px) high, so wet hands and gloves can hit it. Pressing it shows
 * a `bg.muted` background, because there is no hover on a phone.
 */
export const SettingsRow = (props: SettingsRowProps) => {
  const { title, icon, value, href, ...rest } = props;

  return (
    <Box as="li" listStyleType="none">
      <Flex
        asChild
        minHeight="14"
        alignItems="center"
        justifyContent="space-between"
        gap="3"
        paddingX="4"
        textAlign="start"
        _active={{ bg: "bg.muted" }}
        {...rest}
      >
        <NextLink href={href}>
          <Flex alignItems="center" gap="3" minWidth={0}>
            {icon && (
              <Flex
                alignItems="center"
                justifyContent="center"
                boxSize="10"
                borderRadius="lg"
                bg="iconTile.bg"
                color="iconTile.fg"
                flexShrink={0}
              >
                <Icon as={icon} />
              </Flex>
            )}
            <Text
              variant="body"
              fontWeight="semibold"
              lineHeight="normal"
              color="fg"
            >
              {title}
            </Text>
          </Flex>
          <Flex alignItems="center" gap="2" flexShrink={0} color="fg.muted">
            {value && <Text variant="caption">{value}</Text>}
            <LuChevronRight aria-hidden="true" />
          </Flex>
        </NextLink>
      </Flex>
    </Box>
  );
};
