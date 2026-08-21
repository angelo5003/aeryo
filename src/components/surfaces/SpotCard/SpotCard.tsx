import { Stack, Wrap } from "@chakra-ui/react";
import * as React from "react";
import { LuMapPin, LuStar, LuHeart, LuWind } from "react-icons/lu";
import { Text } from "@/components/typography/Text";
import { IconButton } from "@/components/actions/IconButton";
import {
  AeryoCard,
  AeryoCardActions,
  AeryoCardBadges,
  AeryoCardBody,
  AeryoCardHeader,
  AeryoCardMedia,
  AeryoCardMeta,
} from "@/components/surfaces/Card";
import { deriveCardInteraction } from "@/components/surfaces/internal/deriveCardInteraction";
import type { SpotCardProps } from "./SpotCard.types";

/**
 * A wind/kite spot summary card — a curated `AeryoCard` composition (see
 * `AeryoCard.tsx`), not a new primitive. Chakra/AeryoCard are
 * implementation details consumers never need to reach past: pass
 * `name`/`region`/`windSpeed`/etc. directly, no compound-component
 * assembly required. `layout="vertical"` per the design system brief.
 */
export const SpotCard = React.forwardRef<HTMLDivElement, SpotCardProps>(
  function SpotCard(props, ref) {
    const {
      name,
      region,
      description,
      imageSrc,
      imageAlt,
      windSpeed,
      rating,
      badges,
      onSave,
      href,
      clickable,
      onClick,
      variant,
      size = "md",
      disabled = false,
      loading = false,
      selected = false,
      maxW = "sm",
      w = "sm",
      ...rest
    } = props;

    const isInteractive = Boolean(href || clickable);
    const interaction = deriveCardInteraction({
      href,
      clickable,
      onClick,
      ariaLabel: `Open ${name}`,
    });

    return (
      <AeryoCard
        ref={ref}
        variant={variant ?? (isInteractive ? "interactive" : "default")}
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
        <AeryoCardMedia
          aspectRatio="landscape"
          as={imageSrc ? "img" : undefined}
          src={imageSrc}
          alt={imageAlt ?? name}
        >
          {!imageSrc && (
            <Stack
              align="center"
              justify="center"
              w="full"
              h="full"
              bg="bg.muted"
            >
              <LuMapPin size={32} />
            </Stack>
          )}
        </AeryoCardMedia>
        {badges && (
          <AeryoCardBadges position="overlay-top-left">
            {badges}
          </AeryoCardBadges>
        )}
        {onSave && (
          <AeryoCardActions position="overlay-top-right">
            <IconButton
              aria-label="Save"
              variant="ghost"
              size="sm"
              onClick={onSave}
            >
              <LuHeart />
            </IconButton>
          </AeryoCardActions>
        )}
        <AeryoCardHeader overline={region} title={name} />
        {(description || windSpeed || rating) && (
          <AeryoCardBody>
            {description && <Text variant="body">{description}</Text>}
            {(windSpeed || rating) && (
              <Wrap gap="4" mt={description ? "3" : undefined}>
                {windSpeed && (
                  <AeryoCardMeta
                    icon={<LuWind />}
                    label="Wind Speed"
                    value={windSpeed}
                  />
                )}
                {rating && (
                  <AeryoCardMeta
                    icon={<LuStar />}
                    label="Rating"
                    value={rating}
                  />
                )}
              </Wrap>
            )}
          </AeryoCardBody>
        )}
      </AeryoCard>
    );
  },
);
