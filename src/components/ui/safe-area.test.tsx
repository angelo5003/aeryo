import { render, screen } from "@testing-library/react";

import { SafeAreaProvider, useSafeArea } from "./safe-area";

function Consumer() {
  const insets = useSafeArea();
  return (
    <div data-testid="insets">
      {insets.top},{insets.bottom},{insets.left},{insets.right}
    </div>
  );
}

describe("useSafeArea", () => {
  it("returns zero insets when used outside SafeAreaProvider", () => {
    render(<Consumer />);
    expect(screen.getByTestId("insets")).toHaveTextContent("0,0,0,0");
  });

  it("provides numeric insets when wrapped in SafeAreaProvider", () => {
    // jsdom doesn't resolve CSS `env()`/`var()`, so these read back as 0
    // here — this test only proves the plumbing (context, measurement
    // effect) doesn't crash and produces well-formed numbers. Real
    // non-zero values only exist inside the native iOS/Android WebView;
    // see the spec's manual-verification testing plan for that.
    render(
      <SafeAreaProvider>
        <Consumer />
      </SafeAreaProvider>,
    );
    expect(screen.getByTestId("insets")).toHaveTextContent("0,0,0,0");
  });

  it("still renders children when wrapped in SafeAreaProvider", () => {
    render(
      <SafeAreaProvider>
        <div data-testid="child">content</div>
      </SafeAreaProvider>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("content");
  });

  it("renders an inert, non-interactive probe element alongside children", () => {
    render(
      <SafeAreaProvider>
        <div>content</div>
      </SafeAreaProvider>,
    );
    const probe = document.querySelector('[aria-hidden="true"]');
    expect(probe).not.toBeNull();
    expect(probe).toHaveStyle({ pointerEvents: "none" });
  });
});
