import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import Home from "./page";

const meta = {
  component: Home,
  tags: ["ai-generated"],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: /get started/i }),
    ).toBeVisible();
  },
};

// CssCheck — the one required story proving the shared preview actually loaded
// the app's CSS. `.primary` (page.module.css) sets background: var(--text-primary),
// which resolves to #000 on `.page` — fails if page.module.css didn't load.
export const CssCheck: Story = {
  play: async ({ canvas }) => {
    const deployLink = canvas.getByRole("link", { name: /deploy now/i });
    await expect(getComputedStyle(deployLink).backgroundColor).toBe(
      "rgb(0, 0, 0)",
    );
  },
};
