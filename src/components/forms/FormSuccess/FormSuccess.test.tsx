import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { FormSuccess } from "./FormSuccess";

describe("FormSuccess", () => {
  test("should render the message as a status region when children are given", () => {
    render(<FormSuccess>Check your inbox to confirm your email.</FormSuccess>, {
      wrapper: Provider,
    });

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(
      screen.getByText("Check your inbox to confirm your email."),
    ).toBeInTheDocument();
  });

  test("should render nothing when there are no children", () => {
    render(<FormSuccess />, { wrapper: Provider });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
