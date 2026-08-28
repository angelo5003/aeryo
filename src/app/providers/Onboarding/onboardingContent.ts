export interface OnboardingSlideContent {
  /** Stable id — used as the React key and as carousel selection state. */
  id: string;
  /** Path under `public/` for the full-bleed background photo. */
  imageSrc: string;
  heading: string;
  body: string;
}

/**
 * The 5 onboarding slides, in display order. Order and copy follow AERYO's
 * emotional hierarchy (docs/guides/aeryo-branding.md §27: Curiosity →
 * Understanding → Confidence → Freedom → Progression) — copy is
 * deliberately short and declarative per the brand voice (§26), not
 * hype/clichés. Photos are pre-cropped 941×1672 (~9:16) portraits under
 * `public/assets/onboarding/` — same full-bleed treatment as the intro
 * screen's `splash.png` (see `IntroScreen.tsx`).
 *
 * Ids are authored and stable (not generated). A UUID library would only
 * add churn for content that already has a natural identity.
 */
export const ONBOARDING_SLIDES: OnboardingSlideContent[] = [
  {
    id: "adventure-awaits",
    imageSrc: "/assets/onboarding/adventure-awaits-splash-screen.webp",
    heading: "Adventure Awaits",
    body: "Real conditions. Real spots. Find out where the wind is taking you next.",
  },
  {
    id: "discover-the-elements",
    imageSrc: "/assets/onboarding/discover-the-elements-screen.webp",
    heading: "Discover the Elements",
    body: "Wind, swell, tide — read every spot at a glance, in plain language.",
  },
  {
    id: "master-the-conditions",
    imageSrc: "/assets/onboarding/master-the-conditions-screen.webp",
    heading: "Master the Conditions",
    body: "Know before you go. See what's building, and when it's worth the drive.",
  },
  {
    id: "find-your-community",
    imageSrc: "/assets/onboarding/find-your-community-screen.webp",
    heading: "Find Your Community",
    body: "See who's out, right now. Ride with people who already know the spot.",
  },
  {
    id: "track-your-progress",
    imageSrc: "/assets/onboarding/track-your-progress-screen.webp",
    heading: "Track Your Progress",
    body: "Log every session. Watch your riding grow, one wind day at a time.",
  },
];

export const ONBOARDING_SLIDE_IDS = ONBOARDING_SLIDES.map((slide) => slide.id);

export const FIRST_ONBOARDING_SLIDE_ID = ONBOARDING_SLIDE_IDS[0];
export const LAST_ONBOARDING_SLIDE_ID =
  ONBOARDING_SLIDE_IDS[ONBOARDING_SLIDE_IDS.length - 1];

/** First two slides: LCP plus the one Next reveals immediately. */
export const PRELOAD_ONBOARDING_SLIDE_IDS = new Set(
  ONBOARDING_SLIDE_IDS.slice(0, 2),
);

/** Next slide in display order, or `undefined` when `currentId` is last/unknown. */
export function getNextOnboardingSlideId(
  currentId: string,
): string | undefined {
  const current = ONBOARDING_SLIDES.findIndex((slide) => slide.id === currentId);
  if (current === -1) {
    return undefined;
  }
  return ONBOARDING_SLIDES[current + 1]?.id;
}
