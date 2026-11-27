import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { LuWind } from "react-icons/lu";
import { Provider } from "@/components/ui/provider";
import { Icon } from "./Icon";
import type { IconProps } from "./Icon.types";

const buildComponent = (props?: IconProps) =>
  render(
    <Provider>
      <Icon as={LuWind} data-testid="icon" {...props} />
    </Provider>,
  );

// A decorative icon has no role or name, so a test id is the only way to find it.
const getIcon = () => screen.getByTestId("icon");

describe("Icon", () => {
  test("should render an svg from the icon component given in as", () => {
    buildComponent();

    expect(getIcon().tagName.toLowerCase()).toBe("svg");
  });

  test("should hide itself from screen readers when it has no label", () => {
    buildComponent();

    expect(getIcon()).toHaveAttribute("aria-hidden", "true");
    expect(getIcon()).not.toHaveAttribute("role");
  });

  test("should be a labelled image when aria-label is given", () => {
    buildComponent({ "aria-label": "Wind speed" });

    expect(screen.getByRole("img", { name: "Wind speed" })).toBe(getIcon());
    expect(getIcon()).not.toHaveAttribute("aria-hidden");
  });

  test("should be a labelled image when aria-labelledby is given", () => {
    render(
      <Provider>
        <span id="wind-label">Wind speed</span>
        <Icon as={LuWind} aria-labelledby="wind-label" />
      </Provider>,
    );

    expect(screen.getByRole("img", { name: "Wind speed" })).toBeInTheDocument();
  });

  test("should keep the caller's aria-hidden value when one is given", () => {
    buildComponent({ "aria-label": "Wind speed", "aria-hidden": true });

    expect(getIcon()).toHaveAttribute("aria-hidden", "true");
  });

  test("should pass style props through to the svg", () => {
    buildComponent({ color: "accent.solid", boxSize: "10" });

    expect(getIcon()).toHaveStyle({
      width: "var(--chakra-sizes-10)",
      height: "var(--chakra-sizes-10)",
    });
  });

  test("should style its only child when asChild is used", () => {
    render(
      <Provider>
        <Icon asChild boxSize="6" data-testid="icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </Icon>
      </Provider>,
    );

    expect(getIcon().querySelector("circle")).toBeInTheDocument();
    expect(getIcon()).toHaveStyle({
      width: "var(--chakra-sizes-6)",
      height: "var(--chakra-sizes-6)",
    });
  });

  test("should pass the ref to its svg element", () => {
    const iconRef = createRef<SVGSVGElement>();

    render(
      <Provider>
        <Icon as={LuWind} ref={iconRef} data-testid="icon" />
      </Provider>,
    );

    expect(iconRef.current).toBe(getIcon());
  });
});
