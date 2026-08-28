---
name: AERYO
description: Open-air instrument — teal-on-ink kitesurf UI, photographic where it matters, quiet chrome everywhere else.
colors:
  aeryo-teal: "#19AEB5"
  aeryo-teal-deep: "#106B70"
  aeryo-teal-bright: "#63E6D5"
  north-sea-ink: "#071216"
  north-sea-surface: "#0D2931"
  off-white: "#EDF8F6"
  wind-lime: "#D7FF3F"
  danger: "#B84740"
  caution: "#A6672A"
  success: "#41B981"
  hairline-dark: "rgba(99, 230, 213, 0.16)"
typography:
  display:
    fontFamily: "var(--font-sora), Sora, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-sora), Sora, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "var(--font-sora), Sora, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-manrope), Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: "var(--font-manrope), Manrope, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-manrope), Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.04em"
  body-photo:
    fontFamily: "var(--font-manrope), Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.65
    letterSpacing: "normal"
  label-photo:
    fontFamily: "var(--font-manrope), Manrope, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.65
    letterSpacing: "0.08em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  3xl: "22px"
  full: "9999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.25rem"
  6: "1.5rem"
  8: "2rem"
  10: "2.5rem"
  12: "3rem"
  16: "4rem"
  20: "5rem"
  24: "6rem"
  32: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.aeryo-teal-deep}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.aeryo-teal}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.off-white}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
  card-default:
    backgroundColor: "{colors.north-sea-surface}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.xl}"
    padding: "1rem"
  input-outline:
    backgroundColor: "transparent"
    textColor: "{colors.off-white}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
    height: "2.5rem"
  status-pill:
    backgroundColor: "{colors.aeryo-teal}"
    textColor: "{colors.north-sea-ink}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.5rem"
---

# Design System: AERYO

## Overview

**Creative North Star: "The Open-Air Instrument"**

AERYO looks like a precision instrument taken outside: North Sea Ink atmosphere, one AERYO Teal signal, full-bleed photography where emotion belongs, and quiet chrome everywhere else. Wind is not an icon set. It is geometry, motion, and a lime-only data scale.

The interface is refined and restrained. Corners are aerodynamic, not pill-by-default. Teal is for real actions and real status, not decoration. On intro and onboarding, the photograph carries the feeling; type and buttons sit on a dark scrim and stay out of the way.

It must not read as a generic weather dashboard, tropical surf brand, SaaS card farm, or extreme-sports poster.

**Key Characteristics:**

- One primary (AERYO Teal). No second general-purpose highlight.
- Photographic full-bleed for brand moments; token surfaces for product chrome.
- Hybrid depth: tonal ink steps at rest, real shadow when something floats or is pressable.
- Named text styles only (`display` / `heading` / `title` / `body` / `caption` / `label`).
- Portrait phone in a native shell; safe-area as spacing tokens (`safe.top` and siblings).

## Colors

A near-black atmospheric ink scale, one teal primary, lime reserved for wind intensity, and three role-named safety ramps.

### Primary

- **AERYO Teal** (`#19AEB5`, `teal.500`): the only general accent. Interactive defaults (solid buttons, links, active states) use the semantic `accent.solid` pair: `#106B70` in light mode (`teal.700`), `#19AEB5` in dark mode (`teal.500`). Text on those solids is `accent.contrast` (`#EDF8F6` light / `#071216` dark).
- **Mint step** (`#63E6D5`, `teal.300`): a lighter step of the same family, not a second brand color. Dark-mode rider/session “active” and hairline borders borrow this family at low opacity.

### Secondary

Omitted. There is no second general-purpose highlight.

### Tertiary

Omitted as a UI accent. **Wind Lime** (`#D7FF3F`, `lime.300`) exists only on the `wind.*` intensity scale (strong). Never bind it to a button, badge, or chrome.

### Neutral

- **North Sea Ink** (`#071216`, `ink.950`): default dark background (`bg` in dark mode). Photographic canvas is the semantic `bg.photo` (always this value, both modes).
- **North Sea Surface** (`#0D2931`, `ink.900`): dark `bg.subtle` / panel.
- **Off-White** (`#EDF8F6`, `ink.50`): default light background and dark-mode foreground (`fg`). Type on photography is `fg.photo` (always this value). Inactive marks on photography are `fg.photo.muted` (this value at 40%).
- **Hairline (dark)** (`rgba(99, 230, 213, 0.16)`): default dark `border`. Decorative only.

