"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

// Hand-tuned rather than a sourced Lottie file (LottieFiles is behind a
// bot-check we won't try to defeat) — a handful of thin gradient streaks
// drifting left-to-right at staggered speed/opacity, tuned to the intro's
// own palette instead of a generic stock animation.
const LINES = [
  { top: "16%", width: "38%", duration: 5.5, delay: 0, opacity: 0.18 },
  { top: "31%", width: "24%", duration: 4.2, delay: 0.9, opacity: 0.12 },
  { top: "57%", width: "44%", duration: 6.8, delay: 1.7, opacity: 0.16 },
  { top: "70%", width: "30%", duration: 5, delay: 0.3, opacity: 0.1 },
] as const;

/**
 * Purely decorative — skipped entirely under `prefers-reduced-motion`
 * rather than just frozen, since it has no informational content to
 * preserve.
 */
export function WindLines() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
      {LINES.map((line, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: line.top,
            left: "-40%",
            width: line.width,
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${line.opacity}), transparent)`,
          }}
          animate={{ x: ["0%", "220%"] }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </Box>
  );
}
