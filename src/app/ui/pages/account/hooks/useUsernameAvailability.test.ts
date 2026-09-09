import { renderHook, act, waitFor } from "@testing-library/react";
import { isUsernameAvailable } from "@/lib/supabase/account";
import { useUsernameAvailability } from "./useUsernameAvailability";

jest.mock("@/lib/supabase/account", () => ({
  isUsernameAvailable: jest.fn(),
}));

describe("useUsernameAvailability", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("stays idle for a username that fails the format rules", () => {
    const { result } = renderHook(() => useUsernameAvailability("ab"));

    expect(result.current).toBe("idle");
    expect(isUsernameAvailable).not.toHaveBeenCalled();
  });

  it("checks availability after the debounce delay and reports available", async () => {
    jest.mocked(isUsernameAvailable).mockResolvedValue(true);
    const { result } = renderHook(() => useUsernameAvailability("stormrider"));

    expect(result.current).toBe("checking");

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => expect(result.current).toBe("available"));
    expect(isUsernameAvailable).toHaveBeenCalledWith("stormrider");
  });

  it("reports taken when the RPC returns false", async () => {
    jest.mocked(isUsernameAvailable).mockResolvedValue(false);
    const { result } = renderHook(() => useUsernameAvailability("stormrider"));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => expect(result.current).toBe("taken"));
  });

  it("reports error when the RPC call rejects", async () => {
    jest.mocked(isUsernameAvailable).mockRejectedValue(new Error("down"));
    const { result } = renderHook(() => useUsernameAvailability("stormrider"));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => expect(result.current).toBe("error"));
  });
});
