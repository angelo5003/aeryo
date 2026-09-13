import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, waitFor, within } from "storybook/test";
import { AuthProvider } from "@/app/providers/Auth/AuthProvider";
import { OnboardingProvider } from "@/app/providers/Onboarding/Provider/OnboardingProvider";
import { SplashProvider } from "@/app/providers/SplashScreen/Provider/SplashProvider";
import Home from "./page";

// Home calls useSplashScreen, useOnboarding, and useAuth — without these wrappers it throws.
const meta = {
  component: Home,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <SplashProvider>
        <OnboardingProvider>
          <AuthProvider>
            <Story />
          </AuthProvider>
        </OnboardingProvider>
      </SplashProvider>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

// First paint is always the intro (logo + tagline), not home.
export const Default: Story = {
  play: async ({ canvas }) => {
    // Wait for the logo/tagline fade (~1s) before asserting they are visible.
    await waitFor(() => expect(canvas.getByAltText("Aeryo")).toBeVisible(), {
      timeout: 2000,
    });
    await waitFor(
      () => expect(canvas.getByText("Where the Unseen Leads")).toBeVisible(),
      { timeout: 2000 },
    );
  },
};

// After the intro photo loads, a first launch (no saved “slides done” flag) goes to the photo slides.
export const TransitionsToOnboarding: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const background = canvasElement.querySelector('img[alt=""]');
    if (!background) throw new Error("background image not found");

    fireEvent.load(background);

    await waitFor(
      () =>
        expect(
          canvas.getByRole("heading", { name: "Adventure Awaits" }),
        ).toBeVisible(),
      { timeout: 4000 },
    );
  },
};
