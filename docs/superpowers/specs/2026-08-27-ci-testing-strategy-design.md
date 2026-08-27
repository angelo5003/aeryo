# CI & Testing Strategy for Aeryo (iOS & Android via Capacitor)

**Date:** 2026-08-27
**Status:** Approved design, ready for implementation plan

## The problem, in plain English

Aeryo has zero CI today — no `.github` folder at all. Anyone can merge a PR
that breaks the build, breaks a test, or silently breaks native iOS/Android
compilation, and nothing catches it until someone happens to run it by hand.
We've already hit exactly this class of bug multiple times this session
(the `allowedDevOrigins` 403 that silently broke live reload, the inverted
`SystemBarsStyle` mapping, a stale test asserting on boilerplate text that
no longer exists) — all things a CI pipeline would have caught immediately.

We want: every PR automatically checked, a real coverage floor that only
ever goes up, an E2E suite that exercises the app the way a user actually
would, and confidence that the app still compiles natively on both
platforms — without turning a small, pre-revenue app's CI bill into
something disproportionate to its size.

## Why we're building it this way

**Two tiers, split by cost, not by importance.** iOS builds need a macOS
GitHub Actions runner, which is roughly 10x the per-minute cost (and eats
the free-tier minutes 10x faster) of a Linux runner. Compiling native code
on every single PR would make the feedback loop slow and the Actions bill
disproportionate for an app this size. So:

- **Tier 1 (every PR, Linux only, fast, free-tier-friendly):** everything
  that doesn't need real native compilation — lint, typecheck, unit tests,
  Storybook component tests, a real `next build` (this alone would have
  caught the static-export config gap from earlier), `cap sync` for both
  platforms (catches native config drift without compiling anything), and
  a Playwright E2E suite run through both `webkit` (the same rendering
  engine iOS's WKWebView uses) and `chromium` (a close match for Android's
  WebView) — real engine-level iOS/Android signal without needing a
  simulator, an emulator, or any code signing.
- **Tier 2 (only on push to `main`, macOS + Linux runners):** a real iOS
  build (Simulator target — deliberately *not* a real device, so no
  code-signing certs or provisioning profiles are needed at all) and a real
  Android debug build (`.apk`, also unsigned). This exists purely to prove
  "does this still compile natively," continuously, cheaply, days before a
  bug would otherwise be discovered in a pre-release crunch — not to
  produce anything distributable. Actual store-signed release builds are a
  separate, later concern layered on top whenever the app is actually
  ready to ship, not part of this pipeline.

**Coverage: ratchet from a real, honest baseline, not an aspirational
number set in a vacuum.** `jest.config.ts` currently has no
`collectCoverageFrom`, so its coverage report only reflects the ~9 files
that already happen to have tests (mostly design-system tokens) — not the
161 real source files in the app. Once scoped to the whole app honestly,
today's real baseline is:

- Statements: 12.6%
- Branches: 10.77%
- Functions: 4.48%
- Lines: 12.6%

80-90% coverage is the real goal, but reaching it means writing tests for
roughly 150 currently-untested files — realistically more work than
everything built in this entire session combined. Blocking CI on hitting
80-90% before it can exist at all would mean no CI for a long time. Instead
CI ships today enforcing a floor a couple points under today's real numbers,
so a trivial fluctuation (mock ordering, an untested branch added in the
same PR as a tested one) doesn't flake an unrelated PR:

- Statements: 10%
- Branches: 8%
- Functions: 3%
- Lines: 10%

A PR can never *lower* coverage below this floor, and
raising the enforced floor over time is a deliberate, manual edit as more
tests land, not automatic. Reaching 80-90% becomes a tracked, ongoing goal
worked on incrementally, not a blocker to having any CI at all.

**One known gap, deliberately not solved today:** Storybook's
`play`-function tests (run via `@storybook/addon-vitest`) exercise real
component behavior but report coverage through a separate Vitest coverage
run, not Jest's. The two aren't merged into one number here. Worth
revisiting once the Jest-measured coverage floor is meaningfully higher and
merging the two becomes worth the setup cost.

