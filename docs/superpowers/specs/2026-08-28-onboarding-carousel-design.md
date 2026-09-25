# Onboarding Carousel — Design

**Date:** 2026-08-28
**Status:** Approved design, ready for implementation plan

## The problem, in plain English

Right now `page.tsx` boots straight from the intro screen into the real app
(currently a "Hello world" placeholder). There's no moment that tells a
first-time user what AERYO actually is before dropping them into the
product. The design guide's "First Screens to Design" list
(`docs/guides/kitesurf-app.md` §30) puts **Onboarding** first, ahead of even
the home screen.

Five full-bleed photo assets already exist at
`public/assets/onboarding/*.webp` (941×1672, ~9:16, same dramatic/moody
style as the intro screen's `splash.png`) with filenames that map cleanly
onto the brand guide's emotional hierarchy (`aeryo-branding.md` §27:
Curiosity → Understanding → Confidence → Freedom → Progression). This spec
turns those into a working 5-slide onboarding carousel.

## Decisions

### 1. What it is

A 5-slide, swipeable, full-bleed photo carousel shown once, after the intro
screen and before real app content. Same "photo + gradient scrim + white
text" treatment as `IntroScreen.tsx`, not a card-based UI — it's a
continuation of the same visual language, not a new one.

### 2. Where it lives in the boot sequence

Capacitor always opens the app at `/` — there's no URL a real launch ever
visits other than that (same reasoning `page.tsx`'s existing comment gives
for the intro screen). So onboarding extends the same local-state sequence
in `page.tsx` rather than becoming its own route:

```
native splash → JS intro → onboarding carousel (first launch only) → app
```

On every launch after the first, the sequence skips straight from intro to
app, exactly like it does today.

### 3. File structure

Mirrors the existing `SplashScreen` provider/screen split:

```
src/app/_providers/Onboarding/
  Provider/
    onboardingStorage.ts       — Preferences read/write, no React
    OnboardingProvider.tsx     — context + useOnboarding() hook
  OnboardingCarousel/
    OnboardingCarousel.tsx     — swipe/dots/buttons orchestration
    OnboardingSlide.tsx        — one slide's visuals
  onboardingContent.ts         — the 5 slides' copy + image paths
```

Plus one new reusable design-system primitive (not onboarding-specific —
any future carousel/stepper can reuse it):

```
src/components/data-display/ProgressDots/
  ProgressDots.tsx
  ProgressDots.types.ts
  ProgressDots.stories.tsx
  index.ts
```

### 4. Persistence

New dependency: `@capacitor/preferences` (`^8.0.1`, matches the installed
`@capacitor/core@^8.5.0`). Stores a single flag,
`"aeryo:onboarding-seen"` → `"true"`, written the moment the user finishes
**or skips** the carousel (skipping counts as "seen" — it should never come
back just because they didn't watch the whole thing). Falls back to
`localStorage` automatically in a plain browser (`next dev`, Storybook) —
this is the plugin's own documented web behavior, not something this
feature needs to special-case.

A read/write failure is treated as "not seen" / logged-and-ignored,
respectively — never lets a storage error block the boot sequence (same
philosophy as `SplashProvider`'s safety-net timeout).

### 5. Interaction model

- Swipe left/right between slides (`framer-motion` `drag="x"`), with a
  drag-distance threshold to decide whether to advance/go back or snap
  back to the current slide.
- A row of dots (`ProgressDots`) shows position — **decorative only, not
  tappable**, to keep this feature's first version scoped. (A future
  feature can make them tappable — `ProgressDots` itself doesn't prevent
  it, only `OnboardingCarousel`'s usage of it does.)
- `Skip` button, top-right, on every slide except the last — immediately
  completes onboarding.
- `Next` button, bottom, on slides 1–4; becomes `Get Started` on slide 5 —
  both call the same completion path, `Get Started` just reads
  differently.
- All navigation also works with **zero gestures**: `Skip`/`Next`/`Get
  Started` are real `<button>`s (via AERYO's `Button` component), reachable
  and operable by keyboard/screen reader — swiping is a convenience, not
  the only way through.
- Respects `prefers-reduced-motion`: slide transitions become an instant
  swap (duration 0) instead of an animated slide; drag is disabled — glued
  to button navigation isn't a materially worse experience for someone
  who's opted out of motion.

### 6. Content

| Order | Asset | Heading | Body | Emotional-hierarchy stage |
|---|---|---|---|---|
| 1 | `adventure-awaits-splash-screen.webp` | Adventure Awaits | Real conditions. Real spots. Find out where the wind is taking you next. | Curiosity |
| 2 | `discover-the-elements-screen.webp` | Discover the Elements | Wind, swell, tide — read every spot at a glance, in plain language. | Understanding |
| 3 | `master-the-conditions-screen.webp` | Master the Conditions | Know before you go. See what's building, and when it's worth the drive. | Confidence |
| 4 | `find-your-community-screen.webp` | Find Your Community | See who's out, right now. Ride with people who already know the spot. | Freedom |
| 5 | `track-your-progress-screen.webp` | Track Your Progress | Log every session. Watch your riding grow, one wind day at a time. | Progression |

Copy follows brand voice (`aeryo-branding.md` §26 — concise, confident,
calm; no hype/clichés). Lives in one data file
(`onboardingContent.ts`), not scattered across components, so copy edits
never touch component code.

### 7. Destination after "Get Started"

Just falls through to whatever `page.tsx` renders next today (currently the
"Hello world" placeholder) — same as intro does now. Re-pointing this at a
real Landing/Auth screen is that future page's problem, not this feature's;
explicitly out of scope here, per the page-build-roadmap's own phase
ordering.

## Out of scope

- Tappable dots / jump-to-slide navigation.
- Personalization questions (skill level, home spot) — that's Epic 3
  (Profile), post-auth, not onboarding.
- Any wiring to a real destination screen (Landing/Auth don't exist yet).
- Analytics/tracking of onboarding funnel drop-off.

## Testing plan

- **Jest** (`.test.ts`/`.test.tsx`, headless logic only, matches
  `safe-area.test.tsx`/`status-bar-sync.test.tsx`'s mocking pattern):
  `onboardingStorage.ts`, `OnboardingProvider.tsx`.
- **Storybook** (`.stories.tsx` with `play` interaction stories, matches
  `Button.stories.tsx`'s pattern — this is where visual-component coverage
  lives in this repo, not Jest): `ProgressDots`, `OnboardingSlide`,
  `OnboardingCarousel`.
- **Playwright E2E**: extend `e2e/intro-sequence.spec.ts` (first-run now
  shows onboarding before home; a pre-seeded "seen" flag skips straight to
  home) and add `e2e/onboarding-carousel.spec.ts` (skip button, swiping
  through all 5 slides, Get Started completes and persists). Fix
  `e2e/color-mode.spec.ts` to pre-seed the "seen" flag so it keeps testing
  home's colors, not the carousel's.

## Testing / verification of this design itself

- A fresh app launch (cleared storage) shows intro → all 5 onboarding
  slides in order → home, and never shows onboarding again on a second
  launch.
- `Skip` from any slide goes straight to home and also persists (verified
  by relaunching).
- Toggling OS-level `prefers-reduced-motion` removes the slide-transition
  animation without breaking navigation.
- Light and dark mode both checked — the scrim/text treatment is
  deliberately not theme-aware (same call as `IntroScreen`), so this is
  really "confirm it still reads correctly regardless of the app's mode."
