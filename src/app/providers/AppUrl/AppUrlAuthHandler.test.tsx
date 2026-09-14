import { act, render } from "@testing-library/react";

import { AppUrlAuthHandler } from "./AppUrlAuthHandler";

const addListener = jest.fn();
const getLaunchUrl = jest.fn();
const remove = jest.fn().mockResolvedValue(undefined);
const isNativePlatform = jest.fn();
const setSession = jest.fn();

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

  it("logs an error when Supabase rejects the tokens", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    setSession.mockResolvedValue({ error: new Error("expired") });

    await openWithUrl(
      "com.aeryo.app://auth-confirm#access_token=abc&refresh_token=def",
    );
    // Let the setSession promise's .then() callback run.
    await act(async () => {});

    expect(spy).toHaveBeenCalledWith(
      "AppUrlAuthHandler: setSession failed",
      expect.any(Error),
    );
    spy.mockRestore();
  });
});
