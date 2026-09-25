import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("should link back to home when a page doesn't exist", () => {
    render(
      <Provider>
        <NotFound />
      </Provider>,
    );

    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
