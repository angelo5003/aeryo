import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Wrap } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Badge } from "./Badge";
import type {
  StatusIntent,
  StatusVariant,
} from "../internal/statusColorPalette";

const INTENTS: StatusIntent[] = [
  "neutral",
  "success",
  "warning",
  "error",
  "info",
];
const VARIANTS: StatusVariant[] = ["solid", "subtle", "outline", "surface"];
const SIZES = ["xs", "sm", "md", "lg"] as const;

/**
 * AERYO's status badge — a thin wrapper around Chakra UI's `Badge`. See
 * `Badge.tsx` for implementation notes.
 */
const meta = {
  title: "Typography/Badge",
  component: Badge,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Badge",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    intent: { control: "select", options: INTENTS },
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Variants — every intent x every variant.
// ---------------------------------------------------------------------------

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="4">
      {VARIANTS.map((variant) => (
        <Wrap key={variant} gap="3" align="center">
          {INTENTS.map((intent) => (
            <Badge key={intent} {...args} variant={variant} intent={intent}>
              {intent}
            </Badge>
          ))}
        </Wrap>
      ))}
    </Box>
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
        <Badge key={size} {...args} size={size}>
          {size}
        </Badge>
      ))}
    </Wrap>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Wrap gap="3" p="6" bg="bg" align="center">
        {INTENTS.map((intent) => (
          <Badge key={intent} {...args} intent={intent}>
            {intent}
          </Badge>
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
        {INTENTS.map((intent) => (
          <Badge key={intent} {...args} intent={intent}>
            {intent}
          </Badge>
        ))}
      </Wrap>
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

export const LongLabel: Story = {
  args: { children: "A deliberately long status badge label" },
  render: (args) => (
    <Box width="12rem">
      <Badge {...args} />
    </Box>
  ),
};
