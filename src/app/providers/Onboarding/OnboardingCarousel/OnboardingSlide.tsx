"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { KenBurnsFrame } from "@/app/providers/SplashScreen/IntroScreen/KenBurnsFrame";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { PHOTO_SCRIM_BG_IMAGE } from "@/design-system/theme/photoScrim";
import type { OnboardingSlideContent } from "../onboardingContent";

export interface OnboardingSlideProps {
  slide: OnboardingSlideContent;
  /** Drives the Ken Burns zoom — only the visible carousel slide should be active. */
  isActive?: boolean;
  /** First slide is above-the-fold; later slides can lazy-load. */
  priority?: boolean;
}

/**
 * One onboarding slide: full-bleed background photo, a scrim so text stays
 * legible, and a heading/body pair anchored near the bottom. Same visual
 * treatment as `IntroScreen` (full-bleed under the safe area, not
 * theme-aware — always sits on a dark photo regardless of the app's own
 * light/dark mode). `OnboardingCarousel` is responsible for positioning
 * this in the fade stack; this component only renders one
 * slide's own content. Type on the photograph uses `body.photo` (Manrope,
 * one step heavier and looser than chrome body) so light text on the dark
 * scrim stays readable.
 */
export function OnboardingSlide({
  slide,
  isActive = true,
  priority = false,
}: OnboardingSlideProps) {
  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      <KenBurnsFrame active={isActive}>
        <Image
          src={slide.imageSrc}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          // First slide is the LCP of this screen; later slides lazy-load.
          priority={priority}
          draggable={false}
        />
      </KenBurnsFrame>

      {/* Scrim — see IntroScreen.tsx for the same treatment/reasoning. */}
      <Box
        position="absolute"
        inset={0}
        bgImage={PHOTO_SCRIM_BG_IMAGE}
        pointerEvents="none"
      />

      {/* `pb="safe.bottom"` on this outer box, plus a further fixed offset
          on the inner one, clears both the home indicator *and*
          `OnboardingCarousel`'s own overlaid dots/button row underneath —
          same nested-padding pattern as `IntroScreen`'s bottom block. */}
      <Box position="absolute" insetX={0} bottom={0} pb="safe.bottom">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          pb="32"
          px={8}
          textAlign="center"
        >
          <Heading as="h2" variant="title" color="fg.photo">
            {slide.heading}
          </Heading>
          <Text variant="body.photo" color="fg.photo">
            {slide.body}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
