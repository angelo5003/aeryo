import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { FormSuccess } from "./FormSuccess";

/**
 * A form-wide success banner — for a positive outcome, not a per-field
 * message (use `Field`'s own helper text for that). See `FormSuccess.tsx`
 * for implementation notes.
 */
const meta = {
  title: "Forms/FormSuccess",
  component: FormSuccess,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Check your inbox to confirm your email.",
  },
  argTypes: {
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FormSuccess>;

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
        <FormSuccess {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6" maxW="20rem">
        <FormSuccess {...args} />
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
      "We've sent a confirmation link to your email address. Click it to finish setting up your account, then come back and log in.",
  },
  render: (args) => (
    <Box width="16rem">
      <FormSuccess {...args} />
    </Box>
  ),
};
