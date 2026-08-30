# Strategy

This document consolidates six source documents into one: `MVP_SCOPE.md`, `INFORMATION_ARCHITECTURE.md`, `USER_PERSONAS.md`, `AERYO_PRODUCT_PRINCIPLES.md`, `AERYO_DESIGN_SYSTEM_V2.md`, and `AERYO_STARTUP_BLUEPRINT.MD`. Those five (the sixth, the design system doc, is handled separately below) overlapped heavily — the Blueprint in particular restated condensed versions of the Personas, Principles, MVP Scope, and IA docs almost verbatim. Rather than keep six near-duplicate files, this is the single strategy reference. Originals are preserved at `docs/strategy/source/` for provenance.

`PRODUCT.md` and `DESIGN.md` remain the authoritative, code-verified references for what the product currently is and what it looks like. This document is the longer-horizon mission, roadmap, personas, and principles layer underneath them.

## ⚠️ Open Conflicts — Needs a Decision

The source documents disagree with already-confirmed statements in `PRODUCT.md` on two points. Neither `PRODUCT.md` nor `DESIGN.md` was changed to resolve these — they need an explicit call, not a silent merge:

1. **Community's role.** `PRODUCT.md` (confirmed): *"conditions intelligence and rider community are the same product... not a main feature plus a later add-on."* These source docs say the opposite — "Intelligence First, Community Second" (Blueprint), "Community Follows Utility: do not build community first" (Principle 12), and MVP Scope excludes Chat and Social Feed entirely from MVP. If community really is meant to ship later and secondary, `PRODUCT.md`'s Capabilities/Positioning sections need updating to match — that hasn't been done here.

   There is in fact a **third** position on record, from `docs/guides/kitesurf-app.md` — the older, more detailed guide `PRODUCT.md` itself cites as the authoritative source for phasing (§0, §2, §45): *"Community first... weather must not become the product."* That's the exact opposite of this strategy layer's "Intelligence First." `PRODUCT.md` already picked a middle position ("equal, first-class together") and explicitly overrode the guide's priority claim while keeping its V1 phasing — so the governing stance today is "equal," not either extreme. Flagging this only so nobody mistakes the Blueprint's "Intelligence First" framing, or the guide's "Community First" framing, for the current decision — neither is; `PRODUCT.md`'s "equal" is.

   One more consequence worth naming: several MVP-Scope/Blueprint concepts — the GO/MAYBE/NO-GO opportunity score, "Worth The Drive," the personalization moat, the Explore paradigm — do not exist anywhere in `kitesurf-app.md`. They're net-new product surface introduced by this strategy layer, not a restatement of the older guide. Worth confirming they're wanted, not just assuming they were always part of the plan.

2. **V1 navigation.** `PRODUCT.md` (confirmed): Home, Spots, Sessions, Messages, Profile. `INFORMATION_ARCHITECTURE.md` proposes: Home, Explore, Spots, Alerts, Profile — no Sessions, no Messages. Section [Information Architecture](#information-architecture) below presents the new proposal labeled as such, not as settled fact.

   `docs/guides/kitesurf-app.md` §6 independently lands on the same five tabs `PRODUCT.md` confirms — Home, Spots, Sessions, Messages, Profile — with no Explore or Alerts tab. That's two sources agreeing against one. Treat `INFORMATION_ARCHITECTURE.md`'s Explore/Alerts proposal as the outlier pending an explicit decision, not a 50/50 call.

Everything below that isn't in tension with `PRODUCT.md`/`DESIGN.md` is presented as agreed.

## Mission & Vision

**Mission:** Help kitesurfers discover better sessions, better locations, and better opportunities. AERYO exists to reduce uncertainty and help riders decide with confidence where and when to ride.

**Vision:** AERYO becomes the operating system for wind-driven adventures. Today, riders check the weather. Tomorrow, they ask "where should I go?" — and AERYO answers.

**Brand promise — Follow the Unseen:** AERYO surfaces unseen opportunities, unseen wind windows, unseen locations, unseen adventures, and unseen progression.

**Category:** AERYO is not a weather app, a social network, a tracking app, or a spot directory. It is a discovery-intelligence platform, a decision-support platform, and an adventure-discovery platform. (See `PRODUCT.md` → Positioning for the token-level claim against weather apps and social apps specifically.)

## Core User Problem & Solution

Today's rider workflow: Windy → Windfinder → spot website → ask friends → WhatsApp → Instagram → guess. Result: too much information, not enough confidence. (Compare `PRODUCT.md`'s "replacement behaviors" — WhatsApp, Facebook groups, Telegram, Signal, word of mouth — same shape, slightly different app list.)

