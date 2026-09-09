import { act, render, screen } from "@testing-library/react";
import { ColorModeProvider, useColorMode } from "./color-mode";

function ColorModeLabel() {
  const { colorMode } = useColorMode();
  return <p>mode:{colorMode ?? "pending"}</p>;
}

describe("ColorModeProvider", () => {
  afterEach(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.style.colorScheme = "";
    window.localStorage.removeItem("theme");
  });

  it("does not render a script tag into the React tree", () => {
    const { container } = render(
      <ColorModeProvider>
        <span>child</span>
      </ColorModeProvider>,
    );

    expect(container.querySelector("script")).not.toBeInTheDocument();
  });

  it("resolves the system color mode after mount", async () => {
    await act(async () => {
      render(
        <ColorModeProvider>
          <ColorModeLabel />
        </ColorModeProvider>,
      );
    });

    // jest.setup.ts's matchMedia polyfill reports prefers-color-scheme as
    // light (`matches: false` for the dark query).
    expect(screen.getByText("mode:light")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("light");
  });
});
