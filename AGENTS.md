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
4. **The matching skill or MCP doc-search tool** — invoke it rather than
   working from memory:
   - Chakra: `chakra-ui-builder` / `chakra-ui-refactor` / `chakra-ui-migrate` skills.
   - Next.js/Vercel: `vercel:nextjs` skill or
     `mcp__claude_ai_Vercel__search_vercel_documentation`.
   - Supabase (once provisioned): `supabase` skill or
     `mcp__claude_ai_Supabase__search_docs`.
   - GraphQL (once adopted): `graphql-schema` / `graphql-operations` skills, or
     `mcp__claude_ai_GraphOS_MCP_Tools__ApolloDocsSearch` for Apollo-specific
     questions.
   - Everything else in `package.json` (TypeScript, Zod, react-hook-form,
     Capacitor, Jest, Testing Library, Playwright, Storybook, Vitest, ESLint,
     Prettier, …): no dedicated skill or MCP tool exists — skip straight from
     installed types/source (step 3) to official docs fetched (step 5), using
     the table below.
5. **Official docs, fetched** — only when 1–4 don't cover it. Every package in
   `package.json` maps to one of these:

   | Package(s) | Official docs |
   | --- | --- |
   | `react`, `react-dom` | https://react.dev/ |
   | `next`, `eslint-config-next` | https://nextjs.org/docs |
   | `typescript`, `ts-node`, `@types/*` | https://www.typescriptlang.org/docs/ |
   | `@chakra-ui/react`, `@chakra-ui/cli` | https://chakra-ui.com/docs |
   | `@emotion/react` | https://emotion.sh/docs/introduction |
   | `framer-motion` (imported as `motion`) | https://motion.dev/docs/react |
   | `next-themes` | https://github.com/pacocoursey/next-themes |
   | `react-icons` | https://react-icons.github.io/react-icons/ |
   | `@lottiefiles/dotlottie-react` | https://docs.lottiefiles.com/en/runtimes/distributions/react |
   | `react-hook-form` | https://react-hook-form.com/ |
   | `@hookform/resolvers` | https://github.com/react-hook-form/resolvers |
   | `zod` | https://zod.dev/ |
   | `@capacitor/*` (core, android, ios, keyboard, preferences, splash-screen, cli, assets) | https://capacitorjs.com/docs |
   | `jest`, `jest-environment-jsdom`, `@types/jest` | https://jestjs.io/docs/getting-started |
   | `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom` | https://testing-library.com/docs/ |
   | `playwright`, `@playwright/test` | https://playwright.dev/docs/intro |
   | `storybook`, `@storybook/*`, `@chromatic-com/storybook`, `eslint-plugin-storybook` | https://storybook.js.org/docs |
   | `vitest`, `@vitest/*` | https://vitest.dev/guide/ |
   | `vite` | https://vitejs.dev/guide/ |
   | `eslint` | https://eslint.org/docs/latest/ |
   | `prettier` | https://prettier.io/docs/ |
   | `serve` | https://github.com/vercel/serve |

   Update this table whenever `package.json` gains a dependency that isn't
   covered by an existing row.

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
When the user starts a prompt with `PLAN:`, follow `.claude/rules/07-planning-mode.md` instead: blueprint only, no production code.
