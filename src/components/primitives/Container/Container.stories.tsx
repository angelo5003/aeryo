import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Container } from "./Container";

function Swatch() {
  return (
    <Box bg="accent.solid" color="accent.contrast" rounded="l2" p="4">
      Container content — centered, width-constrained by Chakra&apos;s container
      recipe.
    </Box>
  );
}

/**
 * AERYO's max-width, centered content primitive — a thin wrapper around
 * Chakra UI's `Container`. See `Container.tsx` for implementation notes.
 *
 * `children` is deliberately left out of `args` everywhere below and
 * composed via `render` instead: a React element isn't JSON-serializable,
 * and Storybook warns about a "cycle" when it tries to serialize one for
 * the URL/actions panel.
 */
const meta = {
  title: "Primitives/Container",
  component: Container,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box bg="bg.subtle" py="8">
      <Container {...args}>
        <Swatch />
      </Container>
    </Box>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" py="8">
        <Container {...args}>
          <Swatch />
        </Container>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" py="8">
        <Container {...args}>
          <Swatch />
        </Container>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — Chakra's container recipe caps max-width per breakpoint by
// default; these three viewports show that scaling in action.
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  render: (args) => (
    <Box bg="bg.subtle" py="8">
      <Container {...args}>
        <Swatch />
      </Container>
    </Box>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  render: (args) => (
    <Box bg="bg.subtle" py="8">
      <Container {...args}>
        <Swatch />
      </Container>
    </Box>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  render: (args) => (
    <Box bg="bg.subtle" py="8">
      <Container {...args}>
        <Swatch />
      </Container>
    </Box>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  render: (args) => (
    <Box bg="bg.subtle" py="8">
      <Container {...args}>
        <Text>
          A long run of AERYO product copy inside Container, to confirm text
          wraps normally at the container&apos;s max-width rather than
          overflowing or being clipped, across every breakpoint the container
          recipe defines.{" "}
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(
            6,
          )}
        </Text>
      </Container>
    </Box>
  ),
};
