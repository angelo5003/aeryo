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
    items: ["Today", "Tomorrow", "Sat 8 Nov", "Sun 9 Nov", "Mon 10 Nov"],
    defaultValue: "Today",
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
