# AERYO — Google Stitch Prompts

Ready-to-paste prompts for generating AERYO screens in Google Stitch. Every
value below is pulled from `docs/guides/aeryo-branding.md` (brand voice,
imagery, motion) and `DESIGN.md` (the token-accurate, code-verified palette
and type scale) — not invented for this file. Screens follow `PRODUCT.md`'s
**confirmed** V1 navigation (Home, Spots, Sessions, Messages, Profile), not
the still-open Explore/Alerts proposal in `STRATEGY.md` → Information
Architecture — see that file's Open Conflicts section before designing an
Explore or Alerts screen.

**One flagged discrepancy, not silently resolved:** `aeryo-branding.md`'s
"Resolved Palette" addendum lists `danger.500 #D45B52` / `caution.500
#C97F35`; `DESIGN.md`'s frontmatter (the machine-readable token block,
closer to what actually ships) lists `danger #B84740` / `caution #A6672A`.
Close, but not identical — likely an earlier ramp-anchor superseded by the
frontmatter. This file uses **`DESIGN.md`'s frontmatter values** throughout
since that block is the one meant for direct tool consumption. Reconcile in
`semantic-tokens.ts`/`aeryo-branding.md` if the drift turns out to matter.

---

## 0. Style Foundation

Paste this into Stitch first (as the project's style/theme description, or
prepended to every screen prompt below) so every generated screen shares one
visual language instead of drifting screen to screen.

> Design a screen for **AERYO**, a premium wind-and-kitesurfing platform.
> Brand essence: "Intelligent wind, made tangible." The interface is an
> **open-air instrument** — a precision instrument taken outside — not a
> generic weather dashboard, not a tropical surf brand, not a SaaS card
> farm, not an extreme-sports poster.
>
> **Color palette (dark-first):**
> - Base background: `#071216` (near-black atmospheric ink)
> - Surface / panel: `#0D2931`
> - Off-white foreground/text: `#EDF8F6`
> - Primary accent (the ONE brand color — buttons, links, active states):
>   teal `#19AEB5`, with a deep variant `#106B70` for solid button fills and
>   a bright variant `#63E6D5` for energized/active states
> - Wind-intensity data ONLY (never on buttons, badges, or chrome): lime
>   `#D7FF3F` for strong wind
> - Safety states only, not decorative accents: danger/error `#B84740`,
>   caution/extreme-wind `#A6672A`, success `#41B981`
> - Hairline borders: teal at ~16% opacity, decorative only — not the only
>   boundary on anything interactive
> - Do not introduce a second general-purpose accent color. Do not use lime
>   for anything except wind-speed data. Do not use bright neon, tropical
>   turquoise, generic SaaS blue/purple gradients, or rainbow weather
>   palettes.
>
> **Typography:** Display/headline text uses **Sora** (extrabold/bold,
> geometric, aerodynamic) — display 3rem/800, headline 1.875rem/700, title
> 1.25rem/600 (Sora never renders smaller than this). Body, captions, and
> labels use **Manrope** (regular/medium) — body 1rem/400, caption
> 0.875rem/400, label 0.75rem/500 with slightly wide letter-spacing.
> Numeric wind/weather data (e.g. "18 kt", "NW 24°") must be highly legible
> and scannable, using tabular numerals.
>
> **Shape:** aerodynamic, intentional corners — not generic rounded SaaS
> cards, not pill-everything. Buttons and inputs use an 8–10px radius; cards
> use 14–18px; only avatars and small status chips are fully pill-shaped.
>
> **Elevation:** mostly flat — a lighter ink surface plus a subtle hairline
> border at rest. Real shadow only appears on things that float (dialogs,
> menus) or are actively pressed/hovered, never as default card styling.
>
> **Imagery:** cinematic but authentic — real riders, real coastlines, real
> wind, dramatic skies, moments before/after a session. Never cheesy stock
> photography, never staged extreme-sport action shots, never tropical
> postcard clichés. Photography belongs on brand/onboarding moments only —
> product/list screens sit on ink panels, not photo backgrounds.
>
> **Motion cues to describe, not animate statically:** fast/subtle,
> confident easing, no bounce, no gamified transitions — motion should feel
> like air moving around an object, not UI elements bouncing into place.
>
> **Voice on any UI copy:** concise, confident, intelligent, calm — like a
> knowledgeable rider, not a hype reel. E.g. "18 knots. WNW. Building
> through the afternoon." Never "INSANE WIND! 🔥".
>
> **Accessibility:** wind/condition quality is never color alone — always
> pair color with an icon, a label, and a number. Ensure comfortable
> contrast on the dark base for outdoor, bright-daylight readability.
>
> Platform: mobile-first, portrait phone screen, native app shell (safe
> areas for notch/home indicator), bottom tab navigation.

