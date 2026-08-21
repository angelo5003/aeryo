import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { ForecastCard } from "./ForecastCard";

/**
 * A single forecast-window summary card — a curated `AeryoCard`
 * composition. See `ForecastCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/ForecastCard",
  component: ForecastCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    date: "Tomorrow, 14:00",
    direction: "WNW, building through the afternoon",
    windSpeed: "22 kt",
    temperature: "24°C",
  },
  argTypes: {
    date: { control: "text" },
    direction: { control: "text" },
    windSpeed: { control: "text" },
    temperature: { control: "text" },
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
    icon: { control: false },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof ForecastCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ForecastCard {...args} />,
};

export const Timeline: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="3" maxW="lg">
      <ForecastCard
        date="14:00"
        direction="WNW, 22 kt"
        windSpeed="22 kt"
        temperature="24°C"
      />
      <ForecastCard
        date="17:00"
        direction="WNW, 26 kt"
        windSpeed="26 kt"
        temperature="23°C"
      />
      <ForecastCard
        date="20:00"
        direction="NW, 18 kt"
        windSpeed="18 kt"
        temperature="21°C"
      />
    </Stack>
  ),
};

export const Loading: Story = {
  args: { loading: true },
  parameters: { controls: { disable: true } },
  render: (args) => <ForecastCard {...args} />,
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <ForecastCard {...args} />
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <ForecastCard {...args} />
    </LightMode>
  ),
};

export const Mobile: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => <ForecastCard {...args} />,
};
