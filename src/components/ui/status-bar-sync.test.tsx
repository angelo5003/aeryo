import type { ReactElement } from "react";
import { act, render } from "@testing-library/react";

import { StatusBarSync } from "./status-bar-sync";

const setStyle = jest.fn().mockResolvedValue(undefined);
const isNativePlatform = jest.fn();

jest.mock("@capacitor/core", () => ({
  Capacitor: {
    isNativePlatform: () => isNativePlatform(),
  },
  SystemBars: {
    setStyle: (...args: unknown[]) => setStyle(...args),
  },
  SystemBarsStyle: {
    Dark: "DARK",
    Light: "LIGHT",
  },
}));

const useColorMode = jest.fn();

jest.mock("./color-mode", () => ({
  useColorMode: () => useColorMode(),
}));

describe("StatusBarSync", () => {
  beforeEach(() => {
    setStyle.mockClear();
    isNativePlatform.mockReset();
    useColorMode.mockReset();
  });

  it("does nothing outside the native app shell", async () => {
    isNativePlatform.mockReturnValue(false);
    useColorMode.mockReturnValue({ colorMode: "dark" });

    await act(async () => {
      render(<StatusBarSync />);
    });

    expect(setStyle).not.toHaveBeenCalled();
  });

  it("sets light (white) icons for dark mode when running natively", async () => {
    isNativePlatform.mockReturnValue(true);
    useColorMode.mockReturnValue({ colorMode: "dark" });

    await act(async () => {
      render(<StatusBarSync />);
    });

    expect(setStyle).toHaveBeenCalledWith({ style: "LIGHT" });
  });

  it("sets dark icons for light mode when running natively", async () => {
    isNativePlatform.mockReturnValue(true);
    useColorMode.mockReturnValue({ colorMode: "light" });

    await act(async () => {
      render(<StatusBarSync />);
    });

    expect(setStyle).toHaveBeenCalledWith({ style: "DARK" });
  });

  it("re-syncs when color mode changes after mount", async () => {
    isNativePlatform.mockReturnValue(true);
    useColorMode.mockReturnValue({ colorMode: "light" });

    let rerender!: (ui: ReactElement) => void;
    await act(async () => {
      const result = render(<StatusBarSync />);
      rerender = result.rerender;
    });
    expect(setStyle).toHaveBeenLastCalledWith({ style: "DARK" });

    useColorMode.mockReturnValue({ colorMode: "dark" });
    await act(async () => {
      rerender(<StatusBarSync />);
    });
    expect(setStyle).toHaveBeenLastCalledWith({ style: "LIGHT" });
  });

  it("renders nothing visible", async () => {
    isNativePlatform.mockReturnValue(false);
    useColorMode.mockReturnValue({ colorMode: "light" });

    let container!: HTMLElement;
    await act(async () => {
      const result = render(<StatusBarSync />);
      container = result.container;
    });

    expect(container).toBeEmptyDOMElement();
  });
});