Foreground roles: `fg` (ink.950 / ink.50), `fg.muted` (ink.500 / `#76A1A9`), `fg.subtle` (ink.400 / `#66969F`, not on `bg.muted`).

### Named Rules

**The One Teal Rule.** If a new element wants “a highlight,” use a brighter teal step first, then ask whether it needs one at all. Lime is not a candidate.

**The Wind Lime Rule.** Lime lives inside `wind.*` only. Strong wind may go lime; extreme wind is caution, a safety state, not “more lime.”

**The Color-Plus-Data Rule.** Condition quality is never color alone. Pair color with icon, label, and a number.

**The Hairline Rule.** `border` / `border.muted` are low-contrast decorative edges. Interactive outlines (input, focus, button stroke) need a dedicated stronger boundary (`border.error`, focus ring, or accent).

## Typography

**Display Font:** Sora (`--font-sora`, fallback Sora, sans-serif)
**Body Font:** Manrope (`--font-manrope`, fallback Manrope, sans-serif)
**Label/Mono Font:** Geist Mono (`--font-geist-mono`) for code/data only, not costume “technical” UI. Labels use Manrope (`textStyle="label"`), not Mono.

**Character:** Sora is geometric and aerodynamic on headings. Manrope is the same geometric family of thought, tuned for reading and chrome — a cousin, not Inter’s default workhorse. Do not size headings with Chakra’s `size` recipe; use `Heading` `variant` which maps to `textStyle`. Sora’s smallest size is `title` (1.25rem).

### Hierarchy

- **Display** (extrabold 800, 3rem / `5xl`, line-height 1.2, tracking `-0.02em`): rare hero type. `Heading variant="display"`.
- **Headline** (bold 700, 1.875rem / `3xl`, line-height 1.2): screen titles. `Heading variant="heading"` (default).
- **Title** (semibold 600, 1.25rem / `xl`, line-height 1.5): card titles, onboarding headings. Sora’s floor. `Heading variant="title"`.
- **Body** (regular 400, 1rem, line-height 1.5): default reading text. `Text variant="body"`.
- **Caption** (regular 400, 0.875rem / `sm`): supporting copy. `Text variant="caption"`.
- **Label** (medium 500, 0.75rem / `xs`, tracking `0.04em`): meta, compact UI. `Text variant="label"`.
- **Body on photo** (medium 500, 1rem, line-height 1.65): onboarding and other light type on a dark photograph. `Text variant="body.photo"`.
- **Label on photo** (semibold 600, 0.75rem / `xs`, tracking `0.08em`): meta on a photograph. `Text variant="label.photo"`.

### Named Rules

**The One Scale Rule.** Reach for `textStyle` / `Heading`/`Text` variants. Do not invent a parallel size ladder.

**The Sora Floor Rule.** Sora never renders below `title` (1.25rem). Anything smaller is Manrope. Chakra heading `size` xs–xl collapses to `title` so a leftover `size="sm"` cannot put Sora on a caption.

## Layout

Mobile-first, portrait-only native shell. Capacitor always boots at `/`. Breakpoints match Chakra’s scale: `sm` 30em, `md` 48em, `lg` 62em, `xl` 80em, `2xl` 96em.

Spacing is a 4px base (`1` = 0.25rem). Prefer the sanctioned steps in `src/design-system/tokens/spacing.ts` (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32).

Safe area is a spacing family: `pt="safe.top"` (and `bottom` / `left` / `right`), backed by `--safe-*` in `globals.css`. Full-bleed screens (intro, onboarding) opt out of body padding with negative safe-area margins so the photo runs under the notch; content still pads with `safe.*`.

Intended app chrome (not built yet): Home, Spots, Sessions, Messages, Profile. Do not invent that nav in this file as if it existed.

## Elevation & Depth

Hybrid. Resting surfaces are flat: a lighter ink step (`bg.panel`, `bg.subtle`, `bg.muted`) plus a hairline border. Shadows exist for floating layers and pressable cards, not as a default card costume.

### Shadow Vocabulary

- **xs** (`0 1px 2px rgba(2, 8, 10, 0.4)`): smallest rest lift.
- **sm** (`0 2px 8px rgba(2, 8, 10, 0.45)`): interactive card hover.
- **md** (`0 8px 24px rgba(2, 8, 10, 0.5)`): menus / popovers.
- **lg** (`0 16px 40px rgba(2, 8, 10, 0.55)`): dialogs.
- **xl** (`0 24px 64px rgba(2, 8, 10, 0.6)`): rare, large overlays.

