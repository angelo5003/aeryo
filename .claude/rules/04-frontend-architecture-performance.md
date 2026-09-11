# 04. Frontend Architecture & Performance

> Combines new content (React & Next.js App Router Performance) with two
> splits from `aeryo-core.md` v4/v7: §6 (Chakra Typegen & Theme Integrity)
> and §7 (Testing & Storybook). Same precedence tier as the other
> `.claude/rules/*.md` files.

## React & Next.js App Router Performance

- **Server-first mindset:** default to React Server Components. Use
  `"use client"` only when the component needs interactivity — hooks, event
  listeners, Capacitor native calls, plugins, auth, browser APIs, or forms
  (already the rule in `00-project-context-architecture.md`'s static-export
  section; restated here for the performance framing). Keep the client
  boundary as low in the component tree as possible.
- **RSC here means build-time, not live:** this app is a static export with
  no server in production (`00-project-context-architecture.md`). A Server
  Component still renders once at build time into static HTML — it must
  not be used as a way to sneak in runtime data fetching, which is already
  forbidden.
- **Prevent unnecessary re-renders:** in client components, explicitly
  justify each piece of state — don't lift state into a client component
  "just in case." Use virtualization for large lists and memoize expensive
  calculations (`useMemo`/`useCallback`), confirmed against installed React
  19 types rather than guessed.

## Chakra Typegen & Theme Integrity

- Re-use existing design-system tokens. Do not introduce arbitrary colors,
  typography, or spacing without consulting the design system first.
- UI color, typography, spacing, radius, and motion in `src/` use
  **semantic** tokens only — no hex, `rgb()`/`rgba()`/`hsl()`/`oklch()`,
  primitive steps (`ink.950`, `teal.500`), or unthemed Chakra palettes
  (`gray`, `red`, `whiteAlpha`, …). Full denylist, palette assignments
  (`teal` primary, `danger`/`caution`/`success`, `lime` for wind data), and
  code examples: `.cursor/rules/design-tokens.mdc`.
- Hex is allowed only in native config that cannot read CSS tokens (e.g.
  splash `backgroundColor`) and must match the primitive the semantic token
  already points at.
- Whenever a design token or theme file is modified — `src/design-system/`
  (tokens, `semantic-tokens.ts`, recipes, `theme/index.ts`) — run
  `npm run typegen` (Chakra CLI) **then** `npm run typecheck`
  (`next typegen && tsc`). These are two different typegens; both are
  required, in that order.
- Never hand-edit generated design-system types or skip the Chakra CLI.

## Strict Testing & Storybook Separation

Do not add a fourth test runner (Cypress, extra Vitest unit project, etc.),
and do not introduce redundant test files outside this structure. "Do not
cross-pollinate" means that — it does **not** mean Jest may never render UI.

| Layer | Tool | Allowed |
| --- | --- | --- |
| Logic, Zod, hooks, non-DOM utils | Jest | yes |
| Component render + `fireEvent` (jsdom) | Jest + Testing Library, wrap with `Provider` from `@/components/ui/provider` | yes |
| Visual / interaction / a11y in a real browser | Storybook + Vitest | yes |
| Multi-page user journeys | Playwright | yes |

- **Storybook:** use for component-state, story-driven browser validation.
  Query the Storybook MCP server (`docs-list`, `docs-show`,
  `get-storybook-story-instructions`, `test-run`) before using any prop —
  never guess. If MCP is unreachable, use installed Chakra/component types
  and existing `*.stories.tsx`, say MCP was skipped, and don't freeze the
  task or guess undocumented props.
- **Jest + Testing Library:** pure application logic, utilities, hooks, and
  standard unit tests — **and** component rendering with `fireEvent`
  (jsdom), per the table above.
  - `@testing-library/user-event` is not installed. Use `fireEvent`. Do not
    add `user-event` to get it.
  - Query order: role → label → placeholder → text → test id last.
  - Test data: Ofcom fictitious phones (`07700 900xxx`), RFC 2606 emails
    (`@example.com`). No real contact details.
- **Playwright:** exclusively end-to-end (E2E) user journeys and
  cross-page workflows.
- Do not write Apollo `MockedProvider` tests. GraphQL is not installed.
