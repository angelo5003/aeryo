import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Wrap } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Input } from "./Input";

const VARIANTS = ["outline", "subtle", "flushed"] as const;
const SIZES = ["sm", "md", "lg"] as const;

/**
 * AERYO's text input — a thin wrapper around Chakra UI's `Input`. See
 * `Input.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs", "ai-generated"],
  args: {
    placeholder: "you@example.com",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="center">
      {VARIANTS.map((variant) => (
        <Input key={variant} {...args} variant={variant} width="14rem" />
      ))}
    </Wrap>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="center">
      {SIZES.map((size) => (
        <Input key={size} {...args} size={size} width="14rem" />
      ))}
    </Wrap>
  ),
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "you@example.com" },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" maxW="16rem">
        <Input {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="16rem">
        <Input {...args} />
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

export const LongValue: Story = {
  args: {
    defaultValue:
      "a.deliberately.long.email.address.to.check.overflow@example.com",
  },
  render: (args) => (
    <Box width="12rem">
      <Input {...args} />
    </Box>
  ),
};

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("you@example.com");
    await userEvent.type(input, "rider@aeryo.app");
    await expect(input).toHaveValue("rider@aeryo.app");
  },
};
