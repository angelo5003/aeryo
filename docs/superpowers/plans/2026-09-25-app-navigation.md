# App Navigation (Top Bar + Floating Bottom Tab Bar) — Stappenplan

> Mentor-plan (`/aeryo-mentor`). Jij bouwt, stap voor stap. Code unlocken kan
> per stap met `WRITE CODE FOR STEP X`.

**Doel:** een top-bar (wordmark + bel, of terug-knop + titel) en een zwevende,
frosted bottom-tab-bar (5 tabs, icoon + label) die verdwijnt bij omlaag
scrollen en terugkomt bij omhoog scrollen. Settings (uitloggen, account
verwijderen) zit onder Profile → tandwiel → `/settings`.

**Beslissingen (goedgekeurd 2026-09-25):**

- Tabs: Home, Explore, Sessions, Community, Profile — icoon + label.
- Geen avatar in de top-bar (Profile-tab dekt dat al).
- Top-bar hoofdtabs: links leeg · midden AERYO-wordmark · rechts bel
  (op Profile: tandwiel naar `/settings`).
- Detailschermen: terug-knop + titel, geen bottom-bar.
- Frosted achtergrond via nieuw semantic token `bg.chrome`, light + dark.
- Bottom-bar verbergt bij omlaag scrollen, toont bij omhoog scrollen.

**Stack (uit `package.json`):** `next` 16.3.1 (static export) · `@chakra-ui/react`
^3.36.1 · `framer-motion` ^13.1.1 · `react-icons` ^5.7.0. Geen nieuwe packages.

## Eindresultaat: mapstructuur

```
src/app/
├─ page.tsx                   boot-poort; ingelogd → router.replace("/home")
├─ (auth)/                    bestaat al
├─ (tabs)/                    NIEUW — top-bar + bottom-bar
│  ├─ layout.tsx
│  ├─ home/page.tsx
│  ├─ explore/page.tsx
│  ├─ sessions/page.tsx
│  ├─ community/page.tsx
│  └─ profile/page.tsx
├─ (stack)/                   NIEUW — terug-knop, geen bottom-bar
│  ├─ layout.tsx
│  └─ settings/page.tsx
├─ _components/               NIEUW — app-shell
│  ├─ AppTopBar/
│  │  ├─ AppTopBar.tsx
│  │  ├─ AppTopBar.types.ts
│  │  └─ AppTopBar.test.tsx
│  └─ BottomTabBar/
│     ├─ tabs.ts
│     ├─ BottomTabBar.tsx
│     └─ BottomTabBar.test.tsx
└─ _hooks/
   └─ useHideOnScroll/        NIEUW — naast useSignOutAccount/
      ├─ useHideOnScroll.ts
      └─ useHideOnScroll.test.ts
```

## Dataflow

```
Capacitor boot → app/page.tsx ──(geen sessie)──► /login
                     │ sessie
                     ▼ router.replace("/home")
(tabs)/layout.tsx
  AppTopBar variant="root"
  <main ref={scrollRef} overflow="auto">  ← enige element dat scrollt
     {children}                              (body is position: fixed)
  useHideOnScroll(scrollRef) ──► hidden: boolean
  BottomTabBar hidden={hidden}
     usePathname() ──► welke tab actief (aria-current="page")
                     │ tandwiel op /profile
                     ▼
(stack)/layout.tsx
  AppTopBar variant="back" → router.back() of fallbackHref
  settings/page.tsx → useSignOutAccount() / useDeleteAccount()  (bestaan al)
```

---

## Stap 1 — Semantic token `bg.chrome`

**Bestand:** `src/design-system/theme/semantic-tokens.ts`, in `colors.bg`,
direct onder `panel`.

**Wat:** één token dat de frosted achtergrond van beide bars levert. Een
semantic token is een kleur met een naam die zelf weet wat hij in light en
dark mode is. Componenten vragen om `bg.chrome` en hoeven de mode niet te
kennen.

**Scaffolding:**

