import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { PasswordInput } from "./PasswordInput";

/**
 * AERYO's password input — an `Input` with a show/hide visibility
 * toggle. See `PasswordInput.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs", "ai-generated"],
  args: {
    placeholder: "Enter password",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    defaultVisible: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
};

export const DefaultVisible: Story = {
  args: { defaultVisible: true, defaultValue: "kitesurf123" },
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "short" },
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "kitesurf123" },
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" maxW="16rem">
        <PasswordInput {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="16rem">
        <PasswordInput {...args} />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

export const LongValue: Story = {
  args: { defaultValue: "a-deliberately-long-password-value-1234567890" },
  render: (args) => (
    <Box width="12rem">
      <PasswordInput {...args} />
    </Box>
  ),
};

export const ToggleVisibility: Story = {
  args: { defaultValue: "kitesurf123" },
  render: (args) => (
    <Box maxW="16rem">
      <PasswordInput {...args} />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue("kitesurf123");
    await expect(input).toHaveAttribute("type", "password");

    const toggle = canvas.getByRole("button", {
      name: "Toggle password visibility",
    });
    await userEvent.click(toggle);
    await expect(input).toHaveAttribute("type", "text");

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute("type", "password");
  },
};
