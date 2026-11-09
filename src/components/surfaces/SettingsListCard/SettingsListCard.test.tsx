import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { SettingsListCard } from "./SettingsListCard";
import type { SettingsListCardProps } from "./SettingsListCard.types";

const buildComponent = (props?: Partial<SettingsListCardProps>) =>
  render(
    <Provider>
      <SettingsListCard label="Riding" {...props}>
        <a href="/settings/riding">Riding preferences</a>
        <a href="/settings/gear">My gear</a>
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

  test("should name the group after the label when a label is given", () => {
    buildComponent();

    expect(screen.getByRole("group", { name: "Riding" })).toBeInTheDocument();
    expect(screen.getByText("Riding")).toBeInTheDocument();
  });

  test("should leave the group unnamed and show no label when no label is given", () => {
    buildComponent({ label: undefined });

    expect(screen.queryByText("Riding")).not.toBeInTheDocument();
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-labelledby");
  });
});
