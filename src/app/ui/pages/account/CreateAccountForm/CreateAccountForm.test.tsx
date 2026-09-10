import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { signUpWithEmail } from "@/lib/supabase/account";
import CreateAccountForm from "./CreateAccountForm";
import { useUsernameAvailability } from "../hooks/useUsernameAvailability";

jest.mock("@/lib/supabase/account", () => ({
  signUpWithEmail: jest.fn(),
}));

jest.mock("../hooks/useUsernameAvailability", () => ({
  useUsernameAvailability: jest.fn(),
}));

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
    jest.mocked(useUsernameAvailability).mockReturnValue("available");
    jest.mocked(signUpWithEmail).mockResolvedValue({ error: null });
  });

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

  it("blocks submission and shows an error when the username is taken", async () => {
    jest.mocked(useUsernameAvailability).mockReturnValue("taken");
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    await submit();

    expect(screen.getByText("That username is taken")).toBeInTheDocument();
    expect(signUpWithEmail).not.toHaveBeenCalled();
  });

  it("calls signUpWithEmail once every field satisfies the schema and the username is available", async () => {
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    await submit();

    expect(signUpWithEmail).toHaveBeenCalledWith({
      email: "user@example.com",
      username: "stormrider",
      password: "SecurePass123",
      confirmPassword: "SecurePass123",
    });
    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
  });

  it("shows the server's error message when signUpWithEmail fails", async () => {
    jest
      .mocked(signUpWithEmail)
      .mockResolvedValue({ error: "Email already registered" });
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    await submit();

    expect(screen.getByText("Email already registered")).toBeInTheDocument();
  });

  it("disables the submit button while the availability check is still running", () => {
    jest.mocked(useUsernameAvailability).mockReturnValue("checking");
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();

    expect(
      screen.getByRole("button", { name: "Create Account" }),
    ).toBeDisabled();
  });

  it("blocks submission while the availability check is still running", async () => {
    jest.mocked(useUsernameAvailability).mockReturnValue("checking");
    jest.mocked(signUpWithEmail).mockClear();
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    await submit();

    expect(signUpWithEmail).not.toHaveBeenCalled();
  });

  it("maps the trigger's collision error to a username-field message", async () => {
    jest
      .mocked(signUpWithEmail)
      .mockResolvedValue({ error: "Database error saving new user" });
    render(<CreateAccountForm />, { wrapper: Provider });

    fillValidForm();
    await submit();

    expect(screen.getByText("That username is taken")).toBeInTheDocument();
    expect(
      screen.queryByText("Database error saving new user"),
    ).not.toBeInTheDocument();
  });
});
