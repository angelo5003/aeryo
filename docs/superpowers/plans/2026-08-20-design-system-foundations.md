# AERYO Design System Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the AERYO design-system foundations layer — a complete, token-driven set of design tokens (color, typography, spacing, radius, shadows, breakpoints, motion), wired into the Chakra UI v3 theme, and documented live in Storybook under a `Foundations/` group. No UI components.

**Architecture:** Extend the existing `src/design-system/theme/` system rather than creating a parallel structure. Move the three already-complete token files (`colors.ts`, `radii.ts`, `shadows.ts`) into a new `src/design-system/tokens/` directory unchanged, replace the deliberately-deferred `typography.ts` with a fully expanded version, and add three new token modules (`spacing.ts`, `breakpoints.ts`, `motion.ts`). `theme/index.ts` assembles all of them via `defineConfig`/`createSystem`. `theme/semantic-tokens.ts` is untouched — a fresh read confirmed every issue an earlier critique flagged is already fixed in it.

**Tech Stack:** Next.js 16, React 19, TypeScript, Chakra UI v3 (`@chakra-ui/react` v3.36), Storybook 10 (`@storybook/nextjs-vite`), Jest + Testing Library (via `next/jest`).

**Spec:** [docs/superpowers/specs/2026-08-20-design-system-foundations-design.md](../specs/2026-08-20-design-system-foundations-design.md)

## Global Constraints

- No hardcoded colors, spacing, radius, or typography values anywhere in app code — everything token-driven.
- No new color hue families beyond AERYO's existing `ink`/`teal`/`lime`/`danger`/`caution` — no generic Slate/Gray/Blue/Green/Yellow.
- No `theme/recipes/` or `theme/components/` folders and no UI components in this pass.
- Testing is limited to rendering-validation tests and Storybook stories — no accessibility, snapshot, visual-regression, or e2e tests.
- `theme/semantic-tokens.ts` gets no content changes.
- All Storybook stories render live token values (via `useToken` or direct token application) — never a hardcoded hex/px duplicated from the token file.
- Tests live under `__tests__/`, mirroring the `src/` path, using the `@/` alias (see `jest.config.ts`), matching the existing `__tests__/page.test.tsx` pattern.

---

### Task 1: Move `colors.ts`, `radii.ts`, `shadows.ts` into `tokens/`

**Files:**
- Create: `src/design-system/tokens/colors.ts` (moved from `theme/colors.ts`, byte-identical)
- Create: `src/design-system/tokens/radii.ts` (moved from `theme/radii.ts`, byte-identical)
- Create: `src/design-system/tokens/shadows.ts` (moved from `theme/shadows.ts`, byte-identical)
- Delete: `src/design-system/theme/colors.ts`, `src/design-system/theme/radii.ts`, `src/design-system/theme/shadows.ts`
- Modify: `src/design-system/theme/index.ts`
- Test: `src/design-system/theme/index.test.ts`

**Interfaces:**
- Produces: `colors`, `radii`, `shadows` (same shape as before — `Record<string, { value: string }>` for each key/step) now importable from `@/design-system/tokens/colors`, `@/design-system/tokens/radii`, `@/design-system/tokens/shadows`.
- Consumes: nothing new.

- [ ] **Step 1: Write the failing test**

```typescript
// src/design-system/theme/index.test.ts
import { system } from "@/design-system/theme";

describe("design system theme", () => {
  it("builds a valid Chakra system", () => {
    expect(system).toBeDefined();
    expect(system.token("colors.teal.500")).toBe("#19AEB5");
    expect(system.token("radii.lg")).toBe("10px");
    expect(system.token("shadows.md")).toBe("0 8px 24px rgba(2, 8, 10, 0.5)");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/design-system/theme/index.test.ts`
Expected: PASS already, since the current `theme/index.ts` already resolves these tokens from `theme/colors.ts` etc. — this step confirms the baseline passes *before* the move, so a later failure is attributable to the move, not a pre-existing bug.

- [ ] **Step 3: Move the three files**

```bash
mkdir -p src/design-system/tokens
git mv src/design-system/theme/colors.ts src/design-system/tokens/colors.ts
git mv src/design-system/theme/radii.ts src/design-system/tokens/radii.ts
git mv src/design-system/theme/shadows.ts src/design-system/tokens/shadows.ts
```

- [ ] **Step 4: Update `theme/index.ts` imports**

