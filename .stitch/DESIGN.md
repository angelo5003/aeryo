---
name: AERYO
colors:
  background: '#071216'
  on-background: '#EDF8F6'
  surface: '#0D2931'
  surface-dim: '#071216'
  surface-bright: '#123640'
  surface-container-lowest: '#071216'
  surface-container-low: '#0D2931'
  surface-container: '#123640'
  surface-container-high: '#1B4650'
  surface-container-highest: '#285C68'
  on-surface: '#EDF8F6'
  on-surface-variant: '#76A1A9'
  inverse-surface: '#EDF8F6'
  inverse-on-surface: '#071216'
  outline: '#1B4650'
  outline-variant: '#123640'
  surface-tint: '#19AEB5'
  primary: '#19AEB5'
  on-primary: '#071216'
  primary-container: '#106B70'
  on-primary-container: '#63E6D5'
  inverse-primary: '#148A90'
  secondary: '#148A90'
  on-secondary: '#EDF8F6'
  secondary-container: '#0D2931'
  on-secondary-container: '#96B8BE'
  tertiary: '#2FC3B8'
  on-tertiary: '#071216'
  tertiary-container: '#0B4D52'
  on-tertiary-container: '#63E6D5'
  error: '#D45B52'
  on-error: '#EDF8F6'
  error-container: '#6E2823'
  on-error-container: '#F5D2CD'
  primary-fixed: '#63E6D5'
  primary-fixed-dim: '#19AEB5'
  on-primary-fixed: '#042224'
  on-primary-fixed-variant: '#106B70'
  secondary-fixed: '#98E7D9'
  secondary-fixed-dim: '#63E6D5'
  on-secondary-fixed: '#042224'
  on-secondary-fixed-variant: '#106B70'
  tertiary-fixed: '#98E7D9'
  tertiary-fixed-dim: '#2FC3B8'
  on-tertiary-fixed: '#042224'
  on-tertiary-fixed-variant: '#0B4D52'
  surface-variant: '#123640'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Sora
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  stat-lg:
    fontFamily: Sora
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.04em
rounded:
  sm: 6px
  DEFAULT: 8px
  md: 10px
  lg: 14px
  xl: 18px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
---

# Design System: AERYO

AERYO is a premium, intelligent wind platform for kitesurfing. Dark-first. Mobile-first. iOS. The product name is **AERYO** — never "Kitesurf", never a generic weather app, never an extreme-sports brand.

This file is the visual source of truth for Stitch. Tokens are copied from the production system in `src/design-system/theme/`. Do not invent new colors, fonts, radii, or accents.

---

## 1. Visual Theme & Atmosphere

The interface feels like **instrument-grade wind intelligence held in the hand** — atmospheric, aerodynamic, and calm. Deep near-black ink fields recede like pre-dawn water. Surfaces lift one step at a time, like air density, not like stacked SaaS cards. Teal is the single living signal: a precise instrument light, not a tropical beach brand.

The mood is **Calm → Intelligent → Energetic**. Premium without elitist. Technical without cockpit clutter. Adventurous without Red Bull aggression. The design should feel as though air is moving through it: directional composition, flowing wind lines in data, circular O/vortex motifs used sparingly as brand geometry — never literal wind-icon wallpaper.

**Key characteristics**
- Dark atmospheric canvas with restrained teal light
- Wind numerals as the loudest element on any conditions screen
- Cinematic but authentic North Sea photography (grey water, real riders, dramatic sky) — never tropical postcards
- Hairline teal-tinted borders instead of heavy shadows
- Aerodynamic corners: intentional, tight, never oversized pill-SaaS
- Data is a brand expression: flowing timelines, circular direction, wind-intensity ramps
- Outdoor readable: large type, high contrast, 44px minimum touch targets

**Banned atmosphere**
Generic weather-app blue. Tropical turquoise everywhere. Neon gradients. Glassmorphism for its own sake. Extreme-sports hype. Generic SaaS card grids. Oversized pill buttons everywhere. Lime as a UI accent. Stock "John Doe" riders. Emoji. Marketing slogans like "INSANE WIND".

---

## 2. Color Palette & Roles

### Primary Foundation (ink scale)

