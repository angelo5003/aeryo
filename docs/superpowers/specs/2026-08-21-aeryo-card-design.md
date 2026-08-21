# AeryoCard — Design Spec

Date: 2026-08-21
Status: Approved for planning

## Context

The AERYO Design System foundations (tokens, semantic tokens, theme,
Button, Text, Heading, Input) are complete. This spec covers the next
component: **AeryoCard**, the compound-component foundation every future
product card (SpotCard, ForecastCard, WeatherCard, SessionCard,
ReviewCard, AchievementCard, CommunityPostCard, LocationCard, …) will be
built from.

This is explicitly a **scalability/API** exercise, not a visual-polish
exercise — visual styling stays token-driven and intentionally
conservative; the priority is a composition API that scales cleanly to
many future card types without prop explosion.

**Out of scope for this spec:** modifying Button, Text, Heading, or
Input; modifying the shared theme config
(`src/design-system/theme/index.ts`) or `semantic-tokens.ts`; building
SpotCard/ForecastCard/WeatherCard as real standalone components (they
appear only as Storybook composition examples built from AeryoCard).

## Conventions carried over from Button/Badge/Tag

- Thin wrapper around Chakra UI v3 primitives — Chakra is an
  implementation detail consumers never import directly.
- `React.forwardRef`, a dedicated `*.types.ts` file, a dedicated
  `*.stories.tsx` file, a barrel `index.ts`.
- Semantic props (never raw Chakra `colorPalette`/recipe internals)
  translated internally via an `internal/` helper.
- Every prop documented with a doc comment; every visual value sourced
  from `src/design-system/tokens/*` or `semantic-tokens.ts` — no
  hardcoded colors/spacing/radii/shadows.
- Storybook: `title: "Surfaces/Card"`, `tags: ["autodocs", "ai-generated"]`,
  reuses the existing shared
  `src/components/internal/storybookViewports.ts` (`RESPONSIVE_VIEWPORTS`)
  for Mobile/Tablet/Desktop stories, and `DarkMode`/`LightMode` wrappers
  from `src/components/ui/color-mode` for the two theme stories — same
  pattern as `Button.stories.tsx`.

## File layout

```
src/components/surfaces/Card/
  AeryoCard.tsx              # root: Card.Root / LinkBox wrapper, layout-splitting, context provider
  AeryoCardHeader.tsx
  AeryoCardBody.tsx
  AeryoCardFooter.tsx
  AeryoCardMedia.tsx
  AeryoCardMeta.tsx
  AeryoCardBadges.tsx
  AeryoCardActions.tsx
  AeryoCard.types.ts         # all prop types, one file (per Button.types.ts convention)
  AeryoCard.stories.tsx      # single stories file
  index.ts                   # barrel export
  internal/
    AeryoCardContext.tsx     # {size, layout, variant, disabled, loading} context + hook
    cardVariantStyles.ts     # default/elevated/outlined/filled/interactive → token-based style props
    aspectRatios.ts          # square/portrait/landscape/wide → numeric ratios
```

`surfaces/` is a new top-level component category, sibling to
`actions/`, `typography/`, `primitives/` — same convention, new folder
because this is the first "surface" component.

## Component API

### `AeryoCard` (root)

Built on Chakra's `Card.Root`. Renders as a plain `Card.Root` (a `div`)
normally; when `clickable` or `href` is passed, renders as a Chakra
`LinkBox` wrapping `Card.Root` instead (see **Interactive mode** below).

