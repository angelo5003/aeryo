import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { SettingsRow } from "./SettingsRow";
import type { SettingsRowProps } from "./SettingsRow.types";

const buildComponent = (props?: Partial<SettingsRowProps>) =>
  render(
    <Provider>
      <SettingsRow title="Riding preferences" {...props} />
    </Provider>,
  );

describe("SettingsRow", () => {
  test("should show the title and the value when both are given", () => {
    buildComponent({ value: "14–28 kt · Sea" });

    expect(screen.getByText("Riding preferences")).toBeInTheDocument();
    expect(screen.getByText("14–28 kt · Sea")).toBeInTheDocument();
  });

  test("should call onClick when the row is pressed", () => {
    const onClick = jest.fn();
    buildComponent({ onClick });

    fireEvent.click(screen.getByRole("button", { name: "Riding preferences" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should render a link to the destination when href is given", () => {
    buildComponent({ href: "/settings" });

    expect(
      screen.getByRole("link", { name: "Riding preferences" }),
    ).toHaveAttribute("href", "/settings");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("should hide the arrow from screen readers when showChevron is on", () => {
    const { container } = buildComponent({ showChevron: true });

    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("should show no arrow when showChevron is not set", () => {
    const { container } = buildComponent();

    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
