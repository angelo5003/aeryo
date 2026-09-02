<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Grounding: no invented code

Every non-trivial API, prop, config key, or pattern you write must trace to a
real source for the **installed version**. Do not write code you have not
confirmed exists. If you cannot confirm it locally, fetch the official docs or
say so — never guess and never present unverified code as final.

Order of sources (prefer the earliest that answers the question):

1. **An existing usage in this repo** — `src/components/`, `src/design-system/`,
   `src/app/`. If a pattern already exists here, match it. This is the best
   "compare with": real, version-correct, already passing CI.
2. **Bundled docs** — `node_modules/next/dist/docs/` for anything Next.js.
   Read the specific file before using the API.
3. **Installed type definitions / source** — e.g.
   `node_modules/@chakra-ui/react/dist/types/` for Chakra v3 props and APIs,
   `node_modules/react/` for React 19. The types are authoritative for the
   exact version in `package.json`.
4. **The matching skill** — `chakra-ui-builder` / `chakra-ui-refactor` /
   `chakra-ui-migrate` for Chakra work; `vercel:nextjs` for Next.js; invoke it
   rather than working from memory.
5. **Official docs, fetched** — `chakra-ui.com/docs`, `nextjs.org/docs`,
   `react.dev`, `typescriptlang.org/docs` — only when 1–4 don't cover it.

Rules:

- **Chakra is v3, not v2.** No `extendTheme`, `styleConfig`, `useColorModeValue`,
  `colorScheme`, `isDisabled`, `@chakra-ui/icons`, `mode()`. Use the v3
  equivalents confirmed in the installed types or an existing component.
- **Next.js is a static export** (`output: "export"`). No route handlers, no
  runtime Server Component data fetching, no middleware, no `next/image`
  optimization. Confirm any Next.js feature works under static export.
- When you use a non-obvious API, leave a one-line source comment:
  `// per node_modules/next/dist/docs/01-app/.../link.md` or
  `// matches src/components/actions/Button/Button.tsx`.
- Before calling code done: `npm run typecheck` and `npm run lint` must pass.