---

## 1. Home

> Using the AERYO style foundation above, design the **Home** screen of a
> mobile kitesurfing app. Bottom navigation: Home (active), Spots, Sessions,
> Messages, Profile — five tabs, minimal icons, the active tab in teal
> `#19AEB5`, inactive tabs in muted off-white.
>
> Content, top to bottom, in strict priority order — opportunity before raw
> data:
> 1. **Header** — small "Good afternoon" / location line, avatar top-right.
> 2. **Best opportunity card** (the hero element) — large, on an ink surface
>    panel (`#0D2931`), rounded 18px corners. Shows a condition-quality
>    summary as color + icon + short label + number together (e.g. a teal
>    wind icon, "Good conditions", "18 kt · WNW"), a **GO / MAYBE / NO-GO**
>    status pill (pill-shaped, only status pills and avatars are allowed to
>    be full pills), the spot name, and a short human sentence like
>    "Building through the afternoon." Never show a bare number with no
>    label.
> 3. **Better alternatives** — a horizontally scrollable row of 2–3 compact
>    spot cards, each with spot name, a small wind indicator, and distance.
> 4. **Live signal / crew activity** — a compact row showing rider presence
>    at the user's home spot, e.g. stacked small avatars ("12 riders here
>    now") with a teal presence dot, and "last report 20 min ago" as a
>    caption-sized line. Community reads as signal, not a social feed —
>    no like/comment counts, no infinite scroll.
> 5. Optional thin weather summary strip near the bottom (temperature,
>    tide) in caption-weight Manrope, clearly secondary to everything above.
>
> No hero photography on this screen — it's a product/data screen and sits
> entirely on ink panels, not a photo background.

---

## 2. Spots (list / discovery)