Props:

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `"default" \| "elevated" \| "outlined" \| "filled" \| "interactive"` | `"default"` | Visual treatment. `elevated`/`outlined` map onto Chakra's own Card recipe variants (`elevated`/`outline`); `default`/`filled`/`interactive` are supplied by `internal/cardVariantStyles.ts`, a local token-based style-prop map — **no edits to the shared theme recipe**. `interactive` adds hover/focus affordance styling; it is independent of the `clickable`/`href` behavior props below (a card can be visually `interactive` without navigating, or `clickable` with any variant). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Passed straight through to Chakra Card's own `size` (controls `--card-padding` and is exposed via context so `AeryoCardHeader` can map it onto `Heading`/`Text` size props). |
| `layout` | `"vertical" \| "horizontal"` | `"vertical"` | See **Layout** below. |
| `selected` | `boolean` | `false` | Adds a selected visual treatment + `aria-selected` on the root (or the `LinkOverlay` when interactive). |
| `disabled` | `boolean` | `false` | Dims the card, sets `aria-disabled`, blocks the card's own click/nav. Does **not** reach into arbitrary children to disable them individually — that stays the consumer's responsibility. |
| `loading` | `boolean` | `false` | Flows through context; every subcomponent renders its own skeleton shape instead of real content. See **Loading**. |
| `clickable` | `boolean` | `false` | Makes the whole card one accessible click target (button semantics) without navigation. Mutually usable with `href`. |
| `href` | `string` | — | Makes the whole card one accessible navigation target (link semantics). Implies `clickable`. |
| `onClick` | `(e) => void` | — | Forwarded to the overlay control when `clickable`/`href` is set. |
| ...rest | `Omit<CardRootProps, "size" | "variant">` | | Every other Chakra `Card.Root` field (style props, responsive props, `as`, `ref`, …) passes through untouched. |

### Interactive mode

- `clickable` and/or `href` swap the root's rendering from plain
  `Card.Root` to `LinkBox` containing `Card.Root`, plus a full-bleed,
  visually-hidden `LinkOverlay`:
  - `href` set → `LinkOverlay` renders as a real `<a href>` (link
    semantics, `Enter` navigates, right-click/"open in new tab" works
    natively).
  - only `clickable` set (no `href`) → `LinkOverlay` renders as a real
    `<button type="button">` (button semantics, `Enter`/`Space`
    activate, native focus ring).
- This gives keyboard navigation, visible focus styles, and correct
  link-or-button semantics **without the consumer wiring any handler**
  — exactly the brief's requirement.
- `AeryoCardActions` (and any other nested interactive element) sits in
  a stacking context above the overlay (`position: relative; z-index`)
  so a Save/Share button inside the card keeps working independently —
  this avoids the invalid-HTML trap of nesting a `<button>` inside an
  `<a>`, which a naive "wrap the whole card in an anchor" approach would
  hit the moment any card gets a footer action.
- `disabled` on a clickable/`href` card removes the overlay from the tab
  order and blocks activation, but the surrounding `Card.Root` is still
  rendered (so children stay visible, just visually dimmed).

### Layout: vertical vs horizontal

- `layout="vertical"` (default): children render in authored order,
  stacked in a column. Typical for `SpotCard`-style cards (`Media` →
  `Header` → `Body` → `Footer`).
- `layout="horizontal"`: `AeryoCard` scans its direct children, pulls
  out `AeryoCardMedia` (detected by component identity, not by string
  matching), and renders it as a fixed-width column next to an
  auto-generated flex-column wrapper holding every other child in their
  authored order. Typical for `ForecastCard`-style cards (thumbnail +
  stacked text content beside it). Consumers keep authoring a flat
  child list in both modes — the split is internal.
- If no `AeryoCardMedia` child is present, `horizontal` has nothing to
  split off and behaves like a single row containing all children.

### `AeryoCardMedia`

Wraps Chakra's `AspectRatio`. Props:

| Prop | Type | Default |
|---|---|---|
| `aspectRatio` | `"square" \| "portrait" \| "landscape" \| "wide"` | `"landscape"` |
| `as` | `"img" \| "video" \| undefined` | — renders `children` directly when omitted (custom content) |
| `src`, `alt`, etc. | passed through to the underlying `img`/`video` when `as` is set | |
| ...rest | style/responsive props | |

`internal/aspectRatios.ts` maps the four names to numeric ratios
(`square` 1/1, `portrait` 3/4, `landscape` 4/3, `wide` 16/9).

### `AeryoCardHeader`

Wraps Chakra's `Card.Header`. Composes the *existing* `Heading`/`Text`
components (not raw Chakra primitives) for its slots:

| Prop | Notes |
|---|---|
| `overline` | small `Text`, rendered above `title` |
| `title` | `Heading`, size mapped from card `size` context |
| `subtitle` | `Text`, muted |
| `icon` | leading icon element |
| `actions` | trailing slot, typically an `AeryoCardActions` |

