import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { WeatherCard } from "./WeatherCard";

/**
 * A current/near-term conditions summary card — a curated `AeryoCard`
 * composition. See `WeatherCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/WeatherCard",
  component: WeatherCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    overline: "Now",
    temperature: "24°C",
    windSpeed: "18 kt",
    feelsLike: "23°C",
    condition: "Good conditions",
  },
  argTypes: {
    overline: { control: "text" },
    temperature: { control: "text" },
    windSpeed: { control: "text" },
    feelsLike: { control: "text" },
    condition: { control: "text" },
    conditionIntent: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info"],
    },
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
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof WeatherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <WeatherCard {...args} />,
};

export const DangerousConditions: Story = {
  args: {
    temperature: "31°C",
    windSpeed: "42 kt",
    condition: "Extreme — small craft advisory",
    conditionIntent: "error",
  },
  parameters: { controls: { disable: true } },
  render: (args) => <WeatherCard {...args} />,
};

export const Loading: Story = {
  args: { loading: true },
  parameters: { controls: { disable: true } },
  render: (args) => <WeatherCard {...args} />,
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <WeatherCard {...args} />
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <WeatherCard {...args} />
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => <WeatherCard {...args} />,
};
