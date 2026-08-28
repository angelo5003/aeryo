# AERYO — Brand & Design System Master Brief

This is the consolidated brand brief for AERYO — the source of truth for
turning the brand into a complete design system, and then using that system
to develop the actual product design (in code, and in Google Stitch/Figma).

---

## 1. Brand Overview

**Brand name:** AERYO
**Category:** Premium wind & kitesurfing platform

**Product:** AERYO is a digital platform that helps riders understand wind
and conditions, discover spots, plan sessions, track activity, manage
equipment, and connect with the kitesurfing community.

AERYO should sit between:

- a premium outdoor/sports brand
- an intelligent weather and wind platform
- a modern consumer technology product
- a social/community platform

It should not feel like a generic weather application or a traditional
extreme-sports brand.

**Brand essence**

> Intelligent wind, made tangible.

AERYO transforms something naturally complex and constantly changing — wind
— into something clear, useful, visual and actionable.

The brand should make the user feel: **Freedom + Adventure + Confidence +
Intelligence + Progress**

---

## 2. Brand Positioning

AERYO is a modern wind-driven platform for people who want to make better
decisions on the water.

The product should communicate:

- Wind as energy
- Movement
- Flow
- Freedom
- Exploration
- Progression
- Connection with nature
- Confidence through information
- Technology that simplifies complexity

**Positioning statement**

> AERYO makes wind and kitesurfing conditions understandable, actionable and
> enjoyable — combining intelligent technology, beautiful visualisation,
> real-world spots and an active rider community.

**Important distinction.** AERYO is not:

- a generic weather app
- an extreme-sports brand
- an aggressive action-sports identity
- a surf-shop aesthetic
- a technical meteorological dashboard
- a generic SaaS product
- a luxury fashion brand

It should feel premium without being elitist.

---

## 3. Brand Personality

AERYO should consistently feel:

| Trait       | Meaning                                        |
| ----------- | ----------------------------------------------- |
| Clear       | Information is easy to understand                |
| Wind-driven | Wind and movement are central to the identity    |
| Confident   | The product feels trustworthy and decisive       |
| Intelligent | Technology helps users make better decisions     |
| Energetic   | There is movement and momentum                   |
| Human       | Technology never overwhelms the rider            |
| Premium     | Refined, considered and high quality             |
| Free        | The brand represents freedom and exploration     |
| Adventurous | Encourages discovery and progression             |

**Avoid:** Aggressive, Extreme, Overly technical, Corporate, Childish,
Generic, Overly playful, Excessively futuristic, Cold technology aesthetics.

---

## 4. Core Brand Values

The visual and product system should be built around five fundamental ideas:

1. **Clarity** — Complex wind and weather data should become immediately
   understandable.
2. **Freedom** — AERYO represents the freedom to follow the wind and choose
   where to ride.
3. **Adventure** — The product encourages discovery of new spots and
   conditions.
4. **Progression** — AERYO helps riders improve, understand their sessions
   and make better decisions.
5. **Connection** — Riders, spots, sessions, conditions and community are
   connected through the platform.

---

## 5. Overall Visual Direction

The selected direction should be: **Minimal + Premium + Dynamic +
Intelligent + Wind-driven**

The visual identity should feel: modern, aerodynamic, refined, spacious,
fluid, confident, energetic, technologically advanced, connected to nature.

But it must avoid becoming sterile or overly futuristic.

**Desired balance**

```
Premium      ↕  Adventure
Technology   ↕  Human/natural
Minimalism   ↕  Expression
Information  ↕  Emotion
```

The correct AERYO design sits in the middle of these tensions.

---

## 6. Visual Metaphor: Wind

Wind should be the underlying visual concept of the entire identity.

Rather than using literal illustrations of wind, the system should
communicate wind through:

flowing lines, curves, directional movement, gradients of density,
atmospheric layers, trajectories, circular movement, fluid transitions,
subtle distortion, dynamic spacing, directional composition.