```typescript
// src/design-system/theme/index.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { colors } from "../tokens/colors";
import { radii } from "../tokens/radii";
import { shadows } from "../tokens/shadows";
import { semanticTokens } from "./semantic-tokens";
import { fonts } from "./typography";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
      radii,
      shadows,
    },
    semanticTokens,
  },
});

/**
 * The Aeryo design system, built on top of Chakra UI v3's default system.
 * Pass this to `ChakraProvider` (see `src/components/ui/provider.tsx`)
 * instead of `defaultSystem`.
 */
export const system = createSystem(defaultConfig, config);
```

(`./typography` here is still the old, not-yet-expanded file — it's replaced in Task 2. This keeps every intermediate commit in a working state.)

- [ ] **Step 5: Update `Colors.stories.tsx` doc comment paths**

The story's top comment and both `Story` descriptions reference `src/design-system/theme/colors.ts` and `src/design-system/theme/semantic-tokens.ts`. Update the `colors.ts` reference to the new path:

In `src/design-system/theme/Colors.stories.tsx`, change:
```
 * Not a component — a living reference for the Aeryo color tokens defined in
 * `src/design-system/theme`. Every swatch is rendered by its token name
```
to:
```
 * Not a component — a living reference for the Aeryo color tokens defined in
 * `src/design-system/tokens/colors.ts` (raw palette) and
 * `src/design-system/theme/semantic-tokens.ts` (semantic tokens). Every
 * swatch is rendered by its token name
```
and change the `RawPalette` story's description text `src/design-system/theme/colors.ts` to `src/design-system/tokens/colors.ts`.

- [ ] **Step 6: Run test to verify it still passes**

Run: `npx jest src/design-system/theme/index.test.ts`
Expected: PASS

- [ ] **Step 7: Run the full test suite and lint to catch any stale import**

Run: `npx jest && npm run lint`
Expected: all pass (no other file imports `theme/colors.ts`, `theme/radii.ts`, or `theme/shadows.ts` directly — `theme/index.ts` and the Storybook story are the only two consumers).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Move colors/radii/shadows tokens into design-system/tokens/"
```

---

### Task 2: Expand typography tokens

**Files:**
- Create: `src/design-system/tokens/typography.ts` (replaces `theme/typography.ts` with an expanded version)
- Delete: `src/design-system/theme/typography.ts`
- Modify: `src/design-system/theme/index.ts`
- Test: `src/design-system/tokens/typography.test.ts`

**Interfaces:**
- Produces: `fonts`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `textStyles` from `@/design-system/tokens/typography`. `textStyles` values are `{ value: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } }` objects keyed by `display` | `heading` | `title` | `body` | `caption` | `label`, each referencing the other token categories via Chakra's `"{category.key}"` reference syntax.
- Consumes: nothing new.

- [ ] **Step 1: Write the failing test**

```typescript
// src/design-system/tokens/typography.test.ts
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  textStyles,
} from "@/design-system/tokens/typography";

