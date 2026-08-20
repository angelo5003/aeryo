import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Separator } from "./Separator";

/**
 * AERYO's dividing-line primitive — a thin wrapper around Chakra UI's
 * `Separator`. See `Separator.tsx` for implementation notes.
 */
const meta = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box width="16rem">
      <Text>Above</Text>
      <Separator {...args} my="4" />
      <Text>Below</Text>
    </Box>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Box display="flex" alignItems="center" height="4rem">
      <Text>Left</Text>
      <Separator {...args} orientation="vertical" mx="4" />
      <Text>Right</Text>
    </Box>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" width="16rem">
        <Text color="fg">Above</Text>
        <Separator {...args} my="4" />
        <Text color="fg">Below</Text>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" width="16rem">
        <Text color="fg">Above</Text>
        <Separator {...args} my="4" />
        <Text color="fg">Below</Text>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — orientation flips from horizontal (mobile, stacked layout)
// to vertical (desktop, side-by-side layout), a common real use.
// ---------------------------------------------------------------------------

function ResponsiveExample({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
  return (
    <Box
      display="flex"
      flexDirection={orientation === "vertical" ? "row" : "column"}
      alignItems={orientation === "vertical" ? "center" : "stretch"}
      gap="4"
    >
      <Text>Section one</Text>
      <Separator orientation={orientation} />
      <Text>Section two</Text>
    </Box>
  );
}

export const Mobile: Story = {
  render: () => <ResponsiveExample orientation="horizontal" />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  render: () => <ResponsiveExample orientation="horizontal" />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  render: () => <ResponsiveExample orientation="vertical" />,
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content — a separator between two long, wrapping text blocks.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  render: (args) => (
    <Box width="16rem">
      <Text>
        A long block of text above the separator, to confirm it still renders as
        a thin, full-width line regardless of the height of the content around
        it.
      </Text>
      <Separator {...args} my="4" />
      <Text>
        And another long block of text below it, wrapping across several lines.
      </Text>
    </Box>
  ),
};
