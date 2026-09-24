import { corsHeaders } from "jsr:@supabase/supabase-js@2/cors";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

// Reusable "you're not who you say you are" reply — same shape every time.
const unauthorizedResponse = () =>
  new Response(
    JSON.stringify({ error: "Not authorized." }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 401,
    },
  );

// Reusable "the delete itself broke" reply — same shape every time.
const deletionFailedResponse = () =>
  new Response(
    JSON.stringify({
      error: "Couldn't delete your account. Please try again.",
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    },
  );

// Extracted from Deno.serve's callback so index.test.ts can call it directly
// with a fake admin client — no real network or Supabase project needed.
export const handleDeleteAccount = async (
  request: Request,
  supabaseAdmin: SupabaseClient,
): Promise<Response> => {
  // Needed to invoke this function from the browser/Capacitor WebView.
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Pull out the "Authorization: Bearer <token>" header the app sent.
  const authHeader = request.headers.get("authorization");
  // No header, or it's not a Bearer token — reject before doing anything else.
  if (!authHeader?.startsWith("Bearer ")) {
    return unauthorizedResponse();
  }

  // Cut off the "Bearer " prefix — jwtToken is now just the token itself.
  const jwtToken = authHeader.slice("Bearer ".length);

  // supabase-js's functions.invoke() auto-attaches the caller's own JWT as
  // this header (confirmed in node_modules/@supabase/functions-js
  // FunctionsClient.js's doc comment) — getUser(jwt) asks Supabase's own
  // Auth server whose token this is, so we never trust an id from the
  // request body itself.
  // data.user is the account that token belongs to — or null if it's fake/expired.
  const { data, error } = await supabaseAdmin.auth.getUser(jwtToken);
  if (error || !data.user) {
    return unauthorizedResponse();
  }

  // Cascades to public.profiles via `on delete cascade`
  // (supabase/migrations/20260911143500_create_profiles.sql) — no extra
  // cleanup query needed here.
  // Actually delete that user — the one and only reason this function exists.
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    data.user.id,
  );
  if (deleteError) {
    return deletionFailedResponse();
  }

  // Deleted successfully — tell the app it can move on.
  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
};

// Service-role client — the only place this app's account-deletion path is
// allowed to hold it. per .claude/rules/02-supabase-data-architecture.md
// Built once per isolate (module scope), not per request — and guarded so a
// missing/malformed SUPABASE_SECRET_KEYS fails clean instead of a raw 500.
// Starts as "not built yet" — filled in below, or stays null if setup fails.
let supabaseAdmin: SupabaseClient | null = null;
// Remembers why the build failed, so the error log below isn't a mystery.
let supabaseAdminInitError: unknown = null;
try {
  // Read the secret key out of this function's own environment (never the app's).
  const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!);
  // Build the one client in this file that's allowed to bypass RLS.
  supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    secretKeys["default"],
  );
} catch (err) {
  // Env var missing/malformed — save the error instead of crashing the file.
  supabaseAdminInitError = err;
}

// Runs once per incoming request — this is the actual entry point.
Deno.serve((req: Request) => {
  // Setup failed earlier — fail every request cleanly instead of crashing.
  if (!supabaseAdmin) {
    console.error(
      "delete-account: admin client init failed",
      supabaseAdminInitError,
    );
    return new Response(
      JSON.stringify({ error: "Service temporarily unavailable." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
  // Setup worked — hand the real request off to the function above.
  return handleDeleteAccount(req, supabaseAdmin);
});
