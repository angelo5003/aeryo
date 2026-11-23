import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { SettingsListCard } from "./SettingsListCard";
import { SettingsRow } from "./SettingsRow";

/**
 * AERYO's settings list card — one card for a stack of settings rows, with a
 * divider between rows and an optional label above. See
 * `SettingsListCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/SettingsListCard",
  component: SettingsListCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    label: "Riding",
    children: (
      <>
        <SettingsRow
          title="Riding preferences"
          value="14–28 kt · Sea"
          showChevron
        />
        <SettingsRow title="My gear" value="7 items" showChevron />
      </>
    ),
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box maxWidth="22rem">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof SettingsListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = { args: { label: undefined } };

export const SingleRow: Story = {
  args: { children: <SettingsRow title="Appearance" value="System" /> },
};

export const ManyRows: Story = {
  args: {
    label: "Preferences",
    children: (
      <>
        <SettingsRow title="Notifications" value="2 on" />
        <SettingsRow title="Appearance" value="System" />
        <SettingsRow title="Language" value="English" />
        <SettingsRow title="Units" value="Knots" />
      </>
    ),
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <SettingsListCard {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <SettingsListCard {...args} />
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
