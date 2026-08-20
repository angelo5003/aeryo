import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Heading } from "./Heading";
import type { HeadingVariant } from "./Heading.types";

const VARIANTS: HeadingVariant[] = ["display", "heading", "title"];

/**
 * AERYO's heading primitive — a thin wrapper around Chakra UI's
 * `Heading`. See `Heading.tsx` for implementation notes.
 */
const meta = {
  title: "Typography/Heading",
  component: Heading,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Feel the wind, plan the ride",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    variant: { control: "select", options: VARIANTS },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Variants — every semantic role, each mapped to its named textStyle.
// ---------------------------------------------------------------------------

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack gap="4">
      {VARIANTS.map((variant) => (
        <Heading key={variant} {...args} variant={variant} />
      ))}
    </Stack>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Stack gap="4">
          {VARIANTS.map((variant) => (
            <Heading key={variant} {...args} variant={variant} color="fg" />
          ))}
        </Stack>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Stack gap="4">
          {VARIANTS.map((variant) => (
            <Heading key={variant} {...args} variant={variant} color="fg" />
          ))}
        </Stack>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — display headings commonly step down a size on mobile.
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  args: { variant: "display" },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  args: { variant: "display" },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  args: { variant: "display" },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: {
    variant: "display",
    children:
      "A deliberately long heading that should wrap across multiple lines inside a width-constrained container, to confirm line-height and letter-spacing hold up at the display size.",
  },
  render: (args) => (
    <Box width="24rem">
      <Heading {...args} />
    </Box>
  ),
};
