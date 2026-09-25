# Onboarding Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 5-slide, swipeable onboarding carousel that shows once, right after the intro screen, on a user's first launch — then never again.

**Architecture:** Extends `page.tsx`'s existing local-state boot sequence (native splash → JS intro → app) with one more step (→ onboarding, first launch only). A new `OnboardingProvider` (mirrors the existing `SplashProvider`) persists "has this been seen" via `@capacitor/preferences`. The carousel itself is a self-contained component tree under `src/app/_providers/Onboarding/`, plus one new reusable design-system primitive (`ProgressDots`).

**Tech Stack:** Next.js 16 (static export) / React 19 / TypeScript / Chakra UI v3 / framer-motion / Capacitor 8 (`@capacitor/preferences`, new dependency) / Jest + Testing Library / Storybook (`@storybook/addon-vitest` for interaction tests) / Playwright.

**Spec:** [docs/superpowers/specs/2026-08-28-onboarding-carousel-design.md](../specs/2026-08-28-onboarding-carousel-design.md)

## Global Constraints

- Every task's "done" also means every applicable box in
  [docs/guides/definition-of-done.md](../../guides/definition-of-done.md) is
  checked — that file is not repeated here, just referenced.
- Headless logic (providers, storage helpers) gets Jest `.test.ts`/`.test.tsx`
  files. Visual components get `.stories.tsx` with `play` interaction
  stories, **not** a separate Jest test file — this matches how every
  existing component in this repo is actually tested (see
  `Button.stories.tsx` vs. `safe-area.test.tsx`). Don't invent a third
  pattern.
- `Box` is imported directly from `@chakra-ui/react` in app-level
  orchestration files (`page.tsx`-style files); `Heading`/`Text`/`Button`
  always come from AERYO's own wrappers (`@/components/typography/...`,
  `@/components/actions/Button`) — never Chakra's directly in those files.
- New copy follows brand voice: concise, confident, calm — no marketing
  hype, no extreme-sports clichés (`docs/guides/aeryo-branding.md` §26).
- `npm run lint`, `npm run typecheck`, `npm run format:check` must be clean
  before every commit in this plan — not just at the end.

---

### Task 1: Persisted "has seen onboarding" flag

**Files:**
- Create: `src/app/_providers/Onboarding/Provider/onboardingStorage.ts`
- Test: `src/app/_providers/Onboarding/Provider/onboardingStorage.test.ts`
- Modify: `package.json` (add `@capacitor/preferences`)

**Interfaces:**
- Consumes: `@capacitor/preferences`'s `Preferences.get({ key })` →
  `Promise<{ value: string | null }>` and `Preferences.set({ key, value })`
  → `Promise<void>`.
- Produces: `hasSeenOnboarding(): Promise<boolean>` and
  `markOnboardingSeen(): Promise<void>`, used by Task 2's
  `OnboardingProvider`.

- [ ] **Step 1: Install the dependency**

```bash
npm install @capacitor/preferences@^8.0.1
```

- [ ] **Step 2: Write the failing test**

```ts
// src/app/_providers/Onboarding/Provider/onboardingStorage.test.ts
const get = jest.fn();
const set = jest.fn();

jest.mock("@capacitor/preferences", () => ({
  Preferences: {
    get: (...args: unknown[]) => get(...args),
    set: (...args: unknown[]) => set(...args),
  },
}));

import { hasSeenOnboarding, markOnboardingSeen } from "./onboardingStorage";

describe("onboardingStorage", () => {
  beforeEach(() => {
    get.mockReset();
    set.mockReset();
  });

  describe("hasSeenOnboarding", () => {
    it("returns false when nothing has been stored yet", async () => {
      get.mockResolvedValue({ value: null });
      await expect(hasSeenOnboarding()).resolves.toBe(false);
      expect(get).toHaveBeenCalledWith({ key: "aeryo:onboarding-seen" });
    });

    it("returns true once the flag has been set", async () => {
      get.mockResolvedValue({ value: "true" });
      await expect(hasSeenOnboarding()).resolves.toBe(true);
    });

    it("returns false, not throws, if the read fails", async () => {
      get.mockRejectedValue(new Error("storage unavailable"));
      await expect(hasSeenOnboarding()).resolves.toBe(false);
    });
  });

  describe("markOnboardingSeen", () => {
    it("writes the flag", async () => {
      set.mockResolvedValue(undefined);
      await markOnboardingSeen();
      expect(set).toHaveBeenCalledWith({
        key: "aeryo:onboarding-seen",
        value: "true",
      });
    });

    it("does not throw if the write fails", async () => {
      set.mockRejectedValue(new Error("storage unavailable"));
      await expect(markOnboardingSeen()).resolves.toBeUndefined();
    });
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx jest onboardingStorage -v`
Expected: FAIL — `Cannot find module './onboardingStorage'`

