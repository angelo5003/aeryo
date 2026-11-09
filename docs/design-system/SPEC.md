# Aeryo Design Spec: what to use when building a screen

Generated from the real tokens in `src/design-system/` (`tokens/` and `theme/semantic-tokens.ts`) on the branch that added this file.
Rule: use the **token name**. The hex values are only there so you can compare against a design.
Units: rem with px in brackets (1rem = 16px).

## 1. Text styles

Use `Heading variant="..."` for the Sora styles and `Text variant="..."` for the Manrope styles.

| Style         | Component                    | Font    | Size            | Weight | Line height | Letter spacing |
| ------------- | ---------------------------- | ------- | --------------- | ------ | ----------- | -------------- |
| `display`     | `Heading variant="display"`  | Sora    | 3rem (48px)     | 800    | 1.2         | -0.02em        |
| `heading`     | `Heading variant="heading"`  | Sora    | 1.875rem (30px) | 700    | 1.2         | 0              |
| `title`       | `Heading variant="title"`    | Sora    | 1.25rem (20px)  | 600    | 1.5         | 0              |
| `body`        | `Text variant="body"`        | Manrope | 1rem (16px)     | 400    | 1.5         | 0              |
| `caption`     | `Text variant="caption"`     | Manrope | 0.875rem (14px) | 400    | 1.5         | 0              |
| `label`       | `Text variant="label"`       | Manrope | 0.75rem (12px)  | 500    | 1.5         | 0.04em         |
| `body.photo`  | `Text variant="body.photo"`  | Manrope | 1rem (16px)     | 500    | 1.65        | 0              |
| `label.photo` | `Text variant="label.photo"` | Manrope | 0.75rem (12px)  | 600    | 1.65        | 0.08em         |

Sora never goes below `title` (20px). Numbers that must not jitter (wind speed) use `fontVariantNumeric: "tabular-nums"`.

## 2. Colors (semantic tokens)

| Token             | Light        | Dark                     | Use it for                           |
| ----------------- | ------------ | ------------------------ | ------------------------------------ |
| `bg`              | #F7FAFB      | #071216                  | Page background                      |
| `bg.subtle`       | #F2F5F6      | #0D2931                  | Quiet section background             |
| `bg.muted`        | #EAEEF0      | #123640                  | Filled surfaces, pressed rows        |
| `bg.panel`        | white        | #0D2931                  | Card background                      |
| `bg.chrome`       | #F7FAFB @98% | #071216 @88%             | Top bar and bottom tab bar (frosted) |
| `bg.error`        | #FBEEEC      | #2E110E                  | Danger zone / error surface          |
| `fg`              | #071216      | #EDF8F6                  | Main text and icons                  |
| `fg.muted`        | #37707C      | #76A1A9                  | Secondary text                       |
| `fg.emphasized`   | #285C68      | #C0D6D9                  | Labels and list titles               |
| `fg.error`        | #6E2823      | #EBAFA7                  | Danger text                          |
| `fg.photo`        | #EDF8F6      | #EDF8F6                  | Text on a photo                      |
| `border`          | #DDE4E7      | rgba(99, 230, 213, 0.16) | Hairline under rows, hover border    |
| `border.muted`    | #EAEEF0      | rgba(99, 230, 213, 0.10) | Card border                          |
| `border.error`    | #D45B52      | #D96F62                  | Danger border                        |
| `accent.solid`    | #106B70      | #19AEB5                  | Primary button fill, active tab      |
| `accent.contrast` | #EDF8F6      | #071216                  | Text on the primary button           |
| `teal.fg`         | #0B4D52      | #63E6D5                  | Teal text and links                  |
| `danger.solid`    | #963731      | #963731                  | Destructive button fill              |
| `danger.contrast` | white        | white                    | Text on destructive button           |
| `ink.border`      | #3D7784      | #6B99A2                  | Outline button border (secondary)    |
| `ink.fg`          | #123640      | #C0D6D9                  | Outline button text (secondary)      |

