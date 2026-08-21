import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wrap } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { StatusPill } from "./StatusPill";
import type { StatusPillSize, StatusPillVariant } from "./StatusPill.types";

const VARIANTS: StatusPillVariant[] = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
];
const SIZES: StatusPillSize[] = ["sm", "md", "lg"];

/**
 * AERYO's status pill. See `StatusPill.tsx` for implementation notes —
 * it wraps Chakra UI's `Badge`, translating the semantic `variant` prop
 * into a token-backed `colorPalette`. Every other Chakra `BadgeProps`
 * field (style props, responsive props, `as`, `asChild`, `ref`, …)
 * passes through untouched.
 */
const meta = {
  title: "Data Display/StatusPill",
  component: StatusPill,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Status",
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Semantic variant — selects the token-backed colorPalette.",
    },
    size: {
      control: "select",
      options: SIZES,
      description: "Size.",
    },
    children: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof StatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="3" align="center">
      {VARIANTS.map((variant) => (
        <StatusPill key={variant} {...args} variant={variant}>
          {variant}
        </StatusPill>
      ))}
    </Wrap>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="3" align="center">
      {SIZES.map((size) => (
        <StatusPill key={size} {...args} size={size}>
          {size}
        </StatusPill>
      ))}
    </Wrap>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
//
// This Storybook isn't wired to a global theme-switcher toolbar (no
// @storybook/addon-themes / toolbar globalTypes in .storybook/preview), so
// these stories use AERYO's own DarkMode/LightMode scoping components
// (src/components/ui/color-mode.tsx) instead — same pattern as
// Button.stories.tsx.
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Wrap gap="3" p="6" bg="bg" align="center">
        {VARIANTS.map((variant) => (
          <StatusPill key={variant} {...args} variant={variant}>
            {variant}
          </StatusPill>
        ))}
      </Wrap>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <Wrap gap="3" p="6" bg="bg" align="center">
        {VARIANTS.map((variant) => (
          <StatusPill key={variant} {...args} variant={variant}>
            {variant}
          </StatusPill>
        ))}
      </Wrap>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Desktop: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
};
