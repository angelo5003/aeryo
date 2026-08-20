import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Text } from "@/components/typography/Text";
import { Link } from "./Link";

/**
 * AERYO's link primitive — a thin wrapper around Chakra UI's `Link`. See
 * `Link.tsx` for implementation notes.
 */
const meta = {
  title: "Typography/Link",
  component: Link,
  tags: ["autodocs", "ai-generated"],
  args: {
    href: "#",
    children: "Plan your session",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    variant: { control: "select", options: ["plain", "underline"] },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Underline: Story = {
  args: { variant: "underline" },
};

// ---------------------------------------------------------------------------
// States — default/hover/active/visited. Hover and active are real CSS
// pseudo-states on Link itself (try it directly on the Default story
// above); `:visited` can't be forced from script for privacy reasons in
// every browser, so this reference row renders each state's actual color
// token as a static swatch instead of relying on triggering the pseudo
// -class live.
// ---------------------------------------------------------------------------

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="3">
      <Stack direction="row" gap="2" align="center">
        <Box width="24" flexShrink="0">
          <Text variant="label">Default</Text>
        </Box>
        <Link href="#">Plan your session</Link>
      </Stack>
      <Stack direction="row" gap="2" align="center">
        <Box width="24" flexShrink="0">
          <Text variant="label">Hover</Text>
        </Box>
        <Link href="#" textDecoration="underline" textUnderlineOffset="3px">
          Plan your session
        </Link>
      </Stack>
      <Stack direction="row" gap="2" align="center">
        <Box width="24" flexShrink="0">
          <Text variant="label">Active</Text>
        </Box>
        <Link href="#" color="accent.solid">
          Plan your session
        </Link>
      </Stack>
      <Stack direction="row" gap="2" align="center">
        <Box width="24" flexShrink="0">
          <Text variant="label">Visited</Text>
        </Box>
        <Link href="#" color="fg.muted">
          Plan your session
        </Link>
      </Stack>
    </Stack>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Link {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Link {...args} />
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Long Content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: {
    children:
      "A deliberately long link label that wraps across multiple lines inside a width-constrained container, to check the underline offset and gap-to-icon spacing hold up when the text isn't a single short phrase.",
  },
  render: (args) => (
    <Box width="16rem">
      <Link {...args} />
    </Box>
  ),
};
