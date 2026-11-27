import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import SettingsPage from "./page";

const buildComponent = () =>
  render(
    <Provider>
      <SettingsPage />
    </Provider>,
  );

describe("SettingsPage", () => {
  it("should render the SettingsPage", () => {
    buildComponent();
    expect(
      screen.getByRole("link", { name: "JD John Doe john.doe@example.com" }),
    ).toBeInTheDocument();

    screen.debug();
  });
});
