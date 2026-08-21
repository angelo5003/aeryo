import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "@/components/primitives/Stack";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { RiderPresence } from "./RiderPresence";
import type { RiderPresenceStatus } from "./RiderPresence.types";

const STATUSES: RiderPresenceStatus[] = ["riding", "planning", "offline"];

/**
 * AERYO's rider-presence pill. See `RiderPresence.tsx` for implementation
 * notes — it wraps `StatusPill`, fixed to the kitesurf-app's own three
 * presence states.
 */
const meta = {
  title: "Data Display/RiderPresence",
  component: RiderPresence,
  tags: ["autodocs", "ai-generated"],
  args: {
    status: "riding",
  },
  argTypes: {
    status: { control: "select", options: STATUSES },
    time: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RiderPresence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllStatuses: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack direction="row" gap="3">
      <RiderPresence status="riding" />
      <RiderPresence status="planning" time="16:00" />
      <RiderPresence status="offline" />
    </Stack>
  ),
};

export const OnDarkBackground: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack direction="row" gap="6">
      <LightMode>
        <RiderPresence {...args} />
      </LightMode>
      <DarkMode>
        <RiderPresence {...args} />
      </DarkMode>
    </Stack>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};
