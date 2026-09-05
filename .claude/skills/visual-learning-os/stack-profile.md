# Stack Profile — aeryo

Filled in from `package.json`, `CLAUDE.md`, and `AGENTS.md` in this repo.
Never sync or overwrite this file from a shared template — everything
else in this skill folder is safe to re-pull, this file is not.

## Framework & runtime

- **Next.js 16.3.1**, App Router, **static export** (`output: "export"`
  in `next.config.ts`) — bundled inside a Capacitor native app, no
  Next.js server at runtime. No route handlers, no runtime Server
  Component data fetching, no ISR, no middleware, no `next/image`
  optimization (`images.unoptimized: true`).
- **React 19.2.8**, **TypeScript** (strict), `next typegen && tsc --noEmit`
  via `npm run typecheck`.
- **Capacitor 8** — iOS (Swift Package Manager, no Podfile/xcworkspace) +
  Android. Plugins: `@capacitor/preferences`, `@capacitor/splash-screen`,
  `@capacitor/keyboard`, core `SystemBars` (replaced
  `@capacitor/status-bar` for Android 16). `npm run ios:sync` /
  `android:sync` to sync the native projects.

## UI / design system

- **Chakra UI v3.36.1** as the underlying framework, with a custom design
  system on top:
  - `src/design-system/tokens/` — raw tokens (colors, spacing, typography,
    radii, shadows, motion, breakpoints)
  - `src/design-system/theme/` — theme config, semantic tokens, recipes
  - `src/components/` — the actual components, grouped by role, each with
    a story and (where relevant) a test
  - `DESIGN.md` — canonical design language (colors, type scale, voice)
- Run `npm run typegen` after any theme change to keep Chakra's generated
  types in sync.
- Prefer the design-system components/tokens over raw Chakra primitives;
  prefer Chakra primitives over inventing new one-off styling.

## Forms & validation

- `react-hook-form` (7.86.0) + `zod` (4.4.3) via `@hookform/resolvers`.

## Other libraries

- `framer-motion` for animation, `next-themes` for color mode,
  `react-icons` for icons, `@lottiefiles/dotlottie-react` for Lottie.

## API layer

None yet. GraphQL is planned but not in the codebase — no schema, no
client, no operations. Treat it as new work and confirm scope before
assuming any wiring exists.

## Backend / database

None yet. Supabase is planned but not provisioned — no project, client,
migration, or auth wiring. A Supabase MCP server is configured for the
session but unused in `src/`.

## Testing

- **Jest + React Testing Library** for unit/component tests
  (`jest.config.ts` / `jest.setup.ts`). Coverage floor is enforced in CI
  but intentionally low — don't chase the number for its own sake.
- **Playwright** for e2e (`e2e/`, `npm run test:e2e`).
- **Storybook 10** with the Vitest addon for story-level tests.

## Code-structure / knowledge tool

`code-review-graph` MCP server — a persistent, auto-updating knowledge
graph of this codebase. Use it (semantic search, caller/callee/import
tracing, impact radius, architecture overview) **before** Grep/Glob/Read
when exploring or reviewing code. Fall back to file scanning only when
the graph doesn't cover what's needed or its index looks stale (rebuild
rather than silently switching over).

## Docs-grounding hierarchy

This repo's own `AGENTS.md` (imported by `CLAUDE.md`) defines the
authoritative grounding order for any non-trivial API/prop/config:

1. An existing usage already in this repo (`src/components/`,
   `src/design-system/`, `src/app/`).
2. Bundled docs — `node_modules/next/dist/docs/` for Next.js (this
   version has breaking changes vs. training data — read before writing).
3. Installed type definitions/source for the exact installed version
   (e.g. `node_modules/@chakra-ui/react/dist/types/`).
4. The matching skill or MCP doc-search tool (Chakra:
   `chakra-ui-builder`/`chakra-ui-refactor`/`chakra-ui-migrate`; Next.js:
   `vercel:nextjs` skill or `mcp__claude_ai_Vercel__search_vercel_documentation`;
   Supabase: `supabase` skill once provisioned; GraphQL: `graphql-schema`/
   `graphql-operations` skills once adopted).
5. Official docs, fetched — see the package-to-docs table in `AGENTS.md`
   for everything else (TypeScript, Zod, react-hook-form, Capacitor,
   Jest, Testing Library, Playwright, Storybook, Vitest, ESLint,
   Prettier, …).

Also from `AGENTS.md`: leave a one-line source comment on non-obvious
APIs (`// per node_modules/next/dist/docs/...` or
`// matches src/components/actions/Button/Button.tsx`), and
`npm run typecheck` + `npm run lint` must pass before code is done.