- [ ] **Step 4: Write the implementation**

```ts
// src/app/_providers/Onboarding/Provider/onboardingStorage.ts
import { Preferences } from "@capacitor/preferences";

// Never read/write this key anywhere else — go through the two functions
// below so the key name and storage backend stay in exactly one place.
const ONBOARDING_SEEN_KEY = "aeryo:onboarding-seen";

/**
 * True once the user has completed (or skipped) the onboarding carousel at
 * least once — used to decide whether `page.tsx`'s boot sequence should
 * show it again. Backed by `@capacitor/preferences`, which persists to
 * native platform storage (UserDefaults/SharedPreferences) on iOS/Android
 * and falls back to `localStorage` in a plain browser (`next dev` without
 * Capacitor, Storybook). Never throws: a read failure (corrupt storage,
 * private-browsing blocking `localStorage`) is treated the same as "not
 * seen yet" so a broken read can't crash the boot sequence — worst case
 * the carousel just shows once more than it should.
 */
export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    const { value } = await Preferences.get({ key: ONBOARDING_SEEN_KEY });
    return value === "true";
  } catch (error) {
    console.error("onboardingStorage: failed to read", error);
    return false;
  }
}

/**
 * Records that the user has completed (or skipped) the onboarding
 * carousel, so it doesn't show again on future launches. Swallows write
 * failures — worst case the carousel shows once more next launch, which is
 * a far better failure mode than crashing the boot sequence.
 */
export async function markOnboardingSeen(): Promise<void> {
  try {
    await Preferences.set({ key: ONBOARDING_SEEN_KEY, value: "true" });
  } catch (error) {
    console.error("onboardingStorage: failed to write", error);
  }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx jest onboardingStorage -v`
Expected: PASS, 5 tests

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/app/_providers/Onboarding/Provider/onboardingStorage.ts src/app/_providers/Onboarding/Provider/onboardingStorage.test.ts
git commit -m "feat: add onboarding-seen persistence via @capacitor/preferences"
```

---

### Task 2: OnboardingProvider

**Files:**
- Create: `src/app/_providers/Onboarding/Provider/OnboardingProvider.tsx`
- Test: `src/app/_providers/Onboarding/Provider/OnboardingProvider.test.tsx`

**Interfaces:**
- Consumes: `hasSeenOnboarding()`, `markOnboardingSeen()` from Task 1.
- Produces: `<OnboardingProvider>` and `useOnboarding(): { hasCompletedOnboarding: boolean | null; completeOnboarding: () => void }` — `hasCompletedOnboarding` is `null` while the persisted flag is still loading. Consumed by Task 6's `page.tsx` and `layout.tsx`.

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/_providers/Onboarding/Provider/OnboardingProvider.test.tsx
import { act, render, screen } from "@testing-library/react";

const hasSeenOnboarding = jest.fn();
const markOnboardingSeen = jest.fn();

jest.mock("./onboardingStorage", () => ({
  hasSeenOnboarding: () => hasSeenOnboarding(),
  markOnboardingSeen: () => markOnboardingSeen(),
}));

import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";

function Consumer() {
  const { hasCompletedOnboarding, completeOnboarding } = useOnboarding();
  return (
    <div>
      <div data-testid="state">{String(hasCompletedOnboarding)}</div>
      <button onClick={completeOnboarding}>complete</button>
    </div>
  );
}

describe("OnboardingProvider", () => {
  beforeEach(() => {
    hasSeenOnboarding.mockReset();
    markOnboardingSeen.mockReset().mockResolvedValue(undefined);
  });

  it("throws when useOnboarding is used outside a provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(
      "useOnboarding must be used within an OnboardingProvider",
    );
    spy.mockRestore();
  });

  it("starts as null (loading) then resolves to false when nothing was seen", async () => {
    hasSeenOnboarding.mockResolvedValue(false);
    await act(async () => {
      render(
        <OnboardingProvider>
          <Consumer />
        </OnboardingProvider>,
      );
    });
    expect(screen.getByTestId("state")).toHaveTextContent("false");
  });

  it("resolves to true when the persisted flag says onboarding was seen", async () => {
    hasSeenOnboarding.mockResolvedValue(true);
    await act(async () => {
      render(
        <OnboardingProvider>
          <Consumer />
        </OnboardingProvider>,
      );
    });
    expect(screen.getByTestId("state")).toHaveTextContent("true");
  });

  it("completeOnboarding immediately flips state and persists it", async () => {
    hasSeenOnboarding.mockResolvedValue(false);
    await act(async () => {
      render(
        <OnboardingProvider>
          <Consumer />
        </OnboardingProvider>,
      );
    });
    expect(screen.getByTestId("state")).toHaveTextContent("false");

    await act(async () => {
      screen.getByText("complete").click();
    });

    expect(screen.getByTestId("state")).toHaveTextContent("true");
    expect(markOnboardingSeen).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx jest OnboardingProvider -v`
