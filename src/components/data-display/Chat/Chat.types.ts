import type {
  CardRootProps,
  CardBodyProps,
  FlexProps,
  HTMLChakraProps,
} from "@chakra-ui/react";
import type * as React from "react";

export interface ChatProps extends CardRootProps {
  children?: React.ReactNode;
}

export interface ChatHeaderProps extends Omit<
  HTMLChakraProps<"div">,
  "title"
> {
  /** The chat's title, e.g. a spot name (guide §5 "# IJmuiden" wireframe). */
  title: React.ReactNode;
}

export interface ChatMessagesProps extends CardBodyProps {
  children?: React.ReactNode;
}

export interface ChatMessageProps extends Omit<FlexProps, "children"> {
  /** The message author's display name. */
  author: string;
  /** Author avatar image URL — falls back to initials, same as `Avatar`. */
  avatarSrc?: string;
  /** The message text. */
  children: React.ReactNode;
}
