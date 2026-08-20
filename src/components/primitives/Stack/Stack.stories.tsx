import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Separator as ChakraSeparator } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Stack } from "./Stack";

function Item({ label }: { label: string }) {
  return (
    <Box bg="accent.solid" color="accent.contrast" rounded="l2" px="4" py="2">
      {label}
    </Box>
  );
}

function ThreeItems() {
  return (
    <>
      <Item label="One" />
      <Item label="Two" />
      <Item label="Three" />
    </>
  );
}

/**
 * AERYO's stacking layout primitive — a thin wrapper around Chakra UI's
 * `Stack`. See `Stack.tsx` for implementation notes.
 *
 * `children`/`separator` are deliberately left out of `args` everywhere
 * below and composed via `render` instead: a React element isn't
 * JSON-serializable, and Storybook warns about a "cycle" when it tries to
 * serialize one for the URL/actions panel.
 */
const meta = {
  title: "Primitives/Stack",
  component: Stack,
  tags: ["autodocs", "ai-generated"],
  args: {
    gap: "4",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
    separator: { control: false },
    direction: { control: "select", options: ["column", "row"] },
    align: { control: "text" },
    justify: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Stack {...args}>
      <ThreeItems />
    </Stack>
  ),
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { direction: "row" },
};

export const WithSeparator: Story = {
  render: (args) => (
    <Stack {...args} separator={<ChakraSeparator />}>
      <ThreeItems />
    </Stack>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Stack {...args}>
          <ThreeItems />
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
        <Stack {...args}>
          <ThreeItems />
        </Stack>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — direction flips from column (mobile) to row (desktop), the
// most common real use of Stack's responsive `direction`.
// ---------------------------------------------------------------------------

const responsiveArgs = {
  direction: { base: "column", md: "row" },
  gap: "4",
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
// Long Content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: { gap: "2", width: "16rem" },
  render: (args) => (
    <Stack {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <Item key={i} label={`Item ${i + 1}`} />
      ))}
    </Stack>
  ),
};