Expected: FAIL — `Cannot find module './OnboardingProvider'`

- [ ] **Step 3: Write the implementation**

```tsx
// src/app/_providers/Onboarding/Provider/OnboardingProvider.tsx
"use client";

import * as React from "react";
import { hasSeenOnboarding, markOnboardingSeen } from "./onboardingStorage";

interface OnboardingContextValue {
  /**
   * `null` while the persisted flag is still being read (true for one tick
   * on every mount — reading Preferences is async even on web). Callers
   * that gate rendering on this must treat `null` as "not ready yet", not
   * as `false`.
   */
  hasCompletedOnboarding: boolean | null;
  /** Marks onboarding complete (persists it) and updates state immediately. */
  completeOnboarding: () => void;
}

const OnboardingContext = React.createContext<OnboardingContextValue | null>(
  null,
);

export interface OnboardingProviderProps {
  children?: React.ReactNode;
}

/**
 * Tracks whether the user has ever completed (or skipped) the onboarding
 * carousel, backed by `@capacitor/preferences` (see `onboardingStorage.ts`).
 * Mounted once near the root (`src/app/layout.tsx`), alongside
 * `SplashProvider` — `page.tsx`'s boot sequence reads
 * `hasCompletedOnboarding` to decide whether to show the carousel after
 * the intro screen.
 */
export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    let cancelled = false;
    hasSeenOnboarding().then((seen) => {
      if (!cancelled) setHasCompletedOnboarding(seen);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const completeOnboarding = React.useCallback(() => {
    setHasCompletedOnboarding(true);
    void markOnboardingSeen();
  }, []);

  const value = React.useMemo(
    () => ({ hasCompletedOnboarding, completeOnboarding }),
    [hasCompletedOnboarding, completeOnboarding],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * Read onboarding-completion state or mark it complete. Must be used
 * within an `OnboardingProvider` (mounted once near the root — see
 * `src/app/layout.tsx`).
 */
export function useOnboarding(): OnboardingContextValue {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboarding must be used within an OnboardingProvider",
    );
  }
  return context;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx jest OnboardingProvider -v`
Expected: PASS, 4 tests

- [ ] **Step 5: Commit**

```bash
git add src/app/_providers/Onboarding/Provider/OnboardingProvider.tsx src/app/_providers/Onboarding/Provider/OnboardingProvider.test.tsx
git commit -m "feat: add OnboardingProvider"
```

---

### Task 3: Slide content + ProgressDots

**Files:**
- Create: `src/app/_providers/Onboarding/onboardingContent.ts`
- Create: `src/components/data-display/ProgressDots/ProgressDots.tsx`
- Create: `src/components/data-display/ProgressDots/ProgressDots.types.ts`
- Create: `src/components/data-display/ProgressDots/ProgressDots.stories.tsx`
- Create: `src/components/data-display/ProgressDots/index.ts`

**Interfaces:**
- Produces: `ONBOARDING_SLIDES: OnboardingSlideContent[]` (5 items, `{ id, imageSrc, heading, body }`) — consumed by Task 4/5. `ProgressDots` component with props `{ count: number; activeIndex: number }` — consumed by Task 5.

- [ ] **Step 1: Write the content data file**

```ts
// src/app/_providers/Onboarding/onboardingContent.ts
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
```

- [ ] **Step 2: Write ProgressDots' types**

```ts
// src/components/data-display/ProgressDots/ProgressDots.types.ts
export interface ProgressDotsProps {
  /** Total number of steps/slides. */
  count: number;
  /** Zero-based index of the currently active step. */
  activeIndex: number;
}
```

- [ ] **Step 3: Write ProgressDots**

```tsx
// src/components/data-display/ProgressDots/ProgressDots.tsx
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
    >
      {Array.from({ length: count }, (_, index) => (
        <Box
          key={index}
          width={index === activeIndex ? "6" : "1.5"}
          height="1.5"
          borderRadius="full"
          bg={index === activeIndex ? "white" : "whiteAlpha.400"}
          transition="width 0.2s ease-out, background-color 0.2s ease-out"
        />
      ))}
    </HStack>
  );
}
```

- [ ] **Step 4: Write the barrel export**

