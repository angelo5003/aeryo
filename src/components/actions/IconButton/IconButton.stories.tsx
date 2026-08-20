import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wrap } from "@chakra-ui/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { LuHeart, LuTrash2 } from "react-icons/lu";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { IconButton } from "./IconButton";
import type {
  ButtonIntent,
  ButtonSize,
  ButtonVariant,
} from "../Button/Button.types";

const INTENTS: ButtonIntent[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];
const VARIANTS: ButtonVariant[] = ["solid", "outline", "ghost", "subtle"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

// Same three viewports as Button/Button.stories.tsx — see that file for why
// these particular widths (AERYO's own breakpoints.ts bands).
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
 * AERYO's icon-only action button. See `IconButton.tsx` for implementation
 * notes — it wraps Chakra UI's `IconButton`, sharing the exact
 * intent-to-colorPalette mapping `Button` uses. `aria-label` is required
 * (not optional) since this control has no visible text.
 */
const meta = {
  title: "Actions/IconButton",
  component: IconButton,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "Delete",
    children: <LuTrash2 />,
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
    loading: {
      control: "boolean",
      description: "Shows a loading spinner and disables interaction.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button.",
    },
    "aria-label": {
      control: "text",
      description:
        "Required accessible name — this control has no visible text.",
    },
    children: {
      control: false,
      description: "The icon. A single icon element.",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Variants — every intent x every variant.
// ---------------------------------------------------------------------------

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="6" align="center">
      {VARIANTS.map((variant) =>
        INTENTS.map((intent) => (
          <IconButton
            key={`${variant}-${intent}`}
            {...args}
            variant={variant}
            intent={intent}
            aria-label={`${variant} ${intent}`}
          />
        )),
      )}
    </Wrap>
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
        <IconButton key={size} {...args} size={size} aria-label={size} />
      ))}
    </Wrap>
  ),
};

// ---------------------------------------------------------------------------
// Dark Mode / Light Mode — see Button/Button.stories.tsx for why these use
// the DarkMode/LightMode scoping components rather than a Storybook
// toolbar theme-switcher (none is configured yet).
// ---------------------------------------------------------------------------

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Wrap gap="4" p="6" bg="bg" align="center">
        {INTENTS.map((intent) => (
          <IconButton
            key={intent}
            {...args}
            intent={intent}
            aria-label={intent}
          />
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
          <IconButton
            key={intent}
            {...args}
            intent={intent}
            aria-label={intent}
          />
        ))}
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

export const Tablet: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  parameters: {
    controls: { disable: true },
    viewport: { options: RESPONSIVE_VIEWPORTS },
  },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content — IconButton renders no visible text, so the edge case here
// is a long `aria-label` rather than long visible content: confirms it
// doesn't affect layout and is still exposed correctly to the accessibility
// tree.
// ---------------------------------------------------------------------------

export const LongAriaLabel: Story = {
  args: {
    "aria-label":
      "Remove this item permanently from your saved collection and all associated boards",
  },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: args["aria-label"] as string }),
    ).toBeVisible();
  },
};

// ---------------------------------------------------------------------------
// Interaction stories — play() functions cover click and disabled.
// ---------------------------------------------------------------------------

export const Click: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Delete" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Delete" });
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

export const WithHeartIcon: Story = {
  args: { "aria-label": "Add to favorites", children: <LuHeart /> },
};
