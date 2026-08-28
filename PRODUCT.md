# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recreational and intermediate kitesurfers at Dutch / North Sea spots who open the app before they drive, to decide whether to go and who else will be there.

Other rider types (experienced, traveling, schools, brands) exist in the product guides and are not the V1 primary audience.

## Product Purpose

AERYO is a wind-and-kitesurfing product in which **conditions intelligence and rider community are the same product**, not a main feature plus a later add-on.

It exists so a rider can understand the wind and the spot, see who is riding or planning to, and go with confidence. Success is a rider who used AERYO to decide where and when to go, and to show up with (or as) the community — not a rider who only checked a forecast.

## Positioning

Neighboring weather apps cannot truthfully claim a persistent rider community around real spots and sessions. Neighboring social apps cannot truthfully claim wind made clear and actionable for kiting. AERYO’s claim is both: **intelligent wind, made tangible, among people who actually ride.**

It is not a generic weather app, jump tracker, marketplace, surf shop, or extreme-sports brand.

## Operating Context

Used on a phone, often outdoors and in bright light, in the hour before driving to a North Sea spot (IJmuiden, Wijk aan Zee, Zandvoort, Noordwijk, Scheveningen, Muiderberg are the V1 example spots).

Today’s replacement behaviors are WhatsApp, Facebook groups, Telegram, Signal, and word of mouth.

The shipped app is a Next.js UI inside a Capacitor native shell (iOS and Android). Capacitor always boots at `/`. Portrait is the only supported orientation. Presence is a social status (“I’m riding here”), not live GPS tracking.

## Capabilities and Constraints

Confirmed:

- Community and conditions are first-class together.
- V1 must not expose exact user GPS positions.
- First real pages are pre-auth and static/mock; Supabase is not provisioned yet.
- Intended V1 navigation: Home, Spots, Sessions, Messages, Profile.
- Native wrapper, one web design language (Chakra UI v3 + AERYO tokens), not separate iOS/Android UI kits.
- Current boot: native splash → JS intro → onboarding carousel (first launch) → app.

Undecided / not claimed here:

- WCAG target level.
- Pricing, licensing, launch date, and live user metrics.
- Whether weather-alert or marketplace features ever ship; they are out of V1.

Authoritative product/roadmap detail remains `docs/guides/kitesurf-app.md` (Part 1). Where that guide says weather must not become the product, this record overrides the *priority*: conditions and community stay equal; the guide still wins on V1 phasing and what not to build first (no forecast-only V1, no marketplace, no jump tracking).

## Brand Commitments

Name: **AERYO**.

Essence: *Intelligent wind, made tangible.*

Voice: concise, confident, intelligent, clear, human, energetic, calm. Sounds like a knowledgeable rider, not a hype reel or a meteorological bulletin.

Personality: clear, wind-driven, confident, intelligent, energetic, human, premium, free, adventurous.

Avoid: aggressive, extreme, overly technical, corporate, childish, generic, overly playful, excessively futuristic, cold tech, marketing hype, surf-shop or luxury-fashion identity.

Emotional sequence the product should earn: Curiosity → Understanding → Confidence → Freedom → Progression.

Brand brief: `docs/guides/aeryo-branding.md`.

## Evidence on Hand

- Wordmark/mark: `public/logo-mark.svg`
- Intro photo: `public/splash.png`
- Onboarding photos: `public/assets/onboarding/*.webp`
- Implemented UI: intro, onboarding carousel, design-system components under `src/components/` and `src/design-system/`
- Product and brand source docs under `docs/guides/`

Do not invent testimonials, customer names, usage stats, press, or “trusted by” claims. There is no live user research dataset in this repo.

## Product Principles

1. **Wind and people are one product.** A screen that only forecasts, or only lists riders, is incomplete.
2. **Serve the pre-drive decision.** The primary job is: should I go, where, and who else is going.
3. **Clarity over dashboard.** Complex wind becomes a short, human read — not a meteorological workstation.
4. **Presence, not tracking.** “I’m riding” is a status others can trust; exact location is not a V1 feature.
5. **Premium without elitist.** Refined enough to trust; open enough that a recreational kiter at IJmuiden belongs here.

## Accessibility & Inclusion

Wind and condition quality must never rely on color alone (color + icon + label + number). Touch targets and contrast must work in bright outdoor light. Preserve Chakra’s accessibility behavior in wrappers. No WCAG conformance level has been chosen yet.