The design should feel as though air is moving through it.

**This is important:** do not simply put wind icons everywhere. Wind should
influence the geometry and behaviour of the interface, not just its
iconography.

---

## 7. Logo Direction

The preferred logo strategy is a **wordmark-first identity**.

**AERYO wordmark.** The wordmark should be: custom, geometric, modern,
aerodynamic, highly legible, premium, distinctive, suitable for digital
products.

The typography should have enough personality to make AERYO immediately
recognizable without requiring a separate mascot or complicated symbol.

**The "O" as the brand element.** The O is potentially the most important
visual opportunity in the logo. It can evolve into a standalone brand
element representing concepts such as: wind loop, vortex, circular route,
radar, weather system, airflow, orbit, movement, continuous flow.

The O should feel active rather than static. This element could eventually
become: app icon, loading indicator, location marker element, weather
visualization element, avatar/profile element, button/icon accent, motion
graphic, map visualization element, favicon, notification indicator.

The logo system should therefore be designed with a full responsive
identity, not just one static logo.

---

## 8. Logo Behaviour

The identity should ideally have three levels:

- **Primary — AERYO wordmark.** Used for: website, onboarding, marketing,
  splash screen, major brand moments.
- **Secondary — AERYO + O symbol.** Used when the full wordmark is not
  necessary.
- **Compact — O / wind symbol.** Used for: app icon, favicon, navigation,
  small UI, loading states, social avatar, map/interface contexts.

The symbol should remain recognizable even without the wordmark.

---

## 9. Color Philosophy

The color system should not look like a traditional surf brand.

**Avoid:** tropical turquoise everywhere, bright beach colors, excessive
blue, neon gradients, generic purple/blue SaaS gradients, rainbow weather
palettes.

> **Resolved implementation note:** AERYO's actual primary ended up
> teal-hued — see the "Resolved Palette" addendum after §10 for why that
> isn't the tropical turquoise this section warns against, and how the
> brand reference's lime survives as a controlled, wind-data-only accent
> rather than a general highlight.

The palette should feel atmospheric, premium and natural, with enough
contrast to support data-heavy interfaces.

**Desired characteristics:** deep atmospheric base colors, sophisticated
neutrals, restrained wind/ocean-inspired accents, one recognizable AERYO
primary color, carefully controlled highlights, high accessibility
contrast.

The palette should work especially well in a dark-first interface.

---

## 10. Color System Structure

Define the final palette using three levels:

**Primitive tokens** — raw colors such as: deep atmospheric background,
dark surface, elevated surface, light neutral, muted neutral, primary
brand, secondary accent, success, warning, danger, information.

**Semantic tokens** — for example:

```
background.base
background.surface
background.elevated

text.primary
text.secondary
text.muted
text.inverse

border.default
border.subtle
border.strong

brand.primary
brand.primaryHover
brand.primaryActive

status.success
status.warning
status.danger
status.info
```

**Component tokens** — component-specific applications such as:

```
button.primary.background
button.primary.text
card.background
card.border
input.background
input.focus
navigation.active
navigation.inactive
```

The final design system should keep brand identity separate from semantic
UI meaning.

---

## Resolved Palette (Implementation Addendum)

This records the concrete palette actually implemented in
`src/design-system/theme/`, reconciling §9's philosophy with the original
AERYO brand reference — the teal/mint/lime moodboard this project started
from (near-black base `#071216`, surface `#0D2931`, teal `#19AEB5`, mint
`#63E6D5`, lime `#D7FF3F`, off-white `#EDF8F6`, Sora/Manrope typography, a
wind-flow gradient bar running teal → lime across 0–50+ knots). Read this
as the resolved answer to §9's "Claude should define the final palette" —
supersedes the abstract guidance above with real values where they
disagree.

