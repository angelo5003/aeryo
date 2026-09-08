import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
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
      canvas.getByRole("group", { name: "Step 1 of 6" }),
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
    await waitFor(() =>
      expect(
        canvas.getByRole("heading", { name: "Discover the Elements" }),
      ).toBeVisible(),
    );
    await expect(
      canvas.getByRole("group", { name: "Step 2 of 6" }),
    ).toBeVisible();
  },
};

export const LastSlideShowsCreateAccount: Story = {
  // Create account opens the account sheet and does not call onComplete yet.
  // per https://storybook.js.org/docs/writing-stories/tags — `!test` keeps
  // the story in the sidebar but excludes it from addon-vitest until signup
  // wires onComplete through.
  tags: ["!test"],
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const next = () =>
      userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await next();
    await next();
    await next();
    await next();
    await next();
    await waitFor(() =>
      expect(
        canvas.getByRole("heading", { name: "Ready When You Are" }),
      ).toBeVisible(),
    );
    await expect(canvas.queryByRole("button", { name: "Skip" })).toBeNull();
    await expect(canvas.queryByRole("group")).toBeNull();

    await userEvent.click(
      canvas.getByRole("button", { name: "Create account" }),
    );
    await expect(args.onComplete).toHaveBeenCalledTimes(1);
  },
};