- **Atmospheric Base** (`#071216`) — App canvas, splash, home background. The darkest field. Never pure black.
- **Deep Surface** (`#0D2931`) — Cards, sheets, bottom navigation, elevated panels.
- **Raised Surface** (`#123640`) — Nested wells, selected chips, map chrome, input fills.
- **High Surface** (`#1B4650`) — Stronger wells, segmented control tracks.
- **Off-White Mist** (`#EDF8F6`) — Primary text, inverse surfaces, light-mode canvas (companion only).

### Accent & Interactive (one primary)

- **AERYO Teal** (`#19AEB5`) — The only brand primary. Primary buttons, active nav, selected filters, focus rings, key interactive fills. On this dark base it reads as instrument/premium, not tropical. Restraint comes from *use*, not from muting the hue.
- **Bright Teal** (`#63E6D5`) — Energized / good-wind step of the *same* hue. Live wind “good” state, riding/active session, bright numeric emphasis. Not a second brand color. Not a button fill.
- **Deep Teal** (`#106B70` / `#148A90`) — Primary button in light mode; quieter interactive text; “light wind” on dark.
- **On-Primary Ink** (`#071216`) — Text/icons sitting on AERYO Teal fills in dark mode (verified contrast).

### Typography & Text Hierarchy

- **Primary Text** (`#EDF8F6`) — Headlines, wind numerals, primary labels.
- **Muted Instrument** (`#76A1A9`) — Secondary body, metadata, timestamps. Verified 4.5:1+ on Atmospheric Base and Deep Surface.
- **Subtle Instrument** (`#66969F`) — Captions, inactive nav, tertiary meta. Use only on Atmospheric Base or Deep Surface — never on Raised Surface.
- **Hairline Teal Border** (`rgba(99, 230, 213, 0.16)`) — Decorative card/nav edges only. Never the sole cue for an interactive control.
- **Softer Hairline** (`rgba(99, 230, 213, 0.10)`) — Dividers.

### Wind intensity (data only — never buttons, badges, or chrome)

Wind is a small story told with **color + icon + label + numeric value**. Color alone is forbidden.

- **Calm** (`#66969F`) — 0–6 kn
- **Light** (`#148A90`) — 7–12 kn
- **Good** (`#63E6D5`) — 13–22 kn
- **Strong** (`#BEE82A`) — 23–34 kn. This is **lime**, and lime exists *only* here — the high end of the wind-flow ramp. Never a CTA, never a badge fill, never a highlight chip.
- **Extreme** (`#DD9247`) — 35+ kn. Safety caution, not “more brand”.

### Functional states (role-named, never decorative)

- **Danger Brick** (`#D45B52`) — Errors, cancelled sessions, destructive actions. Never decoration.
- **Caution Amber** (`#C97F35`) — Extreme wind, warnings. Never decoration.
- **Rider Riding** (`#63E6D5`) / **Planning** (`#148A90`) / **Offline** (`#6B99A2`) — Presence, shade of teal only.

### Light mode (companion, not a restyle)

Same tokens, inverted canvas: Off-White Mist background, Atmospheric Base text, Deep Teal (`#106B70`) primary buttons with Off-White text. Do not generate light screens in Phase 1.

---

## 3. Typography Rules

**Display / Headlines:** Sora — geometric, aerodynamic, confident. Slightly wide, highly legible. Used for the AERYO wordmark, section titles, and especially **wind / speed / score numerals**.

**Body / UI:** Inter — precision and outdoor readability. Labels, lists, supporting copy, tab text.

**Mono (rare):** Geist Mono — only for raw coordinates or debug-like telemetry if needed. Not for marketing.

If a renderer cannot load Sora, use **Plus Jakarta Sans** for headlines (closest geometric stand-in). Body remains Inter. Never use Inter for the giant wind numeral.

### Hierarchy

