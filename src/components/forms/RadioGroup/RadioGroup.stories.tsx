import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Stack } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Radio, RadioGroup } from "./RadioGroup";

const SIZES = ["sm", "md", "lg"] as const;

/**
 * AERYO's radio group — a thin wrapper around Chakra UI's `RadioGroup`.
 * See `RadioGroup.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs", "ai-generated"],
  args: {
    defaultValue: "beginner",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    size: { control: "select", options: SIZES },
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Stack gap="3">
        <Radio value="beginner">Beginner</Radio>
        <Radio value="intermediate">Intermediate</Radio>
        <Radio value="advanced">Advanced</Radio>
      </Stack>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <RadioGroup {...args}>
      <Stack direction="row" gap="6">
        <Radio value="beginner">Beginner</Radio>
        <Radio value="intermediate">Intermediate</Radio>
        <Radio value="advanced">Advanced</Radio>
      </Stack>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="6">
      {SIZES.map((size) => (
        <RadioGroup key={size} size={size} defaultValue="beginner">
          <Stack gap="2">
            <Radio value="beginner">Beginner</Radio>
            <Radio value="advanced">Advanced</Radio>
          </Stack>
        </RadioGroup>
      ))}
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <RadioGroup {...args}>
      <Stack gap="3">
        <Radio value="beginner">Beginner</Radio>
        <Radio value="advanced">Advanced</Radio>
      </Stack>
    </RadioGroup>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <RadioGroup {...args}>
          <Stack gap="3">
            <Radio value="beginner">Beginner</Radio>
            <Radio value="advanced">Advanced</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <RadioGroup {...args}>
          <Stack gap="3">
            <Radio value="beginner">Beginner</Radio>
            <Radio value="advanced">Advanced</Radio>
          </Stack>
        </RadioGroup>
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

export const LongLabel: Story = {
  render: (args) => (
    <Box width="14rem">
      <RadioGroup {...args}>
        <Stack gap="3">
          <Radio value="beginner">
            A deliberately long option label that wraps onto a second line
          </Radio>
          <Radio value="advanced">Advanced</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  ),
};

export const SelectOption: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Stack gap="3">
        <Radio value="beginner">Beginner</Radio>
        <Radio value="advanced">Advanced</Radio>
      </Stack>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const advanced = canvas.getByRole("radio", { name: "Advanced" });
    await userEvent.click(advanced);
    await expect(advanced).toBeChecked();
  },
};
