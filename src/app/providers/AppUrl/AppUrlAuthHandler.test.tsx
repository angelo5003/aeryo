import { act, render } from "@testing-library/react";

import { AppUrlAuthHandler } from "./AppUrlAuthHandler";

const addListener = jest.fn();
const getLaunchUrl = jest.fn();
const remove = jest.fn().mockResolvedValue(undefined);
const isNativePlatform = jest.fn();
const setSession = jest.fn();
const toasterCreate = jest.fn();

jest.mock("@capacitor/core", () => ({
  Capacitor: {
    isNativePlatform: () => isNativePlatform(),
  },
}));

jest.mock("@capacitor/app", () => ({
  App: {
    addListener: (...args: unknown[]) => addListener(...args),
    getLaunchUrl: (...args: unknown[]) => getLaunchUrl(...args),
  },
}));

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      setSession: (...args: unknown[]) => setSession(...args),
    },
  },
}));

jest.mock("@/components/data-display/Toaster", () => ({
  toaster: {
    create: (...args: unknown[]) => toasterCreate(...args),
  },
}));

// Fires the app-open event the same way a real link tap would, and waits
// for the resulting state updates to settle.
const openWithUrl = async (url: string) => {
  await act(async () => {
    getLaunchUrl.mockResolvedValueOnce({ url });
    render(<AppUrlAuthHandler />);
  });
};

describe("AppUrlAuthHandler", () => {
  beforeEach(() => {
    addListener.mockReset();
    getLaunchUrl.mockReset();
    remove.mockClear();
    isNativePlatform.mockReset();
    setSession.mockReset();
    toasterCreate.mockReset();

    isNativePlatform.mockReturnValue(true);
    addListener.mockResolvedValue({ remove });
    getLaunchUrl.mockResolvedValue(undefined);
    setSession.mockResolvedValue({ error: null });
  });

  it("signs the user in when opened via a valid confirmation link", async () => {
    await openWithUrl(
      "com.aeryo.app://auth-confirm#access_token=abc&refresh_token=def",
    );

    expect(setSession).toHaveBeenCalledWith({
      access_token: "abc",
      refresh_token: "def",
    });
  });

  it("ignores links that are not the confirmation callback", async () => {
    await openWithUrl("com.aeryo.app://invite");

    expect(setSession).not.toHaveBeenCalled();
  });

  it("ignores a confirmation link missing its tokens", async () => {
    await openWithUrl("com.aeryo.app://auth-confirm");

    expect(setSession).not.toHaveBeenCalled();
  });

  it("passes confirmation failure copy to the toaster when Supabase rejects the tokens", async () => {
    setSession.mockResolvedValue({ error: new Error("expired") });

    await openWithUrl(
      "com.aeryo.app://auth-confirm#access_token=abc&refresh_token=def",
    );
    // Let the setSession promise's .then() callback run.
    await act(async () => {});

    expect(toasterCreate).toHaveBeenCalledTimes(1);
    expect(toasterCreate).toHaveBeenCalledWith({
      title: "Couldn't confirm your account",
      description:
        "That link may have expired or already been used. Try signing up again.",
      type: "error",
    });
  });

  it("does not show a toast when the sign-in succeeds", async () => {
    await openWithUrl(
      "com.aeryo.app://auth-confirm#access_token=abc&refresh_token=def",
    );
    await act(async () => {});

    expect(toasterCreate).not.toHaveBeenCalled();
  });
});
