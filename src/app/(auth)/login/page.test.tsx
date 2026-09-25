import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import LoginPage from "./page";

// LoginPage is a thin page inside (auth)/layout.tsx — heading, keyboard
// inset, redirect-when-logged-in, and footer switch-link all live in
// AuthLayout and are covered by (auth)/layout.test.tsx. This file only
// covers what LoginPage itself still does: render LoginForm.

jest.mock(
  "@/lib/account/accountActions",
  () => ({
    accountActions: () => ({
      loginAccount: jest.fn().mockResolvedValue(undefined),
    }),
  }),
);

const buildComponent = () =>
  render(
    <Provider>
      <LoginPage />
    </Provider>,
  );

// `required` fields append a trailing "*" (Field's RequiredIndicator) to
// the label's textContent, so an exact match never hits — anchor to the
// start of the label instead (matches CreateAccountForm.test.tsx).
const labelStartingWith = (label: string) => new RegExp(`^${label}`);

describe("LoginPage", () => {
  it("renders the login form fields and submit CTA", () => {
    buildComponent();

    expect(
      screen.getByLabelText(labelStartingWith("Email or Username")),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(labelStartingWith("Password")),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login" }),
    ).toBeInTheDocument();
  });
});
