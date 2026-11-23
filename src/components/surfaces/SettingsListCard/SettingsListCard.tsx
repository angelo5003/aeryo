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
 * The card is a real list (`ul`) named by its label, and each row is a
 * list item, so screen readers announce "list, 3 items" and each row's
 * position. Use `SettingsRow` for the rows: it renders the `li` itself.
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
        as="ul"
        variant="default"
        aria-labelledby={label ? labelId : undefined}
        gap="0"
        margin="0"
        padding="0"
        listStyleType="none"
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
