"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { OnboardingCarousel } from "@/app/providers/Onboarding/OnboardingCarousel/OnboardingCarousel";
import { useOnboarding } from "@/app/providers/Onboarding/Provider/OnboardingProvider";
import { IntroScreen } from "@/app/providers/SplashScreen/IntroScreen/IntroScreen";
import { useSplashScreen } from "@/app/providers/SplashScreen/Provider/SplashProvider";
import { Heading } from "@/components/typography/Heading";

// Minimum time the intro stays on screen after its background image has
// painted, so the logo/tagline reveal and wind-line drift actually have
// room to be seen instead of flashing by on a warm cache/fast device.
const MIN_INTRO_MS = 2500;

// Same dissolve OnboardingCarousel uses between slides (see its own
// comment) — the incoming screen eases in over the intro, which holds
// underneath until it's covered, instead of a cut.
const FADE_DURATION_S = 0.5;
const FADE_EASE = [0.4, 0, 0.2, 1] as const;

// Capacitor always loads the app at "/" (this route) — there's no separate
// "intro"/"onboarding" URL a real launch ever visits. So the native-splash
// → JS-intro → onboarding (first launch only) → real-app sequence has to
// live here, as local state, rather than as distinct routes. See
// SplashProvider for how the native splash itself gets hidden,
// OnboardingProvider for how "seen onboarding" is persisted, and
// IntroScreen/OnboardingCarousel for the actual screens.
export default function Home() {
  const reduceMotion = useReducedMotion();
  const { hideNativeSplash } = useSplashScreen();
  const { hasCompletedOnboarding, completeOnboarding } = useOnboarding();
  const [minDwellElapsed, setMinDwellElapsed] = React.useState(false);
  // Placeholder until there's real app data to wait on (e.g. the home
  // screen's initial fetch) — swap this `useState(true)` for actual
  // readiness once that exists. The intro won't clear until BOTH this AND
  // the minimum dwell time above are true, so wiring in real readiness
  // later is the only change needed to make the intro naturally wait for
  // real loading instead of a fixed guess.
  const [appReady] = React.useState(true);

  const showIntro = !(minDwellElapsed && appReady);
  // `hasCompletedOnboarding` is `null` for one tick while the persisted
  // flag is still being read — treat that the same as "not completed yet"
  // (render onboarding rather than flashing home content first) so there's
  // no flicker of home behind the carousel on a first launch.
  const showOnboarding = !showIntro && hasCompletedOnboarding !== true;

  const handleBackgroundLoad = React.useCallback(() => {
    hideNativeSplash();
    window.setTimeout(() => setMinDwellElapsed(true), MIN_INTRO_MS);
  }, [hideNativeSplash]);

  // Keep the intro mounted for one fade duration after `showIntro` flips
  // false, so onboarding's first slide has something to dissolve over
  // instead of the intro just disappearing.
  const [introMounted, setIntroMounted] = React.useState(true);
  React.useEffect(() => {
    if (showIntro) return;
    const timeout = window.setTimeout(
      () => setIntroMounted(false),
      reduceMotion ? 0 : FADE_DURATION_S * 1000,
    );
    return () => clearTimeout(timeout);
  }, [showIntro, reduceMotion]);

  if (showIntro || showOnboarding) {
    return (
      <>
        {introMounted && (
          // `height: 0` + `overflow: visible` so this wrapper takes no
          // space of its own in body's flex column — IntroScreen already
          // sizes and positions itself full-bleed via its own negative
          // safe-area margins, same as when it's returned directly below.
          // A `position: fixed`/`absolute` wrapper would double-cancel
          // that margin instead.
          <motion.div
            style={{
              height: 0,
              overflow: "visible",
              zIndex: showIntro ? 1 : 0,
            }}
            initial={false}
            animate={{ opacity: showIntro ? 1 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0, delay: FADE_DURATION_S }
            }
          >
            <IntroScreen onBackgroundLoad={handleBackgroundLoad} />
          </motion.div>
        )}
        {showOnboarding && (
          <motion.div
            style={{ height: 0, overflow: "visible", zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: FADE_DURATION_S, ease: FADE_EASE }
            }
          >
            <OnboardingCarousel onComplete={completeOnboarding} />
          </motion.div>
        )}
      </>
    );
  }

  return (
    <Box
      bg="bg"
      color="fg"
      // Not full-bleed (unlike IntroScreen/OnboardingCarousel) — `body`
      // (globals.css) already reserves safe-area space via padding and
      // lays its children out with `display: flex; flex-direction:
      // column`. `flex="1"` fills exactly what's left after that padding;
      // a `100dvh` height here would double-count the safe-area padding
      // on top of the full viewport height and force the page to scroll
      // on both iOS and Android even though nothing is tall enough to
      // need it.
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1">Hello world</Heading>
    </Box>
  );
}
