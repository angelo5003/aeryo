import { Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Text } from "@/components/typography/Text";
import type { SettingsRowProps } from "./SettingsRow.types";

/**
 * One row inside a `SettingsListCard`: the setting's `title` on the left,
 * its current `value` and an optional arrow on the right.
 *
 * The whole row is the tap target and is always at least 3.5rem (56px)
 * high, so wet hands and gloves can hit it. With `href` it renders a
 * `next/link` anchor (same approach as `../../typography/Link/Link.tsx`);
 * without it, a button that calls `onClick`. Pressing it shows a
 * `bg.muted` background, because there is no hover on a phone.
 */
export const SettingsRow = (props: SettingsRowProps) => {
  const { title, value, href, onClick, showChevron = false, ...rest } = props;

  const rowContent = (
    <>
      <Text variant="body" fontWeight="semibold">
        {title}
      </Text>
      {(value || showChevron) && (
        <Flex alignItems="center" gap="2" flexShrink={0} color="fg.muted">
          {value && <Text variant="caption">{value}</Text>}
          {showChevron && <LuChevronRight aria-hidden="true" />}
        </Flex>
      )}
    </>
  );

  const rowStyles = {
    minHeight: "14",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "3",
    paddingX: "4",
    textAlign: "start",
    cursor: "pointer",
    _active: { bg: "bg.muted" },
  } as const;

  if (href !== undefined) {
    return (
      <Flex asChild {...rowStyles} {...rest}>
        <NextLink href={href} onClick={onClick}>
          {rowContent}
        </NextLink>
      </Flex>
    );
  }

  return (
    <Flex asChild {...rowStyles} {...rest}>
      <button type="button" onClick={onClick}>
        {rowContent}
      </button>
    </Flex>
  );
};
