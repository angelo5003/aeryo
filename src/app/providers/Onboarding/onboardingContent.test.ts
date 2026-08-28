import {
  FIRST_ONBOARDING_SLIDE_ID,
  getNextOnboardingSlideId,
  LAST_ONBOARDING_SLIDE_ID,
  ONBOARDING_SLIDE_IDS,
  ONBOARDING_SLIDES,
} from "./onboardingContent";

describe("onboardingContent", () => {
  it("gives every slide a unique authored id", () => {
    const ids = ONBOARDING_SLIDES.map((slide) => slide.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.length > 0)).toBe(true);
  });

  it("walks the sequence by id, not by a stored index", () => {
    expect(FIRST_ONBOARDING_SLIDE_ID).toBe("adventure-awaits");
    expect(getNextOnboardingSlideId("adventure-awaits")).toBe(
      "discover-the-elements",
    );
    expect(getNextOnboardingSlideId("find-your-community")).toBe(
      "track-your-progress",
    );
    expect(getNextOnboardingSlideId(LAST_ONBOARDING_SLIDE_ID)).toBeUndefined();
    expect(getNextOnboardingSlideId("not-a-slide")).toBeUndefined();
  });

  it("keeps ONBOARDING_SLIDE_IDS in display order", () => {
    expect(ONBOARDING_SLIDE_IDS).toEqual(
      ONBOARDING_SLIDES.map((slide) => slide.id),
    );
  });
});
