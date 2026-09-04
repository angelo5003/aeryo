import { z } from "zod";

export const createAccountSchema = z
  .object({
    email: z.email("Invalid email address"),
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
