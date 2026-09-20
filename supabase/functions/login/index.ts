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

// ponytail: per-isolate in-memory counter — resets on cold start, not
// shared across regions/instances. Backs up GoTrue's own throttling on the
// username-lookup half of this flow, which GoTrue never sees.
// Upgrade path: a Postgres-backed attempts table or Upstash Redis if abuse
// shows up in logs.
const RATE_LIMIT_MAX_ATTEMPTS = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const attemptsByKey = new Map<string, number[]>();

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const attempts = (attemptsByKey.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  attempts.push(now);
  attemptsByKey.set(key, attempts);
  return attempts.length > RATE_LIMIT_MAX_ATTEMPTS;
};

const rateLimitedResponse = () =>
  new Response(
    JSON.stringify({ error: "Too many attempts. Try again in a minute." }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 429,
    },
  );

// ponytail: fixed response-time floor, not true constant-time crypto — closes
// the practical leak (username-exists path does 2 extra round-trips, incl. a
// bcrypt compare, so it took measurably longer than username-not-found)
// without rewriting every branch to be constant-time.
const MIN_RESPONSE_MS = 400;

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

  const start = performance.now();
  const respond = async (response: Response): Promise<Response> => {
    const elapsed = performance.now() - start;
    if (elapsed < MIN_RESPONSE_MS) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_RESPONSE_MS - elapsed)
      );
    }
    return response;
  };

  const key = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(key)) {
    return respond(rateLimitedResponse());
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return respond(invalidCredentialsResponse());
  }

  const { identifier, password } = body as Record<string, unknown>;
  if (
    typeof identifier !== "string" ||
    typeof password !== "string" ||
    identifier.length === 0 ||
    identifier.length > 254 || // longest valid email, RFC 5321
    password.length === 0 ||
    password.length > 200
  ) {
    return respond(invalidCredentialsResponse());
  }

  let email = identifier;

  if (!identifier.includes("@")) {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("username", identifier)
      .maybeSingle();

    if (profileError || !profile) {
      return respond(invalidCredentialsResponse());
    }

    const { data: userData, error: userError } = await supabaseAdmin.auth.admin
      .getUserById(profile.id);

    if (userError || !userData.user?.email) {
      return respond(invalidCredentialsResponse());
    }

    email = userData.user.email;
  }

  const { data: signInData, error: signInError } = await supabaseAdmin.auth
    .signInWithPassword({ email, password });

  if (signInError || !signInData.session) {
    return respond(invalidCredentialsResponse());
  }

  return respond(
    new Response(
      JSON.stringify({
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    ),
  );
};

// Service-role client — bypasses RLS to resolve a username to its auth
// email and to sign in. Lives only here, never in client code.
// per .claude/rules/02-supabase-data-architecture.md
// Built once per isolate (module scope), not per request — and guarded so a
// missing/malformed SUPABASE_SECRET_KEYS fails clean instead of a raw 500.
let supabaseAdmin: SupabaseClient | null = null;
let supabaseAdminInitError: unknown = null;
try {
  const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!);
  supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    secretKeys["default"],
  );
} catch (err) {
  supabaseAdminInitError = err;
}

Deno.serve((req: Request) => {
  if (!supabaseAdmin) {
    console.error("login: admin client init failed", supabaseAdminInitError);
    return new Response(
      JSON.stringify({ error: "Service temporarily unavailable." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
  return handleLogin(req, supabaseAdmin);
});
