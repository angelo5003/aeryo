"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useAuth } from "@/app/providers/Auth/AuthProvider";
import { OnboardingCarousel } from "@/app/providers/Onboarding/OnboardingCarousel/OnboardingCarousel";
import { useOnboarding } from "@/app/providers/Onboarding/Provider/OnboardingProvider";
import { IntroScreen } from "@/app/providers/SplashScreen/IntroScreen/IntroScreen";
import { useSplashScreen } from "@/app/providers/SplashScreen/Provider/SplashProvider";
import { Heading } from "@/components/typography/Heading";

// Intro stays up at least this long after the photo loads, even on a fast phone.
const MIN_INTRO_MS = 2500;

// Fade speed between intro and the next screen. Same numbers the photo slides use.
const FADE_DURATION_S = 0.5;
const FADE_EASE = [0.4, 0, 0.2, 1] as const;

// Phone always opens this page. Intro → slides or home are ifs here, not extra URLs.
export default function Home() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const { hideNativeSplash } = useSplashScreen();
  const { hasCompletedOnboarding, completeOnboarding } = useOnboarding();
  // session = logged-in user or null. isReady = Supabase has answered at least once.
  const { session, isReady } = useAuth();
  const [minDwellElapsed, setMinDwellElapsed] = React.useState(false);
  // Extra “app data loaded” switch. Hard-coded true until real loading exists.
  const [appReady] = React.useState(true);

  // True until we know login status AND whether they already finished the slides.
  const stillLoading = !isReady || hasCompletedOnboarding === null;
  // True until the timer and appReady are both done, or we are still loading login/slides.
  const showIntro = !(minDwellElapsed && appReady) || stillLoading;
  // Photo slides: intro done, loading done, not logged in, slides not finished.
  const showOnboarding =
    !showIntro && session === null && hasCompletedOnboarding !== true;
  // Seen the slides (skipped or finished) but never made an account. Home has
  // nothing to show this visitor — send them to the same /signup route
  // OnboardingCarousel's own Skip/CTA already use, instead of "Hello world".
  const needsAccount =
    !showIntro && session === null && hasCompletedOnboarding === true;

  React.useEffect(() => {
    if (needsAccount) router.replace("/signup");
  }, [needsAccount, router]);

  // Hide the native splash, then start the intro timer.
  const handleBackgroundLoad = React.useCallback(() => {
    hideNativeSplash();
    window.setTimeout(() => setMinDwellElapsed(true), MIN_INTRO_MS);
  }, [hideNativeSplash]);

  // Keep intro in the tree for one fade after we leave it, so the next screen can fade over it.
  const [introMounted, setIntroMounted] = React.useState(true);
  React.useEffect(() => {
    if (showIntro) return;
    const timeout = window.setTimeout(
      () => setIntroMounted(false),
      reduceMotion ? 0 : FADE_DURATION_S * 1000,
    );
    return () => clearTimeout(timeout);
  }, [showIntro, reduceMotion]);

  // Stay on intro/slides until we are ready to pick guest vs member home.
  if (showIntro || showOnboarding || needsAccount) {
    return (
      <>
        {introMounted && (
          // Takes no layout space; IntroScreen already fills the screen itself.
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
      // Home sits in the padded body area. Do not use full viewport height or it will double-count the notch.
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {session ? (
        // Logged in. Skip the photo slides even if they never pressed Skip.
        <Heading as="h1">
          Hello member, you are in the logged in lobby of the app
        </Heading>
      ) : (
        // Logged out, slides already done (Skip).
        <Heading as="h1">Hello world</Heading>
      )}
    </Box>
  );
}
