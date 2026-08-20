import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Grid } from "./Grid";

function Cell({ label }: { label: string }) {
  return (
    <Box
      bg="accent.solid"
      color="accent.contrast"
      rounded="l2"
      p="4"
      textAlign="center"
    >
      {label}
    </Box>
  );
}

function SixCells() {
  return (
    <>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
      <Cell label="5" />
      <Cell label="6" />
    </>
  );
}

function FourCells() {
  return (
    <>
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
    </>
  );
}

/**
 * AERYO's CSS Grid layout primitive — a thin wrapper around Chakra UI's
 * `Grid`. See `Grid.tsx` for implementation notes.
 *
 * `children` is deliberately left out of `args` everywhere below and
 * composed via `render` instead: a React element isn't JSON-serializable,
 * and Storybook warns about a "cycle" when it tries to serialize one for
 * the URL/actions panel.
 */
const meta = {
  title: "Primitives/Grid",
  component: Grid,
  tags: ["autodocs", "ai-generated"],
  args: {
    templateColumns: "repeat(3, 1fr)",
    gap: "4",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
    templateColumns: { control: "text" },
    templateRows: { control: "text" },
    templateAreas: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Grid {...args}>
      <SixCells />
    </Grid>
  ),
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Grid {...args}>
          <SixCells />
        </Grid>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Grid {...args}>
          <SixCells />
        </Grid>
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive — column count grows with the viewport, the most common real
// use of Grid's responsive `templateColumns`.
// ---------------------------------------------------------------------------

const responsiveArgs = {
  templateColumns: { base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" },
  gap: "4",
} satisfies Partial<Story["args"]>;

export const Mobile: Story = {
  args: responsiveArgs,
  render: (args) => (
    <Grid {...args}>
      <FourCells />
    </Grid>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  args: responsiveArgs,
  render: (args) => (
    <Grid {...args}>
      <FourCells />
    </Grid>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  args: responsiveArgs,
  render: (args) => (
    <Grid {...args}>
      <FourCells />
    </Grid>
  ),
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content — more cells than fit on one screen at once, to check the
// grid keeps flowing correctly rather than clipping or overlapping.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: { templateColumns: "repeat(3, 1fr)", gap: "3", width: "24rem" },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 15 }, (_, i) => (
        <Cell key={i} label={`${i + 1}`} />
      ))}
    </Grid>
  ),
};
