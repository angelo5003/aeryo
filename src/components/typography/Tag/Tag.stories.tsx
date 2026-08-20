import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Wrap } from "@chakra-ui/react";
import { expect, userEvent, within } from "storybook/test";
import { LuTag } from "react-icons/lu";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { Tag } from "./Tag";
import type {
  StatusIntent,
  StatusVariant,
} from "../internal/statusColorPalette";

const INTENTS: StatusIntent[] = [
  "neutral",
  "success",
  "warning",
  "error",
  "info",
];
const VARIANTS: StatusVariant[] = ["solid", "subtle", "outline", "surface"];
const SIZES = ["sm", "md", "lg", "xl"] as const;

/**
 * AERYO's status tag — a convenience wrapper around Chakra UI's compound
 * `Tag`. See `Tag.tsx` for implementation notes.
 */
const meta = {
  title: "Typography/Tag",
  component: Tag,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "Tag",
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    startElement: { control: false },
    endElement: { control: false },
    intent: { control: "select", options: INTENTS },
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    closable: { control: "boolean" },
    children: { control: "text" },
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Variants — every intent x every variant.
// ---------------------------------------------------------------------------

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="4">
      {VARIANTS.map((variant) => (
        <Wrap key={variant} gap="3" align="center">
          {INTENTS.map((intent) => (
            <Tag key={intent} {...args} variant={variant} intent={intent}>
              {intent}
            </Tag>
          ))}
        </Wrap>
      ))}
    </Box>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Wrap gap="3" align="center">
      {SIZES.map((size) => (
        <Tag key={size} {...args} size={size}>
          {size}
        </Tag>
      ))}
    </Wrap>
  ),
};

export const WithIcon: Story = {
  args: { startElement: <LuTag /> },
};

// ---------------------------------------------------------------------------
// Closable — a real interactive example (local state), since `closable`
// only makes visible sense with somewhere for the tag to go.
// ---------------------------------------------------------------------------

function ClosableExample() {
  const [visible, setVisible] = React.useState(true);
  if (!visible) {
    return <Box color="fg.muted">Tag closed.</Box>;
  }
  return (
    <Tag closable onClose={() => setVisible(false)}>
      Dismiss me
    </Tag>
  );
}

export const Closable: Story = {
  render: () => <ClosableExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButton = await canvas.findByRole("button");
    await userEvent.click(closeButton);
    await expect(canvas.getByText("Tag closed.")).toBeVisible();
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  parameters: { controls: { disable: true } },
  render: (args) => (
    <DarkMode>
      <Wrap gap="3" p="6" bg="bg" align="center">
        {INTENTS.map((intent) => (
          <Tag key={intent} {...args} intent={intent}>
            {intent}
          </Tag>
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
      <Wrap gap="3" p="6" bg="bg" align="center">
        {INTENTS.map((intent) => (
          <Tag key={intent} {...args} intent={intent}>
            {intent}
          </Tag>
        ))}
      </Wrap>
    </LightMode>
  ),
};

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

export const Mobile: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoMobile" } },
};

export const Tablet: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoTablet" } },
};

export const Desktop: Story = {
  parameters: { viewport: { options: RESPONSIVE_VIEWPORTS } },
  globals: { viewport: { value: "aeryoDesktop" } },
};

// ---------------------------------------------------------------------------
// Long Content — Chakra's tag label uses `lineClamp: 1`, so long labels
// truncate rather than wrap; this confirms that inside a narrow tag.
// ---------------------------------------------------------------------------

export const LongLabel: Story = {
  args: { children: "A deliberately long tag label that should truncate" },
  render: (args) => (
    <Box width="10rem">
      <Tag {...args} />
    </Box>
  ),
};
