import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { SegmentedControl } from "./SegmentedControl";

const SIZES = ["xs", "sm", "md", "lg"] as const;

/**
 * AERYO's segmented control — a thin wrapper around Chakra UI's
 * `SegmentGroup`. See `SegmentedControl.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs", "ai-generated"],
  args: {
    items: ["Metric", "Imperial"],
    defaultValue: "Metric",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    items: { control: "object" },
    size: { control: "select", options: SIZES },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThreeOptions: Story = {
  args: { items: ["Day", "Week", "Month"], defaultValue: "Week" },
};

export const WithDisabledOption: Story = {
  args: {
    items: [
      "Metric",
      "Imperial",
      { value: "Nautical", label: "Nautical", disabled: true },
    ],
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box display="flex" flexDirection="column" gap="4" alignItems="flex-start">
      {SIZES.map((size) => (
        <SegmentedControl
          key={size}
          size={size}
          items={["Metric", "Imperial"]}
          defaultValue="Metric"
        />
      ))}
    </Box>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <SegmentedControl {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <SegmentedControl {...args} />
      </Box>
    </LightMode>
  ),
};

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

export const LongLabels: Story = {
  args: {
    items: ["Beginner friendly", "Intermediate", "Advanced only"],
    defaultValue: "Beginner friendly",
  },
  render: (args) => (
    <Box width="16rem">
      <SegmentedControl {...args} />
    </Box>
  ),
};

export const SelectOption: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const imperial = canvas.getByRole("radio", { name: "Imperial" });
    await userEvent.click(imperial);
    await expect(imperial).toBeChecked();
  },
};
