"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import {
  type LoginValues,
  loginSchema,
} from "@/lib/validation/account/login.schema";

// Same shape as useCreateAccountForm — react-hook-form wired to Zod via
// zodResolver, returned whole so LoginForm/useLoginOnSubmit share one instance.
export const useLoginForm = (): UseFormReturn<LoginValues> => {
  return useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });
};