```ts
// Frosted app chrome (top bar, bottom tab bar). Mostly opaque on purpose:
// label/icon contrast must hold even if backdrop blur is unsupported or a
// bright photo scrolls underneath.
chrome: {
  value: { _light: "{colors.paper.50/??}", _dark: "{colors.ink.950/??}" },
},
```

- De `/NN`-alpha-syntax staat al in dit bestand (shadows, rond regel 521).
- Kies de alpha tussen 85 en 90.

**Contrast-check (verplicht, niet op het oog):**

1. Worst case light: `bg.chrome` light over een witte achtergrond. Worst case
   dark: `bg.chrome` dark over een felle foto; ga uit van wit eronder.
2. Meng de kleuren: `resultaat = alpha × chrome + (1 − alpha) × onderlaag`,
   per RGB-kanaal.
3. Check `fg.muted` (inactief label) tegen die mengkleur: minimaal 4.5:1.
4. Check `accent.solid` (actief icoon en label) tegen die mengkleur: minimaal
   3:1 voor het icoon, 4.5:1 voor het label.
5. Zet de uitkomst als comment bij het token, zoals de andere tokens doen.

**Verify:** `npm run typegen` → `npm run typecheck` schoon. Contrastgetallen
staan in de comment.

---

## Stap 2 — Route groups + lege pagina's

**Bestanden:** nieuw `src/app/(tabs)/` en `src/app/(stack)/`, naast `(auth)/`.

**Wat:** een route group (`(naam)`) deelt één `layout.tsx` over zijn pagina's,
zonder dat de naam in de URL komt. `(tabs)/home/page.tsx` wordt `/home`.
Bron: `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
(regel 383).

**Doe:**

1. Maak 5 pagina's in `(tabs)/` en `settings/page.tsx` in `(stack)/`. Elke pagina
   toont voorlopig alleen een `Heading` met de naam.
   - Gebruik `@/components/typography/Heading`.
   - Laat genoeg dummy-content op `home` staan om te kunnen scrollen; die heb je
     nodig bij stap 7.
2. Maak voorlopig een simpele `layout.tsx` in beide groups die alleen
   `{children}` teruggeeft. Stap 7 vult ze.

**Let op:** pagina's hebben geen `"use client"` nodig zolang ze geen hooks
gebruiken.

**Verify:** `npm run build`. Daarna bestaan `out/home.html` (of
`out/home/index.html`) en `out/settings.html`. `npm run typecheck` schoon.

---

## Stap 3 — Tab-lijst

**Bestand:** nieuw `src/app/_components/BottomTabBar/tabs.ts`.

**Wat:** één lijst als bron voor alle tabs. De bar en de tests lezen hieruit.
Voeg je later een tab toe, dan verander je alleen dit bestand.

**Scaffolding:**

```ts
import type { IconType } from "react-icons";
import { LuCompass, LuGauge, LuHouse, LuUser, LuUsers } from "react-icons/lu";

export type TabId = "home" | "explore" | "sessions" | "community" | "profile";

export interface TabItem {
  id: TabId; // React key — per .cursor/rules/identity-by-id.mdc
  href: `/${TabId}`;
  label: string;
  icon: IconType;
}

export const TABS: readonly TabItem[] = [
  // jij vult: 5 items
];
```

Deze icoonnamen zijn gecontroleerd in `node_modules/react-icons/lu/index.d.ts`:
`LuHouse`, `LuCompass`, `LuGauge`, `LuUsers`, `LuUser`, `LuBell`,
`LuSettings`, `LuChevronLeft`.

**Verify:** `npm run typecheck` schoon.

---

## Stap 4 — Hook `useHideOnScroll`

**Bestand:** nieuw `src/app/_hooks/useHideOnScroll/useHideOnScroll.ts`
(+ `.test.ts`), naast `useSignOutAccount/`.

**Wat:** de hook kijkt naar één scrollend element en geeft `true` terug als de
bar weg moet.

**Waarom op een element en niet op `window`:** `globals.css` zet
`body { position: fixed; inset: 0 }`. Het venster scrollt dus nooit; alleen
`<main>` scrollt.

**Waarom `framer-motion`:** `useScroll` geeft een motion value. Die verandert
zonder React re-render. Jij zet alleen `hidden` in state, en die wisselt
zelden.

**API (geverifieerd in `node_modules/framer-motion/dist/index.d.ts`):**

- `useScroll({ container })`: `container?: RefObject<HTMLElement | null>`
  (regel 1042), geeft `{ scrollY, … }`.
- `useMotionValueEvent(value, "change", callback)` (regel 977).

**Scaffolding:**

```ts
"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

