import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { expect, within } from "storybook/test";
import { LuMail, LuSearch } from "react-icons/lu";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Input } from "@/components/forms/Input";
import { InputGroup } from "./InputGroup";

/**
 * AERYO's input group — a thin wrapper around Chakra UI's `InputGroup`.
 * See `InputGroup.tsx` for implementation notes.
 */
const meta = {
  title: "Forms/InputGroup",
  component: InputGroup,
  tags: ["autodocs", "ai-generated"],
  args: {
    startElement: <LuMail />,
    children: <Input placeholder="you@example.com" />,
  },
  argTypes: {
    startElement: { control: false },
    endElement: { control: false },
    startAddon: { control: false },
    endAddon: { control: false },
    children: { control: false },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args} />
    </Box>
  ),
};

export const StartElement: Story = {
  render: () => (
    <Box maxW="16rem">
      <InputGroup startElement={<LuSearch />}>
        <Input placeholder="Search" />
      </InputGroup>
    </Box>
  ),
};

export const EndElement: Story = {
  render: () => (
    <Box maxW="16rem">
      <InputGroup endElement={<LuMail />}>
        <Input placeholder="you@example.com" />
      </InputGroup>
    </Box>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args}>
        <Input placeholder="you@example.com" aria-invalid defaultValue="not-an-email" />
      </InputGroup>
    </Box>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args}>
        <Input placeholder="you@example.com" disabled defaultValue="you@example.com" />
      </InputGroup>
    </Box>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" maxW="16rem">
        <InputGroup {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="16rem">
        <InputGroup {...args} />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args} />
    </Box>
  ),
};

export const Tablet: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args} />
    </Box>
  ),
};

export const Desktop: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args} />
    </Box>
  ),
};

export const RendersIcon: Story = {
  render: (args) => (
    <Box maxW="16rem">
      <InputGroup {...args} />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("you@example.com");
    await expect(input).toBeVisible();
  },
};