```ts
// src/components/data-display/ProgressDots/index.ts
export { ProgressDots } from "./ProgressDots";
export type { ProgressDotsProps } from "./ProgressDots.types";
```

- [ ] **Step 5: Write the story (with an interaction test)**

```tsx
// src/components/data-display/ProgressDots/ProgressDots.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Box } from "@chakra-ui/react";
import { ProgressDots } from "./ProgressDots";

/**
 * A decorative row of dots showing position within a fixed number of
 * steps. Not tappable — see `ProgressDots.tsx` for why.
 */
const meta = {
  title: "Data Display/ProgressDots",
  component: ProgressDots,
  tags: ["autodocs", "ai-generated"],
  args: { count: 5, activeIndex: 0 },
  argTypes: {
    count: { control: { type: "number", min: 1, max: 10 } },
    activeIndex: { control: { type: "number", min: 0, max: 9 } },
  },
  decorators: [
    (Story) => (
      <Box bg="black" p="6">
        <Story />
      </Box>
    ),
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ProgressDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LastStep: Story = {
  args: { activeIndex: 4 },
};

export const AccessibleLabel: Story = {
  args: { count: 5, activeIndex: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "Step 3 of 5" }),
    ).toBeVisible();
  },
};
```

- [ ] **Step 6: Run Storybook's test runner to verify the interaction story passes**

Run: `npx vitest --project storybook run ProgressDots`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/app/_providers/Onboarding/onboardingContent.ts src/components/data-display/ProgressDots
git commit -m "feat: add onboarding slide content and ProgressDots component"
```

---

### Task 4: OnboardingSlide

**Files:**
- Create: `src/app/_providers/Onboarding/OnboardingCarousel/OnboardingSlide.tsx`
- Create: `src/app/_providers/Onboarding/OnboardingCarousel/OnboardingSlide.stories.tsx`

**Interfaces:**
- Consumes: `OnboardingSlideContent` (Task 3).
- Produces: `<OnboardingSlide slide={OnboardingSlideContent} />` — consumed by Task 5's `OnboardingCarousel`.

- [ ] **Step 1: Write the component**

```tsx
// src/app/_providers/Onboarding/OnboardingCarousel/OnboardingSlide.tsx
"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import type { OnboardingSlideContent } from "../onboardingContent";

export interface OnboardingSlideProps {
  slide: OnboardingSlideContent;
}

/**
 * One onboarding slide: full-bleed background photo, a scrim so text stays
 * legible, and a heading/body pair anchored near the bottom. Same visual
 * treatment as `IntroScreen` (full-bleed under the safe area, not
 * theme-aware — always sits on a dark photo regardless of the app's own
 * light/dark mode). `OnboardingCarousel` is responsible for positioning
 * this within the swipeable track; this component only renders one
 * slide's own content.
 */
