import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { FormSuccess } from "./FormSuccess";
import type { FormSuccessProps } from "./FormSuccess.types";

const buildComponent = (props?: Partial<FormSuccessProps>) =>
  render(
    <Provider>
      <FormSuccess {...props} />
    </Provider>,
  );

describe("FormSuccess", () => {
  test("should render the message as a status region when children are given", () => {
    buildComponent({ children: "Check your inbox to confirm your email." });

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(
      screen.getByText("Check your inbox to confirm your email."),
    ).toBeInTheDocument();
  });

  test("should render nothing when there are no children", () => {
    buildComponent();

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