// Always show the bar within this many px of the top.
const TOP_ZONE_PX = 8;
// Ignore scroll steps smaller than this, so the bar doesn't flicker.
const THRESHOLD_PX = 6;

export function useHideOnScroll(
  containerRef: React.RefObject<HTMLElement | null>,
): boolean {
  // jij: useScroll met container
  // jij: useRef voor vorige y (ref, geen state — hoeft geen render te triggeren)
  // jij: useState voor hidden
  // jij: useMotionValueEvent(scrollY, "change", (y) => { … })
  //   y < TOP_ZONE_PX            → hidden false
  //   |y - vorige| < THRESHOLD_PX → niets doen (vorige NIET bijwerken)
  //   y > vorige                 → hidden true
  //   y < vorige                 → hidden false
  //   vorige = y
}
```

**Denkvraag:** waarom bijwerk je `vorige` níet als de stap kleiner is dan de
drempel? Tip: wat gebeurt er bij heel langzaam scrollen, steeds 2px per event?

**Test (`fireEvent`, geen user-event):** render een test-component met een
`<div ref={ref} style={{ overflow: "auto" }}>`. Zet `ref.current.scrollTop = 200`
en daarna `fireEvent.scroll(ref.current)`. Verwacht `hidden === true`. Terug
naar 100 → `false`. Naar 4 → `false`.

**Mogelijke hobbel:** jsdom rekent geen layout. Leest `useScroll` in jsdom
geen `scrollTop`, dan mag je de test in `act()` wikkelen. Werkt het echt niet,
meld het. Dan kijken we samen, zonder mocks te stapelen.

**Verify:** `npm test -- useHideOnScroll` groen, `npm run typecheck` en
`npm run lint` schoon.

---

## Stap 5 — `BottomTabBar`

**Bestand:** `src/app/_components/BottomTabBar/BottomTabBar.tsx` (+ `.test.tsx`).

**Props:**

```ts
export interface BottomTabBarProps {
  /** From useHideOnScroll — slides the bar out of view when true. */
  hidden: boolean;
}
```

**Opbouw (jij schrijft):**

1. `"use client"`, `usePathname()` uit `next/navigation`.
2. Buitenste element: `<nav aria-label="Main">` met `position="fixed"`.
   - Afstand tot de randen: 12–16px, en `bottom` gelijk aan
     `calc(var(--safe-bottom) + 12px)`.
   - Stijl: `bg="bg.chrome"`, `backdropBlur` + `backdropFilter` (Chakra-props,
     bevestigd in `system.gen.d.ts`), `borderWidth="1px"`,
     `borderColor="border"`, `rounded="full"`, `shadow="lg"`.
3. `TABS.map((tab) => <Link key={tab.id} …>)` met `next/link`.
   - Actief betekent `pathname === tab.href` of `pathname.startsWith(tab.href + "/")`.
   - De actieve link krijgt `aria-current="page"`.
   - Icoon: `aria-hidden`, want het label is al zichtbaar.
   - Elke link is minimaal 44×44 groot en heeft een zichtbare
     `_focusVisible`-ring.
4. Actieve stijl: label en icoon krijgen `accent.solid` + `fontWeight` 600, plus
   een stipje onder het icoon. Kleur is dus nooit het enige signaal.
5. De glow-pil achter het actieve icoon krijgt een `motion.div` met
   `layoutId="tab-indicator"`, zodat hij tussen tabs meeglijdt.
6. Verbergen: animeer alleen `transform` (translateY naar buiten beeld) en
   `opacity`, en noem de properties expliciet (nooit `transition: all`).
   - Bij `useReducedMotion()`: geen slide, alleen opacity.
7. Zolang de bar verborgen is en een link focus krijgt (`onFocus` op de nav),
   moet hij terugkomen. Dat regelt de layout (stap 7). Geef daarom een
   `onFocusCapture`-prop door, of los het op met CSS `:focus-within`. Kies er
   één en leg uit waarom.

**Bronnen om te matchen:**

- `framer-motion` + `useReducedMotion`: `src/app/page.tsx`.
- `next/link` en `usePathname`: `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`.
- Wrap tests met `Provider` uit `@/components/ui/provider`, zoals
  `CreateAccountForm.test.tsx`.
- Mock `usePathname` zoals de bestaande tests `next/navigation` mocken; kijk in
  `src/app/(auth)/layout.test.tsx`.

**Tests:**

- `should mark Sessions as current page when pathname is /sessions`:
  `getByRole("link", { name: "Sessions" })` heeft `aria-current="page"`.
- `should render all five tabs as links`: `getAllByRole("link")` heeft lengte 5.

**Verify:** tests groen, typecheck en lint schoon.

---

## Stap 6 — `AppTopBar` (root + back)

**Bestanden:** `src/app/_components/AppTopBar/AppTopBar.types.ts`,
`AppTopBar.tsx`, `AppTopBar.test.tsx`.

**Types:**

```ts
import type * as React from "react";

