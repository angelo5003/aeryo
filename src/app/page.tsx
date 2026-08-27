"use client";

import { Box } from "@chakra-ui/react";
import * as React from "react";
import { IntroScreen } from "@/app/providers/SplashScreen/IntroScreen/IntroScreen";
import { useSplashScreen } from "@/app/providers/SplashScreen/Provider/SplashProvider";
import { Heading } from "@/components/typography/Heading";

// Minimum time the intro stays on screen after its background image has
// painted, so the logo/tagline reveal and wind-line drift actually have
// room to be seen instead of flashing by on a warm cache/fast device.
const MIN_INTRO_MS = 2500;

// Capacitor always loads the app at "/" (this route) — there's no separate
// "intro" URL a real launch ever visits. So the native-splash → JS-intro →
// real-app sequence has to live here, as local state, rather than as
// distinct routes. See SplashProvider for how the native splash itself
// gets hidden, and IntroScreen for the actual visuals.
export default function Home() {
  const { hideNativeSplash } = useSplashScreen();
  const [minDwellElapsed, setMinDwellElapsed] = React.useState(false);
  // Placeholder until there's real app data to wait on (e.g. the
  // onboarding carousel's initial fetch) — swap this `useState(true)` for
  // actual readiness once that exists. The intro won't clear until BOTH
  // this AND the minimum dwell time above are true, so wiring in real
  // readiness later is the only change needed to make the intro naturally
  // wait for real loading instead of a fixed guess.
  const [appReady] = React.useState(true);

  const showIntro = !(minDwellElapsed && appReady);

  const handleBackgroundLoad = React.useCallback(() => {
    hideNativeSplash();
    window.setTimeout(() => setMinDwellElapsed(true), MIN_INTRO_MS);
  }, [hideNativeSplash]);

  if (showIntro) {
    return <IntroScreen onBackgroundLoad={handleBackgroundLoad} />;
  }

  return (
    <Box
      bg="bg"
      color="fg"
      // Not full-bleed (unlike IntroScreen) — `body` (globals.css) already
      // reserves safe-area space via padding and lays its children out
      // with `display: flex; flex-direction: column`. `flex="1"` fills
      // exactly what's left after that padding; a `100dvh` height here
      // would double-count the safe-area padding on top of the full
      // viewport height and force the page to scroll on both iOS and
      // Android even though nothing is tall enough to need it.
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1">Hello world</Heading>
    </Box>
  );
}
