# 02. Supabase & Data Architecture

> New topic, not a v4 split — v4 only touched Supabase glancingly (RLS and
> secrets bullets in the old §4, now
> `05-app-store-compliance-auth-security.md`). Cross-checked against
> `AGENTS.md`'s Supabase section, `00-project-context-architecture.md`
> (static export, product stage), `05-app-store-compliance-auth-security.md`,
> and `03-capacitor-mobile-offline-first.md`. Supabase is
> **not provisioned** in this repo yet beyond dependency + CLI scaffold
> (`src/lib/supabase/database.types.ts` is an empty generated schema) — this
> file is forward-looking spec for when real tables land, not a description
> of what exists today.
>
> **Two of the user's original four rules conflicted with rules already in
> force and were rewritten rather than adopted as written — flagged, not
> silently resolved, per `06-escalation-protocol.md`:**
> service-role-key placement (below) and the Capacitor auth storage
> mechanism (below). See the chat message that introduced this file for the
> full conflict statement.

## Row Level Security (RLS) is Sacred

- Next.js application logic — client **or** server — must never be
  responsible for filtering sensitive user data. This app has no server in
  production anyway (`output: "export"`, see Tech Stack Boundaries in
  `00-project-context-architecture.md`), so RLS in Postgres is the *only*
  enforcement layer there is.
- Every new table ships with RLS enabled and its policies written,
  validated, and explained (in plain language, per the 60/25/15 Mentor
  ratio) before the migration is presented as done.
- Do not add `app/api` routes "to validate RLS"
  (`05-app-store-compliance-auth-security.md`).
- Until Supabase is actually provisioned with real tables, do not invent
  policies or schemas (`00-project-context-architecture.md`, Product
  stage).

## Never Leak the Service Role Key

- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to client-side code —
  Capacitor WebView or any Next.js Client Component — nor committed,
  logged, or placed in Storybook/tests/Capacitor config
  (`05-app-store-compliance-auth-security.md`, Secrets).
- The client (this app) exclusively uses the public
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`. `NEXT_PUBLIC_*` is visible to end users
  by design — RLS, not key secrecy, is what makes that safe.
- **Where the service-role key actually lives — corrected from the
  original instruction:** this app is a static export with no Next.js
  server in production, so "use it in Route Handlers/Server Actions" isn't
  available here (forbidden by Tech Stack Boundaries, and there's nowhere
  for that code to run at request time). Admin-only tasks that genuinely
  need the service-role key belong in a **Supabase Edge Function** (the key
  lives inside Supabase's own runtime, never in this repo's bundle) or an
  out-of-band script/CI job — not this Next.js app. If a feature seems to
  need service-role access from inside the app itself, that's a sign the
  RLS policy is incomplete, not a reason to reach for the key.

## Generated Types as Single Source of Truth

- Never hand-write TypeScript interfaces for database models. Regenerate
  via the Supabase CLI or MCP
  (`supabase gen types typescript --project-id <ref> > src/lib/supabase/database.types.ts`
  — matches the header comment already in that file) after every schema
  change.
- Use the generated `Tables<>`, `TablesInsert<>`, `TablesUpdate<>` helpers
  from `src/lib/supabase/database.types.ts` throughout the app instead of
  ad-hoc types. That file is a primary source in the Evidence First source
  rank (`00-project-context-architecture.md`), same tier as installed
  types.

## Capacitor Auth Storage Awareness

- The concern is real and already implied by
  `03-capacitor-mobile-offline-first.md`: Supabase
  Auth's default browser storage (`localStorage`) is exactly the "ad-hoc
  `localStorage` helper" that rule forbids, and cookie-based session
  handling is unreliable inside a Capacitor WebView regardless.
- **Mechanism — corrected from the original instruction:** don't add
  `@supabase/ssr` (not installed; it's built around Next.js
  middleware/cookie sync with a server this app doesn't have in
  production). Instead, configure plain `@supabase/supabase-js`'s
  `createClient(url, key, { auth: { storage, persistSession: true, autoRefreshToken: true } })`
  with a custom `storage` adapter implementing `getItem`/`setItem`/`removeItem`
  backed by `@capacitor/preferences` — already an installed, approved
  plugin (`03-capacitor-mobile-offline-first.md`). Verify the exact
  `createClient` auth-options
  shape against `node_modules/@supabase/supabase-js` types before writing
  it (Evidence First).
