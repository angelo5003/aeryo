# AERYO Design System Foundations — Design Spec

Date: 2026-08-20
Status: Approved (pending final spec review)

## Goal

Build the foundations layer of the AERYO design system — design tokens,
Chakra UI v3 theme integration, and Storybook documentation — with zero
UI components. Every visual decision (color, type, spacing, radius,
shadow, motion, breakpoints) must be token-driven; no hardcoded values
anywhere in app code going forward.

## Context

`src/design-system/theme/` already exists and is not a blank slate:
`colors.ts`, `semantic-tokens.ts`, `radii.ts`, `shadows.ts`,
`typography.ts`, and `index.ts` implement an AERYO-branded palette
(`ink`/`teal`/`lime`/`danger`/`caution`) anchored to
`docs/guides/aeryo-branding.md`, with a documented "one primary, one
controlled highlight" restraint principle and WCAG-verified contrast
pairs. A `Colors.stories.tsx` already renders the raw palette and
semantic tokens live.

An existing critique (`.impeccable/critique/2026-08-20T11-28-12Z__src-design-system-theme.md`)
flagged one P0 and two P1 contrast bugs in `semantic-tokens.ts` that
this pass also fixes, since it's touching the same file:

- **P0**: `accent.contrast` is not mode-aware (flat `ink.50`), producing
  2.49:1 contrast against `accent.solid` in dark mode. Fix: mode-aware,
  `ink.950` in dark mode (~7:1+).
- **P1**: `fg.subtle` (`ink.500`) fails AA against both `bg` (3.77:1) and
  `bg.subtle` (3.02:1) in dark mode. Fix: shift dark value from `ink.500`
  toward the already-verified `ink.400`/nearby value.
- **P1**: `fg.muted` on `bg.muted` lands at 4.12:1, just under AA. Fix:
  nudge the dark value to clear 4.5:1.

This pass extends that existing system rather than creating a competing
`tokens/`/`theme/` tree at the repo root, and does not introduce new
generic hue families (Slate/Gray/Blue/Green/Yellow) — it maps the
originally-requested primitive shape onto AERYO's actual brand palette
(`ink`, `teal`, `lime`, `danger`, `caution`), each as a full 50–950
scale, which already exists for `ink`/`teal`/`lime`/`danger`/`caution`.

## File Plan

```
src/design-system/
├── tokens/
│   ├── colors.ts        — moved from theme/colors.ts, primitives only, unchanged content
│   ├── typography.ts     — expanded: fontFamily (existing) + fontSize/fontWeight/
│   │                       lineHeight/letterSpacing + textStyles (display/heading/
│   │                       title/body/caption/label)
│   ├── spacing.ts        — new: 0,1,2,3,4,5,6,8,10,12,16,20,24,32 (4px base unit)
│   ├── radii.ts          — moved from theme/radii.ts, unchanged content
│   ├── shadows.ts        — moved from theme/shadows.ts, unchanged content
│   ├── breakpoints.ts    — new: sm/md/lg/xl/2xl, Chakra's standard 6-step scale
│   ├── motion.ts         — new: durations (fast/normal/slow) + easings
│   │                       (easeIn/easeOut/easeInOut)
│   └── index.ts           — re-exports all token modules
└── theme/
    ├── index.ts            — createSystem/defineConfig, now imports from ../tokens
    ├── semantic-tokens.ts  — stays in place; P0/P1 contrast fixes applied
    └── Colors.stories.tsx  — moves to Storybook Foundations/ group (see below)
```

No `theme/recipes/` or `theme/components/` folders are created in this
pass — they're added when actual component work starts, per the "no UI
components yet" constraint.

## Colors

No new primitive hue families. `colors.ts` keeps its existing five
scales (`ink`, `teal`, `lime`, `danger`, `caution`), each already a full
50–950 ramp anchored to real AERYO brand hex values, with the existing
file-level comment explaining the restraint principle (why there's no
generic `blue`/`green`/`gray`/etc.).

`semantic-tokens.ts` changes:

1. `accent.contrast` becomes mode-aware: `_light: "{colors.ink.50}"`,
   `_dark: "{colors.ink.950}"` (fixes the P0).
2. `fg.subtle` dark value moves off `ink.500` to a verified-AA value
   against both `bg` and `bg.subtle` (fixes P1).
3. `fg.muted` dark value nudges to clear 4.5:1 against `bg.muted`
   specifically, re-verifying it still holds against `bg`/`bg.subtle`
   too (fixes P1).
