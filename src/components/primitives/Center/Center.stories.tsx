import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Center } from "./Center";

function Swatch() {
  return (
    <Box bg="accent.solid" color="accent.contrast" rounded="l2" p="4">
      Centered
    </Box>
  );
}

/**
 * AERYO's centering primitive — a thin wrapper around Chakra UI's
 * `Center`. See `Center.tsx` for implementation notes.
 *
 * `children` is deliberately left out of `args` everywhere below and
 * composed via `render` instead: a React element isn't JSON-serializable,
 * and Storybook warns about a "cycle" when it tries to serialize one for
 * the URL/actions panel.
 */
const meta = {
  title: "Primitives/Center",
  component: Center,
  tags: ["autodocs", "ai-generated"],
  args: {
    height: "12rem",
    width: "20rem",
    borderWidth: "1px",
    borderColor: "border",
    rounded: "l2",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Center {...args}>
      <Swatch />
    </Center>
  ),
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Center {...args}>
          <Swatch />
        </Center>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Center {...args}>
          <Swatch />
        </Center>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

const responsiveArgs = {
  height: { base: "8rem", md: "12rem" },
  width: { base: "100%", md: "20rem" },
  borderWidth: "1px",
  borderColor: "border",
  rounded: "l2",
} satisfies Partial<Story["args"]>;

export const Mobile: Story = {
  args: responsiveArgs,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  args: responsiveArgs,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  args: responsiveArgs,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content — confirms Center still centers correctly when its content
// grows taller/wider than the default case.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: {
    height: "12rem",
    width: "16rem",
  },
  render: (args) => (
    <Center {...args}>
      <Text textAlign="center">
        A longer piece of centered text, wrapping across multiple lines inside a
        fixed-size Center, to confirm both horizontal and vertical centering
        hold up.
      </Text>
    </Center>
  ),
};
