import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Box } from "@chakra-ui/react";
import { ProgressDots } from "./ProgressDots";

/**
 * A decorative row of dots showing position within a fixed number of
 * steps. Not tappable — see `ProgressDots.tsx` for why.
 */
const meta = {
  title: "Data Display/ProgressDots",
  component: ProgressDots,
  tags: ["autodocs", "ai-generated"],
  args: { count: 5, activeIndex: 0 },
  argTypes: {
    count: { control: { type: "number", min: 1, max: 10 } },
    activeIndex: { control: { type: "number", min: 0, max: 9 } },
  },
  decorators: [
    (Story) => (
      <Box bg="bg.photo" p="6">
        <Story />
      </Box>
    ),
  ],
  parameters: { layout: "centered" },
} satisfies Meta<typeof ProgressDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LastStep: Story = {
  args: { activeIndex: 4 },
};

export const WithIds: Story = {
  args: {
    ids: [
      "adventure-awaits",
      "discover-the-elements",
      "master-the-conditions",
    ],
    activeId: "discover-the-elements",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "Step 2 of 3" }),
    ).toBeVisible();
  },
};

export const AccessibleLabel: Story = {
  args: { count: 5, activeIndex: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "Step 3 of 5" }),
    ).toBeVisible();
  },
};
