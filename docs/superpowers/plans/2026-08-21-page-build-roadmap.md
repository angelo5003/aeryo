# Aeryo — Page-Build Roadmap (What / When / Why)

> **Scope of this document:** A living plan, updated as phases complete or get refined. It does not implement anything by itself — work happens only when requested, phase-by-phase.
>
> **Source of truth:** [docs/guides/kitesurf-app.md](../../guides/kitesurf-app.md) ("Part 1 — Full Project Context") is the authoritative product/roadmap doc. This file translates its V1 roadmap into a concrete, dependency-ordered sequence of *what gets built, in what order, and why*, anchored to the actual state of this repo today.

## Decisions locked in for this plan

These were confirmed by the user before writing this plan — treat them as constraints, not suggestions:

1. **DS work is interleaved with pages**, not front-loaded. A component gets built/finished only when the page that needs it comes up. No attempt to complete the full ~55-component inventory upfront.
2. **First real page = the Spot page, static, no auth.** Built against mock/fixture data so the visual design can be validated fast, before any backend or auth work exists.
3. **Supabase is not provisioned yet.** Provisioning (project, schema, RLS) is its own later phase — it does not block the first static page.
4. **No calendar dates.** Phases are an ordered sequence; each phase's Definition of Done gates the start of the next. Nothing here is dated.
5. **Every page in Phase 2 is pre-auth**, in this order: Spot detail → Spots list → Sessions list → Session detail → Landing → public Rider profile. Auth (Phase 5) does not start until all six exist — see Phase 2 below for why this order.

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

## Phase 1 — Close the DS gap for the Spot page only ✅ done

**Goal:** build only the components the static Spot page actually needs — nothing from Forms, Overlays, Auth-adjacent, or later-phase domains (Chat composer, Session creation forms, etc. come later).

**Why now, why these:** guide §31 categorizes components as Foundations / Rider / Spot / Session / Community. The Spot page pulls from three of those categories. Building them now is a natural, scoped increment — not a detour into "finish the whole inventory."

