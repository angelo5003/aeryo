import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Box } from "./Box";

/**
 * AERYO's most abstract layout primitive — a thin wrapper around Chakra
 * UI's `Box`. See `Box.tsx` for implementation notes.
 */
const meta = {
  title: "Primitives/Box",
  component: Box,
  tags: ["autodocs", "ai-generated"],
  args: {
    bg: "bg.subtle",
    borderWidth: "1px",
    borderColor: "border",
    rounded: "l2",
    p: "4",
    children: "Box",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode — see actions/Button/Button.stories.tsx for why
// these use the DarkMode/LightMode scoping components rather than a
// Storybook toolbar theme-switcher (none is configured yet).
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Box {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Box {...args} />
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — Box's own responsive style props (object syntax), not just
// the viewport changing around a fixed box.
// ---------------------------------------------------------------------------

const responsiveArgs = {
  bg: "accent.solid",
  color: "accent.contrast",
  rounded: "l2",
  p: { base: "3", md: "5", xl: "8" },
  width: { base: "full", md: "60%", xl: "40%" },
} satisfies Partial<Story["args"]>;

export const Mobile: Story = {
  args: { ...responsiveArgs, children: "base: full width, p=3" },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  args: { ...responsiveArgs, children: "md: 60% width, p=5" },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  args: { ...responsiveArgs, children: "xl: 40% width, p=8" },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  // Renders its own JSX children rather than passing them through `args`
  // (a React element isn't JSON-serializable — Storybook warns about a
  // "cycle" trying to serialize it for the URL/actions panel otherwise).
  args: { width: "20rem" },
  render: (args) => (
    <Box {...args}>
      <Text>
        A deliberately long run of text inside a width-constrained Box, to check
        that normal text wrapping (not truncation — Box applies no overflow
        styles by default) behaves as expected across a realistic paragraph of
        AERYO product copy.
      </Text>
    </Box>
  ),
};
