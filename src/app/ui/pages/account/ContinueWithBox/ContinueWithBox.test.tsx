import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import ContinueWithBox from "./ContinueWithBox";

describe("ContinueWithBox", () => {
  it("renders the divider label, every social CTA, and the login link", () => {
    render(<ContinueWithBox />, { wrapper: Provider });

    expect(screen.getByText("Or Continue With")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Apple" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Google" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue with Facebook" }),
    ).toBeInTheDocument();

    const loginLink = screen.getByRole("link", { name: "Log in" });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "#");
  });
});
