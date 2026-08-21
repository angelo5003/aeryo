import { Wrap } from "@chakra-ui/react";
import * as React from "react";
import { LuCalendarClock, LuUsers } from "react-icons/lu";
import {
  AeryoCard,
  AeryoCardBody,
  AeryoCardFooter,
  AeryoCardHeader,
  AeryoCardMeta,
} from "@/components/surfaces/Card";
import { deriveCardInteraction } from "@/components/surfaces/internal/deriveCardInteraction";
import type { SessionCardProps } from "./SessionCard.types";

/**
 * A planned session summary card — guide §8/§26 "Create session"/"Saturday
 * Session" examples. A curated `AeryoCard` composition (see
 * `AeryoCard.tsx`), not a new primitive: `spot`/`startTime` render as
 * `AeryoCardMeta` entries, `participants`/`maxParticipants` as another,
 * and `action` (typically a `Button`) in the footer.
 */
export const SessionCard = React.forwardRef<HTMLDivElement, SessionCardProps>(
  function SessionCard(props, ref) {
    const {
      title,
      spot,
      startTime,
      participants,
      maxParticipants,
      action,
      href,
      clickable,
      onClick,
      variant,
      size = "md",
      loading = false,
      ...rest
    } = props;

    const isInteractive = Boolean(href || clickable);
    const interaction = deriveCardInteraction({
      href,
      clickable,
      onClick,
      ariaLabel: `Open ${title}`,
    });

    const participantsValue =
      maxParticipants !== undefined
        ? `${participants} / ${maxParticipants} riders`
        : `${participants} riders`;

    return (
      <AeryoCard
        ref={ref}
        variant={variant ?? (isInteractive ? "interactive" : "default")}
        size={size}
        layout="vertical"
        loading={loading}
        maxW="sm"
        w="sm"
        {...rest}
        {...interaction}
      >
        <AeryoCardHeader overline={spot} title={title} />
        <AeryoCardBody>
          <Wrap gap="4">
            <AeryoCardMeta
              icon={<LuCalendarClock />}
              label="Starts"
              value={startTime}
            />
            <AeryoCardMeta
              icon={<LuUsers />}
              label="Riders"
              value={participantsValue}
            />
          </Wrap>
        </AeryoCardBody>
        {action && <AeryoCardFooter justify="end">{action}</AeryoCardFooter>}
      </AeryoCard>
    );
  },
);
