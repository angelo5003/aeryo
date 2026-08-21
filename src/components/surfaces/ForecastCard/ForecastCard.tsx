import { Stack, Wrap } from "@chakra-ui/react";
import * as React from "react";
import { LuThermometer, LuWind } from "react-icons/lu";
import {
  AeryoCard,
  AeryoCardBody,
  AeryoCardHeader,
  AeryoCardMedia,
  AeryoCardMeta,
} from "@/components/surfaces/Card";
import { deriveCardInteraction } from "@/components/surfaces/internal/deriveCardInteraction";
import type { ForecastCardProps } from "./ForecastCard.types";

/**
 * A single forecast-window summary card — a curated `AeryoCard`
 * composition (see `AeryoCard.tsx`), not a new primitive.
 * `layout="horizontal"` per the design system brief: a compact icon
 * beside the date/direction/metrics, suited to a scrollable forecast
 * timeline.
 */
export const ForecastCard = React.forwardRef<HTMLDivElement, ForecastCardProps>(
  function ForecastCard(props, ref) {
    const {
      date,
      direction,
      windSpeed,
      temperature,
      icon,
      href,
      clickable,
      onClick,
      variant,
      size = "md",
      disabled = false,
      loading = false,
      selected = false,
      maxW = "md",
      w = "md",
      ...rest
    } = props;

    const isInteractive = Boolean(href || clickable);
    const interaction = deriveCardInteraction({
      href,
      clickable,
      onClick,
      ariaLabel: `Forecast for ${date}`,
    });

    return (
      <AeryoCard
        ref={ref}
        variant={variant ?? (isInteractive ? "interactive" : "outlined")}
        size={size}
        layout="horizontal"
        disabled={disabled}
        loading={loading}
        selected={selected}
        maxW={maxW}
        w={w}
        {...rest}
        {...interaction}
      >
        <AeryoCardMedia
          aspectRatio="square"
          w={size === "sm" ? "20" : size === "lg" ? "36" : "28"}
        >
          <Stack
            align="center"
            justify="center"
            w="full"
            h="full"
            bg="bg.muted"
          >
            {icon ?? <LuWind size={24} />}
          </Stack>
        </AeryoCardMedia>
        <AeryoCardHeader title={date} subtitle={direction} />
        {(windSpeed || temperature) && (
          <AeryoCardBody>
            <Wrap gap="4">
              {windSpeed && (
                <AeryoCardMeta
                  icon={<LuWind />}
                  label="Wind Speed"
                  value={windSpeed}
                />
              )}
              {temperature && (
                <AeryoCardMeta
                  icon={<LuThermometer />}
                  label="Temperature"
                  value={temperature}
                />
              )}
            </Wrap>
          </AeryoCardBody>
        )}
      </AeryoCard>
    );
  },
);
