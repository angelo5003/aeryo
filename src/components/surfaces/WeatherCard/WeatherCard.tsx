import { Wrap } from "@chakra-ui/react";
import * as React from "react";
import { LuThermometer, LuWind } from "react-icons/lu";
import { Badge } from "@/components/typography/Badge";
import {
  AeryoCard,
  AeryoCardBody,
  AeryoCardFooter,
  AeryoCardHeader,
  AeryoCardMeta,
} from "@/components/surfaces/Card";
import { deriveCardInteraction } from "@/components/surfaces/internal/deriveCardInteraction";
import type { WeatherCardProps } from "./WeatherCard.types";

/**
 * A current/near-term conditions summary card — a curated `AeryoCard`
 * composition (see `AeryoCard.tsx`), not a new primitive.
 * `variant="filled"` and no media slot by default, per the design system
 * brief. `condition` is surfaced as a status `Badge` in the footer, not
 * color alone — see docs/guides/aeryo-branding.md §25.
 */
export const WeatherCard = React.forwardRef<HTMLDivElement, WeatherCardProps>(
  function WeatherCard(props, ref) {
    const {
      overline,
      temperature,
      windSpeed,
      feelsLike,
      condition,
      conditionIntent = "success",
      href,
      clickable,
      onClick,
      variant = "filled",
      size = "md",
      disabled = false,
      loading = false,
      selected = false,
      maxW = "xs",
      w = "xs",
      ...rest
    } = props;

    const interaction = deriveCardInteraction({
      href,
      clickable,
      onClick,
      ariaLabel: `Conditions: ${temperature}`,
    });

    return (
      <AeryoCard
        ref={ref}
        variant={variant}
        size={size}
        layout="vertical"
        disabled={disabled}
        loading={loading}
        selected={selected}
        maxW={maxW}
        w={w}
        {...rest}
        {...interaction}
      >
        <AeryoCardHeader overline={overline} title={temperature} />
        {(windSpeed || feelsLike) && (
          <AeryoCardBody>
            <Wrap gap="4">
              {windSpeed && (
                <AeryoCardMeta
                  icon={<LuWind />}
                  label="Wind"
                  value={windSpeed}
                />
              )}
              {feelsLike && (
                <AeryoCardMeta
                  icon={<LuThermometer />}
                  label="Feels like"
                  value={feelsLike}
                />
              )}
            </Wrap>
          </AeryoCardBody>
        )}
        {condition && (
          <AeryoCardFooter justify="start">
            <Badge intent={conditionIntent}>{condition}</Badge>
          </AeryoCardFooter>
        )}
      </AeryoCard>
    );
  },
);
