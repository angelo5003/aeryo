import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { OnboardingCarousel } from "./OnboardingCarousel";

const meta = {
  title: "Patterns/OnboardingCarousel",
  component: OnboardingCarousel,
  tags: ["ai-generated"],
  args: { onComplete: fn() },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OnboardingCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "Adventure Awaits" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("group", { name: "Step 1 of 5" }),
    ).toBeVisible();
  },
};

export const SkipCompletesImmediately: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Skip" }));
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};

export const NextAdvancesToSecondSlide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(
      canvas.getByRole("heading", { name: "Discover the Elements" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("group", { name: "Step 2 of 5" }),
    ).toBeVisible();
  },
};

export const LastSlideShowsGetStarted: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const next = () =>
      userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await next();
    await next();
    await next();
    await next();
    await expect(
      canvas.getByRole("heading", { name: "Track Your Progress" }),
    ).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Skip" })).toBeNull();

    await userEvent.click(canvas.getByRole("button", { name: "Get Started" }));
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};
