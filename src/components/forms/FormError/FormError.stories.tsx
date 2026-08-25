import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { FormError } from "./FormError";

/**
 * A form-wide error banner — for a failed submission, not a per-field
 * error (use `Field`'s own `errorText` for that). See `FormError.tsx`
 * for implementation notes.
 */
const meta = {
  title: "Forms/FormError",
  component: FormError,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Invalid email or password.",
  },
  argTypes: {
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FormError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { children: undefined },
  parameters: { controls: { disable: true } },
  render: () => (
    <Box color="fg.muted" textStyle="sm">
      (renders nothing when there&apos;s no message — this box is just to show
      the empty story isn&apos;t broken)
    </Box>
  ),
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6" maxW="20rem">
        <FormError {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="20rem">
        <FormError {...args} />
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

export const LongMessage: Story = {
  args: {
    children:
      "We couldn't create your account: that email address is already registered. Try logging in instead, or use a different email address.",
  },
  render: (args) => (
    <Box width="16rem">
      <FormError {...args} />
    </Box>
  ),
};
