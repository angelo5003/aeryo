import { Preferences } from "@capacitor/preferences";

// Never read/write this key anywhere else — go through the two functions
// below so the key name and storage backend stay in exactly one place.
const ONBOARDING_SEEN_KEY = "aeryo:onboarding-seen";

/**
 * True once the user has completed (or skipped) the onboarding carousel at
 * least once — used to decide whether `page.tsx`'s boot sequence should
 * show it again. Backed by `@capacitor/preferences`, which persists to
 * native platform storage (UserDefaults/SharedPreferences) on iOS/Android
 * and falls back to `localStorage` in a plain browser (`next dev` without
 * Capacitor, Storybook). Never throws: a read failure (corrupt storage,
 * private-browsing blocking `localStorage`) is treated the same as "not
 * seen yet" so a broken read can't crash the boot sequence — worst case
 * the carousel just shows once more than it should.
 */
export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    const { value } = await Preferences.get({ key: ONBOARDING_SEEN_KEY });
    return value === "true";
  } catch (error) {
    console.error("onboardingStorage: failed to read", error);
    return false;
  }
}

/**
 * Records that the user has completed (or skipped) the onboarding
 * carousel, so it doesn't show again on future launches. Swallows write
 * failures — worst case the carousel shows once more next launch, which is
 * a far better failure mode than crashing the boot sequence.
 */
export async function markOnboardingSeen(): Promise<void> {
  try {
    await Preferences.set({ key: ONBOARDING_SEEN_KEY, value: "true" });
  } catch (error) {
    console.error("onboardingStorage: failed to write", error);
  }
}