describe("typography tokens", () => {
  it("defines the font family tokens", () => {
    expect(fonts.heading.value).toContain("Sora");
    expect(fonts.body.value).toContain("Inter");
  });

  it("defines the full type scale", () => {
    expect(Object.keys(fontSizes)).toEqual([
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
    ]);
    expect(Object.keys(fontWeights)).toEqual([
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
    ]);
    expect(Object.keys(lineHeights)).toEqual(["tight", "normal", "relaxed"]);
    expect(Object.keys(letterSpacings)).toEqual(["tight", "normal", "wide"]);
  });

  it("defines the named textStyles bundles", () => {
    expect(Object.keys(textStyles)).toEqual([
      "display",
      "heading",
      "title",
      "body",
      "caption",
      "label",
    ]);
    expect(textStyles.display.value.fontFamily).toBe("{fonts.heading}");
    expect(textStyles.body.value.fontFamily).toBe("{fonts.body}");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/design-system/tokens/typography.test.ts`
Expected: FAIL — `Cannot find module '@/design-system/tokens/typography'`

- [ ] **Step 3: Write the implementation**

```typescript
// src/design-system/tokens/typography.ts
/**
 * Typography tokens: font families (brand-anchored, unchanged) plus the
 * full type scale (size/weight/line-height/letter-spacing) and the named
 * `textStyles` bundles (`display`/`heading`/`title`/`body`/`caption`/
 * `label`) components reach for via `textStyle="..."` instead of composing
 * fontSize+fontWeight+lineHeight by hand.
 *
 * Sizes/weights/line-heights/letter-spacings use Chakra's own proven rem
 * scale rather than a brand-invented one — nothing in
 * docs/guides/aeryo-branding.md specifies custom numerals (e.g. a bespoke
 * stat-numeral scale) that would justify deviating from it. Add a
 * brand-specific override here if a real typographic need shows up.
 */
export const fonts = {
  heading: { value: "var(--font-sora), 'Sora', sans-serif" },
  body: { value: "var(--font-inter), 'Inter', sans-serif" },
  mono: { value: "var(--font-geist-mono), ui-monospace, monospace" },
} as const;

export const fontSizes = {
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  md: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
  "4xl": { value: "2.25rem" },
  "5xl": { value: "3rem" },
} as const;

export const fontWeights = {
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
  extrabold: { value: "800" },
} as const;

export const lineHeights = {
  tight: { value: 1.2 },
  normal: { value: 1.5 },
  relaxed: { value: 1.65 },
} as const;

export const letterSpacings = {
  tight: { value: "-0.02em" },
  normal: { value: "0" },
  wide: { value: "0.02em" },
} as const;

/**
 * Named text-style bundles. Use as `textStyle="display"` etc. instead of
 * setting fontSize/fontWeight/lineHeight/letterSpacing individually.
 */
export const textStyles = {
  display: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.5xl}",
      fontWeight: "{fontWeights.extrabold}",
      lineHeight: "{lineHeights.tight}",
      letterSpacing: "{letterSpacings.tight}",
    },
  },
  heading: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.3xl}",
      fontWeight: "{fontWeights.bold}",
      lineHeight: "{lineHeights.tight}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  title: {
    value: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.xl}",
      fontWeight: "{fontWeights.semibold}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  body: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.md}",
      fontWeight: "{fontWeights.normal}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  caption: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.normal}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.normal}",
    },
  },
  label: {
    value: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.xs}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "{lineHeights.normal}",
      letterSpacing: "{letterSpacings.wide}",
    },
  },
} as const;
```

- [ ] **Step 4: Delete the old file and update `theme/index.ts`**

```bash
git rm src/design-system/theme/typography.ts
```

```typescript
// src/design-system/theme/index.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { colors } from "../tokens/colors";
import { radii } from "../tokens/radii";
import { shadows } from "../tokens/shadows";
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  textStyles,
} from "../tokens/typography";
import { semanticTokens } from "./semantic-tokens";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      radii,
      shadows,
    },
    semanticTokens,
    textStyles,
  },
});

/**
 * The Aeryo design system, built on top of Chakra UI v3's default system.
 * Pass this to `ChakraProvider` (see `src/components/ui/provider.tsx`)
 * instead of `defaultSystem`.
 */
export const system = createSystem(defaultConfig, config);
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/design-system/tokens/typography.test.ts`
Expected: PASS

- [ ] **Step 6: Extend the theme test to cover the new categories and resolve a textStyle**

Modify `src/design-system/theme/index.test.ts`, adding to the existing test body:

```typescript
    expect(system.token("fontSizes.xl")).toBe("1.25rem");
    expect(system.token("fontWeights.bold")).toBe("700");
```

- [ ] **Step 7: Run the full test suite**

Run: `npx jest`
Expected: all PASS

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Expand typography tokens: full type scale and named textStyles"
```

---

### Task 3: Add spacing tokens

**Files:**
- Create: `src/design-system/tokens/spacing.ts`
- Modify: `src/design-system/theme/index.ts`
- Test: `src/design-system/tokens/spacing.test.ts`

**Interfaces:**
- Produces: `spacing` — `Record<"0"|"1"|"2"|"3"|"4"|"5"|"6"|"8"|"10"|"12"|"16"|"20"|"24"|"32", { value: string }>` from `@/design-system/tokens/spacing`.
- Consumes: nothing new.

- [ ] **Step 1: Write the failing test**

```typescript
// src/design-system/tokens/spacing.test.ts
import { spacing } from "@/design-system/tokens/spacing";

describe("spacing tokens", () => {
  it("defines the full spacing scale", () => {
    expect(Object.keys(spacing)).toEqual([
      "0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24", "32",
    ]);
  });

  it("uses a 4px base unit", () => {
    expect(spacing["0"].value).toBe("0");
    expect(spacing["1"].value).toBe("0.25rem");
    expect(spacing["4"].value).toBe("1rem");
    expect(spacing["32"].value).toBe("8rem");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/design-system/tokens/spacing.test.ts`
