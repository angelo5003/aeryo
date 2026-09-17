import { act, render, screen } from "@testing-library/react";
import { AuthProvider } from "@/app/providers/Auth/AuthProvider";
import { OnboardingProvider } from "@/app/providers/Onboarding/Provider/OnboardingProvider";
import { Provider } from "@/components/ui/provider";
import SignupPage from "./page";

const routerReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: routerReplace, push: jest.fn() }),
}));

jest.mock(
  "@/app/ui/pages/account/utilities/accountActions/accountActions",
  () => ({
    accountActions: () => ({
      createAccount: jest.fn().mockResolvedValue(null),
    }),
  }),
);

// OnboardingProvider reads this on mount — stub it so it settles
// synchronously instead of leaving state stuck at loading (matches
// CreateAccountForm.test.tsx, which needs the same real context ancestor).
jest.mock("@/app/providers/Onboarding/Provider/onboardingStorage", () => ({
  hasSeenOnboarding: () => Promise.resolve(false),
  markOnboardingSeen: () => Promise.resolve(undefined),
}));

// SignupPage now reads useAuth() to redirect once a session exists. Starts
// at null (matches page.test.tsx's mock shape for the same module) but
// exposes authCallback so a test can flip it truthy, like signUp() does.
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
      <OnboardingProvider>
        <AuthProvider>
          <SignupPage />
        </AuthProvider>
      </OnboardingProvider>
    </Provider>,
  );

// `required` fields append a trailing "*" (Field's RequiredIndicator) to
// the label's textContent, so an exact match never hits — anchor to the
// start of the label instead (matches CreateAccountForm.test.tsx).
const labelStartingWith = (label: string) => new RegExp(`^${label}`);

describe("SignupPage", () => {
  beforeEach(() => {
    routerReplace.mockClear();
    authCallback = () => {};
  });

  it("redirects to / once a session exists (e.g. right after signup)", async () => {
    buildComponent();

    await act(async () => {
      authCallback({ user: { id: "1" } });
    });

    expect(routerReplace).toHaveBeenCalledWith("/");
  });

  it("renders the AERYO heading above the create-account form", () => {
    buildComponent();

    expect(
      screen.getByRole("heading", { name: "AERYO" }),
    ).toBeInTheDocument();
  });

  it("renders the create-account form fields and submit CTA", () => {
    buildComponent();

    expect(
      screen.getByLabelText(labelStartingWith("Email")),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(labelStartingWith("Username")),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(labelStartingWith("Password")),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(labelStartingWith("Confirm Password")),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Account" }),
    ).toBeInTheDocument();
  });

  it("renders the login placeholder link", () => {
    buildComponent();

    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
  });
});
