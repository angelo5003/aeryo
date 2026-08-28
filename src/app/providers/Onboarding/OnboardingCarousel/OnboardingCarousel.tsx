"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { Button } from "@/components/actions/Button";
import { ProgressDots } from "@/components/data-display/ProgressDots";
import { ONBOARDING_SLIDES } from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";

const SLIDE_COUNT = ONBOARDING_SLIDES.length;

// Photo dissolve: long enough to read as a fade, not a cut. Incoming
// eases in over the current photo, which holds until it's covered — so
// there's no dip to empty between slides. Matches token `easeInOut`.
const FADE_DURATION_S = 0.5;
const FADE_EASE = [0.4, 0, 0.2, 1] as const;

export interface OnboardingCarouselProps {
  /** Fires once — when the user finishes the last slide or hits Skip. */
  onComplete: () => void;
}

/**
 * The onboarding carousel itself: 5 full-bleed photo slides (see
 * `OnboardingSlide`), advanced only by the `Next`/`Get Started` button,
 * with a dot progress indicator and a `Skip` button (top-right, every
 * slide but the last). Gestures do not change slides. Tapping Next
 * crossfades the next photo over the current one. Mounted by `page.tsx`
 * only when `useOnboarding().hasCompletedOnboarding` is `false`.
 */
export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const isLastSlide = activeIndex === SLIDE_COUNT - 1;

  const handleNext = React.useCallback(() => {
    if (isLastSlide) {
      onComplete();
    } else {
      setActiveIndex((index) => Math.min(index + 1, SLIDE_COUNT - 1));
    }
  }, [isLastSlide, onComplete]);

  return (
    <Box
      position="relative"
      width="100vw"
      height="100dvh"
      overflow="hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Onboarding"
      style={{
        marginTop: "calc(-1 * var(--safe-top))",
        marginBottom: "calc(-1 * var(--safe-bottom))",
        marginLeft: "calc(-1 * var(--safe-left))",
        marginRight: "calc(-1 * var(--safe-right))",
        overscrollBehavior: "contain",
        touchAction: "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <Box
        position="relative"
        width="100%"
        height="100%"
        overflow="hidden"
        zIndex={0}
        // Same ink as the slide scrim, so a not-yet-decoded next photo
        // never flashes the page background through the dissolve.
        bg="#0B0F14"
      >
        {ONBOARDING_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: isActive ? FADE_DURATION_S : 0,
                      delay: isActive ? 0 : FADE_DURATION_S,
                      ease: FADE_EASE,
                    }
              }
              style={{
                position: "absolute",
                inset: 0,
                zIndex: isActive ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              <OnboardingSlide
                slide={slide}
                isActive={isActive}
                priority={index <= 1}
              />
            </motion.div>
          );
        })}
      </Box>

      <Box
        position="absolute"
        top="0"
        insetX="0"
        pt="safe.top"
        px="4"
        zIndex={1}
      >
        {!isLastSlide && (
          <Box display="flex" justifyContent="flex-end" pt="2">
            <Button variant="ghost" size="sm" onClick={onComplete}>
              Skip
            </Button>
          </Box>
        )}
      </Box>

      <Box
        position="absolute"
        bottom="0"
        insetX="0"
        pb="safe.bottom"
        px="8"
        zIndex={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="4"
          pb="10"
        >
          <ProgressDots count={SLIDE_COUNT} activeIndex={activeIndex} />
          <Button intent="primary" fullWidth onClick={handleNext}>
            {isLastSlide ? "Get Started" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
