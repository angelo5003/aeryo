import { Box, HStack } from "@chakra-ui/react";
import type { ProgressDotsProps } from "./ProgressDots.types";

/**
 * A row of dots showing position within a fixed number of steps (e.g. an
 * onboarding carousel). Decorative only — not a set of tap targets. If a
 * future feature needs tappable dots, that's a new prop on top of this
 * component, not a change to its current behavior.
 *
 * Not theme-aware (no `_dark`/`_light` split) — designed to sit on top of
 * a photo with a dark scrim, same as `IntroScreen`'s logo/tagline, not on
 * the app's own `bg`/`fg` surface.
 */
export function ProgressDots({ count, activeIndex }: ProgressDotsProps) {
  return (
    <HStack
      gap="2"
      role="group"
      aria-label={`Step ${activeIndex + 1} of ${count}`}
      aria-live="polite"
    >
      {Array.from({ length: count }, (_, index) => (
        <Box
          key={index}
          width={index === activeIndex ? "6" : "1.5"}
          height="1.5"
          borderRadius="full"
          // This component sits on top of a full-bleed photo with a dark
          // scrim (not on the app's normal surfaces), so it uses raw white
          // with transparency. See ProgressDots.tsx comment for context.
          // eslint-disable-next-line no-restricted-syntax
          bg={index === activeIndex ? "white" : "whiteAlpha.400"}
          transition="width 0.2s ease-out, background-color 0.2s ease-out"
        />
      ))}
    </HStack>
  );
}
