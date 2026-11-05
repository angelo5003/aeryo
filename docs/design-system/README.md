Build every AERYO screen as an open-air instrument: North Sea ink, one teal signal, full-bleed photos where emotion belongs, and quiet chrome everywhere else. The name is always written **AERYO**, and the essence is _Intelligent wind, made tangible._

The app is a phone app in a native shell, used outdoors in bright light, often with wet hands and a poor signal. Treat those as requirements, not edge cases. It must not read as a generic weather dashboard, a tropical surf brand, a SaaS card farm or an extreme-sports poster.

## Content fundamentals

Write like a knowledgeable rider: concise, confident, clear, human and calm. Avoid hype, meteorology jargon and surf-shop slang.

- **Keep it short and declarative.** "Know before you go. See what's building, and when it's worth the drive."
- **Speak in plain language about real things.** "Wind, swell, tide — read every spot at a glance, in plain language."
- **Address the rider as "you".** "See who's out, right now. Ride with people who already know the spot."
- **Use Title Case for onboarding headings:** "Adventure Awaits", "Find Your Community". Use sentence case for buttons and supporting text.
- **Use no emoji** anywhere in the product.
- **Name real spots in examples:** IJmuiden, Wijk aan Zee, Zandvoort, Noordwijk, Scheveningen, Muiderberg.
- **Treat presence as a status, not a position.** "I'm riding here" is right. Never show coordinates or a live dot on a map.
- **Never invent proof.** No testimonials, usage numbers, press or "trusted by" claims.

## Color

Always use a semantic token, so light and dark stay paired. Do not place the raw `ink-*`, `teal-*` or `paper-*` steps in app UI.

- **Grounds:** `bg` for the page, `bg-subtle` and `bg-muted` for quiet groups, `bg-panel` for cards, `bg-chrome` for the frosted top bar and tab bar.
- **Text:** `fg` for body copy, `fg-emphasized` for labels, `fg-muted` for supporting copy, `fg-subtle` only on `bg` and `bg-subtle`.
- **Actions:** `accent-solid` with `accent-contrast` on top. It is `teal-700` in light mode and `teal-500` in dark mode, so the text stays readable in both.
- **Edges:** `border` and `border-muted` are decorative hairlines. An interactive edge needs a stronger signal, such as `border-error`, a focus ring or the accent.

Follow these named rules:

- **One teal.** If something wants a highlight, try a brighter teal step first, then ask whether it needs one at all. `teal-300` is a step of teal, not a second brand color.
- **Lime is wind data.** Lime appears only through `wind-strong`. Never put it on a button, badge or chrome.
- **Extreme wind is a safety state.** `wind-extreme` uses caution, not more lime.
- **Status colors do one job.** `danger-*`, `caution-*` and `success-*` signal safety and status, and never decorate.
- **Never use color alone.** Pair every condition with an icon, a word and a number: "18 kn, Good".

## Photography

Use photos on the intro and onboarding screens, and keep product lists on ink panels. Photos come from `assets/Photos`.

On a photo, use only `bg-photo`, `fg-photo`, `fg-photo-muted` and `fg-photo-accent`. These stay the same in both color modes, because the screen always sits on a dark image. The scrim runs from `bg-photo` at 90% at the bottom, through 35% at the 45% mark, to transparent at 75%. Slow-zoom the photo from scale 1 to 1.06 over 6 seconds, and skip that zoom when the rider has asked for reduced motion.

## Typography

Choose a named style, and never set size, weight and line height by hand.

- **Sora** is for headings only: `display`, `heading` and `title`. It never goes below `title` at 1.25rem.
- **Manrope** is for everything else: `body`, `caption` and `label`.
- **On photos**, use `body.photo` and `label.photo`, which add weight, leading and tracking.
- **Geist Mono** is for code and data only. Labels stay in Manrope.
- **Numbers that update** use `fontVariantNumeric: "tabular-nums"`, so a readout such as `18 kn` does not jitter.

