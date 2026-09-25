import { z } from "zod";
import { usernameSchema } from "./create-account.schema";

// Same email rule create-account.schema.ts uses — kept local since that
// file doesn't export a standalone email schema, only the full object.
const emailSchema = z.email("Invalid email address");

export const loginSchema = z
  .object({
    identifier: z.string().min(1, "Email or username is required"),
    password: z.string().min(1, "Password is required"),
  })
  .superRefine((data, ctx) => {
    // "@" present → treat as email, same rule create-account.schema.ts uses.
    // Otherwise → treat as username, same rule, shared via usernameSchema.
    const identifierSchema = data.identifier.includes("@")
      ? emailSchema
      : usernameSchema;
    const result = identifierSchema.safeParse(data.identifier);
    if (!result.success) {
      ctx.addIssue({
        code: "custom",
        path: ["identifier"],
        message: result.error.issues[0]?.message ?? "Invalid email or username",
      });
    }
  });

export type LoginValues = z.infer<typeof loginSchema>;
