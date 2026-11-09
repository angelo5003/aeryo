import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { ChipGroup } from "./ChipGroup";
import type { ChipGroupProps } from "./ChipGroup.types";

const buildComponent = (props?: Partial<ChipGroupProps>) =>
  render(
    <Provider>
      <ChipGroup
        aria-label="Filter"
        items={["All", "Wind", "Sessions", "Community"]}
        {...(props as object)}
      />
    </Provider>,
  );

describe("ChipGroup", () => {
  test("should name the group and show every chip as a button when rendered", () => {
    buildComponent();

    expect(screen.getByRole("group", { name: "Filter" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  test("should show a chip as pressed when it is the default value", () => {
    buildComponent({ defaultValue: "Wind" });

    expect(screen.getByRole("button", { name: "Wind" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("should move the selection to the pressed chip when type is single", () => {
    const handleValueChange = jest.fn();
    buildComponent({ defaultValue: "All", onValueChange: handleValueChange });

    fireEvent.click(screen.getByRole("button", { name: "Sessions" }));

    expect(screen.getByRole("button", { name: "Sessions" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(handleValueChange).toHaveBeenCalledWith("Sessions");
  });

  test("should keep the chip picked when the picked chip is pressed again and type is single", () => {
    buildComponent({ defaultValue: "Wind" });

    fireEvent.click(screen.getByRole("button", { name: "Wind" }));

    expect(screen.getByRole("button", { name: "Wind" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("should add and remove chips from the selection when type is multiple", () => {
    const handleValueChange = jest.fn();
    buildComponent({
      type: "multiple",
      defaultValue: ["All"],
      onValueChange: handleValueChange,
    });

    fireEvent.click(screen.getByRole("button", { name: "Wind" }));
    expect(handleValueChange).toHaveBeenLastCalledWith(["All", "Wind"]);

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(handleValueChange).toHaveBeenLastCalledWith(["Wind"]);
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("should follow the value prop when the parent controls the selection", () => {
    const { rerender } = buildComponent({ value: "All" });

    rerender(
      <Provider>
        <ChipGroup
          aria-label="Filter"
          items={["All", "Wind", "Sessions", "Community"]}
          value="Community"
        />
      </Provider>,
    );

    expect(screen.getByRole("button", { name: "Community" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("should not select a chip when the chip is disabled", () => {
    const handleValueChange = jest.fn();
    buildComponent({
      items: [
        { value: "All", label: "All" },
        { value: "Wind", label: "Wind", disabled: true },
      ],
      defaultValue: "All",
      onValueChange: handleValueChange,
    });

    fireEvent.click(screen.getByRole("button", { name: "Wind" }));

    expect(screen.getByRole("button", { name: "Wind" })).toBeDisabled();
    expect(handleValueChange).not.toHaveBeenCalled();
  });
});