**Built** (branch [`spot-page-phase1-components`](https://github.com/angelo5003/aeryo/tree/spot-page-phase1-components), not yet merged to `main`):
- **Rider:** `RiderPresence` (data-display), `RiderCard` (surfaces), `RiderList` (data-display)
- **Spot:** `SpotRiderCount` (data-display), `SpotHeader` (surfaces) — `SpotMeta`/`SpotActivity` turned out unneeded; `SpotHeader` absorbed that content directly
- **Session (read-only):** `SessionCard` (surfaces) — full session *creation* UI stays out of scope until Phase 1.5 of the product roadmap
- **Community (static only):** `Chat`/`ChatHeader`/`ChatMessages`/`ChatMessage` (data-display) — no composer, no realtime; sending a message needs a real `Input` primitive (not yet built) and Supabase Realtime, both later phases

**Definition of Done:** every component the Spot page's wireframe needs exists in Storybook with at least one story — met; `tsc`/`eslint`/`jest` all clean, every story visually verified against the guide's wireframes.

---

## Phase 2 — Pre-auth pages, in build order

**Constraint driving this phase's order:** every page below must work with zero authentication — no login, no session, no user-specific data. Static/mock fixtures only. Auth itself doesn't start until Phase 5, after all of these.

Order is driven by two things: (1) reuse — build whichever page needs the fewest *new* components next, and (2) navigation dependency — a list page a detail page links from should exist before or alongside that detail page, not after.

### 2a. Spot detail page — `/spots/[spotId]` (already scoped, do this first)

**What:** the guide §26 "Spot" wireframe (image/map, name/region, `SpotHeader`, `SpotRiderCount`, "I'm riding" CTA as an inert/disabled button, `RiderList`, upcoming `SessionCard`s, static `Chat`) rendered from one hardcoded fixture (e.g. IJmuiden).

**Why first:** every component it needs already exists from Phase 1 — zero new component work, fastest path to a real, navigable page. Confirmed as the priority page in an earlier decision.

**Out of scope:** real "I'm riding" mutation, live chat, auth-gating, GraphQL/Supabase — matches Phase 2 constraints below.

### 2b. Spots list page — `/spots`

**What:** a grid of `SpotCard` (already built in full, pre-dates this plan) over a small hardcoded fixture list (the guide's example Dutch spots — IJmuiden, Wijk aan Zee, Zandvoort, Noordwijk, Scheveningen, Muiderberg), each card linking to its 2a detail page.

**Why second:** zero new components needed (`SpotCard` already exists) — this is the cheapest page in the whole plan. It's also the natural link source for 2a: without it, the Spot detail route has no in-app entry point other than typing a URL.

### 2c. Sessions list page — `/sessions`

**What:** a grid/list of `SessionCard` (built in Phase 1) across all spots, from a hardcoded fixture (a handful of upcoming sessions at different spots/times).

**Why third:** reuses `SessionCard` as-is — no new components. Establishes the second top-level list/detail pair before building its detail page, mirroring 2b → 2a's pattern.

### 2d. Session detail page — `/sessions/[sessionId]`

**What:** a single session — title, spot, time, `RiderList` of participants (reusing Phase 1's component), static session `Chat`, an inert "Join" button.

**Why fourth:** structurally a near-duplicate of 2a (same `RiderList`/`Chat` reuse, one new layout to assemble) — sequenced right after its list page (2c), same pattern as 2a following... conceptually pairs with 2c the way 2a pairs with 2b.

### 2e. Landing page — `/`

**What:** the public marketing entry point — brand intro, value proposition ("who's riding, where, how can I join?" per guide §0), and CTAs into Sign up / Log in. Consult [docs/guides/aeryo-branding.md](../../guides/aeryo-branding.md) for tone/visual direction before scoping copy and layout.

**Why fifth, not first:** per the guide's "community first" principle (§2), validating the core spot/session product loop matters more than marketing polish — 2a–2d prove the product works before this page sells it. It's sequenced last among the "core" pages because its Sign up/Log in CTAs are natural hand-offs straight into Phase 5 (Auth) — building it right before Auth keeps that hand-off fresh rather than stale.

**Out of scope:** the CTAs are static links/buttons only — they don't need working auth yet, just a destination route to point at once Phase 5 exists (a placeholder route is fine in the meantime).

### 2f. Public rider profile page — `/riders/[riderId]`

**What:** a read-only profile view — name, avatar, discipline/skill, home spot, upcoming sessions — from one hardcoded fixture rider.

**Why last:** the most auth-adjacent page in this batch. A *read-only* public view can still be static/mock, but editing a profile (guide §5 "Profile" — avatar upload, privacy settings) inherently needs a logged-in user, so building this now only proves the display half; the edit half waits until Phase 6 (Profile, post-auth). Lowest priority because no other pre-auth page links to it yet (no rider is clickable to a profile until this exists), so nothing blocks on it.

**Explicitly out of scope for every page in Phase 2:**
- No real mutations (join/leave, "I'm riding", chat send) — buttons are present but inert/disabled/no-op.
- No live data — no realtime chat, no live rider counts.
- No auth-gating anywhere — every Phase 2 route is publicly reachable with mock data.
- No navigation shell (`AppShell`, `BottomNavigation`) unless a specific page needs it to read correctly in context — build the minimal shell as part of whichever page first needs it, not as a separate phase.
- No GraphQL/Supabase wiring — that's Phase 3/4.

**Definition of Done (whole Phase 2):** all six routes above render end-to-end from mock data, each with a Storybook entry under `Patterns/*Page` (guide §37), and a user can click through Landing → Spots list → Spot detail → Sessions list → Session detail → (rider profile via a rider name, once wired) without hitting a broken link.

---

## Phase 3 — Backend foundation: Supabase provisioning

**What:** create the Supabase project, apply the V1 schema from guide §21 (`profiles`, `spots`, `spot_members`, `spot_messages`, `sessions`, `session_members`, `session_messages`, `session_recaps`), enable RLS per guide §25 rules, configure Supabase Auth.

**Why here, not earlier:** the six static Phase 2 pages prove the UI without needing this; provisioning now means Phase 5 (Auth) has a real backend to authenticate against, and every Phase 2 page can be re-pointed at live data instead of mocks once this lands.

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

**Why after all six Phase 2 pages, not before:** per the user's explicit instruction, every pre-auth page (Phase 2) is built first; Auth comes next because every subsequent page (editable Profile, live Spot presence, real session join/leave, live chat) depends on a logged-in user.

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
