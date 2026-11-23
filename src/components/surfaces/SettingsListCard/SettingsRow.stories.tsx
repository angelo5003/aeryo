import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { expect } from "storybook/test";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { SettingsListCard } from "./SettingsListCard";
import { SettingsRow } from "./SettingsRow";

/**
 * AERYO's settings row — one tappable line inside a `SettingsListCard`:
 * the setting's title on the left, its current value and an optional arrow
 * on the right. See `SettingsRow.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/SettingsRow",
  component: SettingsRow,
  tags: ["autodocs", "ai-generated"],
  args: {
    title: "Riding preferences",
    value: "14–28 kt · Sea",
    href: "/settings",
  },
  parameters: { layout: "padded" },
  // The row is made to sit inside a card, so every story shows it there.
  render: (args) => (
    <Box maxWidth="22rem">
      <SettingsListCard>
        <SettingsRow {...args} />
      </SettingsListCard>
    </Box>
  ),
} satisfies Meta<typeof SettingsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutValue: Story = {
  args: { title: "Delete account", value: undefined },
};

export const OpensAnotherScreen: Story = {
  play: async ({ args, canvas }) => {
    await expect(
      canvas.getByRole("link", { name: /Riding preferences/ }),
    ).toHaveAttribute("href", args.href);
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <SettingsListCard>
          <SettingsRow {...args} />
        </SettingsListCard>
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <SettingsListCard>
          <SettingsRow {...args} />
        </SettingsListCard>
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const LongTitleAndValue: Story = {
  args: {
    title: "Notification settings for every spot you follow",
    value: "Wind alerts, rider check-ins and session reminders",
  },
};
