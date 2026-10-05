import { act, render, screen } from "@testing-library/react";
import { AuthProvider } from "@/app/_providers/Auth/AuthProvider";
import { Provider } from "@/components/ui/provider";
import SignedInLayout from "./layout";

const routerReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: routerReplace, push: jest.fn() }),
}));

// Drives useAuth() through the real AuthProvider, same pattern as
// signup/page.test.tsx: stub the Supabase client's onAuthStateChange and
// expose authCallback so a test can flip the session truthy.
let authCallback: (session: unknown) => void = () => {};
let mockedInitialSession: boolean = true;

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (
        callback: (event: string, session: unknown) => void,
      ) => {
        authCallback = (session) => callback("SIGNED_IN", session);
        if (mockedInitialSession) {
          callback("INITIAL_SESSION", null);
        }
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      },
    },
  },
}));

const buildComponent = () =>
  render(
    <Provider>
      <AuthProvider>
        <SignedInLayout>
          <div>SignedInLayout content</div>
        </SignedInLayout>
      </AuthProvider>
    </Provider>,
  );

describe("SignedInLayout", () => {
  beforeEach(() => {
    routerReplace.mockClear();
    authCallback = () => {};
    mockedInitialSession = true;
  });

  it("should not render children when there is no session", () => {
    buildComponent();

    expect(routerReplace).toHaveBeenCalledWith("/");

    expect(
      screen.queryByText("SignedInLayout content"),
    ).not.toBeInTheDocument();
  });

  it("should render children when a session exists", async () => {
    buildComponent();

    await act(async () => {
      authCallback({ user: { id: "123" } });
    });

    expect(screen.getByText("SignedInLayout content")).toBeInTheDocument();
  });

  it("should not redirect while auth is still loading", () => {
    mockedInitialSession = false;
    buildComponent();

    expect(routerReplace).not.toHaveBeenCalled();
    expect(
      screen.queryByText("SignedInLayout content"),
    ).not.toBeInTheDocument();
  });
});
