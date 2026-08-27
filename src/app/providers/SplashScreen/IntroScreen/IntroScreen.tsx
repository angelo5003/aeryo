"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Heading } from "@/components/typography/Heading";
import { WindLines } from "./WindLines";

export interface IntroScreenProps {
  /**
   * Fires once the background photo has painted — the signal
   * `SplashProvider` waits for to hide the native splash. See
   * `src/app/page.tsx` for how this drives the swap to the real app.
   */
  onBackgroundLoad: () => void;
}

/**
 * The JS-rendered "intro" screen that takes over the instant the native
 * splash hides: full-bleed photo, a subtle Ken Burns drift, wind-line
 * streaks, and a staggered logo/tagline reveal. All motion is skipped
 * under `prefers-reduced-motion` — everything just appears in its final
 * state instantly instead.
 */
export function IntroScreen({ onBackgroundLoad }: IntroScreenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      position="relative"
      width="100vw"
      height="100dvh"
      overflow="hidden"
      // Opt out of `body`'s default safe-area padding (globals.css) — this
      // is a full-bleed screen, so its background should run under the
      // notch/status bar and home indicator, not be pushed in by them. The
      // bottom content block still pads itself with `safe.bottom` below so
      // the tagline itself stays clear of the home indicator.
      style={{
        marginTop: "calc(-1 * var(--safe-top))",
        marginBottom: "calc(-1 * var(--safe-bottom))",
        marginLeft: "calc(-1 * var(--safe-left))",
        marginRight: "calc(-1 * var(--safe-right))",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        initial={{ scale: 1 }}
        animate={{ scale: reduceMotion ? 1 : 1.06 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <Image
          src="/splash.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover" }}
          // Fires once this image has painted — see IntroScreenProps above.
          onLoad={onBackgroundLoad}
        />
      </motion.div>

      <WindLines />

      {/* Scrim so the logo/tagline stay legible regardless of what part of
          the photo sits behind them. Deliberately not theme-aware (no
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
          <motion.div
            initial={{
              opacity: reduceMotion ? 1 : 0,
              scale: reduceMotion ? 1 : 0.9,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/logo-mark.svg"
              alt="Aeryo"
              width={56}
              height={56}
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: reduceMotion ? 0 : 0.35,
              ease: "easeOut",
            }}
          >
            <Heading
              as="p"
              variant="title"
              color="white"
              textAlign="center"
              letterSpacing="wide"
            >
              Where the Unseen Leads
            </Heading>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
