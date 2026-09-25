import { APP_URL_SCHEME } from "@/app/_providers/AppUrl/pathFromAppUrl";
import { supabase } from "@/lib/supabase/client";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import type { LoginValues } from "@/server/validation/account/login.schema";

const createAccount = async (data: CreateAccountValues) => {
  // Ask Supabase to register user; rename destructured `data` to `authData` — collides with input param `data` otherwise.
  const { error: createAccountError, data: authData } =
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // `data` is user metadata only — per node_modules/@supabase/auth-js/resume
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
  if (createAccountError) {
    // Signup itself failed (duplicate email, weak password, ...) — bubble up as a real error.
    throw new Error(createAccountError.message);
  }
  // null here is not a failure — Supabase returns no session when email confirmation is required.
  return authData.session;
};

const signOutAccount = async () => {
  const { error: signOutError } = await supabase.auth.signOut({
    scope: "local",
  });
  if (!signOutError) return;
  // Local scope clears the stored session even when the server call fails
  // (e.g. no signal) — per node_modules/@supabase/auth-js/dist/module/GoTrueClient.js
  // `_signOut`. Only report failure if this device is actually still signed in.
  const { data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || data.session) {
    throw new Error(signOutError.message);
  }
  console.error(signOutError.message);
};

const deleteAccount = async () => {
  // Ask the Edge Function to shred the account server-side (needs the
  // service-role key, which never lives in this app — see the function).
  const { error: deleteAccountError } =
    await supabase.functions.invoke("delete-account");
  if (deleteAccountError) {
    // Server-side delete failed — stop here, don't sign out a still-alive account.
    throw new Error(deleteAccountError.message);
  }
  // Account is gone on the server now — clear this device's local session too.
  const { error: signOutError } = await supabase.auth.signOut({
    scope: "local",
  });
  if (signOutError) {
    // Not thrown: the account is already gone server-side, and local scope
    // clears the stored session even when this call errors (see signOutAccount).
    console.error(signOutError.message);
  }
};

const loginAccount = async (data: LoginValues) => {
  const { data: session, error: loginError } = await supabase.functions.invoke<{
    access_token: string;
    refresh_token: string;
  }>("login", { body: data });

  // Generic message regardless of cause (bad credentials vs. network/relay
  // failure) — matches the zero-enumeration decision behind login.schema.ts.
  // Includes a next step per /web-design-guidelines ("error messages
  // include fix/next step, not just problem").
  const invalidCredentialsMessage =
    "Invalid login credentials. Check your email/username and password and try again.";

  if (loginError || !session) {
    throw new Error(invalidCredentialsMessage);
  }

  const { error: setSessionError } = await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });
  if (setSessionError) {
    throw new Error(invalidCredentialsMessage);
  }
};

export const accountActions = () => {
  return {
    createAccount: createAccount,
    signOutAccount: signOutAccount,
    loginAccount: loginAccount,
    deleteAccount: deleteAccount,
  };
};
