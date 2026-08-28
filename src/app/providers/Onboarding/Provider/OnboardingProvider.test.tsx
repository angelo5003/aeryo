import { act, render, screen } from "@testing-library/react";

const hasSeenOnboarding = jest.fn();
const markOnboardingSeen = jest.fn();

jest.mock("./onboardingStorage", () => ({
  hasSeenOnboarding: () => hasSeenOnboarding(),
  markOnboardingSeen: () => markOnboardingSeen(),
}));

import { OnboardingProvider, useOnboarding } from "./OnboardingProvider";

function Consumer() {
  const { hasCompletedOnboarding, completeOnboarding } = useOnboarding();
  return (
    <div>
      <div data-testid="state">{String(hasCompletedOnboarding)}</div>
      <button onClick={completeOnboarding}>complete</button>
    </div>
  );
}

describe("OnboardingProvider", () => {
  beforeEach(() => {
    hasSeenOnboarding.mockReset();
    markOnboardingSeen.mockReset().mockResolvedValue(undefined);
  });

  it("throws when useOnboarding is used outside a provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(
      "useOnboarding must be used within an OnboardingProvider",
    );
    spy.mockRestore();
  });

  it("starts as null (loading) then resolves to false when nothing was seen", async () => {
    hasSeenOnboarding.mockResolvedValue(false);
    await act(async () => {
      render(
        <OnboardingProvider>
          <Consumer />
        </OnboardingProvider>,
      );
    });
    expect(screen.getByTestId("state")).toHaveTextContent("false");
  });

  it("resolves to true when the persisted flag says onboarding was seen", async () => {
    hasSeenOnboarding.mockResolvedValue(true);
    await act(async () => {
      render(
        <OnboardingProvider>
          <Consumer />
        </OnboardingProvider>,
      );
    });
    expect(screen.getByTestId("state")).toHaveTextContent("true");
  });

  it("completeOnboarding immediately flips state and persists it", async () => {
    hasSeenOnboarding.mockResolvedValue(false);
    await act(async () => {
      render(
        <OnboardingProvider>
          <Consumer />
        </OnboardingProvider>,
      );
    });
    expect(screen.getByTestId("state")).toHaveTextContent("false");

    await act(async () => {
      screen.getByText("complete").click();
    });

    expect(screen.getByTestId("state")).toHaveTextContent("true");
    expect(markOnboardingSeen).toHaveBeenCalledTimes(1);
  });

  it("shows null while the persisted flag is still loading", async () => {
    let resolveFlag!: (value: boolean) => void;
    hasSeenOnboarding.mockReturnValue(
      new Promise((resolve) => {
        resolveFlag = resolve;
      }),
    );

    render(
      <OnboardingProvider>
        <Consumer />
      </OnboardingProvider>,
    );

    expect(screen.getByTestId("state")).toHaveTextContent("null");

    await act(async () => {
      resolveFlag(false);
    });

    expect(screen.getByTestId("state")).toHaveTextContent("false");
  });
});
