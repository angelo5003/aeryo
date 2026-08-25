import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Input } from "@/components/forms/Input";
import { Field } from "./Field";

/**
 * AERYO's form-field wrapper — label, helper text, error text, and a
 * required/optional indicator around any input control. See `Field.tsx`
 * for implementation notes.
 */
const meta = {
  title: "Forms/Field",
  component: Field,
  tags: ["autodocs", "ai-generated"],
  args: {
    label: "Email",
    children: <Input placeholder="you@example.com" />,
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
    label: { control: "text" },
    helperText: { control: "text" },
    errorText: { control: "text" },
    invalid: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "We'll never share your email." },
};

export const Required: Story = {
  args: { required: true },
};

export const Optional: Story = {
  args: { optionalText: "optional", helperText: "Only if you want updates." },
};

export const Invalid: Story = {
  args: { invalid: true, errorText: "Enter a valid email address." },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Input disabled placeholder="you@example.com" />,
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" maxW="20rem">
        <Field {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="20rem">
        <Field {...args} />
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
  args: {
    label:
      "A deliberately long field label that should wrap onto a second line",
    helperText:
      "And a matching long helper text below it, to confirm both wrap cleanly inside a narrow field.",
  },
  render: (args) => (
    <Box width="14rem">
      <Field {...args} />
    </Box>
  ),
};
