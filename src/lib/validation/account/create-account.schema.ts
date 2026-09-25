import { z } from "zod";

// Shared with login.schema.ts, so the login form's identifier field can
// branch to this exact rule instead of duplicating it.
export const usernameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters")
  .max(12, "Username must be at most 12 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores",
  );

export const createAccountSchema = z
  .object({
    email: z.email("Invalid email address"),
    username: usernameSchema,
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  })
  .refine(
    (data) => !data.password.toLowerCase().includes(data.email.toLowerCase()),
    {
      path: ["password"],
      error: "Password cannot contain email",
    },
  );

export type CreateAccountValues = z.infer<typeof createAccountSchema>;
