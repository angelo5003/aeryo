# Aeryo — Page-Build Roadmap (What / When / Why)

> **Scope of this document:** This is a *planning-only* artifact. It does not implement anything. Per the user's explicit instruction, no page or component work happens until requested phase-by-phase in a future session.
>
> **Source of truth:** [docs/guides/kitesurf-app.md](../../guides/kitesurf-app.md) ("Part 1 — Full Project Context") is the authoritative product/roadmap doc. This file translates its V1 roadmap into a concrete, dependency-ordered sequence of *what gets built, in what order, and why*, anchored to the actual state of this repo today.

## Decisions locked in for this plan

These were confirmed by the user before writing this plan — treat them as constraints, not suggestions:

1. **DS work is interleaved with pages**, not front-loaded. A component gets built/finished only when the page that needs it comes up. No attempt to complete the full ~55-component inventory upfront.
2. **First real page = the Spot page, static, no auth.** Built against mock/fixture data so the visual design can be validated fast, before any backend or auth work exists.
3. **Supabase is not provisioned yet.** Provisioning (project, schema, RLS) is its own later phase — it does not block the first static page.
4. **No calendar dates.** Phases are an ordered sequence; each phase's Definition of Done gates the start of the next. Nothing here is dated.

---

## Phase 0 — Current State (audit, already true today)

**What exists:**
- Next.js 16 / React 19 / TypeScript / Chakra UI v3 app, App Router, no real routes yet — `src/app` still has only the default Next.js scaffold (`page.tsx`, `layout.tsx`).
- Design-system foundations layer (tokens, Chakra theme wiring) is built — see [docs/superpowers/plans/2026-08-20-design-system-foundations.md](2026-08-20-design-system-foundations.md).
- Partial DS component inventory already implemented under `src/components/`:
  - **Primitives:** Box, Center, Container, Flex, Grid, Separator, Stack
  - **Actions:** Button, IconButton
  - **Typography:** Heading, Text, Link, Badge, Tag
  - **Data display:** Avatar, StatusPill, Tabs, Drawer, Skeleton, EmptyState
  - **Surfaces:** Card, SpotCard, WeatherCard, ForecastCard
- No pages, no routing, no Supabase project, no GraphQL layer, no auth.

**Why this matters:** the Spot page's wireframe (spot image, name/region, live rider counts, "I'm riding" action, upcoming sessions, spot chat — see guide §26) is *partially* coverable by what already exists (`SpotCard`, `Card`, `Badge`, `StatusPill`, `Avatar`, `Tabs`) but is missing the spot-specific and rider/session-specific domain components.

---

## Phase 1 — Close the DS gap for the Spot page only

**Goal:** build only the components the static Spot page actually needs — nothing from Forms, Overlays, Auth-adjacent, or later-phase domains (Chat composer, Session creation forms, etc. come later).

**Why now, why these:** guide §31 categorizes components as Foundations / Rider / Spot / Session / Community. The Spot page pulls from three of those categories. Building them now is a natural, scoped increment — not a detour into "finish the whole inventory."

Candidates to check for existing coverage vs. build (verify against `src/components/surfaces` and `data-display` before creating anything new):
- **Spot:** `SpotHeader`, `SpotMeta`, `SpotStats` / `SpotRiderCount`, `SpotActivity` — `SpotCard` exists but the page needs a full-detail header/meta layout, not just the summary card.
- **Rider:** `RiderAvatar`, `RiderCard`, `RiderPresence`, `RiderList` — for the "14 riding / 6 planning" rider list section.
- **Session (read-only for this page):** a minimal `SessionCard` (or reuse a simplified variant) for the "Upcoming sessions" list — full session *creation* UI is out of scope until Phase 1.5 of the product roadmap.
- **Community (static only):** a non-functional `Chat` shell (`Chat.Root`, `Chat.Header`, `Chat.Messages`) rendering mock messages — no composer wiring, no realtime, since there's no backend yet.

**Definition of Done:** every component the Spot page's wireframe needs exists in Storybook with at least one story, built as a styled/composed Chakra component per guide §29 (preserve `as`, `asChild`, ref forwarding, a11y — no restrictive custom APIs).