**The reference's teal survives as the one primary — `#19AEB5`.** Read on
a light or warm background it can drift tropical; read on AERYO's own deep
atmospheric base (also from the reference) it reads as instrument/premium,
not beach. Restraint comes from *disciplined use* — one primary, not
three simultaneous accents — not from muting the hue itself.

**Mint (`#63E6D5`) is retired as a separate accent.** It's the same hue
family as the primary, just lighter, so it now lives inside the teal ramp
itself (`teal.300`) for bright/energized states — not a second co-equal
brand color.

**Lime (`#D7FF3F`) is retained, but demoted to one functional role**: the
high end of the wind-intensity scale, exactly matching the reference's own
wind-flow gradient bar. It never appears as a button fill, badge, or
general highlight — only inside wind/data visualization, where §17
already calls data "a brand expression, not a utility layer." Wind
intensity reads as its own small story: calm/light → quiet teal, good →
bright teal, strong → lime, extreme → breaks to `caution` (below), a state
the reference's plain speedometer didn't need, but the app does — §25
requires wind conditions to never rely on color alone.

**`danger` and `caution` are real, AERYO-anchored ramps, not Chakra's
stock red/orange.** The first implementation pass reached for Chakra's
default red/orange for `session.cancelled`/`wind.extreme` — a later
critique pass caught that this quietly broke the "everything traces to a
brand hex" discipline right at the two safety-critical touchpoints, so
both got proper 11-step ramps of their own: a muted brick-coral `danger`
(anchor `#D45B52`) and a muted amber `caution` (anchor `#C97F35`), tuned
atmospheric and restrained like the rest of the palette rather than
stock-alert brights. They're named by *role*, not hue, on purpose — unlike
`teal`/`lime`, nothing should ever reach for `colorPalette="danger"`
decoratively; it exists for exactly one job.

```
ink.950     #071216   atmospheric base        (from the reference, exact)
ink.900     #0D2931   surface                 (from the reference, exact)
teal.500    #19AEB5   the one primary         (from the reference, exact)
teal.300    #63E6D5   primary, bright step    (formerly "mint")
lime.300    #D7FF3F   wind data only          (from the reference, exact)
danger.500  #D45B52   safety-only, cancelled/errors
caution.500 #C97F35   safety-only, extreme wind
ink.50      #EDF8F6   off-white               (from the reference, exact)
```

An earlier implementation pass explored a "Storm Slate" direction (a muted
steel-blue primary + an amber highlight) that satisfied the restraint
principle but abandoned the brand's actual recognizable color. This
resolved palette supersedes it — it keeps both.

**Accessibility pass.** A critique of this palette (WCAG 2.1 contrast,
4.5:1 normal text / 3:1 large text & UI components) caught several
dark-mode values that looked plausible but failed in practice — most
notably `accent.contrast` on `accent.solid` (the primary-button pairing)
at 2.49:1, plus `fg.subtle`, `fg.muted`, and `wind.calm` each failing
against at least one surface they're actually used on. All are fixed and
verified in `src/design-system/theme/semantic-tokens.ts` — see that file's
comments for the exact ratios. Lesson carried forward: check a new
dark-mode text value against every surface it will realistically render
on, not just the darkest one.

---

## 11. Typography

Typography should communicate: **precision + modernity + confidence +
premium simplicity**

It should not feel: corporate, overly futuristic, gaming-oriented,
excessively geometric, editorial/luxury-fashion.

The typography system should have a strong hierarchy.

**Recommended hierarchy:** Display, H1, H2, H3, H4, Body large, Body, Body
small, Caption, Label, Data/metric.

Large typography can be expressive and bold. Small typography must
prioritize clarity and data readability.

**Special consideration.** Wind data, measurements and forecast information
should have a highly legible numerical style. Numbers such as `18 kn`,
`NW 24°`, `14°C`, `82%` should be immediately scannable.

---

## 12. Shapes & Geometry

AERYO should use a combination of:

- **Soft geometry** — rounded surfaces, fluid curves, circles, arcs,
  flowing containers.
