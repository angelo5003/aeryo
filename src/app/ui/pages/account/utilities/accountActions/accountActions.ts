import { supabase } from "@/lib/supabase/client";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";

const createAccount = async (data: CreateAccountValues) => {
  // Ask Supabase to register user; rename destructured `data` to `authData` — collides with input param `data` otherwise.
  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
      },
    },
  });
  if (error) {
    // Signup itself failed (duplicate email, weak password, ...) — bubble up as a real error.
    throw new Error(error.message);
  }
  // null here is not a failure — Supabase returns no session when email confirmation is required.
  return authData.session;
};

export const accountActions = () => {
  return {
    createAccount: createAccount,
  };
};
