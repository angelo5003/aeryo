# Definition of Done — every AERYO feature

A short, reusable checklist. Every implementation plan under
`docs/superpowers/plans/` should reference this file in its "Global
Constraints" section instead of re-listing these — so they stay in exactly
one place and apply automatically to every future feature, not just the one
that happened to prompt writing this down.

This is the stuff that's easy to forget mid-feature because the happy path
"works" without it. None of it is optional for a screen that's actually
going into the app (as opposed to a throwaway spike).

## Visual

- [ ] **Both color modes checked** — render the screen in light *and* dark
  mode (`DarkMode`/`LightMode` from `@/components/ui/color-mode`, or the OS
  toggle on a real device). A screen that only ever gets eyeballed in one
  mode routinely ships broken in the other.
- [ ] **Both platforms sized** — check on a small phone width (375px) and a
  tablet/larger width, not just whatever your dev monitor happens to be.
  Use the shared `RESPONSIVE_VIEWPORTS`
  (`src/components/internal/storybookViewports.ts`) for Storybook stories.
- [ ] **Safe areas respected** — anything full-bleed (edge-to-edge photos,
  fixed headers/footers) accounts for the notch/status bar/home indicator.
  Use the `safe.*` Chakra spacing tokens, or the `--safe-*` CSS custom
  properties for full-bleed surfaces that need to run *under* the inset and
  pad their content manually (see `IntroScreen.tsx` for the pattern).
- [ ] **Motion respects `prefers-reduced-motion`** — every animation has a
  reduced-motion fallback (`useReducedMotion()` from `framer-motion`) that
  shows the end state instantly instead of skipping/half-playing it.

## Behavior

- [ ] **Persisted state survives a relaunch, not just a re-render** — if a
  feature has "don't show this again" / "remember my choice" behavior,
  verify it against a real Preferences/storage read, not just in-memory
  React state that resets on refresh.
- [ ] **Failure paths don't crash the boot sequence** — a storage read/write
  failure, a network failure, an image that never loads: each should
  degrade gracefully (log + fall back), never leave the user stuck on a
  blank/frozen screen. Follow the existing safety-net pattern in
  `SplashProvider.tsx` (a timeout that force-progresses if the expected
  signal never arrives).
- [ ] **Keyboard/screen-reader operable** — every action reachable by touch
  (tap, swipe, drag) has a non-gesture equivalent (a real `<button>`,
  reachable by Tab, with a clear accessible name). Swipe-only navigation
  with no button fallback is not acceptable.

## Testing (matches the repo's actual split — see
`docs/superpowers/specs/2026-08-27-ci-testing-strategy-design.md`)

- [ ] **Headless logic** (hooks, providers, storage helpers, pure functions)
  gets a Jest `.test.ts`/`.test.tsx` file — see `safe-area.test.tsx` and
  `status-bar-sync.test.tsx` for the mocking pattern (`jest.mock` the
  Capacitor plugin or the module it wraps).
- [ ] **Visual components** get a `.stories.tsx` file with at least one
  `play` interaction story (Storybook, run via `@storybook/addon-vitest`,
  not Jest) — see `Button.stories.tsx`'s `Click`/`Loading`/`Disabled`
  stories for the pattern. Don't duplicate this coverage in a Jest
  `.test.tsx` for the same component.
- [ ] **Playwright E2E updated** if the change touches the boot sequence
  (`src/app/page.tsx`) or anything else `e2e/*.spec.ts` already exercises —
  extend the existing specs rather than assuming they still pass unchanged.

## Before calling it done

- [ ] `npm run lint`, `npm run typecheck`, `npm run format:check` all clean
- [ ] `npm test` (Jest) and `npm run test:storybook` (Vitest/Storybook) both
  pass
- [ ] `npm run build` (static export) still produces cleanly — this is the
  exact class of break that's slipped through before (see the CI spec's
  "why we're building it this way")
- [ ] Committed in small, working steps — not one giant commit at the end
