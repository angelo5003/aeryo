// True only for the first Home mount this app session (real cold boot, native
// splash was up). A client-side redirect back to "/" (e.g. right after
// signup) remounts Home — without this flag it would replay the full splash
// + MIN_INTRO_MS dwell for no reason, since session/onboarding state is
// already resolved by then. Module scope, not Preferences: resets itself on
// a real relaunch because the JS bundle reloads from scratch.
let hasBootedIntro = false;

export const hasAlreadyBootedIntro = () => hasBootedIntro;

export const markIntroBooted = () => {
  hasBootedIntro = true;
};

// Test-only: module state otherwise leaks across tests in the same file.
export const __resetIntroBootFlag = () => {
  hasBootedIntro = false;
};
