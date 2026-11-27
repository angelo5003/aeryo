import { render, screen } from "@testing-library/react";
import { LuWind } from "react-icons/lu";
import { Provider } from "@/components/ui/provider";
import { SettingsRow } from "./SettingsRow";
import type { SettingsRowProps } from "./SettingsRow.types";

const buildComponent = (props?: Partial<SettingsRowProps>) =>
  render(
    <Provider>
      <ul>
        <SettingsRow title="Riding preferences" href="/settings" {...props} />
      </ul>
    </Provider>,
  );

describe("SettingsRow", () => {
  test("should show the title and the value when both are given", () => {
    buildComponent({ value: "14–28 kt · Sea" });

    expect(screen.getByText("Riding preferences")).toBeInTheDocument();
    expect(screen.getByText("14–28 kt · Sea")).toBeInTheDocument();
  });

  test("should render a link to the destination when rendered", () => {
    buildComponent({ href: "/community" });

    expect(
      screen.getByRole("link", { name: "Riding preferences" }),
    ).toHaveAttribute("href", "/community");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("should render as a list item when rendered", () => {
    buildComponent();

    expect(screen.getByRole("listitem")).toContainElement(
      screen.getByRole("link", { name: "Riding preferences" }),
    );
  });

  test("should hide the arrow from screen readers when rendered", () => {
    const { container } = buildComponent();

    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("should show the icon and keep it out of the link name when an icon is given", () => {
    const { container } = buildComponent({ icon: LuWind });

    expect(container.querySelectorAll("svg")).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Riding preferences" }),
    ).toBeInTheDocument();
  });

  test("should show only the arrow when no icon is given", () => {
    const { container } = buildComponent();

    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});
