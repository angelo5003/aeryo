import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "@/components/typography/Text";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { LuCalendar, LuMapPin, LuTrophy, LuWind } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

/**
 * AERYO's tabs. See `Tabs.tsx` for implementation notes — it wraps
 * Chakra UI's compound `Tabs`, letting every Chakra `Tabs.Root` field
 * (`defaultValue`, `value`, `onValueChange`, …) pass through untouched.
 * Horizontal only, per this component's own spec.
 */
const meta = {
  title: "Data Display/Tabs",
  component: Tabs,
  tags: ["autodocs", "ai-generated"],
  args: {
    defaultValue: "spots",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} maxW="lg">
      <TabsList>
        <TabsTrigger value="spots">Spots</TabsTrigger>
        <TabsTrigger value="forecast">Forecast</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="spots">
        <Text variant="body">Nearby spots and their current conditions.</Text>
      </TabsContent>
      <TabsContent value="forecast">
        <Text variant="body">The next few days of wind and weather.</Text>
      </TabsContent>
      <TabsContent value="sessions">
        <Text variant="body">Your logged sessions.</Text>
      </TabsContent>
    </Tabs>
  ),
};

// ---------------------------------------------------------------------------
// Icon tabs
// ---------------------------------------------------------------------------

export const IconTabs: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} maxW="lg">
      <TabsList>
        <TabsTrigger value="spots" icon={<LuMapPin />}>
          Spots
        </TabsTrigger>
        <TabsTrigger value="forecast" icon={<LuWind />}>
          Forecast
        </TabsTrigger>
        <TabsTrigger value="sessions" icon={<LuCalendar />}>
          Sessions
        </TabsTrigger>
        <TabsTrigger value="achievements" icon={<LuTrophy />}>
          Achievements
        </TabsTrigger>
      </TabsList>
      <TabsContent value="spots">
        <Text variant="body">Nearby spots and their current conditions.</Text>
      </TabsContent>
      <TabsContent value="forecast">
        <Text variant="body">The next few days of wind and weather.</Text>
      </TabsContent>
      <TabsContent value="sessions">
        <Text variant="body">Your logged sessions.</Text>
      </TabsContent>
      <TabsContent value="achievements">
        <Text variant="body">Milestones you have unlocked.</Text>
      </TabsContent>
    </Tabs>
  ),
};

// ---------------------------------------------------------------------------
// Long Labels — also demonstrates the default (non-scrollable) shrink-to-
// fit behavior under a narrow container, per this story's own request.
// ---------------------------------------------------------------------------

export const LongLabels: Story = {
  args: { defaultValue: "a" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} maxW="sm">
      <TabsList>
        <TabsTrigger value="a">Current wind conditions</TabsTrigger>
        <TabsTrigger value="b">Extended seven-day forecast</TabsTrigger>
        <TabsTrigger value="c">Community session reports</TabsTrigger>
      </TabsList>
      <TabsContent value="a">
        <Text variant="body">18 kt, WNW, building through the afternoon.</Text>
      </TabsContent>
      <TabsContent value="b">
        <Text variant="body">A detailed week-long outlook.</Text>
      </TabsContent>
      <TabsContent value="c">
        <Text variant="body">What riders logged at this spot recently.</Text>
      </TabsContent>
    </Tabs>
  ),
};

// ---------------------------------------------------------------------------
// Scrollable — a long/unbounded tab set that scrolls horizontally instead
// of shrinking every trigger to fit.
// ---------------------------------------------------------------------------

const SCROLLABLE_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Scrollable: Story = {
  args: { defaultValue: "monday" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    // Deliberately narrower than the triggers' combined natural width, so
    // the list actually has to scroll rather than merely being capable of
    // it — seven full day names don't fit in 16rem.
    <Tabs {...args} maxW="16rem">
      <TabsList scrollable>
        {SCROLLABLE_DAYS.map((day) => (
          <TabsTrigger key={day} value={day.toLowerCase()}>
            {day}
          </TabsTrigger>
        ))}
      </TabsList>
      {SCROLLABLE_DAYS.map((day) => (
        <TabsContent key={day} value={day.toLowerCase()}>
          <Text variant="body">Forecast for {day}.</Text>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Tabs {...args} maxW="lg" p="6" bg="bg">
        <TabsList>
          <TabsTrigger value="spots">Spots</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="spots">
          <Text variant="body">Nearby spots and their current conditions.</Text>
        </TabsContent>
        <TabsContent value="forecast">
          <Text variant="body">The next few days of wind and weather.</Text>
        </TabsContent>
        <TabsContent value="sessions">
          <Text variant="body">Your logged sessions.</Text>
        </TabsContent>
      </Tabs>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <Tabs {...args} maxW="lg" p="6" bg="bg">
        <TabsList>
          <TabsTrigger value="spots">Spots</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="spots">
          <Text variant="body">Nearby spots and their current conditions.</Text>
        </TabsContent>
        <TabsContent value="forecast">
          <Text variant="body">The next few days of wind and weather.</Text>
        </TabsContent>
        <TabsContent value="sessions">
          <Text variant="body">Your logged sessions.</Text>
        </TabsContent>
      </Tabs>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => (
    <Tabs {...args} w="full">
      <TabsList scrollable>
        <TabsTrigger value="spots">Spots</TabsTrigger>
        <TabsTrigger value="forecast">Forecast</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
      <TabsContent value="spots">
        <Text variant="body">Nearby spots and their current conditions.</Text>
      </TabsContent>
      <TabsContent value="forecast">
        <Text variant="body">The next few days of wind and weather.</Text>
      </TabsContent>
      <TabsContent value="sessions">
        <Text variant="body">Your logged sessions.</Text>
      </TabsContent>
      <TabsContent value="achievements">
        <Text variant="body">Milestones you have unlocked.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const Desktop: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
  render: (args) => (
    <Tabs {...args} maxW="lg">
      <TabsList>
        <TabsTrigger value="spots">Spots</TabsTrigger>
        <TabsTrigger value="forecast">Forecast</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="spots">
        <Text variant="body">Nearby spots and their current conditions.</Text>
      </TabsContent>
      <TabsContent value="forecast">
        <Text variant="body">The next few days of wind and weather.</Text>
      </TabsContent>
      <TabsContent value="sessions">
        <Text variant="body">Your logged sessions.</Text>
      </TabsContent>
    </Tabs>
  ),
};
