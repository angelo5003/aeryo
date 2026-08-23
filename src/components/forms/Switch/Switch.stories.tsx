import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Switch } from "./Switch";

const SIZES = ["sm", "md", "lg"] as const;

/**
 * AERYO's switch — a thin wrapper around Chakra UI's `Switch`. See
 * `Switch.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Notify me about new sessions at this spot",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack gap="3">
      {SIZES.map((size) => (
        <Switch key={size} {...args} size={size} defaultChecked>
          {size}
        </Switch>
      ))}
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Switch {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Switch {...args} />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

export const LongLabel: Story = {
  args: {
    children:
      "A deliberately long switch label that wraps across multiple lines inside a width-constrained container",
  },
  render: (args) => (
    <Box width="14rem">
      <Switch {...args} />
    </Box>
  ),
};

export const Toggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("checkbox");
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  },
};
