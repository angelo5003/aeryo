# Aeryo Core Architecture Rules (v3)

This file is the portable constitution. If any other agent rule, skill, or memory
disagrees with it, this file wins — except `package.json` and the lockfile, which
win on versions and installed packages.

**Precedence (highest first):** `package.json` + lockfile → this file →
`AGENTS.md` grounding (source order, static export, Chakra denylist) →
`TESTING.md` → `PRODUCT.md` → `.cursor/rules/*`. If a Cursor rule contradicts
this file, this file wins and that Cursor rule is stale.

Do not follow `.claude/rules/aeryo-core.md` (v1). It is withdrawn.

## 1. Project Context & Environment

- **Domain:** Aeryo is a kitesurf app shipped to the Apple App Store and Google
  Play Store as a Next.js UI inside a Capacitor native shell (iOS and Android).
  Capacitor always boots at `/`. Portrait is the only supported orientation.
- **Physical constraints:** Beach glare, wet hands, gloves, and spotty or absent
  network. These are requirements, not flavor.
- **Offline:** Every new data read must define a cache / `@capacitor/preferences`
  path or an explicit unavailable UI. Network-only success with a spinner-forever
  is forbidden.
- **Contrast:** Beach readability is achieved only through semantic design tokens
  (`fg`, `fg.photo`, `accent.solid`, …). Do not inject hex, `white`, or unthemed
  palettes “for contrast.” If a role is missing, add it in
  `src/design-system/theme/semantic-tokens.ts`, then run typegen (Rule 6).
- **Presence:** Rider presence is a social status (“I’m riding here”), not live
  GPS. Do not expose exact user coordinates.
- **Product stage:** V1 pages may be static/mock. Supabase is not a license to
  invent schemas. If it is not provisioned in this repo, do not create clients,
  migrations, or RLS policies.

## 2. Evidence First (no model-memory loophole)

Never guess version-sensitive, framework-specific, or native mobile behavior.
Training data is not a source.

**Authoritative versions are `package.json` and the lockfile.** Read them before
any stack-sensitive work. Version numbers elsewhere in rules or chat are
snapshots. If they disagree with `package.json`, `package.json` wins.

**Source rank (stop at the first that answers the question):**

1. Installed `package.json` + lockfile.
2. Existing usage in `src/` **only if** it matches those versions. If `src/`
   contradicts types or docs, `src/` is stale — do not copy it; say so.
3. Installed types / bundled docs (`node_modules/next/dist/docs/`,
   `node_modules/@chakra-ui/react/dist/types/`, `node_modules/zod`, Capacitor
   types, etc.).
4. The official MCP or skill for that package, **if reachable**: Next.js
   DevTools, Chakra, Storybook, Supabase, Capacitor. Use the matching row in
   `AGENTS.md`; examples in this sentence are not the whole list.
5. Fetched official docs for the installed version.

You may state uncertainty **only after** a check in this list failed. Name the
files, types, or MCP tools you opened. “I’m not sure” without a check is a
guess.

Non-obvious APIs get a one-line source comment:
`// per node_modules/next/dist/docs/...` or
`// matches src/components/actions/Button/Button.tsx`.

Do not fabricate APIs, props, Capacitor plugin methods, env vars, or database
schemas.

## 3. Tech Stack Boundaries

Confirm names and versions in `package.json`. Snapshot at v3 authoring (not
pins): Next.js 16 App Router, React 19, Chakra UI v3, Capacitor v8, Supabase JS 2,
Zod 4, react-hook-form, `framer-motion` imported as `motion`.

### 3a. Static export — non-negotiable

`next.config.ts` sets `output: "export"`. Capacitor `webDir` is `out/`. There is
**no Next.js server** in production or in the store build.