Tuned for near-black surfaces. Do not import light-theme gray shadows.

### Named Rules

**The Float-When-It-Floats Rule.** If it is not hovering, popping over, or pressable, prefer tone + hairline over `box-shadow`.

## Shapes

Intentional, aerodynamic, tighter than generic SaaS. Prefer `md` (8px) / `lg` (10px) on buttons and fields; `xl` (14px) / `2xl` (18px) on cards. `full` (pill) is for avatars and small status chips only, not default buttons.

### Named Rules

**The No-Pill-By-Default Rule.** A pill must earn it (avatar, StatusPill). Primary actions stay `rounded.md`.

## Components

Documented here because they exist in `src/components/`. Do not treat this list as a backlog to generate missing pieces.

### Buttons

Refined, restrained. Semantic `intent` (`primary` | `secondary` | `success` | `warning` | `danger`) maps to palettes teal / ink / success / caution / danger. Variants: `solid` | `outline` | `ghost` | `subtle`. Sizes: `sm` | `md` | `lg`.

- **Shape:** aerodynamic 8px (`md`), not pill.
- **Primary solid:** `accent.solid` fill, `accent.contrast` label. Light mode fill is teal.700 so contrast can stay light in both modes.
- **Ghost:** used on photo scrims (onboarding Skip) with an explicit light color.
- **Focus:** Chakra focus ring via the palette `focusRing` tokens. Do not `outline: none` without a replacement.

### Cards / Containers

`AeryoCard`: `default` | `elevated` | `outlined` | `filled` | `interactive`. Default is panel + 1px `border.muted`. Interactive adds `sm` shadow on hover and `scale(0.99)` on active. Layout: `vertical` | `horizontal` (media split). Domain cards (Spot, Session, Weather, Forecast, Rider) compose this primitive.

- **Corner style:** `xl` / `2xl` (14–18px).
- **Internal padding:** Chakra Card size recipe (`sm` | `md` | `lg`).

### Inputs / Fields

Pass-through Chakra `Input` on AERYO tokens (`border`, `bg.muted`, `border.error`). Compose inside `Field` for label / helper / error. Invalid state uses `border.error` (3:1 UI boundary, not 4.5:1 text).

### Chips

`StatusPill` and `Badge` / `Tag`: pill radius is allowed here. Intents are semantic palettes, never raw `colorPalette`. Wind and rider/session states have dedicated semantic tokens (`wind.*`, `rider.*`, `session.*`).

### Signature: full-bleed photo screens

Intro and onboarding: cover photo, Ken Burns zoom (`scale` 1 → 1.06 over 6s, skipped under reduced motion), gradient scrim from `bg.photo` at 90% → 0, type in `fg.photo`. Not theme-aware — `bg.photo` / `fg.photo` stay North Sea Ink / Off-White in both modes. `ProgressDots` sit on that scrim (`fg.photo` / `fg.photo.muted`), not on `bg`/`fg`.

### Motion (incumbent)

Durations: fast 120ms, normal 200ms, slow 320ms. Easing: `easeOut` `cubic-bezier(0, 0, 0.2, 1)` by default. No bounce. Onboarding paging uses a slower expo settle (`0.48s`, `cubic-bezier(0.16, 1, 0.3, 1)`), one slide per gesture. Honor `prefers-reduced-motion`: drop spatial motion, keep state readable.

## Do's and Don'ts

### Do:

- **Do** use `bg` / `fg` / `border` / `accent` semantic tokens so light and dark stay paired. Use `bg.photo` / `fg.photo` on full-bleed photography (those do not flip with color mode).
- **Do** put photography on intro/onboarding and keep product lists on ink panels.
- **Do** mark wind with teal → lime → caution, plus a label and a number.
- **Do** pad full-bleed content with `safe.*` after opting the photo out of body insets.
- **Do** wrap Chakra; consumers import `@/components/...`, never raw palettes for brand color.

### Don't:

- **Don't** add a second brand accent. Mint is teal.300, not a new family.
- **Don't** put Wind Lime on buttons or badges.
- **Don't** use stock Chakra red/orange/green for status; use `danger` / `caution` / `success`.
- **Don't** default buttons to `rounded.full`.
- **Don't** rely on hairline borders as the only interactive edge.
- **Don't** expose exact GPS as a visual pattern; presence is a status pill, not a live dot on a map in V1.
- **Don't** reach for raw palette steps (`ink.950`, `white`, `whiteAlpha`) in app UI. Name the role in `semantic-tokens.ts` instead.
