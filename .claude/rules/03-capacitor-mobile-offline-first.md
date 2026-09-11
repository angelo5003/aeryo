# 03. Capacitor Mobile & Offline-First

> Split out of `aeryo-core.md` v4/v6 §5 (Capacitor Native Bridge) at the
> user's request, combined with a new Offline-First section that fleshes
> out the "Offline" bullet already in `00-project-context-architecture.md`
> (Domain & Environment). Same precedence tier as the other `.claude/rules/*.md`
> files.

## Capacitor Native Bridge Discipline

This app runs inside a native container via Capacitor v8 (iOS and Android) —
not a desktop browser. Do not assume hover, `100vh` without safe areas, or
`localStorage` as durable storage.

- **Safe areas:** verify native safe areas before building UI components.
  Use `env(safe-area-inset-*)` / `--safe-area-inset-*` from Capacitor
  `SystemBars` (`insetsHandling: "css"`). Do not add `@capacitor/status-bar`
  `overlaysWebView`.
- **Keyboard:** keep `Keyboard.resize: None` unless a device check proves a
  change is required. Do not switch to Native resize to "fix" a form.
- **Touch:** verify touch interactions before building UI. 44pt minimum
  targets, no hover-only actions, wet-hand hit areas.
- **Durable state:** `@capacitor/preferences` only, unless the user
  approved a new store under `00-project-context-architecture.md`'s
  Dependency Lockdown. No ad-hoc `localStorage` / IndexedDB helpers.
- **Plugins:** always account for the official Capacitor plugins already in
  `package.json` (`@capacitor/preferences`, `@capacitor/keyboard`,
  `@capacitor/splash-screen`, core `SystemBars`). Do not invent plugin APIs.
- **Sync — corrected from the original instruction:** this repo wraps
  platform-specific sync in npm scripts (`package.json`: `"ios:sync": "cap sync ios"`,
  `"android:sync": "cap sync android"`) rather than a bare `npx cap sync`.
  When `capacitor.config.ts`, native plugins, or `ios/`/`android/` change,
  **run** `npm run ios:sync` and/or `npm run android:sync`, or tell the
  user they must run it. Acknowledging that sync is needed without running
  it or explicitly handing it off is not compliance.
- **Verification:** author against real Capacitor behavior (safe areas,
  keyboard, SystemBars). Storybook and Playwright are approximations, not
  device proof. If no device is available, say so plainly — do not claim
  native verification you didn't do.

## Strict Offline-First Implementation

Baseline (already established in `00-project-context-architecture.md`):
every new data read defines a cache / `@capacitor/preferences` path or an
explicit unavailable UI. Network-only success with a spinner-forever is
forbidden. This section is the mechanism for that baseline.

- **Optimistic UI:** when the user performs an action (e.g. logging a
  session), the UI updates immediately, assuming the write will succeed.
  Roll back and surface an explicit error state if it doesn't.
- **Read caching:** define a caching strategy for read operations (e.g.
  viewing forecasts) so the last-known data is visible offline instead of a
  blank state or a stuck spinner.
- **Write resiliency:** for write operations (mutations), define a retry
  mechanism backed by a local queue that syncs to Supabase once the device
  regains connectivity. Never leave the user stuck on an infinite loading
  spinner.
- **Queue storage:** the local write queue is durable state — it follows
  the same Durable state rule as everything else above:
  `@capacitor/preferences` only, no ad-hoc `localStorage` or IndexedDB.
- **Privilege stays the same offline:** queued writes replay through the
  same anon-key, RLS-protected `supabase-js` client as an online write
  (`02-supabase-data-architecture.md`) — going offline is never a reason to
  reach for the service-role key or bypass RLS.
