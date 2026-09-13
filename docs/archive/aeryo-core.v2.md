# Aeryo Core Architecture Rules (v2)

> Supersedes `aeryo-core.md` (v1). Every clause below exists to close a
> specific hole found in a v1 audit: an ambiguous phrase, an unenforceable
> claim, a missing stack constraint, or a rule-conflict deadlock. Where a
> rule requires proof (a comment, a passing command, a named file), that
> proof is not optional — an assertion without it is treated as non-compliant.

## 0. Source Precedence & Proof of Work

When multiple sources could answer the same question, use this order and
stop at the first one that answers it:

1. An existing pattern already in this repo (`src/components/`,
   `src/design-system/`, `src/app/`).
2. Installed package types/source for the exact pinned version
   (`node_modules/**/dist/types/`, `node_modules/next/dist/docs/`).
3. The matching skill or MCP doc-search tool (Chakra, Next.js/Vercel,
   Supabase, Storybook — see `AGENTS.md`'s tool table).
4. Official docs, fetched live.
5. Model memory alone — **never** a valid stopping point.

**Proof requirement:** every non-obvious API, prop, or config key must carry
a one-line source comment naming which tier above it came from (e.g.
`// per node_modules/next/dist/docs/.../link.md` or `// matches
src/components/actions/Button/Button.tsx`). No comment on a non-obvious call
means it must be flagged as unverified before it ships — not shipped
silently.

## 1. Project Context & Environment

- **Domain:** Aeryo is a kitesurf mobile application intended for iOS and Android.
- **Real-World Constraints:** Users will often use this app in challenging physical environments (e.g., on the beach with bright sunlight, wet hands, and spotty or offline internet connections).
- **Impact:** Always consider offline-first data strategies, resilient error handling, and high-contrast UI when making architectural decisions.
- **High-contrast bar (measurable):** meet or exceed **WCAG AA** — 4.5:1 contrast for body text, 3:1 for large text and UI components/icons. "Looks readable in bright sun" is not a substitute for checking the ratio.

## 2. Evidence First

- Never guess or rely on model memory for version-sensitive, framework-specific, or native mobile behavior — see the precedence order and proof requirement in **§0**.
- If information is unclear after working through §0's tiers, state the uncertainty explicitly rather than fabricating an API, prop, or method.

## 3. Tech Stack Boundaries

- **Framework:** Next.js 16.3.1 (App Router only), configured as a **static export** (`output: "export"`). **There is no Next.js server at runtime.** Route handlers, middleware, runtime Server Component data fetching, ISR, and `next/image` optimization do not apply — do not propose them. Pages are static HTML + client-side React, bundled inside the Capacitor native container.
- **UI:** Chakra UI 3.36.1 (Strict v3 syntax, no v2 legacy patterns — no `extendTheme`, `styleConfig`, `useColorModeValue`, `colorScheme`, `isDisabled`, `@chakra-ui/icons`, `mode()`).
- **Mobile:** Capacitor v8 (iOS & Android; iOS uses Swift Package Manager, not CocoaPods).
- **Database:** Supabase JS 2.116.0.

## 4. App Store & Security Compliance

- Never expose service-role credentials to client code.
- **"Server-side" validation means Postgres Row Level Security policies and Supabase Auth — not a Next.js API layer**, because §3 establishes there is no app server at runtime. Any authorization check must ultimately be enforced by an RLS policy, not by hiding a button or route in the frontend.
- **OAuth/social login must use native deep-linking**, not an embedded-webview redirect flow, for native webview compatibility with Apple/Google review.
- **If any third-party/social login is offered, Sign in with Apple must also be offered** (Apple Guideline 4.8). Email/password auth through Supabase does not trigger this requirement on its own.

## 5. Capacitor Native Bridge Discipline

- This application runs inside a native container via Capacitor v8 for iOS and Android. Never assume a standard web browser environment — verify touch interactions and native safe areas before building UI components.
- **Before writing any custom native-bridge code, check whether an official Capacitor plugin already covers the capability** (e.g. `@capacitor/preferences`, keyboard, splash screen). Reaching for custom native code without first ruling out an official plugin is non-compliant.
- When native configuration or plugins change, **you must run `ios:sync` / `android:sync` and confirm it completed without error** — stating that a sync is "required" without running and confirming it does not satisfy this rule.

## 6. Chakra Typegen & Theme Integrity

- Reuse existing design system tokens. Before introducing any color, typography, or spacing value, **check `src/design-system/tokens/` and `DESIGN.md` for an existing token that already covers it** — a token-name pattern-match without opening those files does not count as consulting the design system.
- Whenever design tokens, recipes, or the theme file (`src/design-system/theme/index.ts`) are modified, run `npm run typegen` followed by `npm run typecheck` before considering the change done.
- Never manually modify design-system generated types or bypass the Chakra CLI type generation workflow.

## 7. Testing Strategy

- **Jest + Testing Library** is the primary home for pure application logic, utilities, hooks, and standard unit tests.
- **Storybook + Vitest** is the primary home for component-state and story-driven browser validation.
- **Playwright** is the primary home for end-to-end (E2E) user journeys and cross-page workflows.
- **Tie-break for logic embedded in a component:** if the logic can be extracted into a pure function or hook, extract it and test it in Jest; whatever remains in the rendered output is validated in Storybook. Do not duplicate the same assertion in both layers.
- **Storybook MCP:** before guessing a component prop or story convention, query the `storybook` MCP server (`docs-list`, `docs-show`, `get-storybook-story-instructions`) and run `test-run` to verify. Never assume an undocumented component property.
- Do not introduce redundant test files that re-verify the same behavior across two layers of this structure.

## 8. "Latest" Dependency Lockdown

- Several critical dependencies and devDependencies in `package.json` are pinned to `"latest"` (e.g., Storybook addons, Playwright, Vite).
- No dependency may be installed, upgraded, or downgraded without a stated one-line justification that names the specific error or missing capability driving the change, plus a citation of the changelog or migration guide entry that confirms the fix.
- Inspect `package.json`, the lockfile, and peer dependencies before proposing any change — a justification without evidence of that inspection is not sufficient.
- **If a bug's root cause is a breaking change in a pinned dependency and fixing it correctly requires a version bump that this rule blocks:** this is a rule conflict — apply **§10 Escalation Protocol**, not a type-system workaround.

## 9. Mentorship, Visual Mapping & No Escape Hatches

- **Scope:** the mentor treatment below applies specifically to (a) a new architectural decision, (b) a data-flow change, or (c) integrating an API not already used elsewhere in the repo. It does not apply to routine edits (copy changes, styling tweaks, bug fixes that don't change structure) — reserving it for these three cases keeps it meaningful instead of diluting it through overuse.
- **Plain-Language Analogy:** explain the concept using an everyday physical-world analogy (postal systems, traffic lights, ocean/wind dynamics). No heavy jargon.
- **Visual Map:** provide a clean, text-based ASCII diagram or flowchart of how data moves or components connect. Never skip this for an in-scope change.
- **No Black-Box Hacks:** `// @ts-ignore`, `/* eslint-disable */`, and casting to `any` are prohibited. Resolve the root cause. If the root cause cannot be resolved without breaking another rule (e.g. §8), that is a conflict — go to **§10**, do not reach for the hack anyway.

## 10. Escalation Protocol

- If following one rule in this document would require violating another, **stop and state the conflict explicitly** — name both rules and the specific tension — then ask the user for a decision.
- Never silently pick a side of a rule conflict and proceed as if no conflict existed. A visible, named conflict is compliant; a silently-resolved one is not.
- This applies in particular to the §8 ↔ §9 dependency/no-escape-hatch deadlock, and to any case where §0's evidence sources disagree with each other.

## 11. Definition of Done

Before any change is presented as complete, all of the following must hold:

- `npm run typecheck` and `npm run lint` pass.
- If the change touched the theme/tokens (§6), `npm run typegen` was run first and typecheck was re-run after.
- If the change touched native config or plugins (§5), `ios:sync`/`android:sync` was run and confirmed successful.
- Every non-obvious API call added or changed carries the source comment required by §0.
- Tests were updated per §7's structure for any changed behavior.

A change missing any of the above is not done — say so plainly rather than presenting it as finished.
