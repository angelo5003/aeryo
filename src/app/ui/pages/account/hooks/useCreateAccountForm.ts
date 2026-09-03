import type { UseFormReturn } from "react-hook-form";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";

// TODO(you): implement this hook.
//
// See docs/guides/create-account-form-validation.md for the full
// walkthrough. In short: call react-hook-form's `useForm()` with
// `resolver: zodResolver(createAccountSchema)` from `@hookform/resolvers/zod`,
// and return its result unchanged — `CreateAccountForm.tsx` already expects
// exactly `UseFormReturn<CreateAccountValues>` and passes it straight into
// `<Form methods={...}>` (see Form.types.ts).
//
// Keep this hook auth-form-specific — do not make it generic/shared with a
// future `useLoginForm`. Both hooks call the same `useForm` + `zodResolver`
// pattern against their own schema; that's the reuse. Share the pattern,
// not a runtime abstraction over it.
export function useCreateAccountForm(): UseFormReturn<CreateAccountValues> {
  throw new Error(
    "useCreateAccountForm is not implemented yet — see docs/guides/create-account-form-validation.md",
  );
}
