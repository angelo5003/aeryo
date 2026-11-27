import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Flex } from "@chakra-ui/react";
import { LuArrowRight, LuSailboat, LuWind } from "react-icons/lu";
import { expect } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Box } from "../Box";
import { Icon } from "./Icon";

// The controls pick an icon by name; `mapping` swaps the name for the component.
const ICON_CHOICES = {
  wind: LuWind,
  arrow: LuArrowRight,
  sailboat: LuSailboat,
};

/**
 * AERYO's icon primitive — a thin wrapper around Chakra UI's `Icon`. Icons
 * without `aria-label` are hidden from screen readers. See `Icon.tsx` for
 * implementation notes.
 */
const meta = {
  title: "Primitives/Icon",
  component: Icon,
  tags: ["autodocs", "ai-generated"],
  args: {
    as: LuWind,
    size: "lg",
    color: "fg",
  },
  argTypes: {
    as: {
      control: "select",
      options: Object.keys(ICON_CHOICES),
      mapping: ICON_CHOICES,
    },
    asChild: { control: false },
    size: {
      control: "select",
      options: ["inherit", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector("svg");

    await expect(icon).toBeInTheDocument();
    await expect(icon).toHaveAttribute("aria-hidden", "true");
  },
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode — see actions/Button/Button.stories.tsx for why
// these use the DarkMode/LightMode scoping components.
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <Icon {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <Icon {...args} />
      </Box>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Sizes — rendered in `render` since each icon needs its own size.
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: (args) => (
    <Flex gap="4" align="center">
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(6);
  },
};

// ---------------------------------------------------------------------------
// Colors — semantic tokens only (see the design-tokens rule).
// ---------------------------------------------------------------------------

export const Colors: Story = {
  render: (args) => (
    <Flex gap="4" align="center">
      {(["fg", "fg.muted", "accent.solid"] as const).map((color) => (
        <Icon key={color} {...args} color={color} />
      ))}
    </Flex>
  ),
};

// ---------------------------------------------------------------------------
// Accessibility — a label turns decoration into a labelled image.
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  args: { "aria-label": "Wind speed" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "Wind speed" }),
    ).toBeInTheDocument();
  },
};

export const AsChild: Story = {
  render: (args) => (
    <Icon {...args} asChild>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Icon>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("circle")).toBeInTheDocument();
  },
};

// ---------------------------------------------------------------------------
// Responsive — Icon's own responsive size (object syntax).
// ---------------------------------------------------------------------------

const responsiveArgs = {
  size: { base: "md", md: "xl", xl: "2xl" },
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
