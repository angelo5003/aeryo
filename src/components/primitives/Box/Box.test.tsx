import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { LuArrowRight, LuWind } from "react-icons/lu";
import { Provider } from "@/components/ui/provider";
import { Box } from "./Box";
import type { BoxProps } from "./Box.types";

const buildComponent = (props?: BoxProps) =>
  render(
    <Provider>
      <Box data-testid="box" {...props} />
    </Provider>,
  );

// A Box has no role or accessible name, so a test id is the only way to find it.
const getBox = () => screen.getByTestId("box");

describe("Box", () => {
  test("should render only its content when no icons are given", () => {
    buildComponent({ children: "Wind rising" });

    expect(getBox().childNodes).toHaveLength(1);
    expect(getBox()).toHaveTextContent("Wind rising");
  });

  test("should place the icons before and after the content when both are given", () => {
    buildComponent({
      iconLeft: <LuWind data-testid="left-icon" />,
      children: "Wind rising",
      iconRight: <LuArrowRight data-testid="right-icon" />,
    });

    const boxParts = getBox().childNodes;

    expect(boxParts).toHaveLength(3);
    expect(boxParts[0]).toBe(screen.getByTestId("left-icon"));
    expect(boxParts[1]).toHaveTextContent("Wind rising");
    expect(boxParts[2]).toBe(screen.getByTestId("right-icon"));
  });

  test.each(["iconLeft", "iconRight"] as const)(
    "should lay out in a row when only %s is given",
    (iconPropName) => {
      buildComponent({ [iconPropName]: <LuWind />, children: "Wind rising" });

      expect(getBox()).toHaveStyle({ display: "flex", alignItems: "center" });
    },
  );

  test("should keep the caller's layout props when icons are given", () => {
    buildComponent({
      iconLeft: <LuWind />,
      display: "inline-flex",
      alignItems: "flex-start",
    });

    expect(getBox()).toHaveStyle({
      display: "inline-flex",
      alignItems: "flex-start",
    });
  });

  test("should style its only child when asChild is used without icons", () => {
    buildComponent({ asChild: true, children: <a href="/spots">Spots</a> });

    expect(screen.getByRole("link", { name: "Spots" })).toBe(getBox());
  });

  test("should pass the ref to its element when icons are given", () => {
    const boxRef = createRef<HTMLDivElement>();

    render(
      <Provider>
        <Box ref={boxRef} data-testid="box" iconLeft={<LuWind />} />
      </Provider>,
    );

    expect(boxRef.current).toBe(getBox());
  });
});