Outline buttons draw their edge with `<palette>.border` and their text with `<palette>.fg` (per Chakra's button recipe). With `intent="secondary"` that is `ink.border` and `ink.fg`, with `intent="primary"` it is `teal.border` and `teal.fg`.

Not in the table on purpose: every `*.solid`, `*.fg`, `*.subtle`, `*.muted`, `*.border`, `*.contrast` of `teal`, `ink`, `danger`, `caution` and `success` is reached through `Button intent` and `StatusPill variant`, not by name.

## 3. Components and sizes

| What you see in the design           | Use                                                 | Size / props                                                                  |
| ------------------------------------ | --------------------------------------------------- | ----------------------------------------------------------------------------- |
| Page title (Settings, Notifications) | `Heading variant="heading"` or `"display"`          | 30px or 48px, see section 5 decision 4                                        |
| Primary button                       | `Button intent="primary" variant="solid" size="lg"` | height 2.75rem (44px)                                                         |
| Secondary / outline button           | `Button intent="secondary" variant="outline"`       | `sm` 36px, `md` 40px, `lg` 44px                                               |
| Destructive button                   | `Button intent="danger"`                            | same sizes                                                                    |
| Round back button                    | `IconButton variant="outline" size="lg"`            | 44 x 44px                                                                     |
| Card                                 | `AeryoCard` (`variant="default"`)                   | `bg.panel`, 1px `border.muted`, radius `xl` (14px), shadow `sm` in light only |
| Pressable card                       | `AeryoCard variant="interactive"`                   | same, with hover border `border`                                              |
| Status pill                          | `StatusPill variant="neutral                        | primary                                                                       | success | warning | danger"` | sizes `sm`, `md`, `lg` |
| Tabs / filter chips                  | `Tabs` (or `SegmentedControl` for 2 to 4 options)   | check in Storybook                                                            |
| On/off row                           | `Switch` inside a settings row                      | n/a                                                                           |
| Text field                           | `Field` + `Input`                                   | n/a                                                                           |

Spacing steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px (`spacing.1` to `spacing.16`).
Corner radii: xs 4, sm 6, md 8, lg 10, xl 14, 2xl 18, 3xl 22px, full.

## 4. Where the designs already match the app

Background, card background, filled surface, frosted bar, main text, secondary text (dark), label text, teal text, accent and the light-mode borders are the same values as the tokens above.

## 5. Decisions taken (design and app disagreed)

Rule used: the app tokens win. The designs were changed to match, except where noted. No app code changed for these.

| #   | Topic                     | Decision                                                                                                                                                                                                                               | Done in           |
| --- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 1   | Primary button, dark mode | Use `accent.solid` (#19AEB5, text #071216). It already clears 7:1 contrast.                                                                                                                                                            | Designs           |
| 2   | Card border, dark mode    | Use `border.muted` (faint teal line, 10% alpha).                                                                                                                                                                                       | Designs           |
| 3   | Destructive button        | Use `danger.solid` (#963731).                                                                                                                                                                                                          | Designs           |
| 4   | Text sizes                | Use the 6 app styles. Screen titles on list screens are now `heading` (30px). Still design-only: hero titles (36px), big wind numbers, 15px secondary text. Build those with the nearest style, or add a style once a screen needs it. | Partly in designs |
| 5   | Button heights            | Use app sizes only. Main buttons are `lg` (44px), compact buttons are `md` (40px).                                                                                                                                                     | Designs           |
| 6   | Secondary text, light     | Use `fg.muted` (#37707C).                                                                                                                                                                                                              | Designs           |
| 7   | Sunlight mode             | Stays a design-only idea. The app has no tokens for it. The inspector flags it.                                                                                                                                                        | Not built         |
| 8   | Design-only effects       | Teal gradient numerals, glass buttons and glow shadows are not tokens. Build them as one-offs when needed.                                                                                                                             | Not built         |
| 9   | Wind colors               | Keep lime. `wind.strong` uses `lime.400` and `lime.700`, the brand guide and tests depend on it. Only those two lime steps remain.                                                                                                     | Kept              |

Outline buttons and the round back button now use `ink.border` for their edge (dark #6B99A2, light #3D7784) and `ink.fg` for outline button text, as the app's Button does.

## 6. Components the app does not have yet

Notification row and bell badge, filter chips, bottom sheet, bottom tab bar, large-title scroll header, wind range slider, day picker, settings list row. Use the closest existing component (Tabs, Drawer, AeryoCard) until each one is built.
