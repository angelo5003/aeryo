import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ColorModeButton } from "./color-mode";

const meta = {
  component: ColorModeButton,
  tags: ["ai-generated"],
} satisfies Meta<typeof ColorModeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Icon-only button — its aria-label is the only accessible name it exposes.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole("button", { name: /toggle color mode/i }),
    ).toBeVisible();
  },
};

// Variant-only stories: no play needed.
export const Small: Story = { args: { size: "xs" } };
export const Large: Story = { args: { size: "lg" } };
