"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";
import { LuArrowRight } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { ProgressDots } from "@/components/data-display/ProgressDots";
import { Stack } from "@/components/primitives/Stack";
import {
  FIRST_ONBOARDING_SLIDE_ID,
  getNextOnboardingSlideId,
  LAST_ONBOARDING_SLIDE_ID,
  ONBOARDING_SLIDE_IDS,
  ONBOARDING_SLIDES,
  PRELOAD_ONBOARDING_SLIDE_IDS,
} from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";

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
 * The onboarding carousel itself: 6 full-bleed photo slides (see
 * `OnboardingSlide`), advanced only by the `Next`/`Create account` button,
 * with a dot progress indicator and a `Skip` button (top-right, every
 * slide but the last). Neither is rendered on the last slide — there's
 * nothing left to skip or track progress toward once the flow has ended.
 * Gestures do not change slides. Tapping Next crossfades the next photo
 * over the current one. Selection is by slide `id`, never a stored index.
 * Mounted by `page.tsx` only when `useOnboarding().hasCompletedOnboarding`
 * is `false`. Both `Skip` and the final `Create account` CTA call
 * `onComplete` (marks onboarding seen) and then navigate to `/signup`.
 */
export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const [activeId, setActiveId] = React.useState(FIRST_ONBOARDING_SLIDE_ID);

  const isLastSlide = activeId === LAST_ONBOARDING_SLIDE_ID;

  // `onComplete` flips `hasCompletedOnboarding` in a separate context
  // (`OnboardingProvider`), outside the navigation Next wraps in its own
  // transition. Left unwrapped, that context update commits on its own,
  // normal-priority render — one frame where `page.tsx` is still on "/" but
  // already sees onboarding as done, flashing its logged-out "Hello world"
  // before the route actually changes. `startTransition` marks both updates
  // low-priority together, so React holds the old screen until the "/signup"
  // page is ready and swaps once, per
  // https://react.dev/reference/react/startTransition.
  const goToSignup = React.useCallback(() => {
    React.startTransition(() => {
      onComplete();
      router.push("/signup");
    });
  }, [onComplete, router]);

  const handleOnboardingComplete = React.useCallback(() => {
    if (isLastSlide) {
      goToSignup();
      return;
    }
    setActiveId(
      (currentId) => getNextOnboardingSlideId(currentId) ?? currentId,
    );
  }, [isLastSlide, goToSignup]);

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
        // `bg.photo`, not `bg` — this screen always sits on a dark photo,
        // independent of the app's light/dark mode. A not-yet-decoded
        // next photo must not flash a light surface through the dissolve.
        bg="bg.photo"
      >
        {ONBOARDING_SLIDES.map((slide) => {
          const isActive = slide.id === activeId;
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
                priority={PRELOAD_ONBOARDING_SLIDE_IDS.has(slide.id)}
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
          <Stack direction="row" justify="flex-end" pt="2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToSignup}
              color="fg.photo"
              fontWeight="bold"
            >
              Skip
            </Button>
          </Stack>
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
        <Stack direction="column" align="center" gap="4" pb="10">
          {!isLastSlide && (
            <ProgressDots ids={ONBOARDING_SLIDE_IDS} activeId={activeId} />
          )}

          <Button
            intent="primary"
            fullWidth
            onClick={handleOnboardingComplete}
            fontWeight="bold"
            color="fg.photo"
            iconRight={isLastSlide ? undefined : <LuArrowRight />}
            justifyContent="center"
            alignItems="center"
            textTransform={isLastSlide ? undefined : "uppercase"}
            transitionProperty="transform"
            transitionDuration="fast"
            transitionTimingFunction="easeOut"
            _active={{ transform: "scale(0.96)" }}
            p="5"
            fontSize="md"
          >
            {isLastSlide ? "Create account" : "Next"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
