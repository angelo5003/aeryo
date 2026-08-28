/** Fraction of slide width that commits a page change on release. */
export const SWIPE_DISTANCE_RATIO = 0.18;

/**
 * Flick speed (px/s) that commits a page even if the finger did not travel
 * the distance threshold. High enough that a casual drag does not skip.
 */
export const SWIPE_VELOCITY = 700;

/**
 * How many slides a swipe should move. Always -1, 0, or 1 — a long or
 * fast gesture still pages exactly once so a flick cannot skip a slide.
 */
export function pagingDelta(
  offsetX: number,
  velocityX: number,
  width: number,
): -1 | 0 | 1 {
  if (width <= 0) {
    return 0;
  }

  const travelledFarEnough = Math.abs(offsetX) / width >= SWIPE_DISTANCE_RATIO;
  if (travelledFarEnough) {
    return offsetX < 0 ? 1 : -1;
  }

  const flickedHardEnough = Math.abs(velocityX) >= SWIPE_VELOCITY;
  if (flickedHardEnough) {
    return velocityX < 0 ? 1 : -1;
  }

  return 0;
}
