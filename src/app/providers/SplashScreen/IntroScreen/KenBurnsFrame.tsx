"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Matches the intro screen's slow Ken Burns so onboarding feels like the same world. */
export const KEN_BURNS_SCALE = 1.06;
export const KEN_BURNS_DURATION_S = 6;
export const KEN_BURNS_EASE = "easeOut" as const;

export interface KenBurnsFrameProps {
  /** When false, the photo stays at scale 1 (inactive carousel slides). */
  active?: boolean;
  children?: React.ReactNode;
}

/**
 * Slow zoom on a full-bleed photo. Transform-only, compositor-safe, and
 * skipped entirely under `prefers-reduced-motion`.
 */
export function KenBurnsFrame({ active = true, children }: KenBurnsFrameProps) {
  const reduceMotion = useReducedMotion();
  const still = reduceMotion || !active;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        transformOrigin: "center center",
      }}
      initial={{ scale: 1 }}
      animate={{ scale: still ? 1 : KEN_BURNS_SCALE }}
      transition={{
        duration: still ? 0 : KEN_BURNS_DURATION_S,
        ease: KEN_BURNS_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