Expected: FAIL — `Cannot find module '@/design-system/tokens/spacing'`

- [ ] **Step 3: Write the implementation**

```typescript
// src/design-system/tokens/spacing.ts
/**
 * Spacing scale on a 4px base unit (1rem = 16px, so step `1` = 0.25rem =
 * 4px). Covers the steps actually used across layout/gap/padding/margin —
 * intentionally not every integer, to keep the scale to a small, memorable
 * set (§ "Spacing" in docs/guides/aeryo-branding.md's Foundations list).
 */
export const spacing = {
  0: { value: "0" },
  1: { value: "0.25rem" }, // 4px
  2: { value: "0.5rem" }, // 8px
  3: { value: "0.75rem" }, // 12px
  4: { value: "1rem" }, // 16px
  5: { value: "1.25rem" }, // 20px
  6: { value: "1.5rem" }, // 24px
  8: { value: "2rem" }, // 32px
  10: { value: "2.5rem" }, // 40px
  12: { value: "3rem" }, // 48px
  16: { value: "4rem" }, // 64px
  20: { value: "5rem" }, // 80px
  24: { value: "6rem" }, // 96px
  32: { value: "8rem" }, // 128px
} as const;
```

- [ ] **Step 4: Wire into `theme/index.ts`**

Add the import and the `spacing` key to `theme.tokens`:

```typescript
import { spacing } from "../tokens/spacing";
```

```typescript
    tokens: {
      colors,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      radii,
      shadows,
      spacing,
    },
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/design-system/tokens/spacing.test.ts`
Expected: PASS

- [ ] **Step 6: Extend the theme test**

Add to `src/design-system/theme/index.test.ts`:

```typescript
    expect(system.token("spacing.4")).toBe("1rem");
```

- [ ] **Step 7: Run the full test suite**

Run: `npx jest`
Expected: all PASS

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add spacing tokens"
```

---

### Task 4: Add breakpoint tokens

**Files:**
- Create: `src/design-system/tokens/breakpoints.ts`
- Modify: `src/design-system/theme/index.ts`
- Test: `src/design-system/tokens/breakpoints.test.ts`

**Interfaces:**
- Produces: `breakpoints` — `Record<"sm"|"md"|"lg"|"xl"|"2xl", string>` (plain strings, **not** `{ value }`-wrapped — Chakra's `theme.breakpoints` is a distinct top-level config key from `theme.tokens`, not itself a token category with the `{value}` shape) from `@/design-system/tokens/breakpoints`.
- Consumes: nothing new.

- [ ] **Step 1: Write the failing test**

```typescript
// src/design-system/tokens/breakpoints.test.ts
import { breakpoints } from "@/design-system/tokens/breakpoints";

