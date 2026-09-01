import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack } from "@chakra-ui/react";
import { expect, waitFor, within } from "storybook/test";
import * as React from "react";
import { Button } from "@/components/actions/Button";
import { Field } from "@/components/forms/Field";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Text } from "@/components/typography/Text";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import type { DialogProps } from "./Dialog.types";

/**
 * Backs the Dark Mode / Light Mode stories — see the `portalRef` doc
 * comment on those stories for why this exists instead of a plain
 * `DarkMode`/`LightMode` wrapper.
 */
function ScopedColorModeDialog(props: {
  mode: "dark" | "light";
  args: DialogProps;
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
        <Dialog {...props.args}>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent portalRef={containerRef}>
            <DialogHeader>
              <DialogTitle>Delete session?</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
              <Text variant="body">This can&apos;t be undone.</Text>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>
    </ColorMode>
  );
}

/**
 * AERYO's dialog. See `Dialog.tsx` for implementation notes — it wraps
 * Chakra UI's compound `Dialog` (Backdrop + Positioner + Content collapsed
 * into one `DialogContent`, Portal included), the same primitive `Drawer`
 * wraps. Unlike `Drawer`, every Chakra `Dialog.Root` field passes through
 * untouched — a centered dialog has no edge to slide from, so there's no
 * physical-vocabulary prop to narrow.
 */
const meta = {
  title: "Data Display/Dialog",
  component: Dialog,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "cover", "full"],
      description: "How large the dialog panel is.",
    },
  },
  parameters: {
    layout: "padded",
    // `DialogContent` portals to `document.body` (see `Dialog.tsx`). The
    // Docs page renders every story inline in one shared document by
    // default, so every `defaultOpen` story's portaled content would land
    // in that same `document.body` and stack on top of each other —
    // rendering each story in its own iframe gives it its own document
    // instead. Same fix as `Drawer.stories.tsx`.
    docs: {
      story: {
        inline: false,
        iframeHeight: "500px",
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Closed — the default state: just the trigger, nothing rendered yet.
// ---------------------------------------------------------------------------

export const Closed: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text variant="body">Dialog content.</Text>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Open
// ---------------------------------------------------------------------------

export const Open: Story = {
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Delete session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this session?</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Text variant="body">
            This removes it from your log permanently. This can&apos;t be
            undone.
          </Text>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button intent="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    // The dialog portals to document.body, outside canvasElement — query
    // the full document for its content.
    const canvas = within(canvasElement.ownerDocument.body);
    // `defaultOpen` runs the dialog through its enter transition — the
    // title/body are in the DOM immediately but stay visibility-hidden
    // until the animation settles, so wait rather than asserting instantly.
    await waitFor(() =>
      expect(canvas.getByText("Delete this session?")).toBeVisible(),
    );
    await waitFor(() =>
      expect(
        canvas.getByText(
          "This removes it from your log permanently. This can't be undone.",
        ),
      ).toBeVisible(),
    );
  },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Small: Story = {
  args: { size: "sm", defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Small dialog</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Text variant="body">A narrow confirmation or prompt.</Text>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const Large: Story = {
  args: { size: "lg", defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Large dialog</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Text variant="body">Room for a longer form or a wider table.</Text>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Long Content — DialogBody scrolls on overflow rather than growing the
// dialog past the viewport.
// ---------------------------------------------------------------------------

export const LongContent: Story = {
  args: { defaultOpen: true, scrollBehavior: "inside" },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open session log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Log</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i} variant="body">
                Session {20 - i} — 18 kt, WNW, 2h 15m.
              </Text>
            ))}
          </Stack>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Create Account — a real-world use case: a form dialog opened from the
// onboarding carousel's closing CTA, the way a signup flow typically
// surfaces its form without a full page navigation.
// ---------------------------------------------------------------------------

export const CreateAccount: Story = {
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Create account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            <Field label="Email">
              <Input type="email" placeholder="you@example.com" />
            </Field>
            <Field label="Password">
              <PasswordInput placeholder="At least 8 characters" />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button intent="primary">Create account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  // `Dialog` portals to `document.body` by default, which escapes
  // `DarkMode`'s scoping wrapper entirely (color-mode scoping only
  // affects descendants of the element it's applied to) — `portalRef`
  // keeps the dialog's content inside that wrapper instead, so this
  // story actually demonstrates dark mode rather than silently matching
  // whatever the top-level color mode happens to be.
  render: (args) => <ScopedColorModeDialog mode="dark" args={args} />,
};

export const LightModeStory: Story = {
  name: "Light Mode",
  args: { defaultOpen: true },
  parameters: { controls: { disable: true } },
  render: (args) => <ScopedColorModeDialog mode="light" args={args} />,
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  args: { defaultOpen: true },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this session?</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Text variant="body">This can&apos;t be undone.</Text>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button intent="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Delete session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this session?</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Text variant="body">This can&apos;t be undone.</Text>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button intent="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
