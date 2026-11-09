import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  VisuallyHidden,
} from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@/components/typography/Text";
import type { NotificationRowProps } from "./NotificationRow.types";

/**
 * One row in the notification list: icon tile, title, message, time, an
 * unread dot and optional action buttons.
 *
 * It is a plain row, not a card, so it can sit inside a card such as
 * `SettingsListCard` or on its own.
 *
 * Passing `href` or `onClick` makes the whole row tappable with an
 * invisible full-size link or button laid over it. This is the same
 * approach as `AeryoCard` (`../Card/AeryoCard.tsx`). The `actions` area has
 * its own stacking order, so buttons inside it keep working on their own.
 */
export const NotificationRow = React.forwardRef<
  HTMLDivElement,
  NotificationRowProps
>(function NotificationRow(props, ref) {
  const {
    icon,
    title,
    message,
    time,
    unread = false,
    href,
    onClick,
    actions,
    ...rest
  } = props;

  const isInteractive = Boolean(href || onClick);

  return (
    <LinkBox ref={ref} asChild>
      <Flex gap="4" paddingX="4" paddingY="5" alignItems="flex-start" {...rest}>
        <Flex
          flexShrink={0}
          width="11"
          height="11"
          borderRadius="xl"
          alignItems="center"
          justifyContent="center"
          bg="bg.muted"
          color="accent.solid"
          fontSize="xl"
          aria-hidden="true"
        >
          {icon}
        </Flex>

        <Flex direction="column" flex="1" minWidth="0" gap="1">
          <Flex alignItems="baseline" justifyContent="space-between" gap="3">
            <Text
              variant="body"
              fontWeight={unread ? "bold" : "semibold"}
              minWidth="0"
            >
              {isInteractive ? (
                <LinkOverlay
                  as={href ? "a" : "button"}
                  type={href ? undefined : "button"}
                  href={href}
                  onClick={onClick}
                  textAlign="start"
                >
                  {title}
                </LinkOverlay>
              ) : (
                title
              )}
            </Text>
            <Flex alignItems="center" gap="2" flexShrink={0}>
              <Text variant="caption" color="fg.muted">
                {time}
              </Text>
              {unread && (
                <>
                  <Box
                    width="2"
                    height="2"
                    borderRadius="full"
                    bg="accent.solid"
                    aria-hidden="true"
                  />
                  <VisuallyHidden>Unread</VisuallyHidden>
                </>
              )}
            </Flex>
          </Flex>

          {message && (
            <Text variant="caption" color="fg.muted">
              {message}
            </Text>
          )}

          {actions && (
            <Flex gap="3" marginTop="3" position="relative" zIndex="1">
              {actions}
            </Flex>
          )}
        </Flex>
      </Flex>
    </LinkBox>
  );
});
