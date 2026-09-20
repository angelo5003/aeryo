import { act, render, screen } from "@testing-library/react";
import { AuthProvider } from "@/app/providers/Auth/AuthProvider";
import { Provider } from "@/components/ui/provider";
import AuthLayout from "./layout";

const routerReplace = jest.fn();

// Mutable per-test pathname — Jest mock factories can only close over
// variables prefixed "mock" (babel-plugin-jest-hoist), same constraint
// signup/page.test.tsx's routerReplace already works around.
let mockPathname = "/signup";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: routerReplace, push: jest.fn() }),
  usePathname: () => mockPathname,
}));

// Drives useAuth() through the real AuthProvider, same pattern as
// signup/page.test.tsx: stub the Supabase client's onAuthStateChange and
// expose authCallback so a test can flip the session truthy.
let authCallback: (session: unknown) => void = () => {};

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (
        callback: (event: string, session: unknown) => void,
      ) => {
        authCallback = (session) => callback("SIGNED_IN", session);
        callback("INITIAL_SESSION", null);
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      },
    },
  },
}));

const buildComponent = () =>
  render(
    <Provider>
      <AuthProvider>
        <AuthLayout>
          <div>Form content</div>
        </AuthLayout>
      </AuthProvider>
    </Provider>,
  );

describe("AuthLayout", () => {
  beforeEach(() => {
    routerReplace.mockClear();
    authCallback = () => {};
    mockPathname = "/signup";
  });

  it("renders the AERYO heading once the auth state is ready", () => {
    buildComponent();

    expect(
      screen.getByRole("heading", { name: "AERYO" }),
    ).toBeInTheDocument();
  });

  it("renders the page content passed as children", () => {
    buildComponent();

    expect(screen.getByText("Form content")).toBeInTheDocument();
  });

  it("redirects to / once a session exists", async () => {
    buildComponent();

    await act(async () => {
      authCallback({ user: { id: "1" } });
    });

    expect(routerReplace).toHaveBeenCalledWith("/");
  });

  it("shows the login switch-link on /signup", () => {
    mockPathname = "/signup";
    buildComponent();

    expect(
      screen.getByText("Already have an account?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("shows the create-account switch-link on /login", () => {
    mockPathname = "/login";
    buildComponent();

    expect(screen.getByText("New to AERYO?")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create account" }),
    ).toHaveAttribute("href", "/signup");
  });
});