describe("breakpoint tokens", () => {
  it("defines the standard 5-step scale", () => {
    expect(breakpoints).toEqual({
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/design-system/tokens/breakpoints.test.ts`
Expected: FAIL — `Cannot find module '@/design-system/tokens/breakpoints'`

- [ ] **Step 3: Write the implementation**

```typescript
// src/design-system/tokens/breakpoints.ts
/**
 * Responsive breakpoints. Chakra's own standard 5-step scale — nothing in
 * docs/guides/aeryo-branding.md specifies custom breakpoints, so there's no
 * reason to deviate from the proven default. Note the shape here is plain
 * strings, not `{ value }` objects — `theme.breakpoints` is a distinct
 * top-level Chakra config key, unlike the `theme.tokens.*` categories.
 */
export const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
} as const;
```

- [ ] **Step 4: Wire into `theme/index.ts`**

Add the import and a top-level `breakpoints` key on `theme` (sibling of `tokens`, not inside it):

```typescript
import { breakpoints } from "../tokens/breakpoints";
```

```typescript
const config = defineConfig({
  theme: {
    breakpoints,
    tokens: {
      colors,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      radii,
      shadows,
      spacing,
    },
    semanticTokens,
    textStyles,
  },
});
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/design-system/tokens/breakpoints.test.ts`
Expected: PASS

- [ ] **Step 6: Extend the theme test**

Add to `src/design-system/theme/index.test.ts`:

```typescript
    expect(system.breakpoints.keys).toContain("md");
```

- [ ] **Step 7: Run the full test suite**

Run: `npx jest`
Expected: all PASS

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add breakpoint tokens"
```

---

### Task 5: Add motion tokens

**Files:**
- Create: `src/design-system/tokens/motion.ts`
- Modify: `src/design-system/theme/index.ts`
- Test: `src/design-system/tokens/motion.test.ts`

**Interfaces:**
- Produces: `durations` (`Record<"fast"|"normal"|"slow", { value: string }>`), `easings` (`Record<"easeIn"|"easeOut"|"easeInOut", { value: string }>`), and `motion` (`{ durations, easings }`, a convenience grouping) from `@/design-system/tokens/motion`.
- Consumes: nothing new.

- [ ] **Step 1: Write the failing test**

```typescript
// src/design-system/tokens/motion.test.ts
import { durations, easings, motion } from "@/design-system/tokens/motion";

describe("motion tokens", () => {
  it("defines fast/normal/slow durations", () => {
    expect(durations.fast.value).toBe("120ms");
    expect(durations.normal.value).toBe("200ms");
    expect(durations.slow.value).toBe("320ms");
  });

  it("defines easeIn/easeOut/easeInOut curves", () => {
    expect(Object.keys(easings)).toEqual(["easeIn", "easeOut", "easeInOut"]);
    expect(easings.easeOut.value).toBe("cubic-bezier(0, 0, 0.2, 1)");
  });

  it("groups both under a single motion export", () => {
    expect(motion).toEqual({ durations, easings });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/design-system/tokens/motion.test.ts`
Expected: FAIL — `Cannot find module '@/design-system/tokens/motion'`

- [ ] **Step 3: Write the implementation**

```typescript
// src/design-system/tokens/motion.ts
/**
 * Motion tokens: durations and easing curves.
 *
 * Per docs/guides/aeryo-branding.md §19 ("fluid, directional, lightweight,
 * natural, responsive, confident"; explicitly "avoid excessive bounce"),
 * every curve here is a standard decelerating/accelerating cubic-bezier —
 * no spring or bounce easing. `easeOut` (decelerate into rest) is the
 * default choice for most UI motion — it matches the "air moving around an
 * object and settling" metaphor better than a linear or bounced curve.
 *
 * Naming (`easeIn`/`easeOut`/`easeInOut`, camelCase) is additive alongside
 * Chakra's own default `ease-in`/`ease-out`/`ease-in-out` easings (kebab
 * case) — both remain available on the merged system; this doesn't
 * override Chakra's defaults, it adds AERYO's own named set.
 */
export const durations = {
  fast: { value: "120ms" },
  normal: { value: "200ms" },
  slow: { value: "320ms" },
} as const;

export const easings = {
  easeIn: { value: "cubic-bezier(0.4, 0, 1, 1)" },
  easeOut: { value: "cubic-bezier(0, 0, 0.2, 1)" },
  easeInOut: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
} as const;

export const motion = { durations, easings } as const;
```

- [ ] **Step 4: Wire into `theme/index.ts`**

Add the import and the `durations`/`easings` keys to `theme.tokens`:

```typescript
import { durations, easings } from "../tokens/motion";
```

```typescript
    tokens: {
      colors,
      fonts,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      radii,
      shadows,
      spacing,
      durations,
      easings,
    },
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/design-system/tokens/motion.test.ts`
Expected: PASS

- [ ] **Step 6: Extend the theme test**

Add to `src/design-system/theme/index.test.ts`:

```typescript
    expect(system.token("durations.normal")).toBe("200ms");
    expect(system.token("easings.easeOut")).toBe("cubic-bezier(0, 0, 0.2, 1)");
```

- [ ] **Step 7: Run the full test suite**

Run: `npx jest`
Expected: all PASS

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add motion tokens (durations, easings)"
```

---

### Task 6: Add the `tokens/index.ts` barrel

**Files:**
- Create: `src/design-system/tokens/index.ts`
- Test: `src/design-system/tokens/index.test.ts`

**Interfaces:**
- Produces: a single barrel re-exporting every export from `colors.ts`, `radii.ts`, `shadows.ts`, `typography.ts`, `spacing.ts`, `breakpoints.ts`, `motion.ts` — `colors`, `radii`, `shadows`, `fonts`, `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `textStyles`, `spacing`, `breakpoints`, `durations`, `easings`, `motion`.
- Consumes: every token module created in Tasks 1–5.

- [ ] **Step 1: Write the failing test**

```typescript
// src/design-system/tokens/index.test.ts
import * as tokens from "@/design-system/tokens";

describe("tokens barrel", () => {
  it("re-exports every token module", () => {
    expect(tokens.colors.teal[500].value).toBe("#19AEB5");
    expect(tokens.radii.lg.value).toBe("10px");
    expect(tokens.shadows.md.value).toBe("0 8px 24px rgba(2, 8, 10, 0.5)");
    expect(tokens.fonts.heading.value).toContain("Sora");
    expect(tokens.fontSizes.xl.value).toBe("1.25rem");
    expect(tokens.spacing["4"].value).toBe("1rem");
    expect(tokens.breakpoints.md).toBe("48em");
    expect(tokens.durations.normal.value).toBe("200ms");
    expect(tokens.textStyles.body.value.fontFamily).toBe("{fonts.body}");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/design-system/tokens/index.test.ts`
Expected: FAIL — `Cannot find module '@/design-system/tokens'`

- [ ] **Step 3: Write the implementation**

```typescript
// src/design-system/tokens/index.ts
export * from "./breakpoints";
export * from "./colors";
export * from "./motion";
export * from "./radii";
export * from "./shadows";
export * from "./spacing";
export * from "./typography";
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/design-system/tokens/index.test.ts`
Expected: PASS

- [ ] **Step 5: Run the full test suite and lint**

Run: `npx jest && npm run lint`
Expected: all pass

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add design-system/tokens barrel export"
```

---

### Task 7: Storybook `Foundations/Typography` and `Foundations/Spacing`

**Files:**
- Create: `src/design-system/theme/Typography.stories.tsx`
- Create: `src/design-system/theme/Spacing.stories.tsx`
- Test: none (Storybook story — verified by running Storybook, not Jest; see Step 3/6)

**Interfaces:**
- Consumes: `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacings`, `textStyles` from `@/design-system/tokens/typography`; `spacing` from `@/design-system/tokens/spacing`. Both stories follow the `useToken` swatch pattern already established in `Colors.stories.tsx`.

- [ ] **Step 1: Write `Typography.stories.tsx`**

```typescript
// src/design-system/theme/Typography.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo type tokens in
 * `src/design-system/tokens/typography.ts`. Raw scale steps are read live
 * via `useToken`; the textStyle previews apply `textStyle="..."` directly
 * so what you see is the real resolved style, not a re-typed description.
 */
const meta = {
  title: "Foundations/Typography",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ScaleRow({
  category,
  token,
  sample,
}: {
  category: "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings";
  token: string;
  sample: string;
}) {
  const [resolved] = useToken(category, token);
  const propMap = {
    fontSizes: "fontSize",
    fontWeights: "fontWeight",
    lineHeights: "lineHeight",
    letterSpacings: "letterSpacing",
  } as const;
  const prop = propMap[category];

  return (
    <Stack direction="row" gap="6" align="baseline">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="32">
        {token} &middot; {String(resolved)}
      </Text>
      <Text {...{ [prop]: token }} color="fg">
        {sample}
      </Text>
    </Stack>
  );
}

function TextStyleRow({ name }: { name: string }) {
  return (
    <Stack gap="1">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted">
        textStyle=&quot;{name}&quot;
      </Text>
      <Text textStyle={name} color="fg">
        Wind first. Reduce complexity.
      </Text>
    </Stack>
  );
}

export const Typography: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Typography
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/typography.ts. Font sizes, weights,
            line-heights and letter-spacings are the raw scale; textStyles are
            named bundles built from that scale.
          </Text>
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Font sizes
          </Heading>
          {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"].map(
            (t) => (
              <ScaleRow key={t} category="fontSizes" token={t} sample="Aa" />
            ),
          )}
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Font weights
          </Heading>
          {["normal", "medium", "semibold", "bold", "extrabold"].map((t) => (
            <ScaleRow
              key={t}
              category="fontWeights"
              token={t}
              sample="Wind is the central product concept"
            />
          ))}
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Line heights
          </Heading>
          {["tight", "normal", "relaxed"].map((t) => (
            <ScaleRow
              key={t}
              category="lineHeights"
              token={t}
              sample="Should I ride? Where should I go? How was my session?"
            />
          ))}
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Letter spacing
          </Heading>
          {["tight", "normal", "wide"].map((t) => (
            <ScaleRow
              key={t}
              category="letterSpacings"
              token={t}
              sample="AERYO"
            />
          ))}
        </Stack>

        <Stack gap="4">
          <Heading as="h3" size="sm" color="fg">
            Text styles
          </Heading>
          {["display", "heading", "title", "body", "caption", "label"].map(
            (name) => (
              <TextStyleRow key={name} name={name} />
            ),
          )}
        </Stack>
      </Stack>
    </Box>
  ),
};
```

- [ ] **Step 2: Write `Spacing.stories.tsx`**

```typescript
// src/design-system/theme/Spacing.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo spacing scale in
 * `src/design-system/tokens/spacing.ts`. Each bar's width is the token's
 * real resolved value, read live via `useToken`.
 */
const meta = {
  title: "Foundations/Spacing",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = [
  "0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24", "32",
];

function SpacingRow({ step }: { step: string }) {
  const [resolved] = useToken("spacing", step);
  return (
    <Stack direction="row" gap="4" align="center">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="16">
        {step}
      </Text>
      <Box bg="accent.solid" height="4" width={resolved || "0"} rounded="xs" />
      <Text fontSize="xs" fontFamily="mono" color="fg.muted">
        {resolved}
      </Text>
    </Stack>
  );
}

export const Spacing: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Spacing
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/spacing.ts. 4px base unit.
          </Text>
        </Stack>
        <Stack gap="3">
          {STEPS.map((step) => (
            <SpacingRow key={step} step={step} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
```

- [ ] **Step 3: Verify both stories render**

Run: `npm run storybook -- --ci --quiet &` then check `http://localhost:6006/?path=/story/foundations-typography--typography` and `.../foundations-spacing--spacing` render without a console error, or run `npx storybook build --quiet` to confirm both stories compile and are indexed without error. Stop the dev server afterward.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Storybook Foundations/Typography and Foundations/Spacing"
```

---

### Task 8: Storybook `Foundations/Radius` and `Foundations/Shadows`

**Files:**
- Create: `src/design-system/theme/Radius.stories.tsx`
- Create: `src/design-system/theme/Shadows.stories.tsx`
- Test: none (Storybook story — verified by build, see Step 3)

**Interfaces:**
- Consumes: `radii` from `@/design-system/tokens/radii` (plus Chakra's default `none`, read live off the resolved system, not from `radii.ts`); `shadows` from `@/design-system/tokens/shadows`.

- [ ] **Step 1: Write `Radius.stories.tsx`**

```typescript
// src/design-system/theme/Radius.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo radius scale in
 * `src/design-system/tokens/radii.ts`. `none` is included even though it
 * isn't defined in that file — it comes from Chakra's own `defaultConfig`
 * (this system is built via `createSystem(defaultConfig, config)`), and
 * reading it live here proves that merge actually resolves.
 */
const meta = {
  title: "Foundations/Radius",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];

function RadiusSwatch({ step }: { step: string }) {
  const [resolved] = useToken("radii", step);
  return (
    <Stack gap="2">
      <Box bg="accent.solid" height="16" width="16" rounded={step} />
      <Text fontSize="xs" fontWeight="medium" color="fg">
        {step}
      </Text>
      <Text fontSize="xs" color="fg.muted" fontFamily="mono">
        {resolved}
      </Text>
    </Stack>
  );
}

export const Radius: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Radius
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/radii.ts (plus Chakra&apos;s
            built-in `none`). Prefer md/lg for buttons and form controls,
            xl/2xl for cards — see the file&apos;s own comment for the full
            rationale.
          </Text>
        </Stack>
        <Stack direction="row" gap="6" wrap="wrap">
          {STEPS.map((step) => (
            <RadiusSwatch key={step} step={step} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
```

- [ ] **Step 2: Write `Shadows.stories.tsx`**

```typescript
// src/design-system/theme/Shadows.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo shadow scale in
 * `src/design-system/tokens/shadows.ts`, rendered on the dark surface
 * token they were tuned against.
 */
const meta = {
  title: "Foundations/Shadows",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = ["xs", "sm", "md", "lg", "xl"];

function ShadowCard({ step }: { step: string }) {
  const [resolved] = useToken("shadows", step);
  return (
    <Stack gap="2">
      <Box bg="bg.panel" height="20" width="32" rounded="lg" shadow={step} />
      <Text fontSize="xs" fontWeight="medium" color="fg">
        {step}
      </Text>
      <Text fontSize="xs" color="fg.muted" fontFamily="mono">
        {resolved}
      </Text>
    </Stack>
  );
}

export const Shadows: Story = {
  render: () => (
    <Box bg="bg.subtle" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Shadows
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/shadows.ts. Tuned for the dark
            near-black surface — shadows mainly carry depth for floating
            elements (menus, dialogs, popovers).
          </Text>
        </Stack>
        <Stack direction="row" gap="8" wrap="wrap">
          {STEPS.map((step) => (
            <ShadowCard key={step} step={step} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
```

- [ ] **Step 3: Verify both stories render**

Run: `npx storybook build --quiet`
Expected: build succeeds with both `Foundations/Radius` and `Foundations/Shadows` indexed, no compile error.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Storybook Foundations/Radius and Foundations/Shadows"
```

---

### Task 9: Storybook `Foundations/Motion`

**Files:**
- Create: `src/design-system/theme/Motion.stories.tsx`
- Test: none (Storybook story — verified by build, see Step 3)

**Interfaces:**
- Consumes: `durations`, `easings` from `@/design-system/tokens/motion`.

- [ ] **Step 1: Write `Motion.stories.tsx`**

```typescript
// src/design-system/theme/Motion.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Box, Button, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo motion tokens in
 * `src/design-system/tokens/motion.ts`. Each row's animation runs on the
 * real resolved duration/easing token values via the `transition` prop, not
 * a re-typed CSS value.
 */
const meta = {
  title: "Foundations/Motion",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DURATIONS = ["fast", "normal", "slow"] as const;
const EASINGS = ["easeIn", "easeOut", "easeInOut"] as const;

function MotionRow({
  duration,
  easing,
  active,
}: {
  duration: (typeof DURATIONS)[number];
  easing: (typeof EASINGS)[number];
  active: boolean;
}) {
  const [durationValue] = useToken("durations", duration);
  const [easingValue] = useToken("easings", easing);

  return (
    <Stack direction="row" gap="6" align="center">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="48">
        {duration} ({durationValue}) &middot; {easing}
      </Text>
      <Box
        bg="accent.solid"
        height="6"
        width="6"
        rounded="sm"
        style={{
          transform: active ? "translateX(240px)" : "translateX(0)",
          transition: `transform ${durationValue} ${easingValue}`,
        }}
      />
    </Stack>
  );
}

export const Motion: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <Box bg="bg" p="8">
        <Stack gap="8">
          <Stack gap="1">
            <Heading as="h2" size="md" color="fg">
              Motion
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              From src/design-system/tokens/motion.ts. Press play to see each
              duration/easing pairing run against the same 240px move.
            </Text>
            <Box>
              <Button
                size="sm"
                colorPalette="teal"
                onClick={() => setActive((v) => !v)}
              >
                {active ? "Reset" : "Play"}
              </Button>
            </Box>
          </Stack>
          <Stack gap="6">
            {DURATIONS.map((duration) =>
              EASINGS.map((easing) => (
                <MotionRow
                  key={`${duration}-${easing}`}
                  duration={duration}
                  easing={easing}
                  active={active}
                />
              )),
            )}
          </Stack>
        </Stack>
      </Box>
    );
  },
};
```

- [ ] **Step 2: Verify the story renders**

Run: `npx storybook build --quiet`
Expected: build succeeds with `Foundations/Motion` indexed, no compile error.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Run the full test suite one final time**

Run: `npx jest`
Expected: all PASS — this is the final check that every token module and the assembled theme are still sound after all Storybook additions.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Storybook Foundations/Motion"
```

---

## Final Verification

After Task 9, do one pass confirming the whole layer holds together:

- [ ] `npx jest` — all rendering-validation tests pass.
- [ ] `npm run lint` — no lint errors.
- [ ] `npx storybook build --quiet` — builds clean, `Foundations/Colors`, `Foundations/Typography`, `Foundations/Spacing`, `Foundations/Radius`, `Foundations/Shadows`, `Foundations/Motion` all indexed.
- [ ] `grep -r "theme/colors\|theme/radii\|theme/shadows\|theme/typography" src/` returns nothing — confirms no stale import path survived the move.
