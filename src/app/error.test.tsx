import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import ErrorPage from "./error";

const buildComponent = (retry = jest.fn()) =>
  render(
    <Provider>
      <ErrorPage error={new Error("boom")} retry={retry} />
    </Provider>,
  );

describe("ErrorPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call retry when the user taps Try again", () => {
    const retry = jest.fn();
    buildComponent(retry);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });
});
