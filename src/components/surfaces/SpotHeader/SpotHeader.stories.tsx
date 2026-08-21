import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/actions/Button";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Stack } from "@/components/primitives/Stack";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { SpotHeader } from "./SpotHeader";

/**
 * A spot page's header block. See `SpotHeader.tsx` for implementation
 * notes.
 */
const meta = {
  title: "Surfaces/SpotHeader",
  component: SpotHeader,
  tags: ["autodocs", "ai-generated"],
  args: {
    name: "IJmuiden",
    region: "North Holland",
    riding: 14,
    planning: 6,
    action: <Button fullWidth>{"I'm riding"}</Button>,
  },
  argTypes: {
    name: { control: "text" },
    region: { control: "text" },
    imageSrc: { control: "text" },
    riding: { control: "number" },
    planning: { control: "number" },
    action: { control: false },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof SpotHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack maxW="sm">
      <SpotHeader {...args} />
    </Stack>
  ),
};

export const WithImage: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1533310266094-8898a03807dd?w=800&q=80",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack maxW="sm">
      <SpotHeader {...args} />
    </Stack>
  ),
};

export const OnDarkBackground: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack direction="row" gap="8">
      <LightMode>
        <Stack maxW="sm">
          <SpotHeader {...args} />
        </Stack>
      </LightMode>
      <DarkMode>
        <Stack maxW="sm">
          <SpotHeader {...args} />
        </Stack>
      </DarkMode>
    </Stack>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};
