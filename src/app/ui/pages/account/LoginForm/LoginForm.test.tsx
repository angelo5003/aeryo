import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import LoginForm from "./LoginForm";

const loginAccount = jest.fn();

jest.mock(
  "@/app/ui/pages/account/utilities/accountActions/accountActions",
  () => ({
    accountActions: () => ({
      loginAccount: (...args: unknown[]) => loginAccount(...args),
    }),
  }),
);

const buildComponent = () =>
  render(
    <Provider>
      <LoginForm />
    </Provider>,
  );

// `required` fields append a trailing "*" (Field's RequiredIndicator) to
// the label's textContent, so an exact match never hits — anchor to the
// start of the label instead. Matches CreateAccountForm.test.tsx.
const labelStartingWith = (label: string) => new RegExp(`^${label}`);

const fillField = (label: string, value: string) => {
  fireEvent.change(screen.getByLabelText(labelStartingWith(label)), {
    target: { value },
  });
};

const fillValidForm = () => {
  fillField("Email or Username", "user@example.com");
  fillField("Password", "SecurePass123");
};

const submit = async () => {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
  });
};

describe("LoginForm", () => {
  beforeEach(() => {
    loginAccount.mockReset();
  });

  it("renders the identifier and password fields plus the submit CTA", () => {
    buildComponent();

    expect(
      screen.getByLabelText(labelStartingWith("Email or Username")),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(labelStartingWith("Password")),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("shows every schema validation error when submitted empty", async () => {
    buildComponent();

    await submit();

    expect(
      screen.getByText("Email or username is required"),
    ).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("accepts a username identifier without an email-shape error", async () => {
    loginAccount.mockResolvedValue(undefined);
    buildComponent();

    fillField("Email or Username", "stormrider");
    fillField("Password", "SecurePass123");
    await submit();

    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
  });

  it("clears the form once loginAccount resolves", async () => {
    loginAccount.mockResolvedValue(undefined);
    buildComponent();

    fillValidForm();
    await submit();

    expect(
      screen.getByLabelText(labelStartingWith("Email or Username")),
    ).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows the generic credentials error when loginAccount rejects, without leaking which field was wrong", async () => {
    loginAccount.mockRejectedValue(
      new Error(
        "Invalid login credentials. Check your email/username and password and try again.",
      ),
    );
    buildComponent();

    fillValidForm();
    await submit();

    expect(
      screen.getByText(
        "Invalid login credentials. Check your email/username and password and try again.",
      ),
    ).toBeInTheDocument();
    // Failed submit shouldn't wipe what the user typed.
    expect(
      screen.getByLabelText(labelStartingWith("Email or Username")),
    ).toHaveValue("user@example.com");
  });
});
