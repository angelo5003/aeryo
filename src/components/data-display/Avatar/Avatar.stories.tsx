import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarGroup, Wrap } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Avatar } from "./Avatar";
import type { AvatarSize } from "./Avatar.types";

const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

// A tiny inline SVG data URI, so this story never depends on network
// access for its "image" cases.
const SAMPLE_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' fill='%23225b62'/%3E%3Ccircle cx='48' cy='38' r='18' fill='%2363e6d5'/%3E%3Ccircle cx='48' cy='96' r='34' fill='%2363e6d5'/%3E%3C/svg%3E";
const BROKEN_IMAGE = "https://example.invalid/no-such-photo.jpg";

/**
 * AERYO's avatar. See `Avatar.tsx` for implementation notes — it wraps
 * Chakra UI's compound `Avatar`, letting Chakra's own Image → Fallback
 * cascade decide between a photo, initials, or a generic icon.
 * `status`/`verified` are AERYO's own additions.
 */
const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs", "ai-generated"],
  args: {
    name: "Tarik Osei",
  },
  argTypes: {
    src: { control: "text" },
    name: { control: "text" },
    icon: { control: false },
    size: {
      control: "select",
      options: SIZES,
      description: "Size.",
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline"],
      description: "Presence status — renders a small dot indicator.",
    },
    verified: {
      control: "boolean",
      description: "Renders a small verified-checkmark badge.",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

export const Image: Story = {
  args: { src: SAMPLE_IMAGE },
};

export const ImageWithStatusAndVerified: Story = {
  name: "Image (Status + Verified)",
  args: { src: SAMPLE_IMAGE, status: "online", verified: true },
  parameters: { controls: { disable: true } },
};

// ---------------------------------------------------------------------------
// Initials
// ---------------------------------------------------------------------------

export const Initials: Story = {
  args: { name: "Tarik Osei" },
};

// ---------------------------------------------------------------------------
// Fallback — no image, no name: Chakra's own generic icon.
// ---------------------------------------------------------------------------

export const Fallback: Story = {
  args: { name: undefined },
  parameters: { controls: { disable: true } },
};

export const BrokenImageFallsBackToInitials: Story = {
  name: "Broken Image Falls Back to Initials",
  args: { src: BROKEN_IMAGE, name: "Tarik Osei" },
  parameters: { controls: { disable: true } },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="center">
      {SIZES.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </Wrap>
  ),
};

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

export const Status: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="center">
      <Avatar {...args} status="online" />
      <Avatar {...args} status="offline" />
      <Avatar {...args} verified />
      <Avatar {...args} status="online" verified />
    </Wrap>
  ),
};

// ---------------------------------------------------------------------------
// Group — Chakra's own AvatarGroup, stacking our Avatar instances.
// ---------------------------------------------------------------------------

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AvatarGroup size="md">
      <Avatar name="Tarik Osei" />
      <Avatar name="Mina Boateng" />
      <Avatar src={SAMPLE_IMAGE} name="Léa Fontaine" />
      <Avatar name="+4" />
    </AvatarGroup>
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
      <Wrap gap="4" p="6" bg="bg" align="center">
        <Avatar {...args} src={SAMPLE_IMAGE} />
        <Avatar {...args} />
        <Avatar {...args} name={undefined} />
        <Avatar {...args} status="online" verified />
      </Wrap>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <LightMode>
      <Wrap gap="4" p="6" bg="bg" align="center">
        <Avatar {...args} src={SAMPLE_IMAGE} />
        <Avatar {...args} />
        <Avatar {...args} name={undefined} />
        <Avatar {...args} status="online" verified />
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
};

export const Desktop: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
};
