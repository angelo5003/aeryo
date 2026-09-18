import { APP_URL_SCHEME } from "@/app/providers/AppUrl/pathFromAppUrl";
import { supabase } from "@/lib/supabase/client";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";

const createAccount = async (data: CreateAccountValues) => {
  // Ask Supabase to register user; rename destructured `data` to `authData` — collides with input param `data` otherwise.
  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      // `data` is user metadata only — per node_modules/@supabase/auth-js
      // SignUpWithPasswordCredentials, emailRedirectTo is a sibling of
      // `data`, not a field inside it. Nested here it was silently ignored
      // and Supabase kept sending confirmation links to the dashboard's
      // default Site URL instead of back into the app.
      data: {
        username: data.username,
      },
      // Send the confirmation email link back into the app itself, not a browser.
      emailRedirectTo: `${APP_URL_SCHEME}://auth-confirm`,
    },
  });
  if (error) {
    // Signup itself failed (duplicate email, weak password, ...) — bubble up as a real error.
    throw new Error(error.message);
  }
  // null here is not a failure — Supabase returns no session when email confirmation is required.
  return authData.session;
};

const signOutAccount = async () => {
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });
  if (error) {
    throw new Error(error.message);
  }
};

export const accountActions = () => {
  return {
    createAccount: createAccount,
    signOutAccount: signOutAccount,
  };
};
