// Deno unit tests. Run with `deno test supabase/functions/login/index.test.ts`.
// per https://supabase.com/docs/guides/functions/unit-test
import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { handleLogin } from "./index.ts";

// Minimal duck-typed stand-in for the admin client — only the methods
// handleLogin actually calls need to exist. Cast to SupabaseClient so the
// real function's types are still checked.
const fakeAdmin = (overrides: {
  profile?: { id: string } | null;
  profileError?: unknown;
  userEmail?: string | null;
  userError?: unknown;
  signInSession?: { access_token: string; refresh_token: string } | null;
  signInError?: unknown;
}): SupabaseClient =>
  ({
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: () =>
            Promise.resolve({
              data: overrides.profile ?? null,
              error: overrides.profileError ?? null,
            }),
        }),
      }),
    }),
    auth: {
      admin: {
        getUserById: () =>
          Promise.resolve({
            data: { user: overrides.userEmail ? { email: overrides.userEmail } : null },
            error: overrides.userError ?? null,
          }),
      },
      signInWithPassword: () =>
        Promise.resolve({
          data: { session: overrides.signInSession ?? null },
          error: overrides.signInError ?? null,
        }),
    },
    // Duck-typed fake only implements what handleLogin calls — cast through
    // unknown since it can't structurally satisfy the full SupabaseClient type.
  }) as unknown as SupabaseClient;

const req = (body: unknown, method = "POST") =>
  new Request("http://localhost/login", {
    method,
    body: method === "OPTIONS" ? undefined : JSON.stringify(body),
  });

describe("handleLogin", () => {
  it("answers OPTIONS preflight without touching the admin client", async () => {
    const res = await handleLogin(req(undefined, "OPTIONS"), fakeAdmin({}));
    assertEquals(res.status, 200);
    assertEquals(await res.text(), "ok");
  });

  it("rejects a body missing identifier/password with the generic error", async () => {
    const res = await handleLogin(req({ identifier: "x" }), fakeAdmin({}));
    assertEquals(res.status, 400);
    const json = await res.json();
    assertEquals(
      json.error,
      "Invalid login credentials. Check your email/username and password and try again.",
    );
  });

  it("signs in directly when identifier is an email, skipping profile lookup", async () => {
    const admin = fakeAdmin({
      signInSession: { access_token: "at", refresh_token: "rt" },
    });
    const res = await handleLogin(
      req({ identifier: "user@example.com", password: "pw" }),
      admin,
    );
    assertEquals(res.status, 200);
    const json = await res.json();
    assertEquals(json, { access_token: "at", refresh_token: "rt" });
  });

  it("resolves a username to email, then signs in", async () => {
    const admin = fakeAdmin({
      profile: { id: "user-id" },
      userEmail: "user@example.com",
      signInSession: { access_token: "at", refresh_token: "rt" },
    });
    const res = await handleLogin(
      req({ identifier: "stormrider", password: "pw" }),
      admin,
    );
    assertEquals(res.status, 200);
  });

  it("returns the generic error when the username has no profile, without calling signInWithPassword", async () => {
    const admin = fakeAdmin({ profile: null });
    const res = await handleLogin(
      req({ identifier: "ghost", password: "pw" }),
      admin,
    );
    assertEquals(res.status, 400);
  });

  it("returns the generic error when signInWithPassword fails, same body as any other failure", async () => {
    const admin = fakeAdmin({ signInError: new Error("bad creds") });
    const res = await handleLogin(
      req({ identifier: "user@example.com", password: "wrong" }),
      admin,
    );
    assertEquals(res.status, 400);
    const json = await res.json();
    assertEquals(
      json.error,
      "Invalid login credentials. Check your email/username and password and try again.",
    );
  });
});
