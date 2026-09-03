import { z } from "zod";

// TODO(you): define the schema for the Create Account form here.
//
// Requirements (see docs/guides/create-account-form-validation.md for the
// full walkthrough and the exact Zod v4 APIs to use):
//   - email: required, valid email format
//   - password: required, minimum length
//   - confirmPassword: required, must match `password`
//
// This file must stay framework-agnostic — no React, no "use client", no
// imports from src/components or src/app. It's pure `zod` so it can be
// reused unchanged by a future server-side check (Supabase Edge Function,
// API route) once the backend exists.
//
// Export contract `CreateAccountForm.tsx` (via `useCreateAccountForm`)
// expects from this file:
//   export const createAccountSchema = z.object({ ... });
//   export type CreateAccountValues = z.infer<typeof createAccountSchema>;

export const createAccountSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type CreateAccountValues = z.infer<typeof createAccountSchema>;
