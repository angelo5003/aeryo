import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Flex } from "@chakra-ui/react";
import { RESPONSIVE_VIEWPORTS } from "@/components/internal/storybookViewports";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { Text } from "@/components/typography/Text";
import { SettingsListCard } from "./SettingsListCard";

/**
 * Example row used only in these stories. Real rows are written where the
 * card is used. Rows should be at least 3.5rem (56px) high.
 */
const ExampleRow = ({ title, value }: { title: string; value?: string }) => (
  <Flex
    as="button"
    minHeight="14"
    alignItems="center"
    justifyContent="space-between"
    gap="3"
    paddingX="4"
    textAlign="start"
    cursor="pointer"
  >
    <Text variant="body" fontWeight="semibold">
      {title}
    </Text>
    {value && (
      <Text variant="caption" color="fg.muted">
        {value}
      </Text>
    )}
  </Flex>
);

/**
 * AERYO's settings list card — one card for a stack of settings rows, with a
 * divider between rows and an optional label above. See
 * `SettingsListCard.tsx` for implementation notes.
 */
const meta = {
  title: "Surfaces/SettingsListCard",
  component: SettingsListCard,
  tags: ["autodocs", "ai-generated"],
  args: {
    label: "Riding",
    children: (
      <>
        <ExampleRow title="Riding preferences" value="14–28 kt · Sea" />
        <ExampleRow title="My gear" value="7 items" />
      </>
    ),
  },
  argTypes: {
    as: { control: false },
    asChild: { control: false },
    children: { control: false },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box maxWidth="22rem">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof SettingsListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = { args: { label: undefined } };

export const SingleRow: Story = {
  args: { children: <ExampleRow title="Appearance" value="System" /> },
};

export const ManyRows: Story = {
  args: {
    label: "Preferences",
    children: (
      <>
        <ExampleRow title="Notifications" value="2 on" />
        <ExampleRow title="Appearance" value="System" />
        <ExampleRow title="Language" value="English" />
        <ExampleRow title="Units" value="Knots" />
      </>
    ),
  },
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: (args) => (
    <DarkMode>
      <Box bg="bg" p="6">
        <SettingsListCard {...args} />
      </Box>
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: (args) => (
    <LightMode>
      <Box bg="bg" p="6">
        <SettingsListCard {...args} />
      </Box>
    </LightMode>
  ),
};

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
