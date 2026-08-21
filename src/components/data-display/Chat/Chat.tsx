import { Card, Flex, Stack } from "@chakra-ui/react";
import * as React from "react";
import { Avatar } from "@/components/data-display/Avatar";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type {
  ChatHeaderProps,
  ChatMessageProps,
  ChatMessagesProps,
  ChatProps,
} from "./Chat.types";

/**
 * AERYO's spot/session chat — guide §5/§26 "Spot chat" wireframe. Static
 * display only for now: `Chat`/`ChatHeader`/`ChatMessages`/`ChatMessage`
 * render a message list, but there is deliberately no composer/input
 * subcomponent here yet — sending a message needs a real `Input`
 * (guide §31 "Forms" category, not yet built) and Supabase Realtime
 * wiring (guide §20/§3), both out of scope for this static pass (see
 * `docs/superpowers/plans/2026-08-21-page-build-roadmap.md` Phase 1/2).
 *
 * A thin `Card.Root` composition — Chakra is an implementation detail
 * consumers never import directly.
 */
export const Chat = React.forwardRef<HTMLDivElement, ChatProps>(
  function Chat(props, ref) {
    return <Card.Root ref={ref} {...props} />;
  },
);

/** The chat's title bar, e.g. a spot or session name. */
export const ChatHeader = React.forwardRef<HTMLDivElement, ChatHeaderProps>(
  function ChatHeader(props, ref) {
    const { title, ...rest } = props;
    return (
      <Card.Header ref={ref} {...rest}>
        <Heading variant="title">{title}</Heading>
      </Card.Header>
    );
  },
);

/** The scrollable message list — renders `ChatMessage` children in order. */
export const ChatMessages = React.forwardRef<
  HTMLDivElement,
  ChatMessagesProps
>(function ChatMessages(props, ref) {
  return (
    <Card.Body
      ref={ref}
      display="flex"
      flexDirection="column"
      gap="4"
      maxH="sm"
      overflowY="auto"
      {...props}
    />
  );
});

/** A single chat message: author avatar, name, and text. */
export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  function ChatMessage(props, ref) {
    const { author, avatarSrc, children, ...rest } = props;

    return (
      <Flex ref={ref} gap="3" {...rest}>
        <Avatar src={avatarSrc} name={author} size="sm" />
        <Stack gap="0.5" flex="1" minWidth="0">
          <Text variant="caption" fontWeight="semibold">
            {author}
          </Text>
          <Text variant="body">{children}</Text>
        </Stack>
      </Flex>
    );
  },
);
