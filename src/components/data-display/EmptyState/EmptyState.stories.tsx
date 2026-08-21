import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LuCalendarX, LuMapPin, LuSearchX, LuWind } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { EmptyState } from "./EmptyState";
import type { EmptyStateSize } from "./EmptyState.types";

const SIZES: EmptyStateSize[] = ["sm", "md", "lg"];

/**
 * AERYO's empty state. See `EmptyState.tsx` for implementation notes —
 * it wraps Chakra UI's compound `EmptyState`, letting every Chakra
 * `EmptyState.RootProps` field pass through untouched.
 */
const meta = {
  title: "Data Display/EmptyState",
  component: EmptyState,
  tags: ["autodocs", "ai-generated"],
  args: {
    title: "Nothing here yet",
    description: "Once there's something to show, it'll appear here.",
  },
  argTypes: {
    icon: { control: false },
    action: { control: false },
    title: { control: "text" },
    description: { control: "text" },
    size: {
      control: "select",
      options: SIZES,
      description: "Size.",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { icon: <LuWind /> },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <>
      {SIZES.map((size) => (
        <EmptyState key={size} {...args} icon={<LuWind />} size={size} />
      ))}
    </>
  ),
};

// ---------------------------------------------------------------------------
// No Spots / No Forecasts / No Sessions / Search Empty
// ---------------------------------------------------------------------------

export const NoSpots: Story = {
  args: {
    icon: <LuMapPin />,
    title: "No spots nearby",
    description:
      "We couldn't find any wind spots within range. Try widening your search.",
    action: <Button size="sm">Widen search</Button>,
  },
  parameters: { controls: { disable: true } },
};

export const NoForecasts: Story = {
  args: {
    icon: <LuWind />,
    title: "No forecast available",
    description: "Forecast data for this spot hasn't loaded yet.",
    action: <Button size="sm">Retry</Button>,
  },
  parameters: { controls: { disable: true } },
};

export const NoSessions: Story = {
  args: {
    icon: <LuCalendarX />,
    title: "No sessions logged",
    description: "Log your first session to start tracking your progress.",
    action: <Button size="sm">Log a session</Button>,
  },
  parameters: { controls: { disable: true } },
};

export const SearchEmpty: Story = {
  args: {
    icon: <LuSearchX />,
    title: "No results found",
    description: "Try a different search term or clear your filters.",
    action: (
      <Button size="sm" variant="ghost">
        Clear filters
      </Button>
    ),
  },
  parameters: { controls: { disable: true } },
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  args: { icon: <LuWind /> },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <EmptyState {...args} bg="bg" />
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  args: { icon: <LuWind /> },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <EmptyState {...args} bg="bg" />
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  args: { icon: <LuWind /> },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Desktop: Story = {
  args: { icon: <LuWind /> },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
};