## Spacing and layout

Spacing runs on a 4px base. Use the sanctioned steps from `space-1` to `space-32`, with `space-4` as the default card padding.

The app is portrait-only and always boots at `/`. Use the safe-area tokens `safe.top`, `safe.bottom`, `safe.left` and `safe.right` in style props, such as `pt="safe.top"`. They read live device values, so they are not listed as fixed tokens. Full-bleed screens run the photo under the notch, then pad their content with `safe.*`. Touch targets are at least 44pt, and nothing depends on hover.

## Shape and depth

Corners are tight and aerodynamic. Use `radius-md` or `radius-lg` on buttons and fields, and `radius-xl` or `radius-2xl` on cards. Keep `radius-full` for avatars and small status chips. A primary action is never a pill.

Resting surfaces are flat: a lighter ink step plus a hairline. Add a shadow only when something floats or can be pressed: `shadow-sm` on card hover, `shadow-md` on menus, `shadow-lg` on dialogs. Pressable cards scale to 0.99 when pressed.

## Motion

Motion is fluid and confident, with no bounce and no spring.

| Token       | Value                          | Use                   |
| ----------- | ------------------------------ | --------------------- |
| `fast`      | 120ms                          | Press feedback        |
| `normal`    | 200ms                          | Most state changes    |
| `slow`      | 320ms                          | Larger moves          |
| `easeOut`   | `cubic-bezier(0, 0, 0.2, 1)`   | The default curve     |
| `easeIn`    | `cubic-bezier(0.4, 0, 1, 1)`   | Things leaving        |
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Moves within a screen |

Onboarding paging settles more slowly: 0.48s on `cubic-bezier(0.16, 1, 0.3, 1)`, one slide per gesture. When the rider asks for reduced motion, drop spatial movement and keep the state readable.

## Iconography

Use Lucide icons through `react-icons/lu`, the only icon set in the app. Do not draw one-off icons or use emoji as icons. Icon-only buttons must have an `aria-label`. Wind is shown through geometry, motion and the `wind-*` scale, not through a decorative icon set.

The mark and wordmark are in `assets/Logos`. Copy them as they are, and never redraw them.

## Components

Import components from `@/components/...`. App code never imports Chakra directly and never picks a `colorPalette`. Components take a meaningful prop instead, such as `intent` on `Button` or `variant` on `StatusPill`.

Build from `AeryoCard` only when no domain card fits: `SpotCard`, `SessionCard`, `WeatherCard`, `ForecastCard` or `RiderCard`. Keep focus rings. Never remove an outline without a replacement.

Any data a screen reads needs a cached copy or an explicit unavailable message. A spinner that never ends is not allowed.

## Known gaps

These pairs come straight from the code and miss the contrast targets in light mode, so check them before using them on a new surface:

| Pair                        | Ratio  | Target |
| --------------------------- | ------ | ------ |
| `fg-subtle` on `bg`         | 2.99:1 | 4.5:1  |
| `fg-subtle` on `bg-subtle`  | 2.86:1 | 4.5:1  |
| `fg-muted` on `bg-muted`    | 4.31:1 | 4.5:1  |
| `rider-offline` on `bg`     | 2.02:1 | 3:1    |
| `session-completed` on `bg` | 2.99:1 | 3:1    |
| `wind-calm` on `bg`         | 2.99:1 | 3:1    |
| `wind-strong` on `bg`       | 2.90:1 | 3:1    |
| `border-success` on `bg`    | 1.78:1 | 3:1    |
| `border-info` on `bg`       | 2.58:1 | 3:1    |

**Not carried over as tokens:** the `safe.*` insets and the motion values, listed above instead, and the Chakra default steps the theme inherits but does not sanction. `Provider`, `ColorModeButton`, `Tooltip` and the other helpers in `src/components/ui` have no cards, because they are app wiring rather than design system components.
