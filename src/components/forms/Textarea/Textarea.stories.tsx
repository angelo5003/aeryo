import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Wrap } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Textarea } from "./Textarea";

const VARIANTS = ["outline", "subtle", "flushed"] as const;
const SIZES = ["sm", "md", "lg"] as const;

/**
 * AERYO's multi-line text input — a thin wrapper around Chakra UI's
 * `Textarea`. See `Textarea.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs", "ai-generated"],
  args: {
    placeholder: "Tell other riders about this session…",
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="flex-start">
      {VARIANTS.map((variant) => (
        <Textarea key={variant} {...args} variant={variant} width="14rem" />
      ))}
    </Wrap>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="flex-start">
      {SIZES.map((size) => (
        <Textarea key={size} {...args} size={size} width="14rem" />
      ))}
    </Wrap>
  ),
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "x" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Not editable." },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" maxW="16rem">
        <Textarea {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="16rem">
        <Textarea {...args} />
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

export const LongContent: Story = {
  args: {
    defaultValue:
      "A long run of text pre-filled into the textarea, several sentences worth, to confirm it wraps and scrolls normally rather than overflowing its box.",
  },
  render: (args) => (
    <Box width="14rem">
      <Textarea {...args} />
    </Box>
  ),
};
