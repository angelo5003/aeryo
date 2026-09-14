import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wrap } from "@chakra-ui/react";
import { expect, waitFor, within } from "storybook/test";
import { Button } from "@/components/actions/Button";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Toaster, toaster } from "./Toaster";

/**
 * AERYO's app-wide toast notifications. `Toaster` renders whatever
 * `toaster.create(...)` (imperative, importable from anywhere) queues up —
 * it takes no props itself. Colors per toast type come from AERYO's own
 * `success`/`caution`/`danger`/`teal` token families, not Chakra's stock
 * palette — see `src/design-system/theme/toastRecipe.ts`.
 */
const meta = {
  title: "Data Display/Toaster",
  component: Toaster,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    layout: "centered",
  },
  render: () => (
    <>
      <Toaster />
      <Wrap gap="3" justify="center">
        <Button
          intent="success"
          onClick={() =>
            toaster.create({
              type: "success",
              title: "Session logged",
              description: "Nice riding out there.",
            })
          }
        >
          Success
        </Button>
        <Button
          intent="warning"
          onClick={() =>
            toaster.create({
              type: "warning",
              title: "Wind dropping",
              description: "Forecast is softening for the next hour.",
            })
          }
        >
          Warning
        </Button>
        <Button
          intent="danger"
          onClick={() =>
            toaster.create({
              type: "error",
              title: "Couldn't confirm your account",
              description: "That link may have expired. Try again.",
            })
          }
        >
          Error
        </Button>
        <Button
          intent="primary"
          onClick={() =>
            toaster.create({
              type: "info",
              title: "New spot nearby",
              description: "A rider just checked in 2km away.",
            })
          }
        >
          Info
        </Button>
        <Button
          intent="secondary"
          onClick={() =>
            toaster.create({
              type: "loading",
              title: "Syncing session…",
            })
          }
        >
          Loading
        </Button>
      </Wrap>
    </>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Success toast — interaction test
// ---------------------------------------------------------------------------

export const SuccessToast: Story = {
  play: async ({ canvasElement }) => {
    // Toaster portals to document.body, outside canvasElement — query the
    // full document, same pattern as Drawer.stories.tsx. The toast is in
    // the DOM immediately but stays visibility-hidden until its enter
    // transition settles, so wait rather than asserting instantly.
    const canvas = within(canvasElement.ownerDocument.body);
    await canvas.getByRole("button", { name: "Success" }).click();
    await waitFor(async () =>
      expect(await canvas.findByText("Session logged")).toBeVisible(),
    );
  },
};

// ---------------------------------------------------------------------------
// Error toast — interaction test
// ---------------------------------------------------------------------------

export const ErrorToast: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await canvas.getByRole("button", { name: "Error" }).click();
    await waitFor(async () =>
      expect(
        await canvas.findByText("Couldn't confirm your account"),
      ).toBeVisible(),
    );
  },
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: () => (
    <DarkMode>
      <Wrap gap="3" p="6" bg="bg" justify="center">
        <Button
          intent="danger"
          onClick={() =>
            toaster.create({ type: "error", title: "Something went wrong" })
          }
        >
          Error
        </Button>
        <Toaster />
      </Wrap>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: () => (
    <LightMode>
      <Wrap gap="3" p="6" bg="bg" justify="center">
        <Button
          intent="danger"
          onClick={() =>
            toaster.create({ type: "error", title: "Something went wrong" })
          }
        >
          Error
        </Button>
        <Toaster />
      </Wrap>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  parameters: {
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Desktop: Story = {
  parameters: {
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
};