---

## Phase 2 — Build the Spot page (static, mock data, no auth)

**What:** a single route (e.g. `src/app/(app)/spots/[spotId]/page.tsx` per the guide's recommended project structure, §22) rendering the Spot wireframe from guide §26 using a hardcoded fixture (one of the example Dutch spots — IJmuiden, Wijk aan Zee, etc.) instead of live data.

**Why this page first (not Auth):** validates the core visual/product identity — "who's riding, what's the spot like" — fastest, with zero backend dependency. It's also the highest-reuse page for the DS work already in place (`SpotCard`, `WeatherCard`, `ForecastCard` already exist and were presumably built with this page in mind).

**Explicitly out of scope for this phase:**
- No real "I'm riding" mutation — button can be present but inert or `disabled`/no-op.
- No live chat — static rendered messages only.
- No auth-gating — the route is publicly reachable with mock data.
- No navigation shell (`AppShell`, `BottomNavigation`) unless the page needs it to read correctly in context — if so, build the minimal nav shell as part of this phase, not a separate one.

**Definition of Done:** the Spot page renders end-to-end from mock data, matches the wireframe's structure (image/map, name/region, presence counts, "I'm riding" CTA, upcoming sessions list, spot chat), and has a Storybook entry under `Patterns/SpotPage` (guide §37).

---

## Phase 3 — Backend foundation: Supabase provisioning

**What:** create the Supabase project, apply the V1 schema from guide §21 (`profiles`, `spots`, `spot_members`, `spot_messages`, `sessions`, `session_members`, `session_messages`, `session_recaps`), enable RLS per guide §25 rules, configure Supabase Auth.

**Why here, not earlier:** the static Spot page (Phase 2) proves the UI without needing this; provisioning now means the *next* page (Auth) has a real backend to authenticate against, and the Spot page from Phase 2 can be re-pointed at live data instead of mocks once this lands.

**Definition of Done:** Supabase project exists, schema + RLS applied, `get_project_url` / publishable key available for client wiring, no application code changed yet.

---

## Phase 4 — Data layer decision point

Before wiring any page to Supabase, decide (this was left open in clarifying questions and should be confirmed before Phase 4 starts):
- **Option A (lower upfront cost):** call `supabase-js` directly from Server Components / route handlers for V1.
- **Option B (matches guide §19–20 architecture):** stand up the GraphQL "Application API" layer now, put all data access behind it from day one.

This plan does not pre-decide this — flag it explicitly in the next session before starting Phase 4.

---

## Phase 5 — Auth pages

**What:** sign up, login, logout, password reset, authenticated route protection (guide §5 "Phase 1 / Authentication", V1 Backlog Epic 2).

**Why after the Spot page, not before:** per the user's explicit choice, the static Spot page comes first to validate design fast; Auth is the next page because every subsequent page (Profile, live Spot presence, Sessions, Chat) depends on a logged-in user.

**Definition of Done:** matches guide §41 "V1 Definition of Done" up through "Register → Create profile" — a new user can sign up, log in, and reach a protected route.

---

## Phase 6+ — Follow the guide's existing order

From here, this plan defers to the guide's own recommended Claude workflow (§43): Profile → re-wire the static Spot page to live data + rider presence → Spot chat (make Phase 1's static `Chat` shell functional via Supabase Realtime) → V1 integration → testing → beta validation → Sessions (Phase 1.5).

No need to re-derive this section — guide §5–9, §40–41 already specify it in full. Re-consult [kitesurf-app.md](../../guides/kitesurf-app.md) at the start of each of these phases rather than duplicating it here, so this roadmap doesn't drift out of sync with the source of truth.

---

## Explicitly deferred (do not build early — guide §4, §12–17)

Marketplace, Gear Passport, GPS/jump tracking, AI coaching, payments, SOS/safety features, native mobile apps, complex weather system. These map to Phase 3.5+ of the guide's long-term roadmap (§17) and are out of scope for every phase listed above.

---

## Open question to resolve before Phase 4

**Data layer:** direct Supabase client vs. GraphQL application-API layer from day one (see Phase 4). Ask the user explicitly when that phase starts if it hasn't been decided by then.