**AERYO's solution:** transform forecast models, wind, gusts, tide, spot data, user preferences, session history, and community reports into a single clear output — **GO / MAYBE / NO-GO** — with an explanation the rider can check against their own judgment.

## Product Principles

1. **Opportunity over information.** Riders don't want weather, they want opportunities. Prefer "Excellent conditions today" over raw forecast data without context.
2. **Intelligence over utility.** AERYO interprets data rather than just displaying it. The product answers "what should I do?", not "what does this data mean?"
3. **Confidence over complexity.** Every feature should help riders decide with less uncertainty. Don't expose complexity that doesn't serve the decision.
4. **Discovery over monitoring.** Most weather apps monitor; AERYO discovers — new opportunities, better locations, better timing, better conditions.
5. **Personalization creates value.** The same forecast means something different to different riders. AERYO should account for weight, skill level, equipment, preferences, and travel radius, and get more personal over time.
6. **Community is signal.** Community exists to strengthen intelligence — it answers "what's happening right now?", not "how do we maximize engagement?" *(See the open conflict above on sequencing.)*
7. **Recommendations must be explainable.** Every recommendation states its reasons, e.g. "Recommended because: 21–25kt, low gust risk, matches your 9m kite, high-confidence forecast."
8. **Trust beats growth.** A wrong recommendation destroys trust that's hard to earn back. Never trade reliability for engagement.
9. **Focus beats features.** Build features because they improve decisions, not because competitors have them. Resist feature accumulation.
10. **The homepage is sacred.** It answers one question — "what's my best opportunity?" — everything else is secondary.
11. **Build for frequent use.** The ideal rider opens AERYO daily. Favor features with repeat value over one-time novelty.
12. **Community follows utility.** Build value first; community grows around it, not before it. *(See the open conflict above.)*
13. **Explain before automating.** Recommendations shouldn't feel magical — riders should understand why, and trust grows through that transparency.
14. **Premium means less.** Premium removes noise and simplifies. Default to removing, not adding.
15. **The long-term vision.** Today: find my session. Tomorrow: find my adventure. Eventually: become the operating system for wind-driven adventures.

**Decision framework** — before building a feature, ask: Does this help riders discover better opportunities? Does it improve confidence? Does it reduce uncertainty? Does it fit the Opportunity → Intelligence → Signal hierarchy? If any answer is no, reconsider.

