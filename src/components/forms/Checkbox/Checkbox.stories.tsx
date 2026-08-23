import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Checkbox } from "./Checkbox";

const SIZES = ["sm", "md", "lg"] as const;
const VARIANTS = ["outline", "solid", "subtle"] as const;

/**
 * AERYO's checkbox — a thin wrapper around Chakra UI's `Checkbox`. See
 * `Checkbox.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "I agree to the terms of service",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    size: { control: "select", options: SIZES },
    variant: { control: "select", options: VARIANTS },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack gap="3">
      {VARIANTS.map((variant) => (
        <Checkbox key={variant} {...args} variant={variant} defaultChecked>
          {variant}
        </Checkbox>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack gap="3">
      {SIZES.map((size) => (
        <Checkbox key={size} {...args} size={size} defaultChecked>
          {size}
        </Checkbox>
      ))}
    </Stack>
  ),
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Checkbox {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Checkbox {...args} />
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
      "A deliberately long checkbox label that wraps across multiple lines, to confirm the check control stays aligned to the first line rather than centering against the full block.",
  },
  render: (args) => (
    <Box width="14rem">
      <Checkbox {...args} />
    </Box>
  ),
};

export const Toggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};
