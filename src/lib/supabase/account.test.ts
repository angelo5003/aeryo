/* eslint-disable @typescript-eslint/no-explicit-any -- jest mocks require loosely typed objects */
import { supabase } from "./client";
import { isUsernameAvailable, signUpWithEmail } from "./account";

jest.mock("./client", () => ({
  supabase: {
    rpc: jest.fn(),
    auth: { signUp: jest.fn() },
  },
}));

describe("isUsernameAvailable", () => {
  it("returns true when the RPC reports the username is free", async () => {
    jest.mocked(supabase.rpc).mockResolvedValue({ data: true, error: null } as unknown as any);

    await expect(isUsernameAvailable("stormrider")).resolves.toBe(true);
    expect(supabase.rpc).toHaveBeenCalledWith("is_username_available", {
      check_username: "stormrider",
    });
  });

  it("returns false when the RPC reports the username is taken", async () => {
    jest.mocked(supabase.rpc).mockResolvedValue({ data: false, error: null } as unknown as any);

    await expect(isUsernameAvailable("stormrider")).resolves.toBe(false);
  });

  it("throws when the RPC call errors", async () => {
    jest.mocked(supabase.rpc).mockResolvedValue({
      data: null,
      error: new Error("network down"),
    } as unknown as any);

    await expect(isUsernameAvailable("stormrider")).rejects.toThrow(
      "network down",
    );
  });
});

describe("signUpWithEmail", () => {
  it("calls supabase.auth.signUp with the username as metadata", async () => {
    jest.mocked(supabase.auth.signUp).mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    } as unknown as any);

    const result = await signUpWithEmail({
      email: "rider@example.com",
      password: "SecurePass123",
      username: "stormrider",
    });

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: "rider@example.com",
      password: "SecurePass123",
      options: { data: { username: "stormrider" } },
    });
    expect(result.error).toBeNull();
  });

  it("surfaces the Supabase error message on failure", async () => {
    jest.mocked(supabase.auth.signUp).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: "Email already registered" },
    } as unknown as any);

    const result = await signUpWithEmail({
      email: "rider@example.com",
      password: "SecurePass123",
      username: "stormrider",
    });

    expect(result.error).toBe("Email already registered");
  });
});
