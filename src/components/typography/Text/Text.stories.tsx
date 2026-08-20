import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Text } from "./Text";
import type { TextVariant } from "./Text.types";

const VARIANTS: TextVariant[] = ["body", "label", "caption"];

/**
 * AERYO's body-text primitive — a thin wrapper around Chakra UI's `Text`.
 * See `Text.tsx` for implementation notes.
 */
const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
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
} satisfies Meta<typeof Text>;

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
        <Text key={variant} {...args} variant={variant}>
          {variant}: {args.children}
        </Text>
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
            <Text key={variant} {...args} variant={variant} color="fg">
              {variant}: {args.children}
            </Text>
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
            <Text key={variant} {...args} variant={variant} color="fg">
              {variant}: {args.children}
            </Text>
          ))}
        </Stack>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

const responsiveArgs = {
  variant: "body" as const,
  fontSize: { base: "sm", md: "md", xl: "lg" },
};

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
  args: {
    children:
      "A long run of AERYO product copy, several sentences long, to confirm normal wrapping behavior inside a width-constrained container rather than overflow or truncation, across every text variant this component supports.",
  },
  render: (args) => (
    <Box width="20rem">
      <Text {...args} />
    </Box>
  ),
};