- **Precision geometry** — structured grids, clean cards, clear alignment,
  strong spacing, controlled borders.

This creates the central AERYO tension: **natural movement + technological
precision.**

Avoid excessive rounded "SaaS card" styling. Corners should feel
intentional and aerodynamic, rather than simply following a generic UI
framework.

---

## 13. Graphic Language

The graphic system should be based around:

- **Flow** — curved paths and directional movement.
- **Wind** — subtle airflow patterns.
- **Orbit** — circular movement around a point.
- **Direction** — arrows, trajectories and directional indicators.
- **Atmosphere** — layered gradients and subtle transparency.
- **Topography** — maps and terrain can use simplified, elegant visual
  layers.
- **Data** — forecast information should become part of the visual
  identity rather than appearing as generic charts.

---

## 14. Imagery

Photography should be a major emotional component of the brand.

**Preferred imagery:** real riders, real wind, real environments, open
water, coastlines, beaches, dramatic skies, movement, exploration, moments
before/after a session.

Photography should feel: **cinematic but authentic.**

**Avoid:** cheesy stock photography, overly staged athletes, extreme
action-only photography, tropical postcard aesthetics, excessive
saturation, influencer-style imagery.

AERYO should communicate the experience surrounding the sport, not just
people performing tricks.

---

## 15. Image Composition

Images should emphasize: negative space, horizon, movement, wind direction,
scale, environmental context.

The rider does not always need to be the dominant element. Sometimes the
image should communicate:

> "There is a huge world out there, and the wind is telling you where to
> go."

This supports the Freedom + Adventure positioning.

---

## 16. Iconography

Icons should be: minimal, geometric, consistent, highly legible, slightly
aerodynamic, modern, functional. Avoid overly detailed illustrations.

The icon system should distinguish between:

- **Navigation** — Home, explore, sessions, spots, profile.
- **Wind** — Wind direction, speed, gusts.
- **Weather** — Temperature, precipitation, clouds, pressure.
- **Equipment** — Kite, board, wetsuit, gear.
- **Community** — People, groups, comments, reactions.
- **Actions** — Save, share, navigate, filter, search.

---

## 17. Data Visualization

This is one of the most important parts of AERYO. The application will
contain significant amounts of wind and forecast information. Data
visualization should therefore be treated as a **brand expression**, not
merely a utility layer.

**Use:** flowing wind lines, directional arrows, circular indicators,
elegant graphs, layered forecast timelines, heatmaps, map overlays, clear
numeric metrics.

The visualizations should feel: **calm, precise and intelligent.** Not like
an aviation dashboard. Not like a generic weather app.

---

## 18. Maps

Maps should feel integrated into the AERYO identity.

AERYO maps should prioritize, in order: 1. wind, 2. spots, 3. conditions,
4. geography, 5. session information.

The map styling should be restrained. Use the map as a canvas for wind
intelligence, rather than making geographic detail the visual focus.

**Potential visual concepts:** wind-flow overlays, directional vectors,
spot markers, condition rings, forecast paths, session zones.

---

## 19. Motion Design

Motion is important because AERYO is fundamentally about movement.

Animations should feel: fluid, directional, lightweight, natural,
responsive, confident.

**Avoid:** excessive bounce, gamification, cartoon transitions, flashy
effects, unnecessary animation.

**Motion metaphor.** Think: *air moving around an object* — rather than:
*UI elements bouncing into place.*

The O/wind symbol can become the foundation of the motion language.

---

## 20. UI Personality

The interface should feel: **Calm → Intelligent → Energetic** — rather
than: Loud → Extreme → Aggressive.

AERYO should give users confidence that they can quickly answer: "Should I
ride?" — then "Where should I go?" — and finally "How was my session?"

---

## 21. Core Product Design Principles

Every screen should follow these principles:

1. **Wind first** — Wind is the central product concept.
2. **Reduce complexity** — Never expose weather complexity without
   translating it into something actionable.
