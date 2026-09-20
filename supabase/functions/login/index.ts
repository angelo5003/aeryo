// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
import "jsr:@supabase/functions-js@2/edge-runtime.d.ts";
import { corsHeaders } from "jsr:@supabase/supabase-js@2/cors";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

// Never reveals whether the identifier or the password was the wrong one —
// per the login blueprint's "generic error" decision.
const invalidCredentialsResponse = () =>
  new Response(
    JSON.stringify({
      error:
        "Invalid login credentials. Check your email/username and password and try again.",
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    },
  );

// Extracted from Deno.serve's callback so index.test.ts can call it directly
// with a fake admin client — no real network or Supabase project needed.
export const handleLogin = async (
  req: Request,
  supabaseAdmin: SupabaseClient,
): Promise<Response> => {
  // Needed to invoke this function from the browser/Capacitor WebView.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { identifier, password } = await req.json();
  if (typeof identifier !== "string" || typeof password !== "string") {
    return invalidCredentialsResponse();
  }

  let email = identifier;

  if (!identifier.includes("@")) {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("username", identifier)
      .maybeSingle();

    if (profileError || !profile) {
      return invalidCredentialsResponse();
    }

    const { data: userData, error: userError } = await supabaseAdmin.auth.admin
      .getUserById(profile.id);

    if (userError || !userData.user?.email) {
      return invalidCredentialsResponse();
    }

    email = userData.user.email;
  }

  const { data: signInData, error: signInError } = await supabaseAdmin.auth
    .signInWithPassword({ email, password });

  if (signInError || !signInData.session) {
    return invalidCredentialsResponse();
  }

  return new Response(
    JSON.stringify({
      access_token: signInData.session.access_token,
      refresh_token: signInData.session.refresh_token,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    },
  );
};

Deno.serve((req: Request) => {
  // Service-role client — bypasses RLS to resolve a username to its auth
  // email and to sign in. Lives only here, never in client code.
  // per .claude/rules/02-supabase-data-architecture.md
  const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!);
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    secretKeys["default"],
  );

  return handleLogin(req, supabaseAdmin);
});
