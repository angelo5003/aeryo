import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "@/components/primitives/Stack";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { RiderCard } from "./RiderCard";

/**
 * A single rider row for a spot's rider list. See `RiderCard.tsx` for
 * implementation notes.
 */
const meta = {
  title: "Surfaces/RiderCard",
  component: RiderCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    name: "Mark",
    discipline: "Freeride",
    skillLevel: "Intermediate",
    presence: { status: "riding" },
  },
  argTypes: {
    name: { control: "text" },
    discipline: { control: "text" },
    skillLevel: { control: "text" },
    avatarSrc: { control: "text" },
    avatarSize: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    presence: { control: false },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof RiderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RiderList: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="4" maxW="sm">
      <RiderCard
        name="Mark"
        discipline="Freeride"
        skillLevel="Intermediate"
        presence={{ status: "riding" }}
      />
      <RiderCard
        name="Lisa"
        discipline="Freestyle"
        skillLevel="Advanced"
        presence={{ status: "riding" }}
      />
      <RiderCard
        name="Tony"
        discipline="Big Air"
        skillLevel="Intermediate"
        presence={{ status: "planning", time: "16:00" }}
      />
    </Stack>
  ),
};

export const OnDarkBackground: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack direction="row" gap="8">
      <LightMode>
        <RiderCard {...args} />
      </LightMode>
      <DarkMode>
        <RiderCard {...args} />
      </DarkMode>
    </Stack>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};