3. **Visual hierarchy over information density** — AERYO can contain a lot
   of data without looking cluttered.
4. **Actionable information** — Every important metric should help the
   user make a decision.
5. **Premium restraint** — Use fewer, stronger visual elements.
6. **Natural movement** — The interface should subtly reflect airflow and
   movement.
7. **Human technology** — Technology should support the rider, not
   dominate the experience.
8. **Consistency** — Brand, UI, maps, charts, photography and motion
   should feel like one system.

---

## 22. Design System Architecture

Recommended structure:

```
AERYO Design System
│
├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Grid
│   ├── Radius
│   ├── Shadows
│   ├── Borders
│   ├── Elevation
│   └── Motion
│
├── Brand
│   ├── Logo
│   ├── O Symbol
│   ├── Brand Colors
│   ├── Imagery
│   ├── Graphic Language
│   └── Voice
│
├── Components
│   ├── Buttons
│   ├── Cards
│   ├── Navigation
│   ├── Tabs
│   ├── Inputs
│   ├── Search
│   ├── Filters
│   ├── Chips
│   ├── Badges
│   ├── Forecast Cards
│   ├── Spot Cards
│   ├── Session Cards
│   └── Profile Components
│
├── Data Visualization
│   ├── Wind Graph
│   ├── Forecast Timeline
│   ├── Wind Direction
│   ├── Wind Speed
│   ├── Gusts
│   ├── Temperature
│   └── Condition Score
│
├── Maps
│   ├── Spot Markers
│   ├── Wind Overlay
│   ├── Condition Overlay
│   └── Session Overlay
│
└── Patterns
    ├── Dashboard
    ├── Spot Detail
    ├── Forecast
    ├── Session
    ├── Explore
    ├── Community
    └── Profile
```

---

## 23. Component Design Direction

Components should look unmistakably AERYO.

**Cards.** Not generic SaaS cards. They should use: atmospheric
backgrounds, subtle borders, controlled radius, strong hierarchy,
occasional wind/flow graphics, clear data emphasis.

**Buttons.** Should feel: confident, compact, premium, tactile. Avoid
oversized pill buttons everywhere.

**Navigation.** Should be minimal and highly legible. The O symbol can
become an important navigation/brand element.

**Forecast components.** These should be some of the most distinctive
components in the system. AERYO's forecast UI should become a recognizable
product signature.

---

## 24. Responsive Design

AERYO must be designed mobile-first, while still feeling excellent on
desktop.

**Mobile.** Prioritize: quick condition checks, current wind, spot
discovery, forecast, session tracking, navigation.

**Desktop.** Use the additional space for: richer forecasts, maps,
comparisons, detailed analytics, community, equipment, session history.

The visual language must remain identical across platforms.

---

## 25. Accessibility

Premium design must not come at the expense of usability. The system should
include: WCAG-conscious contrast, accessible typography, large enough touch
targets, clear focus states, non-color-dependent data, readable weather
metrics, clear status indicators.

**Especially important:** wind conditions cannot rely on color alone. For
example, "good conditions" should be communicated through a combination of
**color + icon + label + numeric data.**

---

## 26. Brand Voice

AERYO's verbal personality should match the visual identity.

**Voice:** concise, confident, intelligent, clear, human, energetic, calm.

**Avoid:** marketing hype, extreme-sports clichés, excessive slang,
corporate jargon, technical meteorological language, childish language.

Instead of: *"INSANE WIND! 🔥 GET OUT THERE!"*

AERYO should sound more like: *"18 knots. WNW. Building through the
afternoon."* Or: *"Good conditions from 14:00."*

The product should feel like a knowledgeable rider who understands the
conditions.

---

## 27. AERYO Emotional Hierarchy

The brand should trigger this sequence:

1. **Curiosity** — "Where is the wind taking me?"
2. **Understanding** — "I understand the conditions."
3. **Confidence** — "I know where and when to ride."
4. **Freedom** — "Let's go."
5. **Progression** — "That was a great session."

