import type { Session } from "@supabase/supabase-js";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";
import type { LoginValues } from "@/server/validation/account/login.schema";

const signUp = jest.fn();
const signOut = jest.fn();
const setSession = jest.fn();
const invoke = jest.fn();

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      signUp: (...args: unknown[]) => signUp(...args),
      signOut: (...args: unknown[]) => signOut(...args),
      setSession: (...args: unknown[]) => setSession(...args),
    },
    functions: {
      invoke: (...args: unknown[]) => invoke(...args),
    },
  },
}));

import { accountActions } from "./accountActions";

// confirmPassword is form-only — never sent to Supabase, just needed to satisfy the type.
const formValues: CreateAccountValues = {
  email: "rider@example.com",
  username: "kitesurfer",
  password: "supersecret1",
  confirmPassword: "supersecret1",
};

describe("accountActions.createAccount", () => {
  beforeEach(() => {
    signUp.mockReset();
  });

  it("sends email, password, username, and the app's redirect link to Supabase", async () => {
    signUp.mockResolvedValue({ error: null, data: { session: null } });

    await accountActions().createAccount(formValues);

    expect(signUp).toHaveBeenCalledWith({
      email: "rider@example.com",
      password: "supersecret1",
      options: {
        data: { username: "kitesurfer" },
        // Bug this test guards: emailRedirectTo must be a sibling of `data`,
        // not nested inside it — nested there Supabase silently ignores it.
        emailRedirectTo: "com.aeryo.app://auth-confirm",
      },
    });
  });

  it("returns the session Supabase gives back", async () => {
    const fakeSession = {} as Session;
    signUp.mockResolvedValue({ error: null, data: { session: fakeSession } });

    const result = await accountActions().createAccount(formValues);

    expect(result).toBe(fakeSession);
  });

  it("returns null when Supabase requires email confirmation first", async () => {
    signUp.mockResolvedValue({ error: null, data: { session: null } });

    const result = await accountActions().createAccount(formValues);

    expect(result).toBeNull();
  });

  it("throws Supabase's error message when signup fails", async () => {
    signUp.mockResolvedValue({
      error: { message: "User already registered" },
      data: { session: null },
    });

    await expect(accountActions().createAccount(formValues)).rejects.toThrow(
      "User already registered",
    );
  });
});

describe("accountActions.signOutAccount", () => {
  beforeEach(() => {
    signOut.mockReset();
  });

  it("signs out with local scope only, per the single-device sign-out decision", async () => {
    signOut.mockResolvedValue({ error: null });

    await accountActions().signOutAccount();

    expect(signOut).toHaveBeenCalledWith({ scope: "local" });
  });

  it("throws Supabase's error message when sign-out fails", async () => {
    signOut.mockResolvedValue({ error: { message: "Network error" } });

    await expect(accountActions().signOutAccount()).rejects.toThrow(
      "Network error",
    );
  });
});

describe("accountActions.loginAccount", () => {
  const loginValues: LoginValues = {
    identifier: "rider@example.com",
    password: "supersecret1",
  };

  beforeEach(() => {
    invoke.mockReset();
    setSession.mockReset();
  });

  it("invokes the login Edge Function with the identifier and password", async () => {
    invoke.mockResolvedValue({
      data: { access_token: "at", refresh_token: "rt" },
      error: null,
    });
    setSession.mockResolvedValue({ error: null });

    await accountActions().loginAccount(loginValues);

    expect(invoke).toHaveBeenCalledWith("login", { body: loginValues });
  });

  it("adopts the session from the Edge Function's tokens", async () => {
    invoke.mockResolvedValue({
      data: { access_token: "at", refresh_token: "rt" },
      error: null,
    });
    setSession.mockResolvedValue({ error: null });

    await accountActions().loginAccount(loginValues);

    expect(setSession).toHaveBeenCalledWith({
      access_token: "at",
      refresh_token: "rt",
    });
  });

  it("throws a generic message when the Edge Function rejects the credentials, without leaking which field was wrong", async () => {
    invoke.mockResolvedValue({
      data: null,
      error: new Error("Edge Function returned a non-2xx status code"),
    });

    await expect(accountActions().loginAccount(loginValues)).rejects.toThrow(
      "Invalid login credentials. Check your email/username and password and try again.",
    );
    expect(setSession).not.toHaveBeenCalled();
  });

  it("throws the same generic message when setSession fails after a valid login", async () => {
    invoke.mockResolvedValue({
      data: { access_token: "at", refresh_token: "rt" },
      error: null,
    });
    setSession.mockResolvedValue({ error: { message: "bad token" } });

    await expect(accountActions().loginAccount(loginValues)).rejects.toThrow(
      "Invalid login credentials. Check your email/username and password and try again.",
    );
  });
});

describe("accountActions.deleteAccount", () => {
  beforeEach(() => {
    invoke.mockReset();
    signOut.mockReset();
  });

  it("calls the delete-account function and signs out locally", async () => {
    invoke.mockResolvedValue({
      data: { ok: true },
      error: null,
    });
    signOut.mockResolvedValue({ error: null });

    await accountActions().deleteAccount();

    expect(invoke).toHaveBeenCalledWith("delete-account");
    expect(signOut).toHaveBeenCalledWith({ scope: "local" });
  });

  it("throws an error message and does NOT sign out when the function fails", async () => {
    invoke.mockResolvedValue({
      data: null,
      error: { message: "Failed to delete account. Please try again." },
    });
    signOut.mockResolvedValue({ error: null });

    await expect(accountActions().deleteAccount()).rejects.toThrow(
      "Failed to delete account. Please try again.",
    );
    expect(signOut).not.toHaveBeenCalled();
  });

  it("throws the sign-out error when sign-out fails after a successful delete", async () => {
    invoke.mockResolvedValue({
      data: { ok: true },
      error: null,
    });
    signOut.mockResolvedValue({
      error: {
        message: "Sign out failed. Please try again.",
      },
    });

    await expect(accountActions().deleteAccount()).rejects.toThrow(
      "Sign out failed. Please try again.",
    );
    expect(invoke).toHaveBeenCalledWith("delete-account");
  });
});