> Using the AERYO style foundation above, design the **Spots** screen —
> spot discovery and search, not raw monitoring. Bottom nav: Spots active.
>
> Top: a search field (rounded 8–10px, `#0D2931` fill, subtle teal-hairline
> border, off-white placeholder text like "Search spots"). Below it, a
> segmented control or chip row to filter: **Saved / Nearby / Recommended**.
>
> Below that, a vertical list of **spot cards** (rounded 14–18px, ink-panel
> background, subtle hairline border). Each card shows, in order: spot
> photo thumbnail (small, left or top — real coastline/open-water
> photography, not stock), spot name, a compact wind indicator (direction
> arrow + speed number + a teal/lime color cue depending on intensity), a
> one-line condition summary in plain language ("Good conditions from
> 14:00"), and a small rider-count badge ("6 riders planning"). A bookmark
> icon (outline/filled) sits top-right of each card for saving. Cards should
> feel scannable and premium, not dense or cluttered — generous spacing
> between cards, not a cramped table.

---

## 3. Spot Detail

> Using the AERYO style foundation above, design a **Spot Detail** screen
> for a single kitesurf spot. This screen can use a photographic hero: a
> full-width cinematic photo of the spot (coastline, open water, dramatic
> sky) with a gradient scrim fading from the base ink color at the bottom
> into transparency, and the spot name plus a back button overlaid in
> off-white text on that scrim.
>
> Below the photo, on ink-panel background, in this exact priority order:
> 1. **Current conditions** — large wind speed number (tabular numerals),
>    direction compass/arrow icon, and a GO/MAYBE/NO-GO status pill, all
>    together — never the number alone.
> 2. **Opportunity score explanation** — a short "Recommended because:"
>    block listing 2–4 concrete reasons as small tags/chips (e.g.
>    "21–25kt", "Low gust risk", "High-confidence forecast").
> 3. **Spot DNA** — a compact row of small stat chips: best wind direction,
>    skill level, water type, crowd level.
> 4. **Forecast** — a simple horizontal timeline strip (next 12–24h) using
>    flowing line/gradient-density visualization for wind speed, not a
>    generic bar chart.
> 5. **Community signal** — rider avatars ("14 riders here now, 6
>    planning"), and a short list of recent one-line observations (e.g.
>    "Wind stronger than forecast" — timestamped, caption-weight text).
> 6. **Photos** — a small thumbnail grid of real rider/environment photos
>    at the bottom.
>
> A floating primary button "I'm riding here" — solid teal-deep `#106B70`
> fill, off-white text, 8–10px radius, NOT a pill — pinned near the bottom
> of the screen above the safe area.

---

## 4. Sessions

> Using the AERYO style foundation above, design the **Sessions** screen —
> a list of planned/past kitesurf sessions, not a raw calendar. Bottom nav:
> Sessions active.
>
> Top: a prominent "Create session" button (solid teal-deep, 8–10px
> radius). Below it, a vertical list of **session cards** on ink panels:
> each shows spot name, date/time, a small stack of participant avatars
> (`ParticipantStack`), a session-status pill (Planned / Active / Completed
> — using semantic intents, never stock red/green), and a compact wind
> summary line. Tapping a card implies a session detail with a
> participants list and a "Join session" action.
>
> Also design a **Create session** bottom sheet/modal variant: spot picker,
> date/time picker, optional duration, and a visibility toggle — kept short
> and thumb-friendly (large tap targets, minimal typing), consistent with
> one-handed, bright-daylight use at the beach.

---

## 5. Messages (spot chat)

> Using the AERYO style foundation above, design the **Messages** screen —
> a list of spot-based group chats (not 1:1 DMs), plus one open chat
> thread. Bottom nav: Messages active.
>
> **List view:** each row shows a spot avatar/icon, spot name as the chat
> title, last message preview (caption-weight, muted off-white), a
> timestamp, and an unread-count badge (small teal pill) when applicable.
>
> **Open thread view:** a simple chat interface on the ink base — messages
> in compact bubbles (sender name in label-weight teal, message body in
> body-weight off-white, own messages right-aligned on a teal-deep fill,
> others left-aligned on a slightly lighter ink surface). A message input
> bar pinned above the safe area: rounded input field plus a solid teal
> circular send button. Calm and functional — no emoji reactions, stickers,
> or social-feed flourishes; this is spot coordination, not entertainment.

---

## 6. Profile

> Using the AERYO style foundation above, design the **Profile** screen.
> Bottom nav: Profile active.
>
> Top: avatar, display name, and a short bio line, centered or left-aligned
> on an ink panel. Below it, a vertical list of settings-style rows, each a
> full-width tappable row with a label and a chevron:
> - **Rider profile** — weight, skill level, riding disciplines
> - **Equipment** — kite sizes, board type
> - **Preferences** — preferred conditions, travel/driving radius
> - **Home spots** — saved home spot(s)
> - **Subscription** — free/pro plan status
> - **Settings** — app settings, sign out
>
> Keep the rows minimal — a small leading icon, label in body-weight
> off-white, optional trailing value in muted caption text, and the chevron.
> No decorative illustration, no gamified badges/achievements — this is a
> quiet, functional settings surface, consistent with "premium means less."

---

## Notes on already-built screens

**Onboarding** (first-launch carousel) is already implemented in code
(`src/components/` onboarding flow, full-bleed photo + Ken Burns zoom +
gradient scrim, per `DESIGN.md` → "Signature: full-bleed photo screens").
Regenerate it in Stitch only if redesigning it from scratch; otherwise treat
the shipped implementation as the source of truth over any new prompt
output, and diff against it rather than replacing it wholesale.

**Explore** and **Alerts** screens are intentionally not included here —
they belong to the `INFORMATION_ARCHITECTURE.md` navigation proposal that
`STRATEGY.md` flags as still unresolved against `PRODUCT.md`'s confirmed
five-tab nav. Add prompts for them once that conflict is settled, so Stitch
output doesn't get ahead of an actual product decision.
