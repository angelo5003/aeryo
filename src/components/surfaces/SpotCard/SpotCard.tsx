import { Box, Image, Stack, Wrap } from "@chakra-ui/react";
import * as React from "react";
import { LuMapPin, LuStar, LuHeart, LuWind } from "react-icons/lu";
import { Skeleton } from "@/components/data-display/Skeleton";
import { Heading } from "@/components/typography/Heading";
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
 * assembly required. `layout="vertical"` per the design system brief;
 * `layout="poster"` is the compact photo-first card for a scrolling row.
 */
export const SpotCard = React.forwardRef<HTMLDivElement, SpotCardProps>(
  function SpotCard(props, ref) {
    const {
      layout = "vertical",
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

    if (layout === "poster") {
      const detailsLine = [windSpeed, description].filter(Boolean).join(" · ");

      return (
        <AeryoCard
          ref={ref}
          variant="elevated"
          layout="vertical"
          disabled={disabled}
          loading={loading}
          selected={selected}
          position="relative"
          w="40"
          h="56"
          flexShrink={0}
          borderRadius="3xl"
          bg="bg.photo"
          color="fg.photo"
          shadow="lg"
          scrollSnapAlign="start"
          {...rest}
          {...interaction}
        >
          {loading ? (
            <Skeleton variant="custom" w="full" h="full" />
          ) : (
            <>
              {imageSrc && (
                <Image
                  src={imageSrc}
                  // The name is written out below, so the photo is decoration unless the caller describes it.
                  alt={imageAlt ?? ""}
                  position="absolute"
                  inset="0"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              )}
              <Box
                position="absolute"
                inset="0"
                bgImage="photoScrim.full"
                pointerEvents="none"
              />
              {badges && (
                <AeryoCardBadges
                  position="overlay-top-left"
                  top="2.5"
                  left="2.5"
                >
                  {badges}
                </AeryoCardBadges>
              )}
              <Stack
                position="absolute"
                insetX="3.5"
                bottom="3.5"
                gap="0.5"
                pointerEvents="none"
              >
                <Heading variant="title" as="h3" color="fg.photo">
                  {name}
                </Heading>
                {detailsLine && (
                  <Text variant="label.photo" color="fg.photo">
                    {detailsLine}
                  </Text>
                )}
              </Stack>
            </>
          )}
        </AeryoCard>
      );
    }

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
