"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import { useSplashScreen } from "@/app/providers/SplashScreen/Provider/SplashProvider";
import { Heading } from "@/components/typography/Heading";

// Minimum time the intro stays on screen after its background image has
// painted, so it doesn't flash by unreadably fast on a warm cache/fast
// device — the tagline needs a moment to actually be read.
const MIN_INTRO_MS = 1200;

// Capacitor always loads the app at "/" (this route) — there's no separate
// "intro" URL a real launch ever visits. So the native-splash → JS-intro →
// real-app sequence has to live here, as local state, rather than as
// distinct routes. See SplashProvider for how the native splash itself
// gets hidden.
export default function Home() {
  const { hideNativeSplash } = useSplashScreen();
  const [showIntro, setShowIntro] = React.useState(true);

  const handleBackgroundLoad = React.useCallback(() => {
    hideNativeSplash();
    window.setTimeout(() => setShowIntro(false), MIN_INTRO_MS);
  }, [hideNativeSplash]);

  if (showIntro) {
    return (
      <Box
        position="relative"
        width="100vw"
        height="100dvh"
        overflow="hidden"
        // Opt out of `body`'s default safe-area padding (globals.css) —
        // this is a full-bleed screen, so its background should run under
        // the notch/status bar and home indicator, not be pushed in by
        // them. The bottom content block still pads itself with
        // `safe.bottom` below so the tagline itself stays clear of the
        // home indicator.
        style={{
          marginTop: "calc(-1 * var(--safe-top))",
          marginBottom: "calc(-1 * var(--safe-bottom))",
          marginLeft: "calc(-1 * var(--safe-left))",
          marginRight: "calc(-1 * var(--safe-right))",
        }}
      >
        <Image
          src="/splash.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover" }}
          onLoad={handleBackgroundLoad}
        />

        {/* Scrim so the logo/tagline stay legible regardless of what part
            of the photo sits behind them. Deliberately not theme-aware (no
            _dark/_light split) — this screen always sits on the same dark
            photo, independent of the app's light/dark color mode. */}
        <Box
          position="absolute"
          inset={0}
          style={{
            background:
              "linear-gradient(to top, rgba(11, 15, 20, 0.9) 0%, rgba(11, 15, 20, 0.35) 45%, rgba(11, 15, 20, 0) 75%)",
          }}
          pointerEvents="none"
        />

        <Box
          position="absolute"
          insetX={0}
          bottom={0}
          pb="safe.bottom"
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
            pb={16}
            px={6}
          >
            <Image
              src="/logo-mark.svg"
              alt="Aeryo"
              width={56}
              height={56}
              priority
            />
            <Heading
              as="p"
              variant="title"
              color="white"
              textAlign="center"
              letterSpacing="wide"
            >
              Where the Unseen Leads
            </Heading>
          </Box>
        </Box>
      </Box>
    );
  }
}