export type AppTopBarProps =
  | { variant: "root"; trailing?: React.ReactNode }
  | {
      variant: "back";
      title: string;
      /** Where Back goes when there is no in-app history (e.g. deep link). */
      fallbackHref: string;
      trailing?: React.ReactNode;
    };
```

Dit type heet een **discriminated union**. `variant` beslist welke andere props
verplicht zijn. TypeScript weigert `variant="back"` zonder `title`.

**Opbouw:**

1. `<header>`, sticky bovenaan.
   - `paddingTop` is `var(--safe-top)`, omdat de achtergrond onder de notch
     doorloopt (zie de comment bij `body` in `globals.css`).
   - `bg="bg.chrome"` + blur.
2. `root`: wordmark in het midden (`public/logo-mark.svg` of de tekst "AERYO" in
   de display-font), `trailing` rechts.
3. `back`: links een `IconButton` uit `src/components/actions/IconButton` met
   `aria-label="Back"` en `LuChevronLeft`; `title` in het midden als `Heading`.
4. Terug-logica: `window.history.length > 1` → `router.back()`, anders
   `router.push(fallbackHref)`.
   - **Denkvraag:** waarom is `history.length` in een Capacitor-app die op `/`
     boot bijna altijd > 1? Is er een betere check? Dit bespreken we als je
     hier bent.
5. Optioneel premium detail: de hairline-rand onderaan verschijnt pas als de
   content gescrold is. Doe dit alleen als stap 7 al werkt.

**Tests:**

- `should show the Back button when variant is back`.
- `should navigate to fallbackHref when there is no history`: mock `useRouter`,
  `fireEvent.click(getByRole("button", { name: "Back" }))`.

**Verify:** tests groen, typecheck en lint schoon.

---

## Stap 7 — Layouts samenvoegen

**Bestanden:** `src/app/(tabs)/layout.tsx`, `src/app/(stack)/layout.tsx`.

**`(tabs)/layout.tsx` (`"use client"`, want er zit een hook in):**

```
<Flex direction="column" h="full">
  <AppTopBar variant="root" trailing={…bel, of tandwiel op /profile…} />
  <Box as="main" ref={scrollRef} flex="1" overflowY="auto"
       pb={/* barhoogte + safe-bottom + marge */}>
    {children}
  </Box>
  <BottomTabBar hidden={hidden} />
