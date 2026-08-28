export interface OnboardingSlideContent {
  /** Stable id — used as the React key. */
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
