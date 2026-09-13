import type { Session } from "@supabase/supabase-js";
import { act, render, screen } from "@testing-library/react";

type AuthStateCallback = (event: string, session: Session | null) => void;

let authStateCallback: AuthStateCallback;
const unsubscribe = jest.fn();

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (callback: AuthStateCallback) => {
        authStateCallback = callback;
        return { data: { subscription: { unsubscribe } } };
      },
    },
  },
}));

import { AuthProvider, useAuth } from "./AuthProvider";

// Minimal fake — AuthProvider only checks truthiness, never reads a field
// off it, so an empty shape stands in fine for a real Session.
const fakeSession = {} as Session;

function Consumer() {
  const { session, isReady } = useAuth();
  return (
    <div>
      <div data-testid="ready">{String(isReady)}</div>
      <div data-testid="session">{session ? "logged-in" : "logged-out"}</div>
    </div>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    unsubscribe.mockClear();
  });

  it("throws when useAuth is used outside an AuthProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
    spy.mockRestore();
  });

  it("stays not-ready and logged-out until Supabase answers", () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId("ready")).toHaveTextContent("false");
    expect(screen.getByTestId("session")).toHaveTextContent("logged-out");
  });

  it("reports logged-in once Supabase reports a session", () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    act(() => {
      authStateCallback("SIGNED_IN", fakeSession);
    });

    expect(screen.getByTestId("ready")).toHaveTextContent("true");
    expect(screen.getByTestId("session")).toHaveTextContent("logged-in");
  });

  it("reports logged-out once Supabase reports no session", () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    act(() => {
      authStateCallback("SIGNED_OUT", null);
    });

    expect(screen.getByTestId("ready")).toHaveTextContent("true");
    expect(screen.getByTestId("session")).toHaveTextContent("logged-out");
  });

  it("unsubscribes from Supabase's listener on unmount", () => {
    const { unmount } = render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
