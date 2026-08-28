"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import * as React from "react";
import { Button } from "@/components/actions/Button";
import { ProgressDots } from "@/components/data-display/ProgressDots";
import { ONBOARDING_SLIDES } from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";
import { pagingDelta } from "./pagingDelta";

const SLIDE_COUNT = ONBOARDING_SLIDES.length;

// Slightly slower than a routine 350ms snap — expo ease-out so the next
// photo arrives rather than popping. No bounce (that reads as lag).
const SLIDE_TRANSITION = {
  duration: 0.48,
  ease: [0.16, 1, 0.3, 1] as const,
};

function clampIndex(index: number): number {
  return Math.max(0, Math.min(index, SLIDE_COUNT - 1));
}

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
 * A swipe never skips a slide: drag is locked to the adjacent page, inertia
 * is off, and `pagingDelta` caps the result at ±1. Mounted by `page.tsx`
 * only when `useOnboarding().hasCompletedOnboarding` is `false`.
 */
export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [slideWidth, setSlideWidth] = React.useState(0);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const pagingLock = React.useRef(false);

  const isLastSlide = activeIndex === SLIDE_COUNT - 1;

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }
    const update = () => setSlideWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToSlide = React.useCallback((index: number) => {
    setActiveIndex(clampIndex(index));
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
      if (pagingLock.current) {
        return;
      }
      const delta = pagingDelta(info.offset.x, info.velocity.x, slideWidth);
      if (delta === 0) {
        return;
      }
      pagingLock.current = true;
      goToSlide(activeIndex + delta);
    },
    [activeIndex, goToSlide, slideWidth],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }
    },
    [activeIndex, goToSlide, handleNext],
  );

  const originX = -activeIndex * slideWidth;

  return (
    <Box
      position="relative"
      width="100vw"
      height="100dvh"
      overflow="hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Onboarding"
      onKeyDown={handleKeyDown}
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
        ref={viewportRef}
        position="relative"
        width="100%"
        height="100%"
        overflow="hidden"
      >
        <motion.div
          style={{
            display: "flex",
            width: `${SLIDE_COUNT * 100}%`,
            height: "100%",
            touchAction: "pan-x",
          }}
          drag={reduceMotion || slideWidth === 0 ? false : "x"}
          // Offset is relative to the current animated x, so 0/0 keeps the
          // finger rubber-banding around this slide only — pagingDelta then
          // commits at most one page. Inertia is off so a flick cannot coast
          // through a second slide.
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          dragDirectionLock
          onDragEnd={handleDragEnd}
          animate={{ x: originX }}
          transition={reduceMotion ? { duration: 0 } : SLIDE_TRANSITION}
          onAnimationComplete={() => {
            pagingLock.current = false;
          }}
        >
          {ONBOARDING_SLIDES.map((slide, index) => (
            <Box
              key={slide.id}
              width={`${100 / SLIDE_COUNT}%`}
              height="100%"
              flexShrink={0}
              aria-hidden={index !== activeIndex}
            >
              <OnboardingSlide
                slide={slide}
                isActive={index === activeIndex}
                priority={index === 0}
              />
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
          <ProgressDots count={SLIDE_COUNT} activeIndex={activeIndex} />
          <Button intent="primary" fullWidth onClick={handleNext}>
            {isLastSlide ? "Get Started" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
