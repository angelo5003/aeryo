# Color audit: raw colors to semantic tokens

Status: **for review, nothing in the app or prototype is changed yet.**
Source: `src/design-system/tokens/colors.ts`, `src/design-system/theme/semantic-tokens.ts`
and the app flow prototype (`preview.html`), scanned 2026-11-10.
Counts are uses in the prototype. "Existing" means the token is already in `semantic-tokens.ts`.

## 1. Result of the scan

- Prototype: 106 distinct color values, 320 uses (229 hex, 91 `rgba()`).
- App (`src/`): 3 places with raw values. `globals.css` has 6 hex values (page background and text),
  `semantic-tokens.ts` has 2 hex values (`#76A1A9`, `#66969F`) and 2 `rgba()` values (dark `border`, `border.muted`),
  and 3 literal `"white"` values (`bg.panel`, `danger.contrast`, `caution.contrast`).
- Storybook: the Raw Palette page lists a step that does not exist (`ink.100`, shown as `#00000000`).

## 2. Existing token, only the prototype name is wrong

The prototype already uses the right values but under its own `--p-*` names. Rename, no new token.

| Original Raw Color                                                         | Semantic Token Used/Created                               | Component/Element                                                 |
| -------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| `#F7FAFB` / `#071216` (`--p-bg`)                                           | `bg`                                                      | Page background                                                   |
| `#FFFFFF` / `#0D2931` (`--p-panel`)                                        | `bg.panel`                                                | Cards, sheets                                                     |
| `#EAEEF0` / `#123640` (`--p-muted`)                                        | `bg.muted`                                                | Pressed rows, filled surfaces                                     |
| `#F7FAFB @98%` / `#071216 @88%` (`--p-chrome`)                             | `bg.chrome`                                               | Top bar, tab bar                                                  |
| `#FBEEEC` / `#2E110E` (`--p-danger-subtle`)                                | `bg.error`                                                | Delete card, error surface                                        |
| `#6E2823` / `#EBAFA7` (`--p-danger-fg`)                                    | `fg.error`                                                | Error text                                                        |
| `#D45B52` / `#D96F62` (`--p-danger-border`)                                | `border.error`                                            | Error outline                                                     |
| `#EDF8F6` / `#071216` (`--p-photo-fg`, text on photo)                      | `fg.photo`                                                | Text on photos (25 uses)                                          |
| `#C0D6D9` / `#285C68` (`--p-fg-emph`)                                      | `fg.emphasized`                                           | Labels, list titles (15 uses)                                     |
| `#76A1A9` / `#37707C` (`--p-fg-muted`)                                     | `fg.muted`                                                | Secondary text (8 uses)                                           |
| `#66969F` / `#3D7784` (`--p-fg-subtle`)                                    | `fg.subtle`                                               | Tertiary text                                                     |
| `#19AEB5` / `#106B70` (`--p-accent`, `--p-chip-on`)                        | `accent.solid`                                            | Selected chip, primary button                                     |
| `#042224` / `#EDF8F6` (`--p-chip-on-fg`, 9 uses)                           | `accent.contrast`                                         | Text on selected chip                                             |
| `#63E6D5` / `#0B4D52` (`--p-teal-fg`, 39 uses)                             | `teal.fg`                                                 | Active tab, links, teal text                                      |
| `#3D7784` / `#6B99A2` (`--p-ink-border`)                                   | `ink.border`                                              | Outline of secondary buttons                                      |
| `rgba(99,230,213,.16)` / `#DDE4E7` (`--p-border`, `--p-divider`)           | `border`                                                  | Row separators, `or` line                                         |
| `rgba(99,230,213,.10)` / `#EAEEF0`                                         | `border.muted`                                            | Quiet hairlines                                                   |
| `#FFFFFF` text (12 uses of white text, split by element in step 4)         | `danger.contrast` on red buttons                          | Delete button label                                               |
| `#FFFFFF` text on photo (the rest)                                         | `fg.photo`                                                | Hero text, photo labels (to check per element)                    |
| `#DCEEEB`, `#A8EEE5` text on photo (9 uses)                                | `fg.photo`                                                | Compass, wind unit. 15.8:1 and 14.5:1 now, 17.5:1 with `fg.photo` |
| `#0F8A91`, `#2BC7C0` (4 uses each)                                         | `teal.600` / `teal.400` via `fg.metric.*` (see section 3) | Big wind numbers                                                  |
| `box-shadow rgba(0,0,0,.18-.45)`, `--p-shadow`, `--p-lift` (about 20 uses) | `shadows.sm` / `md` / `lg` / `inset`                      | Cards, sheets, bars. Already tokens                               |

Mismatch to fix: the prototype's delete button uses `#B84740` (`danger.600`, 5.23:1 with white).
The token `danger.solid` is `#963731` (`danger.700`, 7.27:1). Use the token.

## 3. New semantic tokens (proposed, need your OK)

Each token below has no equivalent today. Values only use palette steps. Contrast was computed.

