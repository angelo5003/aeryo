# Route Config (rollen + typedRoutes)

Mentor-plan (`/aeryo-mentor`). Je bouwt zelf, stap voor stap. Code laten schrijven: `WRITE CODE FOR STEP X`.

**Branch:** `feat/route-config`, afgetakt van `navbar` op `d2f03e5`. Daar zitten de werkende `BottomBar` en alle tab-routes al in.

**Doel:** alle route-paden staan op één plek: `src/app/_routes/routes.ts`. Elke route zegt zelf voor welke rol hij is. `typedRoutes` laat TypeScript tikfouten in paden vangen. Rol-specifieke functies (`getRiderRoutes`, later `getSchoolRoutes`) maken het makkelijk om bij te houden wie welke route ziet.

**Beslissingen (goedgekeurd 2026-10-05):**

- Rollen: alleen `rider` nu. `school` en `brand` komen later.
- Het `roles`-veld komt er nu al in.
- Combinatie-stijl: één echte functie `getRoutesForRole(role)` plus een één-regel-functie per rol: `getRiderRoutes = () => getRoutesForRole("rider")`. Een nieuwe rol vraagt dus geen nieuwe filter-logica.
- `typedRoutes: true` gaat aan in `next.config.ts`.
- Tabbladen per rol: later, niet nu.
- Rol-check in `(signed-in)/layout.tsx`: later. Daarvoor is eerst een Supabase `profiles`-tabel nodig.
- Config-tweaks: `NEXT_PUBLIC_ALLOWED_DEV_ORIGINS` heet voortaan `ALLOWED_DEV_ORIGINS`, met een lege lijst als fallback.
- Het IP-adres in de git-geschiedenis (`ee28e62`) blijft staan. Het is een link-local adres en geen geheim.
- De security-grens blijft RLS in Supabase. `roles` bepaalt alleen wat de UI toont.

**Stack (uit `package.json`):** `next` 16.3.1 (static export) · `react-icons` ^5.7.0 · `jest`. Geen nieuwe packages.

## Hoe het in elkaar zit

```
src/app/_routes/routes.ts
┌───────────────────────────────────────────────────────────┐
│ type Role = "rider"                                       │
│ routes = {                                                │
│   start, login, signup        → geen roles  (iedereen)    │
│   home … profile              → roles: ["rider"] + icoon  │
│   settings                    → roles: ["rider"]          │
│ }                                                         │
│ getRoutesForRole(role)  ← enige echte logica              │
│ getRiderRoutes()        = getRoutesForRole("rider")       │
└───────────────┬───────────────────────────┬───────────────┘
                │ routes.x.href             │ getRiderRoutes()
                ▼                           ▼
  page.tsx, (auth)/layout.tsx,       navItems.ts
  (signed-in)/layout.tsx,            (filter: heeft tabBarIcon)
  useSignOutAccount, useDeleteAccount,      │
  OnboardingCarousel, not-found.tsx         ▼
                │                       BottomBar.tsx
                ▼
  typedRoutes (next typegen → .next/types/link.d.ts)
  checkt elk pad bij npm run typecheck
```

## Wat, waarom en hoe

**`href: Route` in plaats van `string`.** `next typegen` leest de mappen in `src/app/` en schrijft de lijst met echte paden naar `.next/types/link.d.ts`. Het type `Route` is precies die lijst. Een pad dat niet bestaat, geeft een type-error. Je ziet een tikfout dus bij `npm run typecheck` en in CI, niet pas als iemand op de knop tikt. Het `typecheck`-script draait al `next typegen && tsc`, en `tsconfig.json` neemt `.next/types/**/*.ts` al mee.

**`roles` als lijst per route.** `getRoutesForRole("rider")` houdt alleen de routes over waarvan `roles` `"rider"` bevat. Routes zonder `roles` (start, login, signup) horen bij geen enkele rol: die zijn er voor iedereen. Een school toevoegen kost drie dingen: `"school"` in `Role`, `"school"` in de juiste `roles`-lijsten en één regel `getSchoolRoutes`.

**`tabBarIcon` op de route.** Heeft een route een `tabBarIcon`, dan krijgt hij een tab. Daardoor wordt `navItems.ts` één filter in plaats van een tweede lijst met een eigen `NavItemId`-type.

**`key={navItem.href}`.** `href` is uniek en stabiel, dus het voldoet aan `.cursor/rules/identity-by-id.mdc`. Een apart `id` is niet nodig.