**North star:** Help riders find their next great session. Everything else is secondary. (This exact statement recurs in every source document — it's the one line all of them agree on.)

## User Personas

AERYO is not built for everyone; product decisions prioritize the Primary Persona.

### Primary — The Progression Rider

Age 25–45, beginner+ through advanced, owns equipment, kites regularly, works full-time with limited free time, actively improving.

- **Goals:** maximize water time, avoid wasted trips, find the best local sessions, improve riding, discover better spots.
- **Frustrations:** forecasts are hard to interpret, too many apps required, conditions change unexpectedly, doesn't know which spot is best, wastes time cross-checking sources.
- **Current workflow:** Windy → Windfinder → WhatsApp → friends → Instagram → guess.
- **Desired outcome:** open AERYO, know where to go, know why, leave.
- **Success metric:** "I got more quality sessions this month."

`PRODUCT.md`'s stated V1 primary user (recreational/intermediate riders at Dutch North Sea spots) is the V1 geographic slice of this persona, not a different one.

### Secondary — The Explorer

Travels for kitesurfing, adventure-oriented, values experience, wants to discover new places.

- **Goals:** discover new destinations, plan better trips, find hidden opportunities, learn about locations.
- **Frustrations:** information is fragmented, destinations are hard to compare, local knowledge is hard to access.
- **Desired outcome:** find destinations with confidence.

### Tertiary — The Weekend Warrior

Limited availability, family obligations, can only ride occasionally.

- **Goals:** maximize limited free time, never miss great conditions.
- **Desired outcome:** know exactly when conditions are worth prioritizing.

### Who AERYO is not optimizing for

Social-media users seeking entertainment, professional athletes (too specialized), weather enthusiasts (want data, not decisions), and marketplace users (buying/selling gear).

### Core user insight

The user doesn't want weather. The user wants confidence. The question they're really asking is "is it worth going?" — everything should support answering that.

## Information Architecture

**Proposed** primary navigation (`INFORMATION_ARCHITECTURE.md`; conflicts with `PRODUCT.md`'s confirmed nav — see [Open Conflicts](#️-open-conflicts--needs-a-decision)): Home, Explore, Spots, Alerts, Profile.

- **Navigation principle:** stay simple, avoid excessive tabs and deep nesting; critical information should be reachable within two taps.
- **Home** → Next Session, Better Options, Live Signal, Crew Activity, Weather Summary. Purpose: answer "what is my best opportunity?"
- **Explore** → Nearby Opportunities, Worth The Drive, Hidden Opportunities, Trending Conditions, Destination Discovery. Purpose: discovery, not monitoring.
- **Spots** → Saved, Nearby, Recommended, Search. Spot detail purpose: understand a location, prioritizing Current Conditions → Opportunity Score → Spot DNA → Forecast → Community Signal → Photos.
- **Alerts** → Active Alerts, Alert Settings, Wind Alerts, Opportunity Alerts, Forecast Changes. Purpose: bring users back.
- **Profile** → Rider Profile, Equipment, Preferences, Home Spots, Subscription. Rider data captured: weight, skill level, kites, board, driving radius, preferred conditions, home spots.
- **Future (post-MVP):** a Travel section — Destinations, Historical Conditions, Trip Planner, Travel Recommendations.

**Architecture rule:** every major screen must answer "what opportunity exists?" before "what information exists?"

**Global information hierarchy** (agreed across the Blueprint, Principles, and Design System sources — this ordering should never change): Opportunity → Intelligence → Spot Knowledge → Community Signal → Social Interaction.

## MVP Scope & Roadmap

**MVP goal:** help users find their next great session. Nothing more.

**Success criteria** — users can save spots, view forecasts, receive recommendations, understand session quality, and make better decisions.

**Included in MVP:**
- Spot discovery — nearby spots, search, favorites.
- Forecasts — wind, direction, gusts, confidence.
- Rider profile — weight, skill level, equipment, preferences.
- Opportunity score — GO / MAYBE / NO-GO.
- Personalized recommendations — spot, session, kite.
- Basic alerts — wind threshold, forecast improvement, opportunity.

**Explicitly not included in MVP:** social feed, chat, marketplace, gear trading, competitions, leaderboards, achievements/gamification, travel or accommodation booking, advanced AI features, user-generated content, live tracking, session recording, video features, schools marketplace.

**Scope protection rule:** for any proposed feature, ask "does this directly help users find a better session?" If no, it goes to the backlog — it does not go into MVP.

**Roadmap** (the source docs used two overlapping phase-numbering schemes — MVP Scope's "Phase 2/3/4 candidates" and the Blueprint's "V1–V5." They describe the same sequence; V-numbers below, with the Phase-N alias noted):

| Stage | Focus | Features |
|---|---|---|
| MVP | Find My Best Session | Spot discovery, forecasts, saved spots, GO score, personalized recommendations |
| V1 | Core loop, hardened | Forecast (wind/gusts/direction/confidence), Spots (nearby/favorite/recommended), Rider Profile (weight/skill/kites/board), GO Score with explanation |
| V2 *(= "Phase 2 candidates")* | Opportunity Discovery | Worth The Drive, Nearby Opportunities, Hidden Opportunities, Better Alternatives, Session Ranking, Smart Alerts (e.g. "your spot is now 20kt", "better conditions found nearby") |
| V3 *(= "Phase 2/3 candidates")* | Spot Intelligence & Forecast Confidence | Spot DNA, historical performance, seasonality, reliability; model agreement, confidence score, predictability |
| V4 *(= "Phase 3 candidates")* | Community Signal | Rider reports, live observations, active riders, local observations — utility-focused, not a feed |
| V5 *(= "Phase 4 candidates")* | Travel Intelligence | Destination discovery, trip planning, historical analysis — moving beyond local sessions |

## Product Moat

Not forecasts, not UI polish, not spot count. The moat is the compounding personal layer: user profile, spot intelligence, session history, community signal, and personalized recommendations — over time AERYO should know a rider's preferred conditions, locations, travel distance, and riding style. That accumulated personalization is what's defensible.

## Monetization

- **Free:** forecasts, saved spots, basic recommendations.
- **Pro** (target €4.99–€9.99/month): advanced alerts, forecast confidence, trip planning, historical analysis, advanced recommendations.

## Growth Strategy

Content-first: forecasts, opportunities, destinations, and spot intelligence framed as shareable hooks — "Best Dutch Session This Weekend," "Top Wind Window This Week," "Worth The Drive Forecast." Content should create curiosity, not hype.

## Company Evolution (distinct from the V1–V5 product roadmap above)

Forecast Platform → Discovery Platform → Intelligence Platform → Global Kitesurf Intelligence Network → Operating System For Wind-Driven Adventures.

## Design & Brand Feel

`DESIGN.md` remains the token-accurate source of truth for actual colors, type, spacing, and components — nothing here introduces a new color, font, or value. This section captures brand-feel inspiration from `AERYO_DESIGN_SYSTEM_V2.md` that isn't yet (and may not need to be) encoded as a token, reconciled against what's already decided rather than restated verbatim:

- **Craft bar, not a mood board:** the source doc named Apple, Patagonia, Red Bull, and premium travel products as the quality bar to hit — read as "that level of craft and restraint," not literal visual borrowing. It also called for "avoid excessive accent colors" and "avoid neon" — that's already how the real system works: **one** teal accent, with Wind Lime deliberately scoped to the wind-intensity scale only (see `DESIGN.md` → The Wind Lime Rule). No conflict, just confirms the existing restraint.
- **Emotional register on open:** curious, prepared, inspired, confident, optimistic — consistent with `PRODUCT.md`'s emotional sequence (Curiosity → Understanding → Confidence → Freedom → Progression); read as the same arc.
- **Cards translate meaning, not raw numbers:** the source doc's example ("Excellent conditions for your 9m kite" over "23kt SW") isn't a call to hide numbers — it pairs with Principle 7 (recommendations must be explainable, numbers included). The existing `AeryoCardMeta` numeral display and this guidance work together: headline meaning, with the number as supporting evidence, not the other way around.
- **Maps are secondary:** riders should understand *why* a spot matters before *where* it is. No existing map component to reconcile against yet.
- **Icons support, don't drive:** simple, functional, consistent — matches existing restraint in `DESIGN.md`.
- **Motion:** subtle, intentional, no bouncing or gamified transitions — consistent with `DESIGN.md`'s existing motion vocabulary (`easeOut`, no bounce).

## Provenance

Consolidated 2026-08-29 from, in full, at `docs/strategy/source/`:

- `MVP_SCOPE.md`
- `INFORMATION_ARCHITECTURE.md`
- `USER_PERSONAS.md`
- `AERYO_PRODUCT_PRINCIPLES.md`
- `AERYO_STARTUP_BLUEPRINT.MD`
- `AERYO_DESIGN_SYSTEM_V2.md` (design-relevant content only; superseded by `DESIGN.md` for anything token-level)

Cross-checked 2026-08-30 against `docs/guides/` — see the two callouts above for what that comparison surfaced. `kitesurf-app.md` was not folded in here: it's ~10x the length of these six combined, still the cited authority for phasing/DB model/component inventory, and merging it would lose fidelity rather than remove duplication (unlike the six source docs, which mostly repeated each other). It stays a separate, standalone reference. `definition-of-done.md` is an engineering checklist, orthogonal to strategy — not part of this comparison. `aeryo-branding.md` is the production-ready brand/design brief and is the reference used for `docs/guides/google-stitch-prompts.md`; one minor numeric drift was found between the two (see that file's header) and flagged rather than silently resolved.
