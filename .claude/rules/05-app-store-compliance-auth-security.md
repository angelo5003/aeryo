# 05. App Store Compliance, Auth & Security

> Split out of `aeryo-core.md` v4/v8 §4 (App Store, Auth & Security) at the
> user's request. One bullet from the original §4 — RLS enforcement — is
> **not** duplicated here: it already has a fuller home in
> `02-supabase-data-architecture.md` ("RLS is Sacred"), per the "one home
> per topic" rule in `00-project-context-architecture.md`. Same precedence
> tier as the other `.claude/rules/*.md` files.

## App Store Review Guidelines (crucial)

- **Sign in with Apple (Guideline 4.8):** if Google or any other
  third-party login ships, Sign in with Apple must ship as a
  native-compatible path in the same release.
- **Account deletion (Guideline 5.1.1):** if user accounts exist, a clear,
  in-app account-deletion path must exist. Do not ship a create-account
  feature without a delete-account feature in the same product slice.

## Secrets & Environment Variables

- The Capacitor WebView bundle is public. Never put service-role keys,
  `SUPABASE_SERVICE_ROLE`, or any non-`NEXT_PUBLIC_` secret in client code,
  Storybook, tests, or Capacitor config.
- `NEXT_PUBLIC_*` variables are visible to users — treat them as such. Do
  not commit `.env` files with secrets.
- Where the service-role key actually goes if it's ever needed: a Supabase
  Edge Function, never this app (`02-supabase-data-architecture.md`).

## Capacitor Authentication & Production Builds

- **Auth constraints:** auth runs in the Capacitor WebView via
  `@supabase/supabase-js` plus official Capacitor plugins already in
  `package.json` (or approved under `00-project-context-architecture.md`'s
  Dependency Lockdown). Session storage uses a `@capacitor/preferences`
  adapter, not `@supabase/ssr` or cookies
  (`03-capacitor-mobile-offline-first.md`,
  `02-supabase-data-architecture.md`). Forbidden: standard Next.js
  cookie/session auth, Auth.js, `localhost` OAuth redirects, or custom
  in-app browsers that fail Apple/Google review. Do not add a new auth
  vendor to "make it native."
- **Production build lockdown:** `server.url` and `cleartext: true` in
  `capacitor.config.ts` are strictly for live-reload development. Ensure
  they are removed before compiling a store build — don't just note that
  they exist.

## React Identity Integrity

- Use a stable `id` (from the database) — never an array index — for React
  `key` props, selection state, and "is this active?" comparisons. Full
  rule and examples: `.cursor/rules/identity-by-id.mdc`.
