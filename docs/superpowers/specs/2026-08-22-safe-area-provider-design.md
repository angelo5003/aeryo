# Safe Area + Status Bar Setup for Aeryo (iOS & Android)

**Date:** 2026-08-22
**Status:** Approved design, ready for implementation plan

## The problem, in plain English

Aeryo only runs inside the native app shell built by Capacitor — never in a
normal desktop browser. That means the app has to deal with things a website
never does: the iPhone's notch/Dynamic Island, the rounded corners and home
indicator bar at the bottom, and Android's status bar and gesture bar. If we
don't handle this, buttons and text can end up hidden behind the notch, or
squashed under the home indicator.

The fix has a name on both platforms: **safe area insets**. Every phone
reports how much space at the top/bottom/left/right is "unsafe" to put
content in, and we need our layout to leave that space alone (or explicitly
draw under it, in a controlled way, for a true edge-to-edge look).

We also want the phone's status bar (the strip with the clock/battery) to
switch its icon color automatically when the app switches between light and
dark mode, the same way a native app would.

## Why we're building it this way

We looked at how fully-native apps (the ones built with Swift or Kotlin, like
Spotify or Apple's own apps) solve this, but that comparison only goes so
far — those apps aren't web pages inside a WebView, so they don't have this
problem in the same shape. Aeryo **is** a WebView wrapped by Capacitor, so
the right comparison is: how do other serious, production Capacitor apps do
this?

The answer changed recently and it's worth explaining, because it made the
plan simpler and removed a dependency we almost added:

- Older Capacitor guidance said "install the `@capacitor/status-bar` plugin
  and set `overlaysWebView: true`." That still works on iOS, but **Google
  broke it on Android 16** — Android no longer allows apps to opt out of
  edge-to-edge, so `overlaysWebView` and `backgroundColor` silently stop
  doing anything.
- As of Capacitor 8.3.2, Capacitor shipped a replacement built directly into
  `@capacitor/core` called **`SystemBars`**. It's not a separate plugin to
  install — it's already sitting in the `@capacitor/core` version this
  project already has (`^8.5.0`). It's the forward-looking, Android-16-safe
  way to control the status bar and get correct safe-area values on both
  platforms, including working around known Android WebView bugs where the
  browser's built-in `env(safe-area-inset-*)` used to report wrong numbers.

So instead of adding a new dependency, we're using something already in the
project. That's simpler and it's the officially recommended path per
Capacitor's own docs (capacitorjs.com/docs/apis/system-bars).

## The three layers

**1. CSS — this does most of the actual work**

- Every phone (via the browser engine or, on Android, via `SystemBars`)
  exposes the safe-area sizes as CSS values. We read them once, in one
  place (`globals.css`), into our own variables (`--safe-top`,
  `--safe-bottom`, `--safe-left`, `--safe-right`) that work correctly on
  both iOS and Android regardless of which underlying mechanism supplied
  the number.
- We turn those into Chakra spacing tokens (`safe.top`, `safe.bottom`,
  `safe.left`, `safe.right`) so any component in the app can just write
  `pt="safe.top"` the same way it already writes any other spacing value —
  no one has to remember raw CSS.
- The root layout applies these as default padding, so the whole app is
  protected without every page having to think about it.
- This requires one extra line in the page's `<head>`
  (`viewport-fit=cover`) — without it, the safe-area values are always
  reported as zero on iOS.

**2. A small React helper — `SafeAreaProvider` + `useSafeArea()`**

- The CSS above covers normal layout (padding, margins). But a few
  components need the actual numbers in JavaScript — for example, a
  floating button that needs to be positioned a specific number of pixels
  above the home indicator.
- We add one small provider component that reads the same CSS values and
  makes them available as a React hook: `const { top, bottom } =
  useSafeArea()`. This wraps the whole app once, at the root.
- This is the piece that maps to the "SafeAreaProvider" you asked for by
  name — it's deliberately thin, because the CSS layer already does the
  heavy lifting.

**3. Status bar color synced to light/dark mode**

- A small component (`StatusBarSync`) watches the app's existing color
  mode (the same light/dark switch Chakra already manages) and tells
  `SystemBars` to flip the status bar icon color to match.
- This only runs when the app is actually running inside the native shell
  (Capacitor) — it does nothing when you're just running `next dev` in a
  regular browser, so local web development isn't affected.

## What gets added

**No new npm packages for status bar/safe-area** — `SystemBars` is already
included in `@capacitor/core`, which is already installed.

**Android platform gets added** — right now only `ios/` exists. We'll run
`cap add android` to create the `android/` project, matching iOS. No manual
native-code changes are needed for Android edge-to-edge — `SystemBars`
handles that automatically as of Capacitor 8; this was the old advice (a
hand-written change to `MainActivity`) and it's no longer necessary.

**iOS Info.plist** — already has the one required setting
(`UIViewControllerBasedStatusBarAppearance = YES`), so nothing to change
there.

**Files touched/created:**

| File | Change |
|---|---|
| `capacitor.config.ts` | Add `plugins.SystemBars` config (`insetsHandling: "css"`, initial `style`) |
| `src/app/layout.tsx` | Add `viewport: { viewportFit: "cover" }`; wrap children in `SafeAreaProvider` |
| `src/app/globals.css` | Define `--safe-top/-bottom/-left/-right` from the platform-supplied values |
| `src/design-system/theme/semantic-tokens.ts` | Add `safe.top/bottom/left/right` spacing tokens |
| `src/components/ui/safe-area.tsx` (new) | `SafeAreaProvider` component + `useSafeArea()` hook |
| `src/components/ui/status-bar-sync.tsx` (new) | `StatusBarSync` component, mounted inside `ColorModeProvider` |
| `src/components/ui/provider.tsx` | Mount `StatusBarSync` inside the existing provider tree |

## Testing plan

- iOS Simulator: verify on a notched device (Dynamic Island class) that
  content clears the notch/home indicator and the status bar icons switch
  color with the app's theme toggle.
- Android Emulator: verify the same, on both a gesture-navigation device and
  a 3-button-navigation device, since Android's bottom inset differs between
  the two.
- A small unit/story check that the Chakra semantic tokens resolve to the
  expected CSS variable references.
- No automated test can meaningfully exercise real device insets (they're
  `0` in any browser/CI environment), so this is primarily a manual
  simulator/emulator verification pass.

## Explicitly out of scope (for now)

- **Keyboard avoidance** (`@capacitor/keyboard`) — deferred until a real
  form/input screen exists; designing it now would be speculative.
- Any change to how individual screens are built — this spec only covers
  the app shell / provider setup.
