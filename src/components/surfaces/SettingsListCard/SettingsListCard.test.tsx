import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { SettingsListCard } from "./SettingsListCard";
import { SettingsRow } from "./SettingsRow";
import type { SettingsListCardProps } from "./SettingsListCard.types";

const buildComponent = (props?: Partial<SettingsListCardProps>) =>
  render(
    <Provider>
      <SettingsListCard label="Riding" {...props}>
        <SettingsRow title="Riding preferences" href="/settings" />
        <SettingsRow title="My gear" href="/community" />
      </SettingsListCard>
    </Provider>,
  );

describe("SettingsListCard", () => {
  test("should show every row when rendered", () => {
    buildComponent();

    expect(
      screen.getByRole("link", { name: "Riding preferences" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My gear" })).toBeInTheDocument();
  });

  test("should announce a list with one item per row when rendered", () => {
    buildComponent();

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("should name the list after the label when a label is given", () => {
    buildComponent();

    expect(screen.getByRole("list", { name: "Riding" })).toBeInTheDocument();
    expect(screen.getByText("Riding")).toBeInTheDocument();
  });

  test("should leave the list unnamed and show no label when no label is given", () => {
    buildComponent({ label: undefined });

    expect(screen.queryByText("Riding")).not.toBeInTheDocument();
    expect(screen.getByRole("list")).not.toHaveAttribute("aria-labelledby");
  });
});
