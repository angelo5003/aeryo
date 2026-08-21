import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/actions/Button";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Stack } from "@/components/primitives/Stack";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { SessionCard } from "./SessionCard";

/**
 * A planned session summary card — a curated `AeryoCard` composition. See
 * `SessionCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/SessionCard",
  component: SessionCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    title: "Saturday Session",
    spot: "IJmuiden",
    startTime: "15:00",
    participants: 8,
    maxParticipants: 10,
  },
  argTypes: {
    title: { control: "text" },
    spot: { control: "text" },
    startTime: { control: "text" },
    participants: { control: "number" },
    maxParticipants: { control: "number" },
    href: { control: "text" },
    clickable: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined", "filled", "interactive"],
    },
    loading: { control: "boolean" },
    action: { control: false },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof SessionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { action: <Button size="sm">Join</Button> },
};

export const NoCap: Story = {
  args: { maxParticipants: undefined, action: <Button size="sm">Join</Button> },
  parameters: { controls: { disable: true } },
};

export const Loading: Story = {
  args: { loading: true, action: <Button size="sm">Join</Button> },
  parameters: { controls: { disable: true } },
};

export const OnDarkBackground: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack direction="row" gap="8">
      <LightMode>
        <SessionCard {...args} action={<Button size="sm">Join</Button>} />
      </LightMode>
      <DarkMode>
        <SessionCard {...args} action={<Button size="sm">Join</Button>} />
      </DarkMode>
    </Stack>
  ),
};

export const Mobile: Story = {
  args: { action: <Button size="sm">Join</Button> },
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};