This emotional journey should influence the product UX.

---

## 28. Design System Principles for Claude

When developing the system, do not invent a generic modern SaaS design
system. The output must remain recognizably AERYO.

Continuously ask: **does this element communicate wind, movement, clarity,
freedom or premium quality?** If not, it should have a strong functional
reason for existing.

**Do not default to:** generic glassmorphism, generic SaaS gradients,
excessive rounded cards, excessive pills, neon cyberpunk, tropical surf
aesthetics, generic blue weather UI, excessive shadows, excessive
decorative elements.

---

## 29. Google Stitch / Figma Direction

The design system should ultimately become a real, production-oriented
Figma system, not simply a visual moodboard. It should create:

**Brand foundations:** Logo, Wordmark, O symbol, Color tokens, Typography,
Spacing, Radius, Shadows, Grid, Iconography, Motion principles.

**Core components:** Buttons, Inputs, Cards, Navigation, Tabs, Chips,
Badges, Modals, Bottom navigation, Search, Filters, Lists, Avatars.

**AERYO-specific components:** Wind indicator, Wind compass, Wind speed
visualization, Gust visualization, Forecast timeline, Condition score, Spot
card, Spot map marker, Session card, Session summary, Wind map, Forecast
graph.

---

## 30. First Screens to Design

For the first serious exploration, prioritize these screens:

1. Onboarding
2. Home / Today's Conditions
3. Spot Discovery
4. Spot Detail
5. Forecast
6. Interactive Wind Map
7. Session Tracking
8. Session Summary
9. Community
10. Profile
11. Saved/Favorite Spots
12. Settings

The first three should establish the visual language before expanding the
system.

---

## 31. The AERYO Design Test

Every design decision should pass this test.

**Does it feel:** Wind-driven? Clear? Premium? Dynamic? Human? Adventurous?
Intelligent? Natural?

**And does it avoid:** Generic weather-app aesthetics? Extreme-sports
aggression? Generic SaaS aesthetics? Excessive visual noise? Overly
technical dashboards? Cheap/premium-for-show styling?

If the answer is no, the component should be reconsidered.

---

## 32. One-Sentence Creative Direction

> AERYO is a premium, intelligent wind platform that turns the invisible
> force of wind into a clear, beautiful and actionable experience —
> combining aerodynamic minimalism, natural movement, precise data and the
> emotional freedom of kitesurfing.

---

## 33. Master Instruction

Treat everything above as the authoritative AERYO brand foundation. Do not
reinterpret AERYO as a generic weather app, generic SaaS product,
extreme-sports brand, surf-shop brand or luxury fashion brand.

Build a complete, scalable design system around the principles of Freedom,
Adventure, Premium Quality, Clarity, Wind, Movement and Intelligent
Technology.

Translate the brand into concrete design tokens, typography, color
architecture, components, data visualization, maps, iconography, imagery,
motion and responsive patterns.

The resulting system must be suitable for implementation in a real consumer
application and must be structured so it can be recreated and maintained in
Figma.

Use the wind/flow concept as the underlying visual language. The identity
should communicate movement without relying on literal wind illustrations.

The AERYO O should be explored as a distinctive brand symbol representing
airflow, vortex, radar, route and continuous movement.

Maintain the balance:

```
Premium      ↔ Adventure
Technology   ↔ Nature
Minimalism   ↔ Expression
Data         ↔ Emotion
```

The final result should feel distinctively AERYO, not like a reskinned
existing design system.

**Recommended next step.** The logical workflow is:

```
AERYO Brand Foundation → Design Tokens → Visual Design Language →
Component System → Figma Design System → Key Screens → Full Product UI
```

Use this brief as the brand source of truth, then produce the actual AERYO
Design System specification before generating screens in Stitch or Figma —
that prevents the screen-generation tool from inventing its own colors,
typography, spacing, card language and visual style.
