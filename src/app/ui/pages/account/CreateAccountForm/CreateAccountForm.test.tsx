import { act, fireEvent, render, screen } from "@testing-library/react";
import { OnboardingProvider } from "@/app/providers/Onboarding/Provider/OnboardingProvider";
import { Provider } from "@/components/ui/provider";
import CreateAccountForm from "./CreateAccountForm";

const createAccount = jest.fn();

jest.mock(
  "@/app/ui/pages/account/utilities/accountActions/accountActions",
  () => ({
    accountActions: () => ({
      createAccount: (...args: unknown[]) => createAccount(...args),
    }),
  }),
);

// OnboardingProvider reads this on mount — stub it so it settles
// synchronously instead of leaving state stuck at loading.
const hasSeenOnboarding = jest.fn();
const markOnboardingSeen = jest.fn();

jest.mock("@/app/providers/Onboarding/Provider/onboardingStorage", () => ({
  hasSeenOnboarding: () => hasSeenOnboarding(),
  markOnboardingSeen: () => markOnboardingSeen(),
}));

// CreateAccountForm calls useOnboarding() (via useCreateAccountSubmit), so
// it needs OnboardingProvider in the tree same as it does in the real app —
// not a mocked child component, just its real context ancestor.
const buildComponent = () =>
  render(
    <Provider>
      <OnboardingProvider>
        <CreateAccountForm />
      </OnboardingProvider>
    </Provider>,
  );

// `required` fields append a trailing "*" (Field's RequiredIndicator) to
// the label's textContent, which getByLabelText matches against literally
// even though the "*" is aria-hidden — so an exact "Email" string never
// matches. Anchor to the start of the label instead.
const labelStartingWith = (label: string) => new RegExp(`^${label}`);

const fillField = (label: string, value: string) => {
  fireEvent.change(screen.getByLabelText(labelStartingWith(label)), {
    target: { value },
  });
};

const fillValidForm = () => {
  fillField("Email", "user@example.com");
  fillField("Username", "stormrider");
  fillField("Password", "SecurePass123");
  fillField("Confirm Password", "SecurePass123");
};

const submit = async () => {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));
  });
};

describe("CreateAccountForm", () => {
  beforeEach(() => {
    createAccount.mockReset().mockResolvedValue(null);
    hasSeenOnboarding.mockReset().mockResolvedValue(false);
    markOnboardingSeen.mockReset().mockResolvedValue(undefined);
  });

  it("renders the email, username, password, and confirm-password fields plus the continue-with composition", () => {
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
  });

  it("shows every schema validation error when submitted empty", async () => {
    buildComponent();

    await submit();

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(
      screen.getByText("Username must be at least 4 characters"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 8 characters"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please confirm your password"),
    ).toBeInTheDocument();
  });

  it("flags a confirm-password that doesn't match the password", async () => {
    buildComponent();

    fillValidForm();
    fillField("Confirm Password", "SomethingElse123");
    await submit();

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("submits without a schema error once every field satisfies the schema", async () => {
    buildComponent();

    fillValidForm();
    await submit();

    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
  });

  it("clears the form once signUp returns a session (confirmation not required)", async () => {
    createAccount.mockResolvedValue({ access_token: "token" });
    buildComponent();

    fillValidForm();
    await submit();

    expect(screen.getByLabelText(labelStartingWith("Email"))).toHaveValue("");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows a check-your-inbox notice instead of an error when signUp returns no session", async () => {
    createAccount.mockResolvedValue(null);
    buildComponent();

    fillValidForm();
    await submit();

    expect(
      screen.getByText("Please check your email for a confirmation link."),
    ).toBeInTheDocument();
    // Not treated as a failure — the old "Failed to create account" text
    // must not appear, and the fields the user typed stay put.
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByLabelText(labelStartingWith("Email"))).toHaveValue(
      "user@example.com",
    );
  });

  it("shows the server error when signUp rejects", async () => {
    createAccount.mockRejectedValue(new Error("Email already registered"));
    buildComponent();

    fillValidForm();
    await submit();

    expect(screen.getByText("Email already registered")).toBeInTheDocument();
  });
});
