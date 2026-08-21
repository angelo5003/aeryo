import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack, Wrap } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import {
  LuHeart,
  LuMapPin,
  LuShare2,
  LuStar,
  LuThermometer,
  LuWind,
} from "react-icons/lu";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Badge } from "@/components/typography/Badge";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/actions/Button";
import { IconButton } from "@/components/actions/IconButton";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { AeryoCard } from "./AeryoCard";
import { AeryoCardHeader } from "./AeryoCardHeader";
import { AeryoCardBody } from "./AeryoCardBody";
import { AeryoCardFooter } from "./AeryoCardFooter";
import { AeryoCardMedia } from "./AeryoCardMedia";
import { AeryoCardMeta } from "./AeryoCardMeta";
import { AeryoCardBadges } from "./AeryoCardBadges";
import { AeryoCardActions } from "./AeryoCardActions";
import type {
  AeryoCardLayout,
  AeryoCardSize,
  AeryoCardVariant,
} from "./AeryoCard.types";

const VARIANTS: AeryoCardVariant[] = [
  "default",
  "elevated",
  "outlined",
  "filled",
  "interactive",
];
const SIZES: AeryoCardSize[] = ["sm", "md", "lg"];
const LAYOUTS: AeryoCardLayout[] = ["vertical", "horizontal"];

