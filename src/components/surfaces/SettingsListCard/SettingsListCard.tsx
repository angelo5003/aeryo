import { Box } from "@chakra-ui/react";
import * as React from "react";
import { Text } from "@/components/typography/Text";
import { AeryoCard } from "../Card/AeryoCard";
import type { SettingsListCardProps } from "./SettingsListCard.types";

/**
 * AERYO's settings list card — one card that holds a stack of settings
 * rows (Riding preferences, My gear, Notifications, …). Built on
 * `AeryoCard variant="default"` (`bg.panel`, 1px `border.muted`, radius
 * `xl`), so it looks like every other card.
 *
 * It only supplies the container: no inner padding, a `border` divider
 * between neighbouring children, and an optional small `label` above.
 * Each row is yours to write. Keep rows at least 3.5rem (56px) high and
 * make the whole row pressable, so wet hands and gloves can hit it.
 */
export const SettingsListCard = React.forwardRef<
  HTMLDivElement,
  SettingsListCardProps
>(function SettingsListCard(props, ref) {
  const { label, children, ...rest } = props;
  const labelId = React.useId();

  return (
    <Box display="flex" flexDirection="column" gap="2">
      {label && (
        <Text id={labelId} variant="label" color="fg.muted" paddingX="1">
          {label}
        </Text>
      )}
      <AeryoCard
        ref={ref}
        variant="default"
        role="group"
        aria-labelledby={label ? labelId : undefined}
        gap="0"
        css={{
          "& > * + *": { borderTopWidth: "1px", borderColor: "border" },
        }}
        {...rest}
      >
        {children}
      </AeryoCard>
    </Box>
  );
});