</Flex>
```

- Het tandwiel is een `IconButton` met `aria-label="Settings"`. Omdat het
  navigatie is, moet het een link zijn. Kijk in de `IconButton`-types of `asChild`
  kan, of gebruik `Link` rond het icoon. Kies en onderbouw.
- De `trailing` verschilt per tab. Lees `usePathname()` in de layout, of laat
  elke pagina het zelf zetten. **Advies:** pathname in de layout; dat is de
  simpelste oplossing.
- De `pb` op `<main>` voorkomt dat de laatste kaart achter de zwevende bar valt.

**`(stack)/layout.tsx`:** alleen `<main>` met scroll, zonder bottom-bar. De top-bar
met titel zet je per pagina, omdat de titel per pagina verschilt.

**Verify (browser):**

- `npm run dev` → Chrome DevTools, mobiel viewport (390×844) → `/home`.
- Omlaag scrollen laat de bar verdwijnen, omhoog scrollen brengt hem terug.
  Bovenaan is hij altijd zichtbaar.
- De laatste content is volledig zichtbaar.
- Test light en dark via de color-mode-toggle.

---

## Stap 8 — Boot-redirect in `page.tsx`

**Bestand:** `src/app/page.tsx` (+ `src/app/page.test.tsx`).

**Wat:**

1. Toont `page.tsx` nu een ingelogd home-scherm met een sign-out-knop? Vervang
   dat met `router.replace("/home")`.
2. Haal de `useSignOutAccount`-import weg; die verhuist naar stap 9.
3. Laat intro en onboarding precies zoals ze zijn.

**Waarom `replace` en niet `push`:** met `push` brengt de terug-knop van Android
de gebruiker naar het lege boot-scherm.

**Verify:** `npm test -- src/app/page` groen. Pas de test aan die de
sign-out-knop verwachtte, want dat gedrag is bewust veranderd.

---

## Stap 9 — Settings-pagina

**Bestand:** `src/app/(stack)/settings/page.tsx` (+ `.test.tsx`).

**Opbouw:**

1. `AppTopBar variant="back" title="Settings" fallbackHref="/profile"`.
2. Sectie "Account" met de knop "Sign out" (`useSignOutAccount`).
3. Een aparte sectie "Danger zone", visueel gescheiden, met de knop "Delete
   account" (`intent` danger).
   - De knop opent de bestaande `Drawer` (`src/components/data-display/Drawer`)
     ter bevestiging.
   - Pas bij bevestigen roep je `useDeleteAccount` aan.
4. **Waarom een bevestiging:** account verwijderen is onomkeerbaar. Eén tik met
   natte handen mag nooit genoeg zijn.

**Tests:**

- `should call signOut when Sign out is pressed`.
- `should only delete the account after confirming in the drawer`.

**Verify:** tests groen, typecheck en lint schoon.

---

## Stap 10 — Device-check

1. `npm run build`, daarna `npm run ios:sync` en `npm run android:sync`.
2. Check in de simulator of op een device:
   - De bar zweeft boven de home-indicator (iOS) en de gesture-bar (Android).
   - De top-bar loopt onder de notch door en de content zit eronder.
   - Blur haperen tijdens het scrollen op Android? Dan zet je de blur alleen
     aan op iOS. `bg.chrome` is dekkend genoeg zonder blur.
   - Light en dark mode.
   - De Android-terug-knop op `/settings` gaat naar Profile.
3. Kan iets niet op een echt device worden getest? Noteer dat eerlijk.

---

## Definition of Done (per stap)

- `npm run typecheck` en `npm run lint` schoon.
- Na stap 1: eerst `npm run typegen`, daarna typecheck.
- Geen hex, `white` of `rgba()` in componenten; alleen semantic tokens.
- Niet-voor-de-hand-liggende API's krijgen een bron-comment
  (`// per node_modules/...` of `// matches src/...`).
- Geen `as any`, `@ts-ignore` of nieuwe `eslint-disable`.
