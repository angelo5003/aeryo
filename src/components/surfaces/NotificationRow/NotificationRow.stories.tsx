import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@chakra-ui/react";
import { LuBell, LuUsers, LuWind } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { NotificationRow } from "./NotificationRow";

/**
 * AERYO's notification row: icon tile, title, message, time, optional
 * unread dot and action buttons. See `NotificationRow.tsx` for notes.
 */
const meta = {
  title: "Surfaces/NotificationRow",
  component: NotificationRow,
  tags: ["autodocs", "ai-generated"],
  args: {
    icon: <LuWind />,
    title: "Wind picking up at Zandvoort",
    message: "Now 18 kt from the west. Good window until 17:00.",
    time: "2h",
  },
  argTypes: {
    icon: { control: false },
    actions: { control: false },
    as: { control: false },
    asChild: { control: false },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box maxWidth="22rem">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof NotificationRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Read: Story = {};

export const Unread: Story = { args: { unread: true } };

export const WithActions: Story = {
  args: {
    icon: <LuUsers />,
    title: "Sam invited you to a session",
    message: "Saturday 10:00 at Zandvoort",
    time: "5m",
    unread: true,
    actions: (
      <>
        <Button size="md">Accept</Button>
        <Button size="md" variant="outline" intent="secondary">
          Decline
        </Button>
      </>
    ),
  },
};

export const AsLink: Story = {
  args: { href: "#session", icon: <LuBell />, unread: true },
};

export const DarkModeStory: Story = {
  args: { unread: true },
  render: (args) => (
    <DarkMode>
      <Box bg="bg" padding="4">
        <NotificationRow {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  args: { unread: true },
  render: (args) => (
    <LightMode>
      <Box bg="bg" padding="4">
        <NotificationRow {...args} />
      </Box>
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      viewports: RESPONSIVE_VIEWPORTS,
      defaultViewport: "aeryoMobile",
    },
  },
};
