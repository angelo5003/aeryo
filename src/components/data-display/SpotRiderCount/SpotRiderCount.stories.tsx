import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Stack } from "@/components/primitives/Stack";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { SpotRiderCount } from "./SpotRiderCount";

/**
 * A spot's live rider count. See `SpotRiderCount.tsx` for implementation
 * notes.
 */
const meta = {
  title: "Data Display/SpotRiderCount",
  component: SpotRiderCount,
  tags: ["autodocs", "ai-generated"],
  args: {
    riding: 14,
    planning: 6,
  },
  argTypes: {
    riding: { control: "number" },
    planning: { control: "number" },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof SpotRiderCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RidingOnly: Story = {
  args: { riding: 3, planning: undefined },
  parameters: { controls: { disable: true } },
};

export const OnDarkBackground: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack direction="row" gap="8">
      <LightMode>
        <SpotRiderCount {...args} />
      </LightMode>
      <DarkMode>
        <SpotRiderCount {...args} />
      </DarkMode>
    </Stack>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};
