import { supabase } from "@/lib/supabase/client";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";

const createAccount = async (data: CreateAccountValues) => {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
};

export const accountActions = () => {
  return {
    createAccount: createAccount,
  };
};
