import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Flex } from "./Flex";

function Swatch({ label }: { label: string }) {
  return (
    <Box
      bg="accent.solid"
      color="accent.contrast"
      rounded="l2"
      px="4"
      py="2"
      flexShrink="0"
    >
      {label}
    </Box>
  );
}

function ThreeSwatches() {
  return (
    <>
      <Swatch label="One" />
      <Swatch label="Two" />
      <Swatch label="Three" />
    </>
  );
}

/**
 * AERYO's flexbox layout primitive — a thin wrapper around Chakra UI's
 * `Flex`. See `Flex.tsx` for implementation notes.
 *
 * `children` is deliberately left out of `args` everywhere below and
 * composed via `render` instead: a React element isn't JSON-serializable,
 * and Storybook warns about a "cycle" when it tries to serialize one for
 * the URL/actions panel.
 */
const meta = {
  title: "Primitives/Flex",
  component: Flex,
  tags: ["autodocs", "ai-generated"],
  args: {
    gap: "4",
    align: "center",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
    align: { control: "text" },
    justify: { control: "text" },
    wrap: { control: "text" },
    direction: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Flex {...args}>
      <ThreeSwatches />
    </Flex>
  ),
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Flex {...args}>
          <ThreeSwatches />
        </Flex>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Flex {...args}>
          <ThreeSwatches />
        </Flex>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — direction flips from column (mobile) to row (desktop), the
// most common real use of Flex's responsive props.
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
// Long Content — wrapping behavior when children overflow the row.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: { wrap: "wrap", gap: "3", width: "20rem" },
  render: (args) => (
    <Flex {...args}>
      {Array.from({ length: 10 }, (_, i) => (
        <Swatch key={i} label={`Item ${i + 1}`} />
      ))}
    </Flex>
  ),
};
