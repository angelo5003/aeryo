import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "@chakra-ui/react";
import { expect, waitFor, within } from "storybook/test";
import * as React from "react";
import { LuMap, LuMenu, LuSettings, LuTrophy, LuWind } from "react-icons/lu";
import { Button } from "@/components/actions/Button";
import { IconButton } from "@/components/actions/IconButton";
import { Text } from "@/components/typography/Text";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import {
  Drawer,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import type { DrawerProps } from "./Drawer.types";

/**
 * Backs the Dark Mode / Light Mode stories — see the `portalRef` doc
 * comment on those stories for why this exists instead of a plain
 * `DarkMode`/`LightMode` wrapper.
 */
function ScopedColorModeDrawer(props: {
  mode: "dark" | "light";
  args: DrawerProps;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [, forceRender] = React.useState(0);
  const ColorMode = props.mode === "dark" ? DarkMode : LightMode;

  return (
    <ColorMode>
      <div
        ref={(node) => {
          if (node && containerRef.current !== node) {
            containerRef.current = node;
            forceRender((n) => n + 1);
          }
        }}
      >
        <Drawer {...props.args}>
          <DrawerTrigger asChild>
            <Button>Open menu</Button>
          </DrawerTrigger>
          <DrawerContent portalRef={containerRef}>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerCloseTrigger />
            </DrawerHeader>
            <DrawerBody>
              <Text variant="body">Narrow down spots by wind speed.</Text>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </ColorMode>
  );
}

/**
 * AERYO's drawer. See `Drawer.tsx` for implementation notes — it wraps
 * Chakra UI's compound `Drawer` (Backdrop + Positioner + Content
 * collapsed into one `DrawerContent`, Portal included). `placement`
 * narrows Chakra's logical `start`/`end` to AERYO's own `left`/`right`.
 */
const meta = {
  title: "Data Display/Drawer",
  component: Drawer,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    placement: {
      control: "select",
      options: ["left", "right", "bottom"],
      description: "Which edge the drawer slides in from.",
    },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Closed — the default state: just the trigger, nothing rendered yet.
// ---------------------------------------------------------------------------

export const Closed: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Drawer content.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

// ---------------------------------------------------------------------------
// Open — right (default)
// ---------------------------------------------------------------------------

export const Open: Story = {
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">
            Narrow down spots by wind speed, distance, and rating.
          </Text>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost">Reset</Button>
          <Button>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    // The drawer portals to document.body, outside canvasElement — query
    // the full document for its content.
    const canvas = within(canvasElement.ownerDocument.body);
    // `defaultOpen` runs the drawer through its enter transition — the
    // title/body are in the DOM immediately but stay visibility-hidden
    // until the animation settles, so wait rather than asserting instantly.
    await waitFor(() =>
      expect(canvas.getByText("Filters")).toBeVisible(),
    );
    await waitFor(() =>
      expect(
        canvas.getByText(
          "Narrow down spots by wind speed, distance, and rating.",
        ),
      ).toBeVisible(),
    );
  },
};

// ---------------------------------------------------------------------------
// Placements
// ---------------------------------------------------------------------------

export const LeftPlacement: Story = {
  args: { placement: "left", defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Left-placed drawer content.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

export const BottomPlacement: Story = {
  args: { placement: "bottom", defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Bottom-placed drawer content.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

// ---------------------------------------------------------------------------
// Long Content — DrawerBody scrolls on overflow rather than growing the
// drawer past the viewport.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open session log</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Session Log</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="4">
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i} variant="body">
                Session {20 - i} — 18 kt, WNW, 2h 15m.
              </Text>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

// ---------------------------------------------------------------------------
// Mobile Navigation — a left-placed drawer of nav links, opened from a
// hamburger icon button, the way a mobile app shell typically uses one.
// ---------------------------------------------------------------------------

export const MobileNavigation: Story = {
  args: { placement: "left", defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <IconButton aria-label="Open navigation" variant="ghost">
          <LuMenu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>AERYO</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="1">
            <Button variant="ghost" justifyContent="flex-start">
              <LuMap />
              Spots
            </Button>
            <Button variant="ghost" justifyContent="flex-start">
              <LuWind />
              Forecast
            </Button>
            <Button variant="ghost" justifyContent="flex-start">
              <LuTrophy />
              Achievements
            </Button>
            <Button variant="ghost" justifyContent="flex-start">
              <LuSettings />
              Settings
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  // `Drawer` portals to `document.body` by default, which escapes
  // `DarkMode`'s scoping wrapper entirely (color-mode scoping only
  // affects descendants of the element it's applied to) — `portalRef`
  // keeps the drawer's content inside that wrapper instead, so this
  // story actually demonstrates dark mode rather than silently matching
  // whatever the top-level color mode happens to be.
  render: (args) => <ScopedColorModeDrawer mode="dark" args={args} />,
};

export const LightModeStory: Story = {
  name: "Light Mode",
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => <ScopedColorModeDrawer mode="light" args={args} />,
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  args: { placement: "bottom", defaultOpen: true },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Actions</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Mobile bottom-sheet style drawer.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

export const Desktop: Story = {
  args: { defaultOpen: true },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open menu</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Text variant="body">Narrow down spots by wind speed.</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};