**Forbidden:** route handlers (`app/api`), Server Actions as a backend,
middleware, runtime Server Component data fetching, ISR/`revalidate`,
`cookies()`/`headers()` as auth, optimized `next/image` (keep
`images.unoptimized: true`). Confirm every Next feature against
`node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.

`"use client"` for anything that touches plugins, auth, browser APIs, or
forms. `src/server/` is **shared validation** (Zod) that runs in the client
bundle. It is not a backend. Do not add Next server code there.

App Router only. No Pages Router.

### 3b. Chakra v3 — denylist

Forbidden **Chakra v2 APIs**: `extendTheme`, `styleConfig`, `isDisabled`,
`isLoading`, `isOpen`, `@chakra-ui/icons`, `mode()`, importing
`useColorModeValue` from `@chakra-ui/react`, and the v2 **component prop**
`colorScheme` (e.g. `<Button colorScheme="teal">`). Use v3 props (`disabled`,
`loading`, `open`, …) confirmed in installed types or an existing component.
Use `Provider` from `@/components/ui/provider`, not a one-off v2
`ChakraProvider`.

Allowed and distinct: CSS `style.colorScheme` / `prefers-color-scheme`, and
`useColorModeValue` **only** from `@/components/ui/color-mode` (this repo’s
next-themes helper). Do not treat those as a license to use v2 Chakra props.

### 3c. Zod 4

Zod is v4 in this repo. Do not use Zod 3 APIs. Match
`src/server/validation/account/create-account.schema.ts` and `node_modules/zod`
(e.g. `z.email()`, not `z.string().email()`).

### 3d. Not in the stack

Do not add GraphQL, Apollo, Auth.js, Redux, Zustand, Tailwind, a second UI kit,
SQLite, or `@capacitor/status-bar` overlay plugins unless the user explicitly
asks **and** Rule 8 is satisfied. `TESTING.md` GraphQL / `test-utils` sections
are planned — do not import them.

## 4. App Store, Auth & Security

- **Secrets:** The WebView bundle is public. Never put service-role keys,
  `SUPABASE_SERVICE_ROLE`, or any non-`NEXT_PUBLIC_` secret in client code,
  Storybook, tests, or Capacitor config. `NEXT_PUBLIC_*` is visible to users.
  Do not commit `.env` files with secrets.
- **RLS:** Authorization is enforced in **Postgres (Supabase RLS)**, never in
  Next.js. Do not add API routes “to validate RLS.” Client uses the **anon** key
  only. Until Supabase is provisioned, do not invent policies or table schemas.
- **Auth:** Auth runs in the Capacitor WebView via `@supabase/supabase-js` plus
  official Capacitor plugins that already exist in `package.json` (or that the
  user has approved under Rule 8). Forbidden: cookie/session Next.js auth,
  Auth.js, `localhost` OAuth redirects, in-app browsers that fail Apple/Google
  review. Do not add a new auth vendor to “make it native.”
- **Sign in with Apple:** If Google (or any third-party login) ships, Sign in
  with Apple must ship as a native-compatible path (App Store 4.8).
- **Account deletion:** If accounts exist, Apple 5.1.1 account deletion must
  exist. Do not ship create-account without a deletion path in the same product
  slice.
- **Dev-only Capacitor server:** `capacitor.config.ts` `server.url` and
  `cleartext: true` are live-reload only. Do not ship them in a store build.
- **Identity:** When an item has a stable `id`, use that for React `key`,
  selection, and “is this active?” comparisons. Do not store or compare array
  indexes.

## 5. Capacitor Native Bridge

This is not a desktop browser. Do not assume hover, `100vh` without safe areas,
or `localStorage` as durable storage.

- **Safe areas:** Use `env(safe-area-inset-*)` / `--safe-area-inset-*` from
  Capacitor `SystemBars` (`insetsHandling: "css"`). Do not add
  `@capacitor/status-bar` `overlaysWebView`.
- **Keyboard:** Keep `Keyboard.resize: None` unless a device check proves a
  change is required. Do not switch to Native resize to “fix” a form.
- **Touch:** 44pt minimum targets. No hover-only actions. Wet-hand hit areas.
- **Durable state:** `@capacitor/preferences` only, unless the user approved a
  new store under Rule 8. No ad-hoc `localStorage` / IndexedDB helpers.
- **Plugins:** Use packages that are already in `package.json`
  (`@capacitor/preferences`, `@capacitor/keyboard`, `@capacitor/splash-screen`,
  core SystemBars). Do not invent plugin APIs.
- **Sync:** If `capacitor.config.ts`, native plugins, or `ios/` / `android/`
  change, run `npm run ios:sync` and/or `npm run android:sync` (or tell the user
  they must run it). Mentioning sync without running or handing it off is not
  compliance.
- **Verification:** Author against Capacitor (safe areas, keyboard, SystemBars).
  Storybook / Playwright are approximations, not device proof. If no device is
  available, say so — do not claim native verification.

## 6. Chakra Typegen & Theme Integrity

- UI color, typography, spacing, radius, and motion in `src/` use **semantic**
  tokens only. Forbidden in component props, `style={{}}`, and local constants:
  hex, `rgb()`, `rgba()`, `hsl()`, `oklch()`, primitive steps (`ink.950`,
  `teal.500`), and unthemed Chakra palettes (`gray`, `red`, `whiteAlpha`, …).
  Primary: `teal`. Status: `danger` / `caution` / `success`. `lime` only for
  wind data.
- Hex is allowed only in native config that cannot read CSS tokens (e.g. splash
  `backgroundColor`) and must match the primitive the semantic token already
  points at.
- Any change under `src/design-system/` (tokens, `semantic-tokens.ts`, recipes,
  `theme/index.ts`) requires `npm run typegen` (Chakra CLI) then
  `npm run typecheck` (`next typegen && tsc`). These are two different typegens.
- Never hand-edit generated design-system types or skip the Chakra CLI.

## 7. Testing & Storybook

Do not add a fourth test runner (Cypress, extra Vitest unit project, etc.).
“Do not cross-pollinate” means that — not “Jest may never render UI.”

| Layer | Tool | Allowed |
| --- | --- | --- |
| Logic, Zod, hooks, non-DOM utils | Jest | yes |
| Component render + `fireEvent` (jsdom) | Jest + Testing Library, wrap with `Provider` from `@/components/ui/provider` | yes |
| Visual / interaction / a11y in a real browser | Storybook + Vitest | yes |
| Multi-page user journeys | Playwright | yes |

- `@testing-library/user-event` is not installed. Use `fireEvent`. Do not add
  `user-event` to get it.
- Query order: role → label → placeholder → text → test id last.
- Test data: Ofcom fictitious phones (`07700 900xxx`), RFC 2606 emails
  (`@example.com`). No real contact details.
- **Storybook MCP** (preferred when `localhost:6006` is up): `docs-list`,
  `docs-show`, `get-storybook-story-instructions`, `test-run`. Do not invent
  undocumented props.
- **If Storybook MCP is unreachable:** use installed Chakra/component types and
  existing `*.stories.tsx`, and say MCP was skipped. Do not freeze the task and
  do not guess props.
- Do not write Apollo `MockedProvider` tests. GraphQL is not installed.

## 8. Dependency Lockdown

Some `package.json` entries are `"latest"` (Storybook addons, Playwright, Vite,
Vitest). That is a known hazard, not a pattern to copy. Do not use `"latest"`
for any **new** dependency.

**Do not add, upgrade, downgrade, remove, or change version ranges** unless the
user explicitly asked, or you are only using a package already listed without
changing its range.

Do not install a package to silence an error. Do not “pin `latest`” or “align
Playwright versions” without being asked (`playwright` and `@playwright/test`
may differ — leave them).

If the user asks for a dependency change: read `package.json`, the lockfile,
peer dependencies, and the official migration guide for the installed major
before proposing a diff. Then wait for approval.

## 9. Plan, Explain, No Escape Hatches

**Non-trivial** means: new native plugin, auth, data store, navigation shell, or
anything that touches `capacitor.config.ts`, `next.config.ts`, or
`src/design-system/`.

- **Plan first:** For non-trivial work, output a bulleted plan (affected files,
  App Store risks, verification steps) and wait for explicit approval before
  writing code.
- **Explain:** For those same changes, a short plain-language explanation is
  allowed. Analogies must not replace API names, commands, or file paths.
- **Diagram:** ASCII data-flow or native/web-boundary diagram only when that
  boundary changes. Skip for copy, tokens, or single-component tweaks.
- **Done:** `npm run typecheck` and `npm run lint` must pass before calling
  the work done. UI behavior changes must be verified in a browser or the
  closest substitute; say what you could not verify.
- **Escape hatches — forbidden in new `src/` code:** `// @ts-ignore`,
  `// @ts-nocheck`, `as any`, `as unknown as`, and new `eslint-disable` /
  `eslint-disable-next-line` comments. Resolve the root cause.
- **Narrow exceptions:** `@ts-expect-error` with a one-line reason only on
  generated or proven-upstream-broken types, after stating why a real fix is
  impossible. Do not copy an existing `eslint-disable` into a new file. Do not
  extend a disable to a new rule.

Before calling code done on stack-sensitive work, you used Rule 2 sources — not
memory.
