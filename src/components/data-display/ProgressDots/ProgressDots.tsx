import { Box, HStack } from "@chakra-ui/react";
import type { ProgressDotsProps } from "./ProgressDots.types";

/**
 * A row of dots showing position within a fixed number of steps (e.g. an
 * onboarding carousel). Decorative only — not a set of tap targets. If a
 * future feature needs tappable dots, that's a new prop on top of this
 * component, not a change to its current behavior.
 *
 * Every dot is the same size — the active step is communicated by color
 * alone, not by growing into a pill (AERYO's component direction calls
 * out "excessive pills" as something to avoid; see
 * `docs/guides/aeryo-branding.md` §23/§28).
 *
 * Not theme-aware (no `_dark`/`_light` split) — designed to sit on top of
 * a photo with a dark scrim, same as `IntroScreen`'s logo/tagline, not on
 * the app's own `bg`/`fg` surface.
 *
 * Prefer `ids` + `activeId`. `count` + `activeIndex` exist only for
 * callers that have no identity for a step (Storybook knobs, unnamed
 * placeholders). Dots use `fg.photo` / `fg.photo.muted` because they
 * sit on a photographic scrim, not on `bg`/`fg`.
 */
export function ProgressDots({
  ids,
  activeId,
  count,
  activeIndex,
}: ProgressDotsProps) {
  const steps =
    ids && ids.length > 0
      ? ids
      : Array.from({ length: count ?? 0 }, (_, index) => String(index));
  const currentId =
    activeId ?? (activeIndex != null ? String(activeIndex) : steps[0]);
  const activePosition = steps.indexOf(currentId ?? "");

  return (
    <HStack
      gap="2"
      role="group"
      aria-label={`Step ${activePosition + 1} of ${steps.length}`}
      aria-live="polite"
    >
      {steps.map((id) => (
        <Box
          key={id}
          width="1.5"
          height="1.5"
          borderRadius="full"
          // On a photographic scrim — `fg.photo` / `fg.photo.muted`, not
          // the theme-aware `fg` pair (those would flip in light mode).
          bg={id === currentId ? "fg.photo" : "fg.photo.muted"}
          transition="background-color 0.2s ease-out"
        />
      ))}
    </HStack>
  );
}