4. One-line addition to the top-level restraint-principle comment
   naming `danger`/`caution` as the sanctioned universal safety-color
   exception (addresses the critique's P2 consistency note).
5. One-line comment on `border.DEFAULT` marking it decorative-only, not
   for interactive-boundary use (addresses the critique's P3 note).

No structural/shape changes to `semantic-tokens.ts` beyond these value
and comment edits — `background`/`surface`/`border`/`text`/`icon`/
`status` naming in the original ask is already covered by the existing
`bg`/`fg`/`border`/`accent`/`rider`/`session`/`wind` semantic groups,
which this spec keeps rather than renaming (renaming would break every
future consumer for no functional gain, and the existing names already
match Chakra's own semantic-token conventions for `bg`/`fg`).

## Typography

`fontFamily` (`fonts.heading`/`fonts.body`/`fonts.mono`) is unchanged
(Sora/Inter/Geist Mono, loaded via `next/font/google` in
`src/app/layout.tsx`).

New token categories, using Chakra v3's native scale shape:

- `fontSizes`: xs(12) / sm(14) / md(16) / lg(18) / xl(20) / 2xl(24) /
  3xl(30) / 4xl(36) / 5xl(48) — Chakra's standard px-equivalent rem
  scale, no brand-specific override (no stat-numeral spec exists yet to
  justify inventing one — matches the existing file's own stated
  reasoning for deferral, now resolved by using the proven default
  scale instead of guessing).
- `fontWeights`: normal(400) / medium(500) / semibold(600) / bold(700) /
  extrabold(800) — covers Sora at bold/extrabold and Inter at
  regular/medium/semibold, per the existing file's documented usage.
- `lineHeights`: tight(1.2) / normal(1.5) / relaxed(1.65).
- `letterSpacings`: tight(-0.02em) / normal(0) / wide(0.02em).
- `textStyles` (Chakra v3's named-bundle token type — each resolves
  fontFamily+fontSize+fontWeight+lineHeight+letterSpacing together, used
  as `textStyle="display"` etc.):
  - `display`: Sora, 5xl, extrabold, tight line-height/letter-spacing —
    hero numerals/headlines.
  - `heading`: Sora, 3xl, bold, tight.
  - `title`: Sora, xl, semibold, normal.
  - `body`: Inter, md, normal weight, normal line-height.
  - `caption`: Inter, sm, normal weight, normal.
  - `label`: Inter, xs, medium weight, wide letter-spacing (uppercase
    label use).

## Spacing

`spacing.ts`, 4px base unit, matching the requested scale exactly:
`0, 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px),
10(40px), 12(48px), 16(64px), 20(80px), 24(96px), 32(128px)`.

## Radius

`radii.ts` moves unchanged: `xs(4) / sm(6) / md(8) / lg(10) / xl(14) /
2xl(18) / 3xl(22) / full(9999)`. `none` isn't redefined here — Chakra's
`defaultConfig` already supplies `radii.none: 0`, and this system is
built via `createSystem(defaultConfig, config)`, so it's already
available without duplication. The Storybook Radius story documents
`none` by reading it from the merged system, not from this file, to
prove it resolves correctly end-to-end.

## Shadows

`shadows.ts` moves unchanged: `xs / sm / md / lg / xl`, tuned for the
dark near-black surface per its existing comment.

## Breakpoints

`breakpoints.ts`, new, Chakra's standard scale: `sm(30em) / md(48em) /
lg(62em) / xl(80em) / 2xl(96em)`. No brand-specific deviation — nothing
in the brand guide specifies custom breakpoints.

## Motion

`motion.ts`, new:

- `durations`: `fast(120ms) / normal(200ms) / slow(320ms)`.
- `easings`: `easeIn(cubic-bezier(0.4, 0, 1, 1)) / easeOut(cubic-bezier(0,
  0, 0.2, 1)) / easeInOut(cubic-bezier(0.4, 0, 0.2, 1))`.

Rationale tied to brand guide §19 ("fluid, directional, lightweight,
natural, responsive, confident"; explicitly "avoid excessive bounce") —
standard decelerating curves, no spring/bounce easing functions.

## Theme Integration

`theme/index.ts`'s `defineConfig`/`createSystem` call is structurally
unchanged; only its imports repoint from `./colors` etc. to
`../tokens/colors` etc. (or a single `import * as tokens from
"../tokens"` if cleaner at implementation time). `theme.tokens` gains
`fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `spacing`,
`breakpoints`; `theme.textStyles` is added at the top level alongside
`theme.tokens`/`theme.semanticTokens` (Chakra v3's expected location for
named text-style bundles).

`src/components/ui/provider.tsx` (existing `ChakraProvider` wiring) is
unchanged — it already consumes `system` from `theme/index.ts`.

## Storybook

New `Foundations/` group, matching `docs/guides/aeryo-branding.md` §22's
own recommended structure almost verbatim:

- `Foundations/Colors` — the existing `Colors.stories.tsx`, moved/
  retitled into the group, unchanged rendering logic (live token
  swatches, not hardcoded hex).
- `Foundations/Typography` — renders every `fontSize`/`fontWeight`/
  `lineHeight`/`letterSpacing` step and every `textStyle` live, each
  labeled with its token name and resolved value.
- `Foundations/Spacing` — renders each spacing step as a sized box with
  its token name/px value.
- `Foundations/Radius` — renders a swatch per radius step, including
  `none` (read from the resolved system to prove Chakra's default
  merges correctly).
- `Foundations/Shadows` — renders a card per shadow step on the dark
  surface token.
- `Foundations/Motion` — renders a small animated demo per duration/
  easing combination (a element sliding/fading using the actual
  duration+easing token values), plus a static table of the raw
  duration/easing values.

All stories read tokens by reference from the `tokens/`/`theme/`
modules — never hardcoded values — continuing the existing Colors
story's pattern.

## Testing

One rendering-validation Jest test per new/changed token module,
asserting the exported object has the expected top-level keys and that
`theme/index.ts`'s `createSystem(...)` call succeeds (i.e., the merged
config is valid and doesn't throw). Storybook stories serve as the
visual/manual check. Explicitly out of scope, per the original request:
accessibility tests, snapshot tests, visual regression tests, e2e tests.

## Out of Scope

- Any UI component (Button, Card, Input, etc.) or component recipe.
- `theme/recipes/` and `theme/components/` folders.
- New color hue families beyond AERYO's existing five.
- A custom/non-standard type scale beyond Chakra's default rem scale.
- Renaming existing semantic token groups (`bg`/`fg`/`accent`/`rider`/
  `session`/`wind`) to the `background`/`surface`/`text`/`icon`/`status`
  names used in the original prompt — the existing names are kept.
