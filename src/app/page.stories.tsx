import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, waitFor, within } from "storybook/test";
import { SplashProvider } from "@/app/providers/SplashScreen/Provider/SplashProvider";
import Home from "./page";

// `Home` reads `useSplashScreen()` (SplashProvider) to hide the native
// splash once its background image paints — outside a SplashProvider it
// throws, so every story needs this decorator. See
// src/app/providers/SplashScreen/Provider/SplashProvider.tsx.
const meta = {
  component: Home,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <SplashProvider>
        <Story />
      </SplashProvider>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

// Capacitor always opens the app at "/" — this route renders the intro
// (background photo, logo, tagline) first and only swaps to the real app
// once its background image has painted and a minimum dwell time has
// passed. See the comment atop page.tsx.
export const Default: Story = {
  play: async ({ canvas }) => {
    // The logo/tagline fade+scale in via Framer Motion (IntroScreen) rather
    // than appearing instantly, so give the reveal transition (~1s worst
    // case, including the tagline's stagger delay) time to finish before
    // asserting visibility.
    await waitFor(() => expect(canvas.getByAltText("Aeryo")).toBeVisible(), {
      timeout: 2000,
    });
    await waitFor(
      () =>
        expect(canvas.getByText("Where the Unseen Leads")).toBeVisible(),
      { timeout: 2000 },
    );
  },
};

// Simulates the background image finishing its load, which is the signal
// page.tsx waits for before starting the swap to the real app content.
export const TransitionsToHome: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const background = canvasElement.querySelector('img[alt=""]');
    if (!background) throw new Error("background image not found");

    fireEvent.load(background);

    await waitFor(
      () =>
        expect(
          canvas.getByRole("heading", { level: 1, name: /hello world/i }),
        ).toBeVisible(),
      { timeout: 4000 },
    );
  },
};
