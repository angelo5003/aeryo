"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import * as React from "react";
import { Button } from "@/components/actions/Button";
import { ProgressDots } from "@/components/data-display/ProgressDots";
import { ONBOARDING_SLIDES } from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";

// How far (as a fraction of screen width) a drag has to travel before it
// counts as "advance/go back" instead of snapping back to the current
// slide.
const DRAG_THRESHOLD_RATIO = 0.2;

export interface OnboardingCarouselProps {
  /** Fires once — when the user finishes the last slide or hits Skip. */
  onComplete: () => void;
}

/**
 * The onboarding carousel itself: 5 full-bleed photo slides (see
 * `OnboardingSlide`), swipeable via drag, with a dot progress indicator, a
 * `Skip` button (top-right, every slide but the last), and a `Next`/`Get
 * Started` button (bottom). Every action also works without gestures —
 * `Skip`/`Next`/`Get Started` are real buttons, reachable by keyboard.
 *
 * Mounted by `page.tsx` only when `useOnboarding().hasCompletedOnboarding`
 * is `false` — see that file for the boot-sequence wiring.
 */
export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const goToSlide = React.useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, ONBOARDING_SLIDES.length - 1)));
  }, []);

  const handleNext = React.useCallback(() => {
    if (isLastSlide) {
      onComplete();
    } else {
      goToSlide(activeIndex + 1);
    }
  }, [isLastSlide, onComplete, goToSlide, activeIndex]);

  const handleDragEnd = React.useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const width = trackRef.current?.offsetWidth ?? 1;
      const ratio = info.offset.x / width;
      if (ratio < -DRAG_THRESHOLD_RATIO) {
        goToSlide(activeIndex + 1);
      } else if (ratio > DRAG_THRESHOLD_RATIO) {
        goToSlide(activeIndex - 1);
      }
      // Otherwise: snap back to the current slide (handled by the
      // `animate` prop re-applying `x: -activeIndex * 100%`).
    },
    [activeIndex, goToSlide],
  );

  return (
    <Box
      position="relative"
      width="100vw"
      height="100dvh"
      overflow="hidden"
      style={{
        marginTop: "calc(-1 * var(--safe-top))",
        marginBottom: "calc(-1 * var(--safe-bottom))",
        marginLeft: "calc(-1 * var(--safe-left))",
        marginRight: "calc(-1 * var(--safe-right))",
      }}
    >
      <Box ref={trackRef} position="relative" width="100%" height="100%">
        <motion.div
          style={{
            display: "flex",
            width: `${ONBOARDING_SLIDES.length * 100}%`,
            height: "100%",
          }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{
            x: `${-activeIndex * (100 / ONBOARDING_SLIDES.length)}%`,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          {ONBOARDING_SLIDES.map((slide) => (
            <Box
              key={slide.id}
              width={`${100 / ONBOARDING_SLIDES.length}%`}
              height="100%"
              flexShrink={0}
            >
              <OnboardingSlide slide={slide} />
            </Box>
          ))}
        </motion.div>
      </Box>

      <Box position="absolute" top="0" insetX="0" pt="safe.top" px="4">
        {!isLastSlide && (
          <Box display="flex" justifyContent="flex-end" pt="2">
            <Button variant="ghost" size="sm" onClick={onComplete}>
              Skip
            </Button>
          </Box>
        )}
      </Box>

      <Box position="absolute" bottom="0" insetX="0" pb="safe.bottom" px="8">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="4"
          pb="10"
        >
          <ProgressDots
            count={ONBOARDING_SLIDES.length}
            activeIndex={activeIndex}
          />
          <Button intent="primary" fullWidth onClick={handleNext}>
            {isLastSlide ? "Get Started" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
