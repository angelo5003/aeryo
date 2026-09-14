import type { Session } from "@supabase/supabase-js";
import type { CreateAccountValues } from "@/server/validation/account/create-account.schema";

const signUp = jest.fn();

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      signUp: (...args: unknown[]) => signUp(...args),
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
