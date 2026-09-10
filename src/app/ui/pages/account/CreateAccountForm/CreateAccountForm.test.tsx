import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import CreateAccountForm from "./CreateAccountForm";

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
  it("renders the email, username, password, and confirm-password fields plus the continue-with composition", () => {
    render(<CreateAccountForm />, { wrapper: Provider });

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
    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
  });

  it("shows every schema validation error when submitted empty", async () => {
    render(<CreateAccountForm />, { wrapper: Provider });

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
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    fillField("Confirm Password", "SomethingElse123");
    await submit();

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("submits without error once every field satisfies the schema", async () => {
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    await submit();

    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
  });
});
