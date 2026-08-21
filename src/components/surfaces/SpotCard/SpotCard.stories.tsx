import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Badge } from "@/components/typography/Badge";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { SpotCard } from "./SpotCard";

/**
 * A wind/kite spot summary card — a curated `AeryoCard` composition. See
 * `SpotCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/SpotCard",
  component: SpotCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    name: "Tarifa",
    region: "Andalusia, Spain",
    description:
      "Consistent thermal wind funneling through the Strait of Gibraltar.",
    windSpeed: "18 kt",
    rating: "4.8",
  },
  argTypes: {
    name: { control: "text" },
    region: { control: "text" },
    description: { control: "text" },
    windSpeed: { control: "text" },
    rating: { control: "text" },
    imageSrc: { control: "text" },
    href: { control: "text" },
    clickable: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined", "filled", "interactive"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    selected: { control: "boolean" },
    onSave: { control: false },
    badges: { control: false },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof SpotCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SpotCard {...args} />,
};

export const WithBadgesAndSave: Story = {
  render: (args) => (
    <SpotCard
      {...args}
      badges={<Badge intent="info">Best Wind</Badge>}
      onSave={() => {}}
    />
  ),
};

export const Clickable: Story = {
  args: { href: "/spots/tarifa" },
  parameters: { controls: { disable: true } },
  render: (args) => <SpotCard {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Open Tarifa" });
    await expect(link).toHaveAttribute("href", "/spots/tarifa");
  },
};

export const Loading: Story = {
  args: { loading: true },
  parameters: { controls: { disable: true } },
  render: (args) => <SpotCard {...args} />,
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <SpotCard {...args} />
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <SpotCard {...args} />
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => <SpotCard {...args} />,
};
