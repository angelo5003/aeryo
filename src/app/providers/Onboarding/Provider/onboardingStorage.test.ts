const get = jest.fn();
const set = jest.fn();

jest.mock("@capacitor/preferences", () => ({
  Preferences: {
    get: (...args: unknown[]) => get(...args),
    set: (...args: unknown[]) => set(...args),
  },
}));

import { hasSeenOnboarding, markOnboardingSeen } from "./onboardingStorage";

describe("onboardingStorage", () => {
  beforeEach(() => {
    get.mockReset();
    set.mockReset();
  });

  describe("hasSeenOnboarding", () => {
    it("returns false when nothing has been stored yet", async () => {
      get.mockResolvedValue({ value: null });
      await expect(hasSeenOnboarding()).resolves.toBe(false);
      expect(get).toHaveBeenCalledWith({ key: "aeryo:onboarding-seen" });
    });

    it("returns true once the flag has been set", async () => {
      get.mockResolvedValue({ value: "true" });
      await expect(hasSeenOnboarding()).resolves.toBe(true);
    });

    it("returns false, not throws, if the read fails", async () => {
      get.mockRejectedValue(new Error("storage unavailable"));
      await expect(hasSeenOnboarding()).resolves.toBe(false);
    });
  });

  describe("markOnboardingSeen", () => {
    it("writes the flag", async () => {
      set.mockResolvedValue(undefined);
      await markOnboardingSeen();
      expect(set).toHaveBeenCalledWith({
        key: "aeryo:onboarding-seen",
        value: "true",
      });
    });

    it("does not throw if the write fails", async () => {
      set.mockRejectedValue(new Error("storage unavailable"));
      await expect(markOnboardingSeen()).resolves.toBeUndefined();
    });
  });
});
