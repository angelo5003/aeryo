import type { UseFormReturn } from "react-hook-form";
import { accountActions } from "@/lib/account/accountActions";
import type { LoginValues } from "@/server/validation/account/login.schema";

export const useLoginOnSubmit = (methods: UseFormReturn<LoginValues>) => {
  const { loginAccount } = accountActions();

  // Same form instance the component renders — reset()/setError() here must
  // land on the visible fields, not a second, disconnected form.
  const { reset, setError } = methods;

  const onSubmit = async (data: LoginValues) => {
    try {
      await loginAccount(data);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };
  return { onSubmit };
};