**`ALLOWED_DEV_ORIGINS` zonder `NEXT_PUBLIC_`.** `next.config.ts` draait alleen op je Mac. De app-bundle hoeft deze waarde niet te kennen. Een lege lijst `[]` is duidelijker dan `[""]`.

**Getest in een tijdelijke kopie (2026-10-05):** met `typedRoutes: true` gaf `npm run typecheck` 19 errors, allemaal door `Link.types.ts`. De oorzaak: `LinkProps` van `next/link` wordt dan een generic. Na de fix met `NextLinkProps<Route>` waren er 0 errors. `router.replace("/hom")` gaf daarna `TS2345`, en `href: "/hom"` in een config-object gaf `TS2820 ... Did you mean '"/home"'?`. Niet getest: `npm run build`. Dat staat in stap 7.

## Scaffolding

```ts
// src/app/_routes/routes.ts
import type { Route } from "next";
import type { IconType } from "react-icons";
import { LuCompass, LuGauge, LuHouse, LuUser, LuUsers } from "react-icons/lu";

export type Role = "rider";

export interface AppRoute {
  href: Route;
  label: string;
  // No roles = open to everyone, signed in or not (start, login, signup).
  roles?: readonly Role[];
  // Set = this route gets a tab in the BottomBar.
  tabBarIcon?: IconType;
}

export const routes = {
  start: { href: "/", label: "Start" },
  login: { href: "/login", label: "Login" },
  signup: { href: "/signup", label: "Create account" },
  home: { href: "/home", label: "Home", roles: ["rider"], tabBarIcon: LuHouse },
  // explore, sessions, community, profile: same shape, same order as navItems.ts today
  settings: { href: "/settings", label: "Settings", roles: ["rider"] },
} as const satisfies Record<string, AppRoute>;

export const getRoutesForRole = (role: Role): AppRoute[] => {
  // TODO (jij): all routes → only those whose roles include the role
};

export const getRiderRoutes = (): AppRoute[] => getRoutesForRole("rider");
```

**Hint voor `getRoutesForRole`:** `Object.values(routes)` geeft een union van objecten met verschillende vormen. Sommige hebben geen `roles`, dus `.roles` geeft een TS-error. Zet de uitkomst eerst in een variabele met type `readonly AppRoute[]`. Dat is een gewone toewijzing, geen `as`-cast.

## Checklist

- [ ] **Step 1: env-variabele hernoemen** (`next.config.ts` en `.env.local`)
  - In `next.config.ts` wordt regel 9: `allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS ? [process.env.ALLOWED_DEV_ORIGINS] : []`.
  - In `.env.local`: hernoem `NEXT_PUBLIC_ALLOWED_DEV_ORIGINS=` naar `ALLOWED_DEV_ORIGINS=`.
  - Uses: —
  - Consumes: —
  - Produces: —
  - Verify:
    - `grep -rn NEXT_PUBLIC_ALLOWED_DEV_ORIGINS . --exclude-dir=node_modules --exclude-dir=.next` vindt niets;
    - `npm run dev` met live reload op je telefoon laadt de JS, zonder 403 op `/_next/*`.

- [ ] **Step 2: `typedRoutes` aan en het `Link`-type repareren** (`next.config.ts` en `src/components/typography/Link/Link.types.ts`)
  - In `next.config.ts`: zet `typedRoutes: true` onder `output: "export"`, met de comment `// per node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/typedRoutes.md`.
  - In `Link.types.ts`: vervang `NextLinkProps` door `NextLinkProps<Route>`, op twee plekken (de `Pick` en `href`).
  - Uses: `next` (geïnstalleerd), `import type { Route } from "next"`
  - Consumes: —
  - Produces: het type `Route`, overal bruikbaar.
  - Verify:
    - `npm run typecheck` is schoon;
    - zet tijdelijk `router.replace("/hom")` in `src/app/page.tsx`, zie `TS2345` en draai het terug.

- [ ] **Step 3: route-config** (nieuw: `src/app/_routes/routes.ts`, in `src/app/` naast `_hooks/` en `_components/`)
  - Volg de scaffolding hierboven, maar laat de body van `getRoutesForRole` nog leeg.
  - Uses: `react-icons` (geïnstalleerd), `import { LuCompass, LuGauge, LuHouse, LuUser, LuUsers } from "react-icons/lu"`
  - Consumes: `Route` (step 2)
  - Produces: `type Role`, `interface AppRoute`, `const routes`
  - Verify: `npm run typecheck` is schoon, en een tijdelijke `href: "/hom"` in `routes` geeft `TS2820`.

