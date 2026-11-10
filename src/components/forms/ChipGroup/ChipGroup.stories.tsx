import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { ChipGroup } from "./ChipGroup";

/**
 * AERYO's chip group — pill-shaped choices. `type="single"` for filters,
 * `type="multiple"` for pickers like gear brands. See `ChipGroup.tsx` for
 * implementation notes.
 */
const meta = {
  title: "Forms/ChipGroup",
  component: ChipGroup,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "Filter",
    items: ["All", "Wind", "Sessions", "Community"],
    defaultValue: "All",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    items: { control: "object" },
    layout: { control: "select", options: ["wrap", "scroll"] },
    size: { control: "select", options: ["pill", "day"] },
    type: { control: "select", options: ["single", "multiple"] },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SinglePick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Wind" }));
    await expect(canvas.getByRole("button", { name: "Wind" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export const MultiplePick: Story = {
  args: {
    type: "multiple",
    "aria-label": "Kite brands",
    items: ["Duotone", "North", "Cabrinha", "Naish", "Slingshot"],
    defaultValue: ["Duotone", "North"],
  },
};

export const WithDisabledChip: Story = {
  args: {
    items: [
      "All",
      { value: "Wind", label: "Wind" },
      { value: "Sessions", label: "Sessions", disabled: true },
    ],
  },
};

export const ScrollingDayPicker: Story = {
  args: {
    layout: "scroll",
    "aria-label": "Day",
    size: "day",
    items: [
      { value: "today", label: "Today", detail: "10 Nov · 18 kt" },
      { value: "tomorrow", label: "Tomorrow", detail: "11 Nov · 14 kt" },
      { value: "wed", label: "Wed", detail: "12 Nov · 22 kt" },
      { value: "thu", label: "Thu", detail: "13 Nov · 9 kt" },
      { value: "fri", label: "Fri", detail: "14 Nov · 16 kt" },
    ],
    defaultValue: "today",
  },
  render: (args) => (
    <Box width="20rem">
      <ChipGroup {...args} />
    </Box>
  ),
};

export const WrapsOnNarrowScreens: Story = {
  render: (args) => (
    <Box width="14rem">
      <ChipGroup {...args} />
    </Box>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <ChipGroup {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <ChipGroup {...args} />
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
