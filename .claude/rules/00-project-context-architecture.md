# 00. Project Context & Architecture

> Split out of the old `aeryo-core.md` v4 monolith (§1 Project Context &
> Environment, §2 Evidence First, §3 Tech Stack Boundaries, §8 Dependency
> Lockdown) at the user's request, to make the rules easier for an agent to
> scan one topic at a time. Same precedence tier as every other
> `.claude/rules/*.md` file, including `06-escalation-protocol.md` — all
> auto-load from `.claude/rules/`, and `package.json` + the lockfile still
> win over any of them on versions and installed packages.

## Domain & Environment

- **Project:** Aeryo, a kitesurf app shipped to the Apple App Store and
  Google Play Store as a Next.js UI inside a Capacitor native shell (iOS and
  Android) — not a desktop browser.
- **Boot & orientation:** Capacitor always boots at `/`. Portrait is the
  only supported orientation.
- **Real-world constraints:** beach glare, wet hands, gloves, and spotty or
  absent network. These are requirements, not flavor.
- **Offline:** every new data read must define a cache / `@capacitor/preferences`
  path or an explicit unavailable UI. Network-only success with a
  spinner-forever is forbidden.
- **Contrast:** must meet or exceed **WCAG AA** — 4.5:1 for body text, 3:1
  for large text and UI components/icons — for beach-glare readability.
  "Looks readable" is not a substitute for checking the ratio. Achieved only
  through semantic design tokens (`fg`, `fg.photo`, `accent.solid`, …); do
  not inject hex, `white`, or unthemed palettes "for contrast" to hit the
  number. If the right token doesn't exist, add it in
  `src/design-system/theme/semantic-tokens.ts`, then run typegen
  (`04-frontend-architecture-performance.md`). Full token rules and examples:
  `.cursor/rules/design-tokens.mdc`.
- **Presence:** rider presence is a social status ("I'm riding here"), not
  live GPS. Do not expose exact user coordinates.
- **Product stage:** V1 pages may be static/mock. Supabase is not a license
  to invent schemas. If it is not provisioned in this repo, do not create
  clients, migrations, or RLS policies.

## Rule Management & Modular Architecture

- **No monolithic rule files:** rules for this repo live in `.claude/rules/`
  split by topic (`00` through `07`) instead of one document, so an agent
  can reason about a focused set of rules instead of the whole constitution
  at once. The original `aeryo-core.md` v4 monolith is fully split now —
  its lone remaining section became `06-escalation-protocol.md`.
  `07-planning-mode.md` is the opt-in `PLAN:` blueprint layer.
- **Contextual loading:** Claude Code auto-loads every file in
  `.claude/rules/` regardless of topic — splitting files doesn't reduce what
  gets loaded. What it changes is citation discipline: reference and apply
  only the rule(s) actually relevant to the current feature, not the whole
  set, to avoid analysis paralysis.
- **Precedence:** full hierarchy lives in one place now —
  `06-escalation-protocol.md`, "System Rule Precedence." Don't restate it
  here; point there.
- **One home per topic:** token/palette conventions live only in
  `.cursor/rules/design-tokens.mdc`; identity/key conventions live only in
  `.cursor/rules/identity-by-id.mdc`. Point to them instead of restating
  them, so a future change only has to happen once.

## Tech Stack Boundaries

Confirm names and versions in `package.json` before relying on any of this —
these are a snapshot at authoring, not a pin: Next.js 16.3.1 (App Router),
React 19, Chakra UI 3.36.1, Capacitor 8.5.0, Supabase JS 2.116.0, Zod 4,
react-hook-form, `framer-motion` imported as `motion`.

### Static export — non-negotiable

`next.config.ts` sets `output: "export"`. Capacitor `webDir` is `out/`.
There is **no Next.js server** in production or in the store build.

**Forbidden:** route handlers (`app/api`), Server Actions as a backend,
middleware, runtime Server Component data fetching, ISR/`revalidate`,
`cookies()`/`headers()` as auth, optimized `next/image` (keep
`images.unoptimized: true`). Confirm every Next feature against
`node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.

`"use client"` for anything that touches plugins, auth, browser APIs, or
forms. `src/server/` is **shared validation** (Zod) that runs in the client
bundle. It is not a backend. Do not add Next server code there.

App Router only. No Pages Router.

### Chakra v3 — denylist

Forbidden **Chakra v2 APIs**: `extendTheme`, `styleConfig`, `isDisabled`,
`isLoading`, `isOpen`, `@chakra-ui/icons`, `mode()`, importing
`useColorModeValue` from `@chakra-ui/react`, and the v2 **component prop**
`colorScheme` (e.g. `<Button colorScheme="teal">`). Use v3 props (`disabled`,
`loading`, `open`, …) confirmed in installed types or an existing component.
Use `Provider` from `@/components/ui/provider`, not a one-off v2
`ChakraProvider`.

Allowed and distinct: CSS `style.colorScheme` / `prefers-color-scheme`, and
`useColorModeValue` **only** from `@/components/ui/color-mode` (this repo's
next-themes helper). Do not treat those as a license to use v2 Chakra props.

### Zod 4

Zod is v4 in this repo. Do not use Zod 3 APIs. Match
`src/server/validation/account/create-account.schema.ts` and `node_modules/zod`
(e.g. `z.email()`, not `z.string().email()`).

### Not in the stack

Do not add GraphQL, Apollo, Auth.js, Redux, Zustand, Tailwind, a second UI
kit, SQLite, or `@capacitor/status-bar` overlay plugins unless the user
explicitly asks **and** Dependency Lockdown (below) is satisfied.
`TESTING.md` GraphQL / `test-utils` sections are planned — do not import
them.

## Evidence First & Dependency Lockdown

Never guess or rely on model memory for version-sensitive or framework-specific behavior. You are strictly required to use official documentation, official MCP servers (such as Next.js DevTools or Storybook MCP), available agent Skills, or installed package types as the primary source of truth. If information is unclear, investigate these official tools before writing any code.

**Authoritative versions are `package.json` and the lockfile.** Read them
before any stack-sensitive work. Version numbers elsewhere in rules or chat
are snapshots. If they disagree with `package.json`, `package.json` wins.

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

You may state uncertainty **only after** a check in this list failed. Name
the files, types, or MCP tools you opened. "I'm not sure" without a check is
a guess.

Non-obvious APIs get a one-line source comment:
`// per node_modules/next/dist/docs/...` or
`// matches src/components/actions/Button/Button.tsx`.

Do not fabricate APIs, props, Capacitor plugin methods, env vars, or
database schemas.

**Dependency lockdown:** some `package.json` entries are pinned `"latest"`
(Storybook addons, Playwright, Vite, Vitest). That is a known hazard, not a
pattern to copy. Do not use `"latest"` for any **new** dependency.

**Do not add, upgrade, downgrade, remove, or change version ranges** unless
the user explicitly asked, or you are only using a package already listed
without changing its range.

Do not install a package to silence an error. Do not "pin `latest`" or
"align Playwright versions" without being asked (`playwright` and
`@playwright/test` may differ — leave them).

If the user asks for a dependency change: read `package.json`, the
lockfile, peer dependencies, and the official migration guide for the
installed major before proposing a diff. Then wait for approval.

**If a bug's root cause is a breaking change in a pinned dependency and a
correct fix needs a version bump this rule blocks:** that is a rule
conflict — apply `06-escalation-protocol.md`'s Escalation Protocol. Do not
reach for a type-system workaround instead
(`01-learning-mode-output-style.md`'s narrow exception is for
proven-upstream-broken types only, not for routing around this rule).
