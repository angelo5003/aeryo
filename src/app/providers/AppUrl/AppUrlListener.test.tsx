import { act, render } from "@testing-library/react";

import { AppUrlListener } from "./AppUrlListener";

const addListener = jest.fn();
const getLaunchUrl = jest.fn();
const remove = jest.fn().mockResolvedValue(undefined);
const isNativePlatform = jest.fn();

jest.mock("@capacitor/core", () => ({
  Capacitor: {
    isNativePlatform: () => isNativePlatform(),
  },
}));

jest.mock("@capacitor/app", () => ({
  App: {
    addListener: (...args: unknown[]) => addListener(...args),
    getLaunchUrl: (...args: unknown[]) => getLaunchUrl(...args),
  },
}));

describe("AppUrlListener", () => {
  beforeEach(() => {
    addListener.mockReset();
    getLaunchUrl.mockReset();
    remove.mockClear();
    isNativePlatform.mockReset();

    addListener.mockResolvedValue({ remove });
    getLaunchUrl.mockResolvedValue(undefined);
  });

  it("does nothing outside the native app shell", async () => {
    isNativePlatform.mockReturnValue(false);

    await act(async () => {
      render(<AppUrlListener />);
    });

    expect(addListener).not.toHaveBeenCalled();
    expect(getLaunchUrl).not.toHaveBeenCalled();
  });

  it("listens for appUrlOpen and reads the launch URL on a phone", async () => {
    isNativePlatform.mockReturnValue(true);

    await act(async () => {
      render(<AppUrlListener />);
    });

    expect(addListener).toHaveBeenCalledWith("appUrlOpen", expect.any(Function));
    expect(getLaunchUrl).toHaveBeenCalled();
  });

  it("calls onUrlOpen with the path when a link opens the running app", async () => {
    isNativePlatform.mockReturnValue(true);
    const onUrlOpen = jest.fn();
    let urlOpenListener: ((event: { url: string }) => void) | undefined;
    addListener.mockImplementation(
      (_eventName: string, listener: (event: { url: string }) => void) => {
        urlOpenListener = listener;
        return Promise.resolve({ remove });
      },
    );

    await act(async () => {
      render(<AppUrlListener onUrlOpen={onUrlOpen} />);
    });

    await act(async () => {
      urlOpenListener?.({ url: "com.aeryo.app://invite" });
    });

    expect(onUrlOpen).toHaveBeenCalledWith("/invite");
  });

  it("calls onUrlOpen with the path when the app was launched from a link", async () => {
    isNativePlatform.mockReturnValue(true);
    const onUrlOpen = jest.fn();
    getLaunchUrl.mockResolvedValue({ url: "com.aeryo.app://invite" });

    await act(async () => {
      render(<AppUrlListener onUrlOpen={onUrlOpen} />);
    });

    expect(onUrlOpen).toHaveBeenCalledWith("/invite");
  });

  it("does not deliver the same launch URL twice when appUrlOpen also fires", async () => {
    isNativePlatform.mockReturnValue(true);
    const onUrlOpen = jest.fn();
    let urlOpenListener: ((event: { url: string }) => void) | undefined;
    addListener.mockImplementation(
      (_eventName: string, listener: (event: { url: string }) => void) => {
        urlOpenListener = listener;
        return Promise.resolve({ remove });
      },
    );
    getLaunchUrl.mockResolvedValue({ url: "com.aeryo.app://invite" });

    await act(async () => {
      render(<AppUrlListener onUrlOpen={onUrlOpen} />);
    });

    await act(async () => {
      urlOpenListener?.({ url: "com.aeryo.app://invite" });
    });

    expect(onUrlOpen).toHaveBeenCalledTimes(1);
  });

  it("removes the native listener on unmount", async () => {
    isNativePlatform.mockReturnValue(true);

    let unmount!: () => void;
    await act(async () => {
      const result = render(<AppUrlListener />);
      unmount = result.unmount;
    });

    await act(async () => {
      unmount();
    });

    expect(remove).toHaveBeenCalled();
  });

  it("renders nothing visible", async () => {
    isNativePlatform.mockReturnValue(false);

    let container!: HTMLElement;
    await act(async () => {
      const result = render(<AppUrlListener />);
      container = result.container;
    });

    expect(container).toBeEmptyDOMElement();
  });
});
