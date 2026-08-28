import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Box } from "@chakra-ui/react";
import { ONBOARDING_SLIDES } from "../onboardingContent";
import { OnboardingSlide } from "./OnboardingSlide";

const meta = {
  title: "Patterns/OnboardingSlide",
  component: OnboardingSlide,
  tags: ["ai-generated"],
  args: { slide: ONBOARDING_SLIDES[0] },
  decorators: [
    (Story) => (
      <Box width="375px" height="667px">
        <Story />
      </Box>
    ),
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof OnboardingSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstSlide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        "Real conditions. Real spots. Find out where the wind is taking you next.",
      ),
    ).toBeVisible();
  },
};

export const LastSlide: Story = {
  args: { slide: ONBOARDING_SLIDES[4] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Track Your Progress" }),
    ).toBeVisible();
  },
};