## Pipeline 1 — `pr-checks.yml` (every PR, required to merge)

Runs on `pull_request` targeting `main`. Jobs, roughly in dependency order
(faster/cheaper jobs first, so a PR fails fast on the cheap checks before
burning time on slower ones):

1. **Lint** — `npm run lint` (ESLint)
2. **Typecheck** — `tsc --noEmit`
3. **Unit/component tests + coverage** — `jest --coverage`, coverage
   thresholds enforced at the baseline above (`coverageThreshold` in
   `jest.config.ts`)
4. **Storybook interaction tests** — `vitest --project storybook` (the
   existing `.stories.tsx` `play` functions — currently not run in any CI
   at all)
5. **Web build** — `next build`, confirming the static export (`out/`)
   actually produces cleanly. This is exactly the class of break that
   nearly slipped through earlier in this session.
6. **Native config sync** — `npx cap sync ios` and `npx cap sync android`,
   confirming `capacitor.config.ts` and installed plugins are valid and in
   sync with the native projects, without compiling anything
7. **E2E (Playwright)** — `webkit` and `chromium` projects, run against the
   built app (see scope below), in parallel with each other

All jobs required as passing status checks before merge (branch protection,
below). No job in this tier needs secrets or signing.

### What the Playwright E2E suite covers

Scoped to what actually exists and is cross-cutting, not invented ahead of
real screens:

1. **Splash → intro → home sequence** — native-splash handoff isn't
   E2E-testable from a browser (there's no native shell), but everything
   from the JS intro screen onward is: intro renders (background image,
   logo, tagline), the `minDwellElapsed && appReady` gate correctly holds
   the intro until both are true, it transitions to home content, and the
   page is never scrollable when it shouldn't be (a real bug fixed this
   session — this suite exists partly so it can't come back silently)
2. **Color mode rendering** — the app's actual rendered `bg`/`fg` colors
   under both light and dark system preference, end-to-end through real
   rendering rather than only the component-level assertions
   `status-bar-sync.test.tsx` already covers

As real screens (onboarding carousel, etc.) get built, this suite grows
with them — this list isn't meant to be exhaustive forever, just accurate
to what exists today.

## Pipeline 2 — `main-native-build.yml` (push to `main` only)

Not a merge gate (it can't be — it only runs after merge). Reports as a
commit status on `main`. A failure here means "fix forward immediately,"
not "auto-revert" — no revert bot for an app this size; a human decides.

1. **iOS build** (`macos-latest` runner): `xcodebuild -sdk iphonesimulator`
   against the synced native project — Simulator target only, no signing
2. **Android build** (`ubuntu-latest` runner, Android SDK + JDK): Gradle
   `assembleDebug`, unsigned `.apk`

## Branch protection (Section D)

On `main`:

- Require the Tier 1 status checks (all jobs in `pr-checks.yml`) to pass
  before merge is allowed
- Require the branch to be up to date with `main` before merging (avoids
  merging a PR whose checks ran against a stale base)
- Tier 2 (`main-native-build.yml`) is **not** a required check on PRs — it
  can't be, since it only runs post-merge — but its status is visible on
  `main`'s commit history for anyone to check

## Testing / verification of this design itself

Once implemented:

- A deliberately broken PR (e.g. a lint error, a failing test, a
  `next.config.ts` typo) should be blocked from merging by the required
  checks
- `main-native-build.yml` should be confirmed to actually produce a
  Simulator-buildable `.app` and a debug `.apk` on a real `main` push, not
  just "the workflow file is syntactically valid"
- The stale `__tests__/page.test.tsx` (asserts on boilerplate "Get
  started"/`h1` content that no longer exists — same root cause as the
  `page.stories.tsx` staleness fixed earlier this session) is deleted as
  part of this work, not left to fail Tier 1 on day one; its coverage is
  already fully subsumed by `page.stories.tsx`'s `Default` and
  `TransitionsToHome` stories
