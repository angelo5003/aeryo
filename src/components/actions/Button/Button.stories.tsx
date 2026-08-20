import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stack, Wrap } from "@chakra-ui/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { LuArrowRight, LuMail } from "react-icons/lu";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Button } from "./Button";
import type { ButtonIntent, ButtonSize, ButtonVariant } from "./Button.types";

const INTENTS: ButtonIntent[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];
const VARIANTS: ButtonVariant[] = ["solid", "outline", "ghost", "subtle"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

// AERYO's own breakpoints (src/design-system/tokens/breakpoints.ts): sm
// 30em/480px, md 48em/768px, lg 62em/992px. These three viewports sit one
// comfortably inside each band: mobile below sm, tablet between sm and md,
// desktop above lg.
const RESPONSIVE_VIEWPORTS = {
  aeryoMobile: {
    name: "Mobile (375px)",
    styles: { width: "375px", height: "667px" },
    type: "mobile" as const,
  },
  aeryoTablet: {
    name: "Tablet (768px)",
    styles: { width: "768px", height: "1024px" },
    type: "tablet" as const,
  },
  aeryoDesktop: {
    name: "Desktop (1280px)",
    styles: { width: "1280px", height: "800px" },
    type: "desktop" as const,
  },
};

/**
 * AERYO's primary action button. See `Button.tsx` for implementation notes
 * — it wraps Chakra UI's `Button`, translating the semantic `intent` prop
 * into a token-backed `colorPalette` and narrowing `variant`/`size` to
 * AERYO's supported subset. Every other Chakra `ButtonProps` field
 * (responsive props, `loading`, `asChild`, …) passes through untouched.
 */
const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Button",
    onClick: fn(),
  },
  argTypes: {
    intent: {
      control: "select",
      options: INTENTS,
      description: "Semantic intent — selects the token-backed colorPalette.",
    },
    variant: {
      control: "select",
      options: VARIANTS,
      description: "Visual treatment.",
    },
    size: {
      control: "select",
      options: SIZES,
      description: "Size.",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches the button to 100% of its container's width.",
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner and disables interaction.",
    },
    loadingText: {
      control: "text",
      description: "Text shown next to the spinner while loading.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button.",
    },
    iconLeft: {
      control: false,
      description: "Icon rendered before `children`.",
    },
    iconRight: {
      control: false,
      description: "Icon rendered after `children`.",
    },
    children: {
      control: "text",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Variants — every intent x every variant, so the token-backed colorPalette
// mapping is visible for all four supported treatments at once.
// ---------------------------------------------------------------------------

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack gap="6">
      {VARIANTS.map((variant) => (
        <Wrap key={variant} gap="4" align="center">
          {INTENTS.map((intent) => (
            <Button key={intent} {...args} variant={variant} intent={intent}>
              {variant} / {intent}
            </Button>
          ))}
        </Wrap>
      ))}
    </Stack>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="4" align="center">
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </Wrap>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode
//
// This Storybook isn't wired to a global theme-switcher toolbar yet (no
// `@storybook/addon-themes` / toolbar `globalTypes` in .storybook/preview),
// so these stories use AERYO's own `DarkMode`/`LightMode` scoping
// components (src/components/ui/color-mode.tsx) instead — they force a
// color-mode subtree the same way the app itself does.
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Wrap gap="4" p="6" bg="bg" align="center">
        {INTENTS.map((intent) => (
          <Button key={intent} {...args} intent={intent}>
            {intent}
          </Button>
        ))}
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
        {INTENTS.map((intent) => (
          <Button key={intent} {...args} intent={intent}>
            {intent}
          </Button>
        ))}
      </Wrap>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  args: { fullWidth: true, children: "Continue" },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  args: { fullWidth: true, children: "Continue" },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  args: { children: "Continue" },
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content — labels and content that could break layout, wrapping, or
// icon alignment.
// ---------------------------------------------------------------------------

export const LongLabel: Story = {
  args: {
    children:
      "This is a deliberately long button label to check truncation and wrapping",
    iconLeft: <LuMail />,
    iconRight: <LuArrowRight />,
  },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Stack maxW="16rem">
      <Button {...args} />
    </Stack>
  ),
};

export const LongLabelFullWidth: Story = {
  args: {
    fullWidth: true,
    children: "A very long call-to-action label that fills the available width",
  },
  parameters: { controls: { disable: true } },
};

// ---------------------------------------------------------------------------
// Interaction stories — play() functions cover click, loading, disabled.
// ---------------------------------------------------------------------------

export const Click: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Loading: Story = {
  args: { loading: true, loadingText: "Saving" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();
    await expect(canvas.getByText("Saving")).toBeVisible();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  args: {
    iconLeft: <LuMail />,
    children: "Send email",
    iconRight: <LuArrowRight />,
  },
};
