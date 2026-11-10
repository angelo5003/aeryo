# Aeryo Design Spec: what to use when building a screen

Generated from the real tokens in `src/design-system/` (`tokens/` and `theme/semantic-tokens.ts`) on the branch that added this file.
Rule: use the **token name**. The hex values are only there so you can compare against a design.
Units: rem with px in brackets (1rem = 16px).

## 1. Text styles

Use `Heading variant="..."` for the Sora styles and `Text variant="..."` for the Manrope styles.

| Style         | Component                    | Font    | Size            | Weight | Line height | Letter spacing |
| ------------- | ---------------------------- | ------- | --------------- | ------ | ----------- | -------------- |
| `display`     | `Heading variant="display"`  | Sora    | 3rem (48px)     | 800    | 1.2         | -0.02em        |
| `largeTitle`  | `textStyle="largeTitle"`     | Sora    | 2.25rem (36px)  | 700    | 1.2         | -0.02em        |
| `metric`      | `textStyle="metric"`         | Sora    | 2.25rem (36px)  | 800    | 1.2         | -0.02em        |
| `heading`     | `Heading variant="heading"`  | Sora    | 1.875rem (30px) | 700    | 1.2         | 0              |
| `title`       | `Heading variant="title"`    | Sora    | 1.25rem (20px)  | 600    | 1.5         | 0              |
| `body`        | `Text variant="body"`        | Manrope | 1rem (16px)     | 400    | 1.5         | 0              |
| `caption`     | `Text variant="caption"`     | Manrope | 0.875rem (14px) | 400    | 1.5         | 0              |
| `label`       | `Text variant="label"`       | Manrope | 0.75rem (12px)  | 500    | 1.5         | 0.04em         |
| `body.photo`  | `Text variant="body.photo"`  | Manrope | 1rem (16px)     | 500    | 1.65        | 0              |
| `label.photo` | `Text variant="label.photo"` | Manrope | 0.75rem (12px)  | 600    | 1.65        | 0.08em         |

`largeTitle` is for the title at the top of a scrolling screen, `metric` for big numbers in stat tiles. Neither has a `Heading` or `Text` variant yet: set them with `textStyle`.

Sora never goes below `title` (20px). Numbers that must not jitter (wind speed) use `fontVariantNumeric: "tabular-nums"`.

## 2. Colors (semantic tokens)

| Token               | Light        | Dark                     | Use it for                           |
| ------------------- | ------------ | ------------------------ | ------------------------------------ |
| `bg`                | #F7FAFB      | #071216                  | Page background                      |
| `bg.subtle`         | #F2F5F6      | #0D2931                  | Quiet section background             |
| `bg.muted`          | #EAEEF0      | #123640                  | Filled surfaces, pressed rows        |
| `bg.panel`          | #FFFFFF      | #0D2931                  | Card background                      |
| `bg.chrome`         | #F7FAFB @98% | #071216 @88%             | Top bar and bottom tab bar (frosted) |
| `bg.error`          | #FBEEEC      | #2E110E                  | Danger zone / error surface          |
| `bg.scrim`          | #071216 @40% | #071216 @60%             | Backdrop behind sheets and dialogs   |
| `bg.overlay.soft`   | #071216 @25% | #071216 @25%             | Light dimming on photos              |
| `bg.overlay.medium` | #071216 @55% | #071216 @55%             | Glass labels on photos               |
| `bg.overlay.strong` | #071216 @90% | #071216 @90%             | Near-solid bars and gradient ends    |
| `fg`                | #071216      | #EDF8F6                  | Main text and icons                  |
| `fg.muted`          | #37707C      | #76A1A9                  | Secondary text                       |
| `fg.emphasized`     | #285C68      | #C0D6D9                  | Labels and list titles               |
| `fg.error`          | #6E2823      | #EBAFA7                  | Danger text                          |
| `fg.photo`          | #EDF8F6      | #EDF8F6                  | Text on a photo                      |
| `fg.metric.top`     | #148A90      | #E9FBF8                  | Top of the big wind numbers          |
| `fg.metric.bottom`  | #0B4D52      | #2FC3B8                  | Bottom of the big wind numbers       |
| `border`            | #DDE4E7      | rgba(99, 230, 213, 0.16) | Hairline under rows, hover border    |
| `border.muted`      | #EAEEF0      | rgba(99, 230, 213, 0.10) | Card border                          |
| `border.photo`      | #EDF8F6 @30% | #EDF8F6 @30%             | Hairline on photos and glass         |
| `border.accent`     | #148A90      | #63E6D5 @45%             | Selected or active outline           |
| `border.error`      | #D45B52      | #D96F62                  | Danger border                        |
| `accent.solid`      | #106B70      | #19AEB5                  | Primary button fill, active tab      |
| `accent.contrast`   | #EDF8F6      | #071216                  | Text on the primary button           |
| `teal.fg`           | #0B4D52      | #63E6D5                  | Teal text and links                  |
| `danger.solid`      | #963731      | #963731                  | Destructive button fill              |
| `danger.contrast`   | #FFFFFF      | #FFFFFF                  | Text on destructive button           |
| `ink.border`        | #3D7784      | #6B99A2                  | Outline button border (secondary)    |
| `ink.fg`            | #123640      | #C0D6D9                  | Outline button text (secondary)      |

