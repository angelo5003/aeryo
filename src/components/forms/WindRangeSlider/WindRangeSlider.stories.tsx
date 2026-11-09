import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { WindRangeSlider } from "./WindRangeSlider";
import type { WindRange } from "./WindRangeSlider.types";

/**
 * AERYO's wind range slider: two handles for a lowest and highest wind
 * speed. See `WindRangeSlider.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/WindRangeSlider",
  component: WindRangeSlider,
  tags: ["autodocs", "ai-generated"],
  args: { label: "Wind range", defaultValue: [14, 28] },
  argTypes: {
    value: { control: false },
    as: { control: false },
    asChild: { control: false },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box maxWidth="22rem">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof WindRangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const CustomScale: Story = {
  args: { min: 0, max: 60, step: 5, defaultValue: [10, 40], unit: "km/h" },
};

export const Controlled: Story = {
  render: (args) => {
    const [range, setRange] = React.useState<WindRange>([8, 22]);
    return <WindRangeSlider {...args} value={range} onValueChange={setRange} />;
  },
};

export const DarkModeStory: Story = {
  render: (args) => (
    <DarkMode>
      <Box bg="bg" padding="4">
        <WindRangeSlider {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  render: (args) => (
    <LightMode>
      <Box bg="bg" padding="4">
        <WindRangeSlider {...args} />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      viewports: RESPONSIVE_VIEWPORTS,
      defaultViewport: "aeryoMobile",
    },
  },
};

/**
 * Keyboard check in a real browser (jsdom does not deliver the key events
 * the slider needs): tab to the low handle, press the right arrow, and the
 * range text moves from 14 to 15.
 */
export const KeyboardControl: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findAllByRole("slider");
    // Tab, not `.focus()`: the slider only reacts to keys after the handle
    // got focus the way a keyboard user would give it.
    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByText("15–28 kt")).toBeInTheDocument();
  },
};