### `AeryoCardBody`

Wraps Chakra's `Card.Body`. Just a styled flex container — accepts
arbitrary `children` (descriptions, `AeryoCardMeta`, `AeryoCardBadges`,
stats, rich content). No prescribed internal structure — deliberately
unopinionated, per YAGNI.

### `AeryoCardFooter`

Wraps Chakra's `Card.Footer`. A styled row container (buttons, links,
metadata, actions) with a `justify` prop (`"start" | "end" | "between"`,
default `"between"`).

### `AeryoCardMeta`

A small label+value(+icon) metadata unit (e.g. "18 kt · Wind Speed",
"4.8 · Rating", "12 km · Distance"). Props: `icon?`, `label`, `value`,
`size` (inherited from context by default, overridable). Purely
presentational — no data-fetching or unit-formatting logic.

### `AeryoCardBadges`

A positioning wrapper (Chakra `Wrap`) around *existing* `Badge`
component instances — does not reinvent badge visuals. Props: `children`
(one or more `Badge` elements), `position` (`"static" | "overlay-top-left"
| "overlay-top-right"`, default `"static"`). When a `position="overlay-*"`
is used, it absolutely-positions itself against the nearest
`AeryoCardMedia` (which establishes `position: relative`).

### `AeryoCardActions`

A positioning wrapper (Chakra `HStack`) around *existing* `Button`/
`IconButton` instances (Save, Share, Open, View Forecast, …). Same
`position` prop as `AeryoCardBadges`, for overlaying an icon button (e.g.
Save) on top of Media.

### Loading

`loading` is set on the root and exposed via context; there is no
separate "loading tree" built at the root. Each subcomponent checks
`loading` from context and, if true, renders a `Skeleton`/`SkeletonText`
shaped to its own already-known props instead of its real children:

- `AeryoCardMedia` → a `Skeleton` at its own `aspectRatio`.
- `AeryoCardHeader` → `SkeletonText` lines for `title`
  (+ one more if `subtitle` was passed), `icon`/`actions` slots become
  small `Skeleton` blocks if present.
- `AeryoCardBody` → a few `SkeletonText` lines (line count driven by
  how many children were passed, capped at a small max).
- `AeryoCardFooter` → one `Skeleton` block per child (roughly
  button-shaped).

Because each slot already received its real props (aspect ratio, which
optional slots are populated, how many footer actions), the skeleton
matches the eventual real card's footprint — no layout shift when
`loading` flips to `false`.

### Context

`internal/AeryoCardContext.tsx` provides `{ size, layout, variant,
disabled, loading }` from `AeryoCard` down to every subcomponent. A
`useAeryoCardContext()` hook throws a clear error if a subcomponent is
rendered outside `AeryoCard` (matches the "compound component must be
used together" convention).

## Storybook

Single `AeryoCard.stories.tsx`, `title: "Surfaces/Card"`,
`tags: ["autodocs", "ai-generated"]`, all props exposed as controls.
Stories: Default, Elevated, Outlined, Filled, Interactive, Small,
Medium, Large, Vertical, Horizontal, With Header, With Footer, With
Media, Loading, Empty, Disabled, Dark Mode, Light Mode, Mobile, Tablet,
Desktop, Long Content, SpotCard Example, ForecastCard Example,
WeatherCard Example — the last three are composition examples built
from `AeryoCard` + its subcomponents, not new components.

## Quality gate

- All stories render.
- Dark mode and light mode both verified (via `DarkMode`/`LightMode`
  wrapper stories).
- No hardcoded values — every color/spacing/radius/shadow traces to
  `src/design-system/tokens/*` or `semantic-tokens.ts`.
- `pnpm typecheck` (or the project's TypeScript check script) passes.

## Explicitly out of scope / deferred

- Editing `src/design-system/theme/index.ts` or `semantic-tokens.ts`.
- Building SpotCard/ForecastCard/WeatherCard/etc. as real components —
  future work, one spec each, built on top of `AeryoCard`.
- Disabling nested interactive children when the card itself is
  `disabled`.
- Badge/action "preset" shorthand props (e.g. a `featured` boolean) —
  consumers compose real `Badge`/`Button` elements instead; presets can
  be added later if a real duplication pattern emerges.