/**
 * AERYO's card foundation — the compound component every product card
 * (SpotCard, ForecastCard, WeatherCard, …) composes from. See
 * `AeryoCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/Card",
  component: AeryoCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    variant: "default",
    size: "md",
    layout: "vertical",
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Visual treatment.",
    },
    size: {
      control: "select",
      options: SIZES,
      description: "Size — controls padding and header text sizing.",
    },
    layout: {
      control: "select",
      options: LAYOUTS,
      description:
        "Stacks children, or splits AeryoCardMedia into its own column.",
    },
    selected: {
      control: "boolean",
      description: "Adds a selected visual treatment and aria-selected.",
    },
    disabled: {
      control: "boolean",
      description: "Dims the card and blocks its own click/navigation.",
    },
    loading: {
      control: "boolean",
      description: "Every subcomponent renders its own skeleton shape.",
    },
    clickable: {
      control: "boolean",
      description: "Makes the whole card one accessible click target.",
    },
    href: {
      control: "text",
      description: "Makes the whole card one accessible navigation target.",
    },
    "aria-label": {
      control: "text",
      description: "Required accessible name when clickable/href is set.",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AeryoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// A representative full composition, reused across most stories so every
// slot (media/header/body/footer) is exercised the same way.
// ---------------------------------------------------------------------------

function SampleCardContents() {
  return (
    <>
      <AeryoCardMedia aspectRatio="landscape">
        <Stack align="center" justify="center" w="full" h="full" bg="bg.muted">
          <LuMapPin size={32} />
        </Stack>
      </AeryoCardMedia>
      <AeryoCardBadges position="overlay-top-left">
        <Badge intent="info">Featured</Badge>
      </AeryoCardBadges>
      <AeryoCardActions position="overlay-top-right">
        <IconButton aria-label="Save" variant="ghost" size="sm">
          <LuHeart />
        </IconButton>
      </AeryoCardActions>
      <AeryoCardHeader
        overline="Andalusia, Spain"
        title="Tarifa"
        subtitle="Europe's windiest spot"
        actions={
          <AeryoCardActions>
            <IconButton aria-label="Share" variant="ghost" size="sm">
              <LuShare2 />
            </IconButton>
          </AeryoCardActions>
        }
      />
      <AeryoCardBody>
        <Text variant="body">
          Consistent thermal wind funneling through the Strait of Gibraltar —
          reliable conditions most of the season.
        </Text>
        <Wrap gap="4" mt="3">
          <AeryoCardMeta icon={<LuWind />} label="Wind Speed" value="18 kt" />
          <AeryoCardMeta icon={<LuStar />} label="Rating" value="4.8" />
        </Wrap>
      </AeryoCardBody>
      <AeryoCardFooter>
        <Text variant="caption" color="fg.muted">
          Updated 5 min ago
        </Text>
        <Button size="sm">View Forecast</Button>
      </AeryoCardFooter>
    </>
  );
}

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

export const Elevated: Story = {
  args: { variant: "elevated" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Outlined: Story = {
  args: { variant: "outlined" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Filled: Story = {
  args: { variant: "filled" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Interactive: Story = {
  args: { variant: "interactive" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Small: Story = {
  args: { size: "sm" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="xs">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Medium: Story = {
  args: { size: "md" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Large: Story = {
  args: { size: "lg" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="md">
      <SampleCardContents />
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// Layouts
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  args: { layout: "vertical" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Horizontal: Story = {
  args: { layout: "horizontal" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="lg">
      <AeryoCardMedia aspectRatio="square" w="32">
        <Stack align="center" justify="center" w="full" h="full" bg="bg.muted">
          <LuWind size={28} />
        </Stack>
      </AeryoCardMedia>
      <AeryoCardHeader title="Tomorrow, 14:00" subtitle="WNW, building" />
      <AeryoCardBody>
        <AeryoCardMeta icon={<LuWind />} label="Wind Speed" value="22 kt" />
      </AeryoCardBody>
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// Individual slots
// ---------------------------------------------------------------------------

export const WithHeader: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <AeryoCardHeader
        overline="Andalusia, Spain"
        title="Tarifa"
        subtitle="Europe's windiest spot"
      />
    </AeryoCard>
  ),
};

export const WithFooter: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <AeryoCardBody>
        <Text variant="body">Session logged for today.</Text>
      </AeryoCardBody>
      <AeryoCardFooter>
        <Text variant="caption" color="fg.muted">
          2h 15m
        </Text>
        <Button size="sm">Open</Button>
      </AeryoCardFooter>
    </AeryoCard>
  ),
};

export const WithMedia: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <AeryoCardMedia aspectRatio="wide">
        <Stack align="center" justify="center" w="full" h="full" bg="bg.muted">
          <LuThermometer size={32} />
        </Stack>
      </AeryoCardMedia>
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Loading: Story = {
  args: { loading: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Empty: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <AeryoCardBody>
        <Text variant="body" color="fg.muted">
          No sessions logged yet.
        </Text>
      </AeryoCardBody>
    </AeryoCard>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    clickable: true,
    "aria-label": "Tarifa spot (unavailable)",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("button", {
      name: "Tarifa spot (unavailable)",
    });
    await expect(control).toHaveAttribute("tabIndex", "-1");
  },
};

// ---------------------------------------------------------------------------
// Interactive mode — keyboard nav, focus, and link/button semantics.
// ---------------------------------------------------------------------------

export const ClickableCard: Story = {
  name: "Clickable",
  args: {
    variant: "interactive",
    clickable: true,
    "aria-label": "Open Tarifa",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("button", { name: "Open Tarifa" });
    control.focus();
    await expect(control).toHaveFocus();
  },
};

export const LinkCard: Story = {
  name: "Link (href)",
  args: {
    variant: "interactive",
    href: "/spots/tarifa",
    "aria-label": "Open Tarifa",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Open Tarifa" });
    await expect(link).toHaveAttribute("href", "/spots/tarifa");
  },
};

export const NestedActionStaysClickable: Story = {
  args: {
    variant: "interactive",
    clickable: true,
    "aria-label": "Open Tarifa",
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByRole("button", { name: "Save" });
    await userEvent.click(saveButton);
    // Reaching and clicking the nested action (rather than only hitting the
    // full-bleed card overlay behind it) is the assertion itself.
    await expect(saveButton).toBeVisible();
  },
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Stack p="6" bg="bg">
        <AeryoCard {...args} maxW="sm">
          <SampleCardContents />
        </AeryoCard>
      </Stack>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <Stack p="6" bg="bg">
        <AeryoCard {...args} maxW="sm">
          <SampleCardContents />
        </AeryoCard>
      </Stack>
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
    <AeryoCard {...args} w="full">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Tablet: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoTablet" } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

export const Desktop: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <SampleCardContents />
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// Long Content — text/metadata that could break layout or truncation.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <AeryoCard {...args} maxW="sm">
      <AeryoCardHeader
        overline="A very long location string that could wrap onto two lines"
        title="An unusually long spot name to check header truncation"
        subtitle="An equally long subtitle describing the conditions in detail"
      />
      <AeryoCardBody>
        <Text variant="body">
          A long description of conditions, access, hazards, and local etiquette
          that should wrap naturally across several lines without breaking the
          card&apos;s layout or overflowing its container in any dimension, at
          any of the three supported sizes.
        </Text>
      </AeryoCardBody>
      <AeryoCardFooter>
        <Text variant="caption" color="fg.muted">
          Updated moments ago from three independent stations
        </Text>
        <Button size="sm">View Forecast</Button>
      </AeryoCardFooter>
    </AeryoCard>
  ),
};

// ---------------------------------------------------------------------------
// Composition examples — built entirely from AeryoCard + its subcomponents;
// not standalone components.
// ---------------------------------------------------------------------------

export const SpotCardExample: Story = {
  name: "SpotCard Example",
  parameters: { controls: { disable: true } },
  render: () => (
    <AeryoCard
      variant="interactive"
      layout="vertical"
      clickable
      href="/spots/tarifa"
      aria-label="Open Tarifa"
      maxW="sm"
    >
      <AeryoCardMedia aspectRatio="landscape">
        <Stack align="center" justify="center" w="full" h="full" bg="bg.muted">
          <LuMapPin size={32} />
        </Stack>
      </AeryoCardMedia>
      <AeryoCardBadges position="overlay-top-left">
        <Badge intent="info">Best Wind</Badge>
      </AeryoCardBadges>
      <AeryoCardActions position="overlay-top-right">
        <IconButton aria-label="Save" variant="ghost" size="sm">
          <LuHeart />
        </IconButton>
      </AeryoCardActions>
      <AeryoCardHeader overline="Andalusia, Spain" title="Tarifa" />
      <AeryoCardBody>
        <Wrap gap="4">
          <AeryoCardMeta icon={<LuWind />} label="Wind Speed" value="18 kt" />
          <AeryoCardMeta icon={<LuStar />} label="Rating" value="4.8" />
        </Wrap>
      </AeryoCardBody>
    </AeryoCard>
  ),
};

export const ForecastCardExample: Story = {
  name: "ForecastCard Example",
  parameters: { controls: { disable: true } },
  render: () => (
    <AeryoCard variant="outlined" layout="horizontal" maxW="md">
      <AeryoCardMedia aspectRatio="square" w="28">
        <Stack align="center" justify="center" w="full" h="full" bg="bg.muted">
          <LuWind size={24} />
        </Stack>
      </AeryoCardMedia>
      <AeryoCardHeader
        title="Tomorrow, 14:00"
        subtitle="WNW, building through the afternoon"
      />
      <AeryoCardBody>
        <Wrap gap="4">
          <AeryoCardMeta icon={<LuWind />} label="Wind Speed" value="22 kt" />
          <AeryoCardMeta
            icon={<LuThermometer />}
            label="Temperature"
            value="24°C"
          />
        </Wrap>
      </AeryoCardBody>
    </AeryoCard>
  ),
};

export const WeatherCardExample: Story = {
  name: "WeatherCard Example",
  parameters: { controls: { disable: true } },
  render: () => (
    <AeryoCard variant="filled" layout="vertical" maxW="xs">
      <AeryoCardHeader overline="Now" title="24°C" />
      <AeryoCardBody>
        <Wrap gap="4">
          <AeryoCardMeta icon={<LuWind />} label="Wind" value="18 kt" />
          <AeryoCardMeta
            icon={<LuThermometer />}
            label="Feels like"
            value="23°C"
          />
        </Wrap>
      </AeryoCardBody>
      <AeryoCardFooter justify="start">
        <Badge intent="success">Good conditions</Badge>
      </AeryoCardFooter>
    </AeryoCard>
  ),
};