- **Wind numeral (stat-lg):** Sora ExtraBold 800, 56px, tracking -0.04em, Off-White Mist. Unit (`kn`) in Inter Semibold 16–18px, Muted Instrument, sitting on the baseline of the numeral.
- **Display (onboarding wordmark / splash):** Sora ExtraBold, ~40px, tight tracking.
- **Screen title:** Sora Bold 700, 22px, tracking -0.02em.
- **Section label:** Inter Semibold 11px, letter-spacing 0.08em, uppercase, Muted Instrument. Example: `NOW · SCHEVENINGEN`.
- **Body:** Inter Regular 16px / 24px. Voice: concise, confident, human. `"18 knots. WNW. Building through the afternoon."` Never hype.
- **Caption:** Inter Medium 13px, Subtle Instrument.
- **Tab labels:** Inter Medium 10–11px. Active: AERYO Teal. Inactive: Subtle Instrument.

Numbers such as `18 kn`, `WNW 24°`, `12°C`, `82%` must be immediately scannable — never buried in paragraph text.

---

## 4. Component Stylings

### Buttons

- **Shape:** Gently rounded, aerodynamic — **8–10px radius**. Not pills. Not sharp rectangles. Compact and tactile.
- **Primary:** AERYO Teal (`#19AEB5`) fill, Atmospheric Base (`#071216`) label, Inter Semibold 16px, min height 48px, horizontal padding 20px. Full-width only when it is the single page CTA (permissions, onboarding continue).
- **Secondary:** Transparent fill, 1px AERYO Teal border, Off-White label.
- **Ghost / tertiary:** No fill, Muted Instrument label.
- **Icon button:** 44×44 minimum, Raised Surface fill, 10px radius, 1px hairline.
- **Do not** use lime, danger, or oversized stadium pills for primary actions.

### Cards & Containers

- **Shape:** 14–18px radius (lg / xl). More rounded than buttons, still tighter than generic SaaS “super-pill” cards.
- **Fill:** Deep Surface (`#0D2931`) on Atmospheric Base.
- **Edge:** 1px Hairline Teal Border. No heavy drop shadow. Elevation is surface step + hairline, not blur.
- **Floating sheets / menus only:** Whisper-soft dark shadow `0 16px 40px rgba(2, 8, 10, 0.55)`.
- **Internal padding:** 16px default, 20px for hero condition cards.
- **Photography:** Full-bleed cinematic stills at the top of spot cards, horizon-weighted, slightly desaturated North Sea light. Rider is not always the hero — sky and water may dominate.

### Navigation

- **Top:** Minimal. AERYO wordmark or compact **O / vortex symbol** left. Utility icons (alert, profile) right. No hamburger.
- **Bottom tab bar:** 5 destinations — **Home · Explore · Sessions · Community · Profile**. Deep Surface bar, hairline top border, 8px+ home indicator inset. Active icon + label in AERYO Teal. Inactive in Subtle Instrument. The **O symbol may mark Home** as a brand-navigation element.
- **Never** label the product “Kitesurf”. Tab copy is functional English.

### Inputs, Search, Chips

- **Search:** Raised Surface fill, 10px radius, Inter 16px, placeholder Subtle Instrument, leading magnifying icon. Height 48px.
- **Inputs:** Same fill/radius as search. Focus: 2px AERYO Teal ring. Labels always visible above the field (no floating labels that vanish).
- **Filter chips:** 8px radius (not pills, except tiny status dots). Unselected: Raised Surface. Selected: AERYO Teal fill with Atmospheric Base text — or inverted outline if multiple can be selected.
- **Segmented control:** High Surface track, 10px radius, selected segment Deep Surface + Off-White label.

### Forecast, Spot, and Wind components (signature)

- **Wind readout:** Giant Sora numeral + unit + compact circular direction ring (O/vortex geometry) + gusts as a second line (`Gusts 24 kn`). Direction as letters (`WNW`) not only an arrow.
- **Condition verdict:** Secondary to wind. Small labeled block: `Go` / `Wait` / `Caution` with icon + word + short reason. Never color-only.
- **Hourly strip:** Horizontal scroller of time, wind speed, tiny direction tick. Good hours use Bright Teal ticks; strong hours use lime ticks *inside the chart only*.
- **Spot card:** 16:9 or 3:2 cinematic still, then name (Sora 18px), distance, live kn, difficulty label, community rating. Difficulty as **label + icon**, not color alone.
- **Map:** Dark, restrained, geography quiet. Wind and spots are the subject. Spot markers are small O-rings. No busy Google-default styling.

### Feedback