| Original Raw Color                                                        | Semantic Token Used/Created                                                                                                                             | Component/Element                                                        |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `--p-scrim`: `rgba(7,18,22,.4)` light, `rgba(2,8,10,.6)` dark             | **`bg.scrim`**: `ink.950/40` light, `ink.950/60` dark                                                                                                   | Sheet and dialog backdrop                                                |
| `ink.950` at .18, .2, .25, .3, .35 (5 uses)                               | **`bg.overlay.soft`**: `ink.950/25`, same in both modes                                                                                                 | Photo gradient top, light dimming                                        |
| `ink.950` at .4, .45, .5, .55, .6, .72, .74 (17 uses)                     | **`bg.overlay.medium`**: `ink.950/55`                                                                                                                   | Glass labels on photos, map chips                                        |
| `ink.950` at .8 to .98 (31 uses, 2 of them are `bg.chrome`)               | **`bg.overlay.strong`**: `ink.950/90`                                                                                                                   | Bottom sheet over photo, near-solid bars                                 |
| `ink.50` at .16, .18, .35 and white at .1, .3, .35, .45 borders           | **`border.photo`**: `ink.50/30`                                                                                                                         | Hairlines on photos and glass (2.54:1, decorative like `border`)         |
| `teal.300` at .32 and .45 borders (3 uses)                                | **`border.accent`**: `teal.600` light, `teal.300/45` dark                                                                                               | Selected card, active outline (3.95:1 light, 3.35:1 dark, both pass 3:1) |
| `#D4FBF5` to `#63E6D5` to `#2BC7C0` gradient (4 uses), white to `#63E6D5` | **`fg.metric.top`**: `teal.600` light, `teal.50` dark                                                                                                   | Top of big wind numerals (3.95:1 light, 17.7:1 dark)                     |
| `#0F8A91` to `#0B4D52` gradient (light)                                   | **`fg.metric.bottom`**: `teal.800` light, `teal.400` dark                                                                                               | Bottom of big wind numerals (9.1:1 light, 8.7:1 dark)                    |
| `rgba(99,230,213,.28)` and `.35` glows (3 uses)                           | `border.accent` (decided): a `shadows.glow` would break the rule in `index.test.ts` that every shadow tints `ink`, so selected chips and the pill get an accent outline instead | Glow on selected chip and the pill                                       |
| `text-shadow rgba(0,0,0,.35-.4)` (3 uses)                                 | **`shadows.onPhoto`**: `ink.950/40`                                                                                                                     | Text on photos                                                           |
| `white` in `bg.panel`                                                     | **`paper.0`** (primitive, `#FFFFFF`)                                                                                                                    | `bg.panel` light, so `semantic-tokens.ts` has no literal `"white"`       |
| `#76A1A9` in `fg.muted` dark                                              | **`ink.350`** (primitive)                                                                                                                               | Between `ink.300` and `ink.400`                                          |
| `#66969F` in `fg.subtle` and `wind.calm` dark                             | **`ink.450`** (primitive)                                                                                                                               | Between `ink.400` and `ink.500`                                          |
| `rgba(99,230,213,.16)` and `.10` in `border` dark                         | **`teal.300/16`** and **`teal.300/10`** refs                                                                                                            | `border`, `border.muted` dark                                            |
| `#F7FAFB`, `#071216`, `#EDF8F6` in `globals.css`                          | CSS variables from `bg` and `fg`                                                                                                                        | Page background and text before React loads                              |

Snapping the overlay alphas to three rungs changes the look slightly (for example `.72` becomes `.55` or `.9`).
Step 4 checks each use in context before it is replaced.

## 4. Prototype-only colors (not app UI)

| Original Raw Color                                                              | Semantic Token Used/Created                                                                         | Component/Element                                                                |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `#1D2B30` / `#C9D3D6` (`--p-frame`)                                             | `bg.emphasized`                                                                                     | Phone frame outline in the prototype                                             |
| `#1FA597`, `#D98A3A`                                                            | `border.success`, `border.caution`                                                                  | Spec mode overlay outlines                                                       |
| `#19AEB5`, `#0F8A91`, `#B84740`, `#D9902B`, `#3F6FC4`, `#2E9E6B` (`ART_COLORS`) | `accent.solid`, `rider.riding`, `session.cancelled`, `wind.extreme`, `wind.strong`, `rider.offline` | Placeholder gear art. `#3F6FC4` (blue) has no palette family, so blue is dropped |

## 5. Needs your decision: sunlight mode

Sunlight mode is the only place with values that exist in no token:
`#8FA8AE` (border and divider), `#063A3E` (teal text), `#FFFFFF` (bar) and a few re-used steps
(`#285C68`, `#071216`, `#3D7784`).
`#8FA8AE` reaches only 2.51:1 on white, so it fails 3:1 for borders.

Options:

1. **Add a third condition (`_sun`) to the semantic tokens** and give each token a sunlight value. Most complete, more work.
2. **Map to existing tokens now.** Border and divider use `ink.border` (`ink.500`, 4.80:1), text uses `fg.emphasized`, bar uses `bg.panel`.
   No new tokens. Sunlight mode stays as a prototype switch until the app needs it.

Recommendation: option 2 now, option 1 when sunlight mode gets built in the app.

## 6. Storybook Colors pages (step 2, needs no token decision)

- Remove the `ink.100` swatch (step does not exist).
- Put Semantic Tokens first, Raw Palette last with the note "primitives, do not use in components".
- Show light and dark hex side by side, and `hex @ alpha%` for alpha tokens instead of `color(srgb ...)`.
- Add a one-line "use it for" under each semantic token.

## 7. Not verified

- Hex-to-token matches come from reading the files, not from rendering them side by side.
- Contrast ratios were computed from hex values. Alpha tokens were computed on the page background.
- The prototype has some colors inside strings I could not classify by element (3 uses with unknown context).