Outline buttons draw their edge with `<palette>.border` and their text with `<palette>.fg` (per Chakra's button recipe). With `intent="secondary"` that is `ink.border` and `ink.fg`, with `intent="primary"` it is `teal.border` and `teal.fg`.

Shadows follow the same rule: `shadows.xs` to `2xl`, `inner`, `inset` and `onPhoto` (text on photos). There is no teal glow token, because the theme test says every shadow tints `ink`. Use a `border.accent` outline for selected chips and pills instead.

The prototype uses these token names as CSS variables (`--tk-bg-panel`, `--tk-fg-photo`, …), with the primitives in one `--prim-*` block. Elements that always sit on a photo use the `--tk-dark-*` variables, which hold the dark value in both modes (like `<DarkMode>`). Sunlight mode reuses existing tokens (`ink.border`, `fg.emphasized`) until it is built in the app. The full audit is in `color-audit.md`.

Reserved (defined, no component uses them yet, kept on purpose because the design docs list them): `bg.warning`, `bg.info`, `fg.warning`, `fg.info`, `border.warning`, `fg.photo.accent`.

Not in the table on purpose: every `*.solid`, `*.fg`, `*.subtle`, `*.muted`, `*.border`, `*.contrast` of `teal`, `ink`, `danger`, `caution` and `success` is reached through `Button intent` and `StatusPill variant`, not by name.

## 3. Components and sizes

| What you see in the design           | Use                                                                 | Size / props                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Page title (Settings, Notifications) | `Heading variant="heading"` or `"display"`                          | 30px or 48px, see section 5 decision 4                                                       |
| Primary button                       | `Button intent="primary" variant="solid" size="lg"`                 | height 2.75rem (44px)                                                                        |
| Secondary / outline button           | `Button intent="secondary" variant="outline"`                       | `sm` 36px, `md` 40px, `lg` 44px                                                              |
| Destructive button                   | `Button intent="danger"`                                            | same sizes                                                                                   |
| Round back button                    | `IconButton variant="outline" size="lg"`                            | 44 x 44px                                                                                    |
| Card                                 | `AeryoCard` (`variant="default"`)                                   | `bg.panel`, 1px `border.muted`, radius `xl` (14px), shadow `sm` in light only                |
| Pressable card                       | `AeryoCard variant="interactive"`                                   | same, with hover border `border`                                                             |
| Status pill                          | `StatusPill` (`neutral`, `primary`, `success`, `warning`, `danger`) | sizes `sm`, `md`, `lg`                                                                       |
| Tabs                                 | `Tabs` (or `SegmentedControl` for 2 to 4 options)                   | check in Storybook                                                                           |
| Filter chips, day picker row         | `ChipGroup`                                                         | 44px pills, or 132 x 68px day cards with `size="day"`. `type`, `layout="wrap"` or `"scroll"` |
| Stack of settings rows               | `SettingsListCard`                                                  | optional `label`. Rows are yours, at least 3.5rem (56px) high                                |
| Notification row                     | `NotificationRow`                                                   | `icon`, `title`, `message`, `time`, `unread`, `href` or `onClick`, `actions`                 |
| Wind range (min and max)             | `WindRangeSlider`                                                   | two handles, 44px touch area, `unit="kt"`, `min`, `max`, `step`                              |
| Bottom sheet                         | `Drawer placement="bottom"`                                         | 22px top corners, grab handle, safe-area padding                                             |
| Round bell button with link          | `IconButton asChild` with a link inside                             | no `href` prop, same pattern as `BackLink`                                                   |
| On/off row                           | `Switch` inside a settings row                                      | n/a                                                                                          |
| Text field                           | `Field` + `Input`                                                   | n/a                                                                                          |

Spacing steps: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 80, 96, 128px (`spacing.0.5` to `spacing.32`). The half steps (`0.5`, `1.5`, `2.5`, `3.5`, `4.5`) cover the 2, 6, 10, 14 and 18px the designs use. Any other value snaps to the nearest step.
Corner radii: xs 4, sm 6, md 8, lg 10, xl 14, 2xl 18, 3xl 22px, full.

## 4. Where the designs already match the app

Background, card background, filled surface, frosted bar, main text, secondary text (dark), label text, teal text, accent and the light-mode borders are the same values as the tokens above.

## 5. Decisions taken (design and app disagreed)

Rule used: the app tokens win. The designs were changed to match, except where noted. No app code changed for these.

| #   | Topic                     | Decision                                                                                                                                                                                                                                     | Done in         |
| --- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| 1   | Primary button, dark mode | Use `accent.solid` (#19AEB5, text #071216). It already clears 7:1 contrast.                                                                                                                                                                  | Designs         |
| 2   | Card border, dark mode    | Use `border.muted` (faint teal line, 10% alpha).                                                                                                                                                                                             | Designs         |
| 3   | Destructive button        | Use `danger.solid` (#963731).                                                                                                                                                                                                                | Designs         |
| 4   | Text sizes                | Use the app styles. List screen titles are `heading` (30px). Hero titles are `largeTitle` (36px) and stat numbers are `metric` (36px), both added. Still design-only: the 100px hero numerals and 15px secondary text (use `caption`, 14px). | Designs and app |
| 5   | Button heights            | Use app sizes only. Main buttons are `lg` (44px), compact buttons are `md` (40px).                                                                                                                                                           | Designs         |
| 6   | Secondary text, light     | Use `fg.muted` (#37707C).                                                                                                                                                                                                                    | Designs         |
| 7   | Sunlight mode             | Stays a design-only idea. The app has no tokens for it. The inspector flags it.                                                                                                                                                              | Not built       |
| 8   | Design-only effects       | Teal gradient numerals, glass buttons and glow shadows are not tokens. Build them as one-offs when needed.                                                                                                                                   | Not built       |
| 9   | Wind colors               | Keep lime. `wind.strong` uses `lime.400` and `lime.700`, the brand guide and tests depend on it. Only those two lime steps remain.                                                                                                           | Kept            |

Outline buttons and the round back button now use `ink.border` for their edge (dark #6B99A2, light #3D7784) and `ink.fg` for outline button text, as the app's Button does.

## 6. Components: built and still missing

Built and merged (Storybook has a story for each):

| Component                 | Story title               | Notes                                                         |
| ------------------------- | ------------------------- | ------------------------------------------------------------- |
| `ChipGroup`               | Forms/ChipGroup           | Filter chips and the day-picker row (scroll layout)           |
| `SettingsListCard`        | Surfaces/SettingsListCard | The card and dividers only. Rows are written where it is used |
| `NotificationRow`         | Surfaces/NotificationRow  | Time and unread dot sit in the title row                      |
| `WindRangeSlider`         | Forms/WindRangeSlider     | Track has a 1px `fg.subtle` outline to reach 3:1 contrast     |
| Bottom sheet styling      | Data Display/Drawer       | `placement="bottom"`, grab handle uses `fg.subtle`            |
| `largeTitle` and `metric` | Foundations/Typography    | Text styles                                                   |

Still missing:

- Bell badge: no component needed. It is an icon inside a button, used only in the top navigation bar.
- Large-title header that collapses while scrolling. The detection already exists in the app layer (`SignedInPageWithTopNavBar` uses `useInView` and passes `isTitleCollapsed`). Still to build: the real frosted top bar (`bg.chrome`) that replaces the placeholder `TopNavBar`, with the title crossfade. This is page code in `src/app`, not a design-system component.
- Settings rows themselves.

Flow designed, not built yet: **Switch spot** (the spot pill at the top left of Home). Prototype route "Switch spot" in the app flow artifact. The rules:

- The pill shows a pin, the spot name and a small chevron. It opens a bottom sheet titled "Choose a spot" (`Drawer placement="bottom"`).
- The sheet lists at most 5 spots: the spot Home is on (checked) first, then saved spots, then the best matches for the rider. Each row has a thumbnail, the name, the wind and the walk from parking, and the "Matches you" tag.
- Picking a spot closes the sheet and changes this view only. The default spot stays.
- When the picked spot differs from the default, the first button is "Set [spot] as my default". The subtitle says "Showing [spot]. Home still opens on [default]."
- Buttons stack in one column with equal width and an 8px gap: set as default (primary, only when different), "Search all spots" (outline, opens the full search), Cancel (plain text).
- Offline: a banner says the wind is from the last update, and each row shows the wind with its time ("22 kt at 14:10") instead of "now".
- No "nearby" sort. It would need a location permission, and the app never shows exact coordinates.
- To decide when building: the spot row (thumbnail, text, radio) has no component yet. Build it from existing parts first, and add a component only if another screen needs the same row.

## 7. Copy rules

Rules from the copy review of the app flow. The prototype follows them.

- **One name per thing.** The rider's wind setting is **wind range** ("Your wind range"). Gear fit keeps "Too light for N kt" and "Too strong for N kt".
- **One verb phrase per action.** "Plan a session" everywhere, never "Plan session".
- **Second person for headings.** "Your gear", "Your riding", "Your wind range". First person ("me") only inside toggle and checkbox labels, for example "Warn me about offshore wind".
- **Name.** "Aeryo" in sentences. "AERYO" only as the logo and as the app name on an alert.
- **Voice.** "We" for the product. The app name appears only where an iPhone permission text needs it ("Allow Aeryo in iPhone Settings first").
- **Parking.** Say "parking", never "car park". Use the real parking name when one is known ("Be at the parking name by 09:15" on plan review and plan done).
- **Destructive dialogs.** Title says what goes ("Delete your account?"). Body says it cannot be undone and what is lost. Buttons are the two actions ("Delete my account" and "Keep my account"), never "Yes" and "Cancel".
- **Offline notes.** Start with "Offline." then one short fact: "Offline. Showing wind from 14:10." or "Offline. Changes save on this phone."
- **No alarm words.** "Danger zone" became "Delete your account".
- **No contractions.** "You are", "do not", "will not". Keep it consistent.
- **Capital labels.** Write labels like "NEXT UP" in normal case in the source and capitalize them with the style, so translators and screen readers get normal words (not yet done in the prototype).

## 8. Open items

- **Divider token (resolved).** Card edges use `border.muted`. Dividers between rows use `border` (dark 16% teal, light #DDE4E7), one step stronger, as in `SettingsListCard`. The prototype now has a separate divider color for row separators.
- **Error surfaces (resolved).** Error banners and the danger card use `bg.error` (surface), `border.error` (outline) and `fg.error` (text). The prototype never used `danger.muted`. Its dark border was `#6E2823` (1.66:1 on `bg.error`) and now matches the app's `#D96F62` (5.32:1).
- **Hardcoded colors in the prototype (triaged, no change needed).** 19 hex values sit outside the theme variables, in three groups:
  - **Fallbacks** inside `var(--x, #hex)`. They equal app tokens (for example `#63E6D5` is `teal.300`, `#071216` is `ink.950`).
  - **Design-only gradient numerals** on photo screens: `#D4FBF5`, `#2BC7C0`, `#0F8A91`, `#DCEEEB`, `#A8EEE5`. Do not turn these into tokens.
  - **Sample gear art colors** (`#D9902B`, `#3F6FC4`, `#2E9E6B`) and the Spec-mode inspector colors (`#1FA597`, `#D98A3A`). Not app UI.
- **Remaining colors (compared).** `fg.subtle` matches the app (light #3D7784, dark #66969F). The prototype uses no `caution`, `success`, wind-scale (`lime`) or `bg.emphasized` color, so there is nothing to compare yet. Check them when a screen first uses them. The only off-palette greens and oranges (`.sp-ok`, `.sp-warn`) belong to the Spec-mode inspector, not the app UI.
- **Not verified.** Real iPhone, screen reader, sunlight. Android is deferred.