- **Toasts:** Deep Surface, hairline, 14px radius, Inter 14px, 16px from bottom nav.
- **Banners:** Full-bleed caution/danger only for safety (storm, extreme wind). Icon + title + metric.
- **Skeletons:** Shimmer on Deep Surface rounded blocks matching final layout. No circular spinners as the primary loading language; the O/vortex may rotate slowly as a brand loader.
- **Empty:** One quiet sentence in AERYO voice + one primary action. Example: `No sessions logged yet. Start tracking when you hit the water.`

---

## 5. Layout Principles

### Device & structure

- **Platform:** iOS, iPhone 17 Pro / Pro Max. Mobile-first. Portrait.
- **Safe areas:** Status bar + Dynamic Island respected. Bottom nav above home indicator.
- **Horizontal inset:** 20px page margin. 16px gutters inside cards.
- **Width:** Single column. No desktop chrome in Phase 1.

### Whitespace

- **Base unit:** 4px. Component rhythm 8 / 16 / 24 / 32.
- **Hero wind block:** Generous vertical room — the numeral must be readable at arm’s length in sunlight.
- **Section gaps:** 24px between modules; 8px inside a module.
- **Avoid:** Tight meteorological dashboards. Avoid sparse fashion-lookbook emptiness. Sit in the middle: dense enough to decide in seconds, quiet enough to feel premium.

### Hierarchy (every conditions screen)

1. Wind now (speed, direction, gusts)
2. Decision (Go / Wait / Caution + why)
3. Where (recommended spot)
4. When (next useful window)
5. Secondary (alerts, upcoming session, quick actions)

### Touch & accessibility

- Minimum 44×44px targets; prefer 48px for primary actions.
- WCAG AA contrast on all text. Do not place Subtle Instrument on Raised Surface.
- Wind and status always **color + icon + label + number**.
- One-handed: primary CTA and tab bar in the thumb zone.

### Content world (North Sea / Netherlands)

Use real, specific content — never lorem, never generic beaches.

- **Spots:** Scheveningen, Wijk aan Zee, Brouwersdam, IJmuiden, Grevelingendam.
- **Units:** knots, °C, 24-hour time.
- **Sample now:** `18 kn` · `WNW` · gusts `24 kn` · air `14°C` · water `12°C`.
- **Riders:** Dutch names (Sanne Visser, Daan de Vries, Lieke Bakker) — not stock English placeholders.
- **Voice:** `"18 kn WNW. Building through 16:00 at Scheveningen."` Not `"Let's shred!"`.
- **UI language:** English. Place names stay Dutch.

---

## 6. Design System Notes for Stitch Generation

### Language to use

- Atmosphere: "dark atmospheric instrument canvas", "aerodynamic", "wind-first", "calm then intelligent"
- Buttons: "gently rounded 8–10px corners, compact, not pills"
- Cards: "14–18px aerodynamic corners, deep surface, hairline teal border, almost no shadow"
- Wind: "oversized Sora extra-bold knots numeral with circular direction ring"
- Maps: "restrained dark canvas for wind intelligence, not geographic detail"

### Color references (always name + hex)

- Canvas: Atmospheric Base (`#071216`)
- Panels: Deep Surface (`#0D2931`)
- Primary interactive: AERYO Teal (`#19AEB5`)
- Primary text: Off-White Mist (`#EDF8F6`)
- Secondary text: Muted Instrument (`#76A1A9`)
- Wind good: Bright Teal (`#63E6D5`)
- Wind strong: lime (`#D7FF3F` / `#BEE82A`) **charts only**
- Danger: (`#D45B52`) safety only

### Do not put in generation prompts

Do not re-specify a new palette, font list, or radius system in screen prompts — this file owns them. Screen prompts describe **layout, content, and structure only**.

### Incremental iteration

Edit one region at a time (hero wind block, then spot recommendation, then tab bar). Prefer edits over full regenerations once the Home screen is close.

### Brand test (every screen)

Does it feel wind-driven, clear, premium, dynamic, human, adventurous, intelligent, natural? Does it avoid generic weather UI, extreme-sports aggression, generic SaaS, visual noise, cheap luxury, and tropical surf-shop aesthetics? If not, reconsider the element.