- [ ] **Step 4: eerst de test, dan `getRoutesForRole`** (nieuw: `src/app/_routes/routes.test.ts`, naast `routes.ts`)
  - Tests (Jest, zonder render):
    - `"should return only the routes a rider may open"`: verwacht precies `/home`, `/explore`, `/sessions`, `/community`, `/profile` en `/settings`;
    - `"should not return login, signup or start for a rider"`.
  - Draai de tests eerst en zie ze **falen**. Schrijf daarna de body.
  - Uses: `jest` (geïnstalleerd)
  - Consumes: `routes`, `Role`, `AppRoute` (step 3)
  - Produces: `getRoutesForRole(role: Role): AppRoute[]`, `getRiderRoutes(): AppRoute[]`
  - Verify: `npx jest src/app/_routes` is groen.

- [ ] **Step 5: `navItems` uit routes bouwen** (`src/app/_components/BottomTabBar/navItems.ts` en `BottomBar.tsx`)
  - `navItems.ts`: vervang de hele lijst door `getRiderRoutes()`, gefilterd op `tabBarIcon`. Gebruik een type guard (`(route): route is AppRoute & { tabBarIcon: IconType } => …`), zodat `tabBarIcon` daarna niet meer optioneel is. `NavItemId` en `NavItem` gaan weg.
  - `BottomBar.tsx`: vervang `navItem.icon` door `navItem.tabBarIcon` en `key={navItem.id}` door `key={navItem.href}`.
  - Uses: —
  - Consumes: `getRiderRoutes(): AppRoute[]`, `AppRoute` (step 4)
  - Produces: `navItems: readonly (AppRoute & { tabBarIcon: IconType })[]`
  - Verify: `npx jest src/app/_components/BottomTabBar` is groen. De bestaande tests checken `/home` en `/profile`.

- [ ] **Step 6: hardgecodeerde paden vervangen door `routes.x.href`**
  - `src/app/page.tsx` regels 56 en 60;
  - `src/app/(auth)/layout.tsx` regel 55 (`replace`), regels 87 en 103 (`pathname ===`) en regels 92 en 108 (`href`);
  - `src/app/(signed-in)/layout.tsx` regel 20;
  - `src/app/_hooks/useSignOutAccount/useSignOutAccount.ts` regel 30;
  - `src/app/_hooks/useDeleteAccount/useDeleteAccount.ts` regel 33;
  - `src/app/_providers/Onboarding/OnboardingCarousel/OnboardingCarousel.tsx` regel 63;
  - `src/app/not-found.tsx` regel 20.
  - Uses: —
  - Consumes: `routes` (step 3)
  - Produces: —
  - Verify:
    - `grep -rnE 'router\.(replace|push)\("/|href="/|pathname === "/' src --include='*.ts' --include='*.tsx' | grep -v test` vindt niets;
    - `npm test` is groen. Tests die `"/login"` enzovoort verwachten, kloppen nog, want de waarde blijft hetzelfde.

- [ ] **Step 7: eindcontrole**
  - Uses: —
  - Consumes: alles hierboven
  - Produces: —
  - Verify:
    - `npm run typecheck`, `npm run lint` en `npm test` zijn groen;
    - `npm run build` maakt `out/` aan, wat bewijst dat `typedRoutes` werkt met `output: "export"`;
    - `npm run dev` op je telefoon: tik alle vijf tabs aan, log uit (je komt op `/login`) en log in (je komt op `/home`).

## Kwaliteitspoorten

- **App Store:** geen risico. Er verandert niets native, er komt geen package bij en `cap sync` is niet nodig.
- **Offline-first:** niet van toepassing, want deze wijziging leest en schrijft geen data.
- **Security:** `roles` is alleen UI. RLS beslist wie welke data krijgt.
- **Static export:** geen middleware, geen server-code.

## Bronnen geopend

- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/typedRoutes.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/02-typescript.md` (§ Statically Typed Links)
- `.next/types/link.d.ts` (gegenereerd in de testkopie)
- `node_modules/next/package.json` (16.3.1)
- `src/components/typography/Link/Link.types.ts`, `Link.tsx`
- `src/app/_components/BottomTabBar/BottomBar.tsx`, `BottomBar.test.tsx`, `navItems.ts`
- `tsconfig.json`
