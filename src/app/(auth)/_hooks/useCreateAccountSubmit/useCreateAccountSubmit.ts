import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useOnboarding } from "@/app/_providers/Onboarding/Provider/OnboardingProvider";
import { accountActions } from "@/lib/account/accountActions";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";

export const useCreateAccountSubmit = (
  methods: UseFormReturn<CreateAccountValues>,
) => {
  const { createAccount } = accountActions();
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const { completeOnboarding } = useOnboarding();

  // Same form instance the component renders — reset()/setError() here must
  // land on the visible fields, not a second, disconnected form.
  const { reset, setError } = methods;

  const onSubmit = async (data: CreateAccountValues) => {
    try {
      const session = await createAccount(data);
      if (session) {
        completeOnboarding();
        reset();
      } else {
        setNeedsConfirmation(true);
      }
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };
  return { onSubmit, needsConfirmation };
};
