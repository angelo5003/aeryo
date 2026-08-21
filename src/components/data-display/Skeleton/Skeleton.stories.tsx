import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack, Wrap } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Skeleton } from "./Skeleton";
import type { SkeletonVariant } from "./Skeleton.types";

const VARIANTS: SkeletonVariant[] = ["text", "avatar", "card", "custom"];

/**
 * AERYO's loading placeholder. See `Skeleton.tsx` for implementation
 * notes — it wraps Chakra UI's `Skeleton`/`SkeletonText`/`SkeletonCircle`.
 * Distinct from `AeryoCard`'s own `loading` prop, which shapes that
 * component's own slots — this is a standalone primitive for loading
 * states anywhere else in the app.
 */
const meta = {
  title: "Data Display/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Which shape this placeholder renders.",
    },
    lines: {
      control: "number",
      description: 'variant="text" only: number of lines.',
    },
    avatarSize: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: 'variant="avatar" only: reuses Avatar\'s own size scale.',
    },
    cardSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: 'variant="card" only: reuses AeryoCard\'s own size scale.',
    },
    children: { control: false },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

export const Text: Story = {
  args: { variant: "text" },
};

export const Avatar: Story = {
  args: { variant: "avatar" },
};

export const Card: Story = {
  args: { variant: "card" },
};

export const Custom: Story = {
  args: { variant: "custom" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Skeleton {...args}>
      <Wrap gap="2" p="4" bg="bg.muted" borderRadius="xl" w="16rem" h="8rem">
        Custom-shaped content
      </Wrap>
    </Skeleton>
  ),
};

// ---------------------------------------------------------------------------
// Composed loading states
// ---------------------------------------------------------------------------

export const LoadingCard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Wrap gap="4">
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </Wrap>
  ),
};

export const LoadingProfile: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="4" w="20rem">
      <Wrap gap="3" align="center">
        <Skeleton variant="avatar" avatarSize="lg" />
        <Stack gap="2" flex="1">
          <Skeleton variant="text" lines={1} />
          <Skeleton variant="text" lines={1} />
        </Stack>
      </Wrap>
      <Skeleton variant="text" lines={3} />
    </Stack>
  ),
};

export const LoadingForecast: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap="3" w="20rem">
      {Array.from({ length: 4 }, (_, i) => (
        <Wrap key={i} gap="3" align="center">
          <Skeleton variant="avatar" avatarSize="sm" />
          <Stack gap="1" flex="1">
            <Skeleton variant="text" lines={1} />
          </Stack>
        </Wrap>
      ))}
    </Stack>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: () => (
    <DarkMode>
      <Wrap gap="4" p="6" bg="bg" align="center">
        <Skeleton variant="avatar" />
        <Skeleton variant="text" />
        <Skeleton variant="card" />
      </Wrap>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: () => (
    <LightMode>
      <Wrap gap="4" p="6" bg="bg" align="center">
        <Skeleton variant="avatar" />
        <Skeleton variant="text" />
        <Skeleton variant="card" />
      </Wrap>
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
  render: () => (
    <Stack gap="3" w="full">
      <Skeleton variant="card" cardSize="sm" />
    </Stack>
  ),
};

export const Desktop: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
  render: () => (
    <Wrap gap="4">
      <Skeleton variant="card" />
      <Skeleton variant="card" />
      <Skeleton variant="card" />
    </Wrap>
  ),
};
