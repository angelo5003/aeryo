# Create Account form: Zod schema + react-hook-form hook

Step-by-step guide for filling in the two files that were scaffolded for
you. You write these two files yourself — this doc tells you what shape
they need to be and points at the exact APIs, sourced from the versions
actually installed in this repo.

**Files you're filling in:**
- `src/server/validation/account/create-account.schema.ts`
- `src/app/ui/pages/account/hooks/useCreateAccountForm.ts`

**Already wired for you (don't need to touch):**
- `src/app/ui/pages/account/CreateAccountForm/CreateAccountForm.tsx` — calls
  `useCreateAccountForm()`, registers each input, wires `handleSubmit`.

**Installed versions:** `zod@4.4.3`, `react-hook-form@7.86.0`,
`@hookform/resolvers@5.9.1` (all confirmed in `package.json` — already
installed, nothing to add).

---

## 1. Why the schema lives outside `src/app/`

`src/server/validation/` is plain TypeScript + Zod — no React import, no
`"use client"`. Not because a server exists yet (it doesn't; AERYO is a
static export, see `AGENTS.md` — "Next.js is a static export"), but so the
same schema can be dropped into a future Supabase Edge Function or API
route unchanged. A validation rule should exist once, not once per surface
that uses it.

## 2. What `create-account.schema.ts` needs

Requirements: `email` (required, valid format), `password` (required,
minimum length), `confirmPassword` (required, must equal `password`).

Zod v4 APIs to use, confirmed in the installed type definitions:

- **`z.email()`** — top-level email validator.
  // source: node_modules/zod/v4/classic/schemas.d.ts:179
  ```ts
  const email = z.email();
  ```
- **`.min(n, { message })`** on `z.string()` for the password length check.
  // source: node_modules/zod/v4/classic/schemas.d.ts:95
- **`.refine(fn, { message, path })`** on the whole object, for the
  cross-field "passwords must match" check — `path` targets which field
  the error attaches to (`confirmPassword`, not the whole object), so
  `Field`'s `errorText` shows it in the right place.
  // source: node_modules/zod/v4/classic/schemas.d.ts:38

  ```ts
  z.object({ password: z.string(), confirmPassword: z.string() }).refine(
    (data) => data.password === data.confirmPassword,
    { message: "Passwords don't match", path: ["confirmPassword"] },
  );
  ```

Shape to fill in (already stubbed in the file):

```ts
export const createAccountSchema = z
  .object({
    email: /* ... */,
    password: /* ... */,
    confirmPassword: /* ... */,
  })
  .refine(/* password === confirmPassword, path: ["confirmPassword"] */);

export type CreateAccountValues = z.infer<typeof createAccountSchema>;
```

Pick your own minimum password length and error messages — there's no
existing convention in this repo to match yet; this is the first one.

## 3. What `useCreateAccountForm.ts` needs

`@hookform/resolvers` connects a Zod schema to react-hook-form's
`useForm()` via its `resolver` option:

// source: node_modules/@hookform/resolvers/README.md:203-219
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

Your hook does the same thing, against `createAccountSchema`, and returns
the whole `UseFormReturn` object rather than destructuring — the stub file
already has the exact signature `CreateAccountForm.tsx` expects:

```ts
export function useCreateAccountForm(): UseFormReturn<CreateAccountValues> {
  return useForm<CreateAccountValues>({
    resolver: zodResolver(createAccountSchema),
  });
}
```

Import `createAccountSchema` and `CreateAccountValues` from
`@/server/validation/account/create-account.schema` (already imported as a
type in the stub — add the value import for `createAccountSchema` and
`useForm`/`zodResolver`).

You don't need to pass a type parameter to `useForm` beyond
`CreateAccountValues` here — the "default vs. inferred" `z.input`/`z.output`
split mentioned in the resolvers README only matters if a field uses
`.default(...)`, which none of these three fields do.

## 4. Verifying it works

1. `npm run typecheck` — currently fails with 3 errors, all
   `register("email"|"password"|"confirmPassword")` rejecting because the
   schema is still `z.object({})`. Once your schema has those three keys,
   all three errors disappear on their own — `CreateAccountForm.tsx`
   doesn't need any changes.
2. `npm run lint` — should stay clean; nothing here should trigger it.
3. Manually: run the app (`npm run dev` or the iOS simulator), open the
   create-account drawer, submit empty → three field errors appear;
   mismatch the passwords → the error appears under Confirm Password
   specifically (that's the `path: ["confirmPassword"]` in step 2); submit
   valid data → `console.log("create account submit", values)` fires (see
   the `// TODO(you): wire this up to Supabase Auth` comment in
   `CreateAccountForm.tsx` — the actual account-creation call is separate,
   future work once Supabase is provisioned).
4. If you want an automated check: `createAccountSchema.safeParse(...)`
   with a few valid/invalid payloads is enough — no React, no rendering,
   just call `.safeParse()` and assert `.success`. Jest is already set up
   in this repo (`jest.config.ts`); a plain `.test.ts` next to the schema
   file needs no React Testing Library.

## 5. Reuse for Login, later

When you build `LoginForm`, add a **separate** `useLoginForm` hook next to
this one (`src/app/ui/pages/account/hooks/useLoginForm.ts`) and a
**separate** `login.schema.ts` under `src/server/validation/account/` — do
not generalize `useCreateAccountForm` into a shared hook that both forms
call. The reusable part is the *pattern* (`useForm` + `zodResolver` +
returning `UseFormReturn` unchanged), not a runtime abstraction over it —
Login's fields (no `confirmPassword`, possibly a "remember me" checkbox)
will diverge from Create Account's immediately.
