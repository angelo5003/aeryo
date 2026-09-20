import { render, screen } from "@testing-library/react";
import { OnboardingProvider } from "@/app/providers/Onboarding/Provider/OnboardingProvider";
import { Provider } from "@/components/ui/provider";
import SignupPage from "./page";

// SignupPage is now a thin page inside (auth)/layout.tsx — the heading,
// keyboard inset, redirect-when-logged-in, and footer switch-link all moved
// to AuthLayout and are covered by (auth)/layout.test.tsx. This file only
// covers what SignupPage itself still does: render CreateAccountForm.

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

const buildComponent = () =>
  render(
    <Provider>
      <OnboardingProvider>
        <SignupPage />
      </OnboardingProvider>
    </Provider>,
  );

// `required` fields append a trailing "*" (Field's RequiredIndicator) to
// the label's textContent, so an exact match never hits — anchor to the
// start of the label instead (matches CreateAccountForm.test.tsx).
const labelStartingWith = (label: string) => new RegExp(`^${label}`);

describe("SignupPage", () => {
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
});
