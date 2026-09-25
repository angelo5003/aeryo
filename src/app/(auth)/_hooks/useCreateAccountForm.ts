"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm } from "react-hook-form";
import {
  type CreateAccountValues,
  createAccountSchema,
} from "@/lib/validation/account/create-account.schema";

export const useCreateAccountForm = (): UseFormReturn<CreateAccountValues> => {
  return useForm<CreateAccountValues>({
    resolver: zodResolver(createAccountSchema),
  });
};
