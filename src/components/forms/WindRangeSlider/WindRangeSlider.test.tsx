import { render, screen } from "@testing-library/react";
import { Provider } from "@/components/ui/provider";
import { WindRangeSlider } from "./WindRangeSlider";
import type { WindRangeSliderProps } from "./WindRangeSlider.types";

const buildComponent = (props?: Partial<WindRangeSliderProps>) =>
  render(
    <Provider>
      <WindRangeSlider label="Wind range" defaultValue={[14, 28]} {...props} />
    </Provider>,
  );

describe("WindRangeSlider", () => {
  test("should show the label and the chosen range when rendered", () => {
    buildComponent();

    expect(screen.getByText("Wind range")).toBeInTheDocument();
    expect(screen.getByText("14–28 kt")).toBeInTheDocument();
  });

  test("should show a custom unit when unit is given", () => {
    buildComponent({ unit: "m/s" });

    expect(screen.getByText("14–28 m/s")).toBeInTheDocument();
  });

  // Chakra hides the handles (`visibility: hidden`) until the browser has
  // measured them, which never happens in jsdom. They are found with
  // `hidden: true`, and their names are checked through `aria-labelledby`
  // because jsdom gives hidden elements an empty accessible name.
  const getHandles = () => screen.getAllByRole("slider", { hidden: true });

  const getHandleName = (handle: HTMLElement) =>
    handle
      .getAttribute("aria-labelledby")
      ?.split(" ")
      .map((id) => document.getElementById(id)?.textContent)
      .join(" ");

  test("should give each handle its own name and value when rendered", () => {
    buildComponent();

    const [lowHandle, highHandle] = getHandles();

    expect(getHandleName(lowHandle)).toBe("Minimum wind speed");
    expect(lowHandle).toHaveAttribute("aria-valuenow", "14");
    expect(getHandleName(highHandle)).toBe("Maximum wind speed");
    expect(highHandle).toHaveAttribute("aria-valuenow", "28");
  });

  test("should show the given range when it is controlled", () => {
    buildComponent({ value: [10, 20], defaultValue: undefined });

    expect(screen.getByText("10–20 kt")).toBeInTheDocument();
  });
});