export function OnboardingSlide({ slide }: OnboardingSlideProps) {
  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      <Image
        src={slide.imageSrc}
        alt=""
        fill
        style={{ objectFit: "cover" }}
        // Only the first slide needs eager loading — the rest are revealed
        // by swiping, so let Next.js lazy-load them.
        priority={false}
        draggable={false}
      />

      {/* Scrim — see IntroScreen.tsx for the same treatment/reasoning. */}
      <Box
        position="absolute"
        inset={0}
        style={{
          background:
            "linear-gradient(to top, rgba(11, 15, 20, 0.9) 0%, rgba(11, 15, 20, 0.35) 45%, rgba(11, 15, 20, 0) 75%)",
        }}
        pointerEvents="none"
      />

      {/* `pb="safe.bottom"` on this outer box, plus a further fixed offset
          on the inner one, clears both the home indicator *and*
          `OnboardingCarousel`'s own overlaid dots/button row underneath —
          same nested-padding pattern as `IntroScreen`'s bottom block. */}
      <Box position="absolute" insetX={0} bottom={0} pb="safe.bottom">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          pb="32"
          px={8}
          textAlign="center"
        >
          <Heading as="h2" variant="title" color="white">
            {slide.heading}
          </Heading>
          <Text variant="body" color="whiteAlpha.900">
            {slide.body}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Write the story (with an interaction test for the accessible content)**

```tsx
// src/app/_providers/Onboarding/OnboardingCarousel/OnboardingSlide.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Box } from "@chakra-ui/react";
import { ONBOARDING_SLIDES } from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";

const meta = {
  title: "Patterns/OnboardingSlide",
  component: OnboardingSlide,
  tags: ["ai-generated"],
  args: { slide: ONBOARDING_SLIDES[0] },
  decorators: [
    (Story) => (
      <Box width="375px" height="667px">
        <Story />
      </Box>
    ),
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof OnboardingSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstSlide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        "Real conditions. Real spots. Find out where the wind is taking you next.",
      ),
    ).toBeVisible();
  },
};

export const LastSlide: Story = {
  args: { slide: ONBOARDING_SLIDES[4] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Track Your Progress" }),
    ).toBeVisible();
  },
};
```

- [ ] **Step 3: Run Storybook's test runner to verify the interaction stories pass**

Run: `npx vitest --project storybook run OnboardingSlide`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/_providers/Onboarding/OnboardingCarousel/OnboardingSlide.tsx src/app/_providers/Onboarding/OnboardingCarousel/OnboardingSlide.stories.tsx
git commit -m "feat: add OnboardingSlide"
```

---

### Task 5: OnboardingCarousel

**Files:**
- Create: `src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.tsx`
- Create: `src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.stories.tsx`

**Interfaces:**
- Consumes: `ONBOARDING_SLIDES` (Task 3), `OnboardingSlide` (Task 4), `ProgressDots` (Task 3), `Button` (`@/components/actions/Button`).
- Produces: `<OnboardingCarousel onComplete={() => void} />` — consumed by Task 6's `page.tsx`.

- [ ] **Step 1: Write the component**

```tsx
// src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.tsx
"use client";

import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import * as React from "react";
import { Button } from "@/components/actions/Button";
import { ProgressDots } from "@/components/data-display/ProgressDots";
import { ONBOARDING_SLIDES } from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";

// How far (as a fraction of screen width) a drag has to travel before it
// counts as "advance/go back" instead of snapping back to the current
// slide.
const DRAG_THRESHOLD_RATIO = 0.2;

export interface OnboardingCarouselProps {
  /** Fires once — when the user finishes the last slide or hits Skip. */
  onComplete: () => void;
}

/**
 * The onboarding carousel itself: 5 full-bleed photo slides (see
 * `OnboardingSlide`), swipeable via drag, with a dot progress indicator, a
 * `Skip` button (top-right, every slide but the last), and a `Next`/`Get
 * Started` button (bottom). Every action also works without gestures —
 * `Skip`/`Next`/`Get Started` are real buttons, reachable by keyboard.
 *
 * Mounted by `page.tsx` only when `useOnboarding().hasCompletedOnboarding`
 * is `false` — see that file for the boot-sequence wiring.
 */
export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const goToSlide = React.useCallback((index: number) => {
    setActiveIndex(
      Math.max(0, Math.min(index, ONBOARDING_SLIDES.length - 1)),
    );
  }, []);

  const handleNext = React.useCallback(() => {
    if (isLastSlide) {
      onComplete();
    } else {
      goToSlide(activeIndex + 1);
    }
  }, [isLastSlide, onComplete, goToSlide, activeIndex]);

  const handleDragEnd = React.useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const width = trackRef.current?.offsetWidth ?? 1;
      const ratio = info.offset.x / width;
      if (ratio < -DRAG_THRESHOLD_RATIO) {
        goToSlide(activeIndex + 1);
      } else if (ratio > DRAG_THRESHOLD_RATIO) {
        goToSlide(activeIndex - 1);
      }
      // Otherwise: snap back to the current slide (handled by the
      // `animate` prop re-applying `x: -activeIndex * 100%`).
    },
    [activeIndex, goToSlide],
  );

  return (
    <Box
      position="relative"
      width="100vw"
      height="100dvh"
      overflow="hidden"
      style={{
        marginTop: "calc(-1 * var(--safe-top))",
        marginBottom: "calc(-1 * var(--safe-bottom))",
        marginLeft: "calc(-1 * var(--safe-left))",
        marginRight: "calc(-1 * var(--safe-right))",
      }}
    >
      <Box ref={trackRef} position="relative" width="100%" height="100%">
        <motion.div
          style={{
            display: "flex",
            width: `${ONBOARDING_SLIDES.length * 100}%`,
            height: "100%",
          }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{
            x: `${-activeIndex * (100 / ONBOARDING_SLIDES.length)}%`,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          {ONBOARDING_SLIDES.map((slide) => (
            <Box
              key={slide.id}
              width={`${100 / ONBOARDING_SLIDES.length}%`}
              height="100%"
              flexShrink={0}
            >
              <OnboardingSlide slide={slide} />
            </Box>
          ))}
        </motion.div>
      </Box>

      <Box position="absolute" top="0" insetX="0" pt="safe.top" px="4">
        {!isLastSlide && (
          <Box display="flex" justifyContent="flex-end" pt="2">
            <Button variant="ghost" size="sm" onClick={onComplete}>
              Skip
            </Button>
          </Box>
        )}
      </Box>

      <Box position="absolute" bottom="0" insetX="0" pb="safe.bottom" px="8">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="4"
          pb="10"
        >
          <ProgressDots
            count={ONBOARDING_SLIDES.length}
            activeIndex={activeIndex}
          />
          <Button intent="primary" fullWidth onClick={handleNext}>
            {isLastSlide ? "Get Started" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Write the story (with interaction tests for Skip, Next, and completing)**

```tsx
// src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { OnboardingCarousel } from "./OnboardingCarousel";

const meta = {
  title: "Patterns/OnboardingCarousel",
  component: OnboardingCarousel,
  tags: ["ai-generated"],
  args: { onComplete: fn() },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OnboardingCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("group", { name: "Step 1 of 5" }),
    ).toBeVisible();
  },
};

export const SkipCompletesImmediately: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Skip" }));
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};

export const NextAdvancesToSecondSlide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("heading", { name: "Discover the Elements" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("group", { name: "Step 2 of 5" }),
    ).toBeVisible();
  },
};

export const LastSlideShowsGetStarted: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const next = () =>
      userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await next();
    await next();
    await next();
    await next();
    await expect(
      canvas.getByRole("heading", { name: "Track Your Progress" }),
    ).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Skip" })).toBeNull();

    await userEvent.click(
      canvas.getByRole("button", { name: "Get Started" }),
    );
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};
```

- [ ] **Step 3: Run Storybook's test runner to verify all interaction stories pass**

Run: `npx vitest --project storybook run OnboardingCarousel`
Expected: PASS, all 4 stories

- [ ] **Step 4: Commit**

```bash
git add src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.tsx src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.stories.tsx
git commit -m "feat: add OnboardingCarousel"
```

---

### Task 6: Wire onboarding into the boot sequence

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.stories.tsx`

**Interfaces:**
- Consumes: `OnboardingProvider`/`useOnboarding` (Task 2), `OnboardingCarousel` (Task 5).

- [ ] **Step 1: Wrap the app in `OnboardingProvider`**

In `src/app/layout.tsx`, add the import and wrap `SafeAreaProvider` the same way `SplashProvider` already wraps everything:

```tsx
import { OnboardingProvider } from "./providers/Onboarding/Provider/OnboardingProvider";
```

```tsx
      <body>
        <SplashProvider>
          <OnboardingProvider>
            <SafeAreaProvider>
              <Provider>{children}</Provider>
            </SafeAreaProvider>
          </OnboardingProvider>
        </SplashProvider>
      </body>
```

- [ ] **Step 2: Extend `page.tsx`'s boot sequence**

Replace the whole file with:

```tsx
"use client";

import { Box } from "@chakra-ui/react";
import * as React from "react";
import { OnboardingCarousel } from "@/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel";
import { useOnboarding } from "@/app/_providers/Onboarding/Provider/OnboardingProvider";
import { IntroScreen } from "@/app/_providers/SplashScreen/IntroScreen/IntroScreen";
import { useSplashScreen } from "@/app/_providers/SplashScreen/Provider/SplashProvider";
import { Heading } from "@/components/typography/Heading";

// Minimum time the intro stays on screen after its background image has
// painted, so the logo/tagline reveal and wind-line drift actually have
// room to be seen instead of flashing by on a warm cache/fast device.
const MIN_INTRO_MS = 2500;

// Capacitor always loads the app at "/" (this route) — there's no separate
// "intro"/"onboarding" URL a real launch ever visits. So the native-splash
// → JS-intro → onboarding (first launch only) → real-app sequence has to
// live here, as local state, rather than as distinct routes. See
// SplashProvider for how the native splash itself gets hidden,
// OnboardingProvider for how "seen onboarding" is persisted, and
// IntroScreen/OnboardingCarousel for the actual screens.
export default function Home() {
  const { hideNativeSplash } = useSplashScreen();
  const { hasCompletedOnboarding, completeOnboarding } = useOnboarding();
  const [minDwellElapsed, setMinDwellElapsed] = React.useState(false);
  // Placeholder until there's real app data to wait on (e.g. the home
  // screen's initial fetch) — swap this `useState(true)` for actual
  // readiness once that exists. The intro won't clear until BOTH this AND
  // the minimum dwell time above are true, so wiring in real readiness
  // later is the only change needed to make the intro naturally wait for
  // real loading instead of a fixed guess.
  const [appReady] = React.useState(true);

  const showIntro = !(minDwellElapsed && appReady);

  const handleBackgroundLoad = React.useCallback(() => {
    hideNativeSplash();
    window.setTimeout(() => setMinDwellElapsed(true), MIN_INTRO_MS);
  }, [hideNativeSplash]);

  if (showIntro) {
    return <IntroScreen onBackgroundLoad={handleBackgroundLoad} />;
  }

  // `hasCompletedOnboarding` is `null` for one tick while the persisted
  // flag is still being read — treat that the same as "not completed yet"
  // (render nothing rather than flashing home content first) so there's
  // no flicker of home behind the carousel on a first launch.
  if (hasCompletedOnboarding !== true) {
    return <OnboardingCarousel onComplete={completeOnboarding} />;
  }

  return (
    <Box
      bg="bg"
      color="fg"
      // Not full-bleed (unlike IntroScreen/OnboardingCarousel) — `body`
      // (globals.css) already reserves safe-area space via padding and
      // lays its children out with `display: flex; flex-direction:
      // column`. `flex="1"` fills exactly what's left after that padding;
      // a `100dvh` height here would double-count the safe-area padding
      // on top of the full viewport height and force the page to scroll
      // on both iOS and Android even though nothing is tall enough to
      // need it.
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1">Hello world</Heading>
    </Box>
  );
}
```

- [ ] **Step 3: Update `page.stories.tsx` for the new step**

```tsx
// src/app/page.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, waitFor, within } from "storybook/test";
import { OnboardingProvider } from "@/app/_providers/Onboarding/Provider/OnboardingProvider";
import { SplashProvider } from "@/app/_providers/SplashScreen/Provider/SplashProvider";
import Home from "./page";

// `Home` reads `useSplashScreen()` (SplashProvider) and `useOnboarding()`
// (OnboardingProvider) — outside either it throws, so every story needs
// both decorators. See src/app/_providers/SplashScreen/Provider/SplashProvider.tsx
// and src/app/_providers/Onboarding/Provider/OnboardingProvider.tsx.
const meta = {
  component: Home,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <SplashProvider>
        <OnboardingProvider>
          <Story />
        </OnboardingProvider>
      </SplashProvider>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

// Capacitor always opens the app at "/" — this route renders the intro
// (background photo, logo, tagline) first and only swaps to the real app
// once its background image has painted and a minimum dwell time has
// passed. See the comment atop page.tsx.
export const Default: Story = {
  play: async ({ canvas }) => {
    // The logo/tagline fade+scale in via Framer Motion (IntroScreen) rather
    // than appearing instantly, so give the reveal transition (~1s worst
    // case, including the tagline's stagger delay) time to finish before
    // asserting visibility.
    await waitFor(() => expect(canvas.getByAltText("Aeryo")).toBeVisible(), {
      timeout: 2000,
    });
    await waitFor(
      () =>
        expect(canvas.getByText("Where the Unseen Leads")).toBeVisible(),
      { timeout: 2000 },
    );
  },
};

// Simulates the background image finishing its load, which is the signal
// page.tsx waits for before starting the swap away from the intro. On a
// first "launch" (Storybook has no persisted Preferences value), that swap
// lands on the onboarding carousel, not home directly.
export const TransitionsToOnboarding: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const background = canvasElement.querySelector('img[alt=""]');
    if (!background) throw new Error("background image not found");

    fireEvent.load(background);

    await waitFor(
      () =>
        expect(
          canvas.getByRole("heading", { name: "Adventure Awaits" }),
        ).toBeVisible(),
      { timeout: 4000 },
    );
  },
};
```

- [ ] **Step 4: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: no errors

- [ ] **Step 5: Run the Storybook interaction tests for `page.tsx`**

Run: `npx vitest --project storybook run page.stories`
Expected: PASS, both stories

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/page.stories.tsx
git commit -m "feat: show onboarding carousel after intro on first launch"
```

---

### Task 7: Update Playwright E2E coverage

**Files:**
- Modify: `e2e/intro-sequence.spec.ts`
- Modify: `e2e/color-mode.spec.ts`
- Create: `e2e/onboarding-carousel.spec.ts`

**Interfaces:**
- Consumes: the running app (`page.goto("/")`), and the same
  `"aeryo:onboarding-seen"` `localStorage` key `onboardingStorage.ts` (Task
  1) writes on web, pre-seeded directly via
  `page.addInitScript`/`localStorage.setItem` to simulate a returning user.

- [ ] **Step 1: Update `intro-sequence.spec.ts` for the new first-launch path**

```ts
// e2e/intro-sequence.spec.ts
import { test, expect } from "@playwright/test";

test.describe("splash → intro → onboarding → home", () => {
  test("first launch: intro transitions to onboarding, not home", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByAltText("Aeryo")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Where the Unseen Leads")).toBeVisible({
      timeout: 3000,
    });

    await expect(
      page.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("returning user (onboarding already seen) goes straight to home", async ({
    page,
  }) => {
    // Simulate a returning user: pre-seed the flag `onboardingStorage.ts`
    // checks, using the same key/value it writes on web
    // (`@capacitor/preferences`'s browser fallback is `localStorage`).
    await page.addInitScript(() => {
      window.localStorage.setItem("aeryo:onboarding-seen", "true");
    });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("home page is never scrollable", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("aeryo:onboarding-seen", "true");
    });
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    const { scrollHeight, clientHeight } = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));

    expect(scrollHeight).toBeLessThanOrEqual(clientHeight);
  });
});
```

- [ ] **Step 2: Pre-seed the flag in `color-mode.spec.ts`**

Add the same `page.addInitScript` block (as above) to both tests in
`e2e/color-mode.spec.ts`, right before their existing `await page.goto("/")`
calls, so they keep testing home's colors instead of landing on the
carousel.

- [ ] **Step 3: Write the new onboarding carousel spec**

```ts
// e2e/onboarding-carousel.spec.ts
import { test, expect } from "@playwright/test";

// These tests deliberately start from a fresh (unseeded) `localStorage` —
// that's what puts a first launch on the onboarding carousel at all.
test.describe("onboarding carousel", () => {
  async function getToOnboarding(page: import("@playwright/test").Page) {
    await page.goto("/");
    const background = page.locator('img[alt=""]').first();
    await background.dispatchEvent("load");
    await expect(
      page.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible({ timeout: 5000 });
  }

  test("Skip goes straight to home and persists across a reload", async ({
    page,
  }) => {
    await getToOnboarding(page);
    await page.getByRole("button", { name: "Skip" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });

  test("Next advances through all 5 slides, Get Started completes and persists", async ({
    page,
  }) => {
    await getToOnboarding(page);

    const headings = [
      "Discover the Elements",
      "Master the Conditions",
      "Find Your Community",
      "Track Your Progress",
    ];

    for (const heading of headings) {
      await page.getByRole("button", { name: "Next" }).click();
      await expect(page.getByRole("heading", { name: heading })).toBeVisible(
        { timeout: 3000 },
      );
    }

    await expect(page.getByRole("button", { name: "Skip" })).toHaveCount(0);
    await page.getByRole("button", { name: "Get Started" }).click();

    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });

    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: "Hello world" }),
    ).toBeVisible({ timeout: 5000 });
  });
});
```

- [ ] **Step 4: Run the full Playwright suite**

Run: `npm run test:e2e`
Expected: PASS, all specs (`webkit` and `chromium` projects)

- [ ] **Step 5: Commit**

```bash
git add e2e/intro-sequence.spec.ts e2e/color-mode.spec.ts e2e/onboarding-carousel.spec.ts
git commit -m "test: cover onboarding carousel end-to-end"
```

---

### Task 8: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full local check suite**

```bash
npm run lint
npm run typecheck
npm run format:check
npm test -- --coverage
npm run test:storybook
npm run build
npm run test:e2e
```

Expected: every command exits 0. Coverage thresholds in `jest.config.ts`
must still pass (this feature adds tested logic, so coverage should not
drop below the existing floor).

- [ ] **Step 2: Native config sync check (matches CI's Tier 1 job 6)**

```bash
npx cap sync ios
npx cap sync android
```

Expected: both complete without error — confirms the new
`@capacitor/preferences` plugin is picked up correctly by both native
projects.

- [ ] **Step 3: Manual device/simulator check**

Run the app on an iOS Simulator (`npm run ios:open`, or `npm run dev` +
`npm run ios:sync` for live reload) with fresh app storage (delete the app
from the simulator first, or `xcrun simctl erase` it) and confirm, against
the [Definition of Done checklist](../../guides/definition-of-done.md):

- Splash → intro → all 5 onboarding slides in order → home, on first
  launch
- Force-quit and relaunch: goes straight from intro to home, no carousel
- Skip, at any slide, ends onboarding and persists
- Swipe left/right moves between slides; Next/Get Started/Skip all work by
  tap too
- Toggle iOS Simulator's Settings → Accessibility → Motion → Reduce Motion:
  slide transitions become instant, everything still navigable
- Check in both light and dark mode (Simulator's system appearance
  toggle) — carousel should look identical in both (it's intentionally not
  theme-aware), home's "Hello world" should still correctly follow the
  mode
- No layout ever runs under the notch/home indicator incorrectly

- [ ] **Step 4: Commit anything left uncommitted**

```bash
git status
```

If anything is outstanding (e.g. a `package-lock.json` update from `cap
sync`), commit it with a clear message. Otherwise, nothing to do — this
task is verification-only.
