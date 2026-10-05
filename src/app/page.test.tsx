import { act, fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "@/app/_providers/Auth/AuthProvider";
import { OnboardingProvider } from "@/app/_providers/Onboarding/Provider/OnboardingProvider";
import { SplashProvider } from "@/app/_providers/SplashScreen/Provider/SplashProvider";
import { __resetIntroBootFlag } from "@/app/introBootFlag";
import { Provider } from "@/components/ui/provider";
import Home from "./page";

const routerReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: routerReplace, push: jest.fn() }),
}));

let authCallback: (session: unknown) => void = () => {};

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: (
        callback: (event: string, session: unknown) => void,
      ) => {
        authCallback = (session) => callback("SIGNED_IN", session);
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      },
    },
  },
}));

// Onboarding already seen (skipped/finished the slides) but no account yet
// — the exact state this test exercises.
jest.mock("@/app/_providers/Onboarding/Provider/onboardingStorage", () => ({
  hasSeenOnboarding: () => Promise.resolve(true),
  markOnboardingSeen: () => Promise.resolve(undefined),
}));

const buildComponent = () =>
  render(
    <Provider>
      <SplashProvider>
        <OnboardingProvider>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </OnboardingProvider>
      </SplashProvider>
    </Provider>,
  );

// Drives the boot sequence past the intro screen: fires the splash image's
// `onLoad` (what tells SplashProvider the JS intro has painted) and the
// minimum-dwell timer `page.tsx` waits on afterwards.
const finishIntro = async () => {
  const splashImage = document.querySelector('img[src="/splash.png"]');
  if (!splashImage) throw new Error("splash image not found");
  await act(async () => {
    fireEvent.load(splashImage);
  });
  await act(async () => {
    jest.advanceTimersByTime(2500);
  });
};

describe("Home", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    routerReplace.mockClear();
    authCallback = () => {};
    __resetIntroBootFlag();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("redirects to /signup when onboarding is done but no account exists", async () => {
    buildComponent();

    await act(async () => {
      authCallback(null);
    });
    await finishIntro();

    expect(routerReplace).toHaveBeenCalledWith("/signup");
    expect(screen.queryByText("Hello world")).not.toBeInTheDocument();
  });

  it("should redirect to /home when a session exists after the intro", async () => {
    buildComponent();

    await act(async () => {
      authCallback({ user: { id: "1" } });
    });
    await finishIntro();

    expect(routerReplace).toHaveBeenCalledWith("/home");
  });

  it("should redirect to /home without the splash when mounted again in the same session", async () => {
    const { unmount } = buildComponent();

    await act(async () => {
      authCallback({ user: { id: "1" } });
    });
    await finishIntro();
    unmount();
    routerReplace.mockClear();

    // Simulates landing on "/" again later in the same session: the session
    // is already known, so there is no splash image and no MIN_INTRO_MS wait.
    buildComponent();
    await act(async () => {
      authCallback({ user: { id: "1" } });
    });

    expect(document.querySelector('img[src="/splash.png"]')).toBeNull();
    expect(routerReplace).toHaveBeenCalledWith("/home");
  });
});
