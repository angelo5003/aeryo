import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";

/**
 * Living reference for the Aeryo gradient tokens, defined in
 * `src/design-system/theme/gradient-tokens.ts`. Every stop is a color token,
 * so gradients follow the light and dark mode on their own. Apply them with
 * `bgImage="photoScrim.bottom"`, never with a raw `linear-gradient()`.
 */
const meta = {
  title: "Foundations/Gradients",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SCRIM_GRADIENTS = [
  "photoScrim.bottom",
  "photoScrim.full",
  "photoScrim.top",
] as const;

const SURFACE_GRADIENTS = [
  "fade.top",
  "fade.bottom",
  "panel.accent",
  "panel.danger",
  "panel.raised",
  "screenGlow",
  "avatar",
] as const;

const GradientTile = ({
  gradientName,
  backdropColor,
}: {
  gradientName: string;
  backdropColor: string;
}) => (
  <Stack gap="2">
    <Box
      bg={backdropColor}
      width="40"
      height="28"
      rounded="xl"
      overflow="hidden"
    >
      <Box width="full" height="full" bgImage={gradientName} />
    </Box>
    <Text fontSize="xs" fontWeight="medium" color="fg" fontFamily="mono">
      {gradientName}
    </Text>
  </Stack>
);

const MetricTile = () => (
  <Stack gap="2">
    <Box bg="bg.panel" width="40" height="28" rounded="xl" p="4">
      <Text
        fontSize="5xl"
        fontWeight="bold"
        lineHeight="1"
        bgImage="metric"
        bgClip="text"
        color="transparent"
      >
        18 kn
      </Text>
    </Box>
    <Text fontSize="xs" fontWeight="medium" color="fg" fontFamily="mono">
      metric
    </Text>
  </Stack>
);

const GradientScale = () => (
  <Box bg="bg.subtle" p="8">
    <Stack gap="10">
      <Stack gap="1">
        <Heading as="h2" size="md" color="fg">
          Gradients
        </Heading>
        <Text fontSize="sm" color="fg.muted">
          Scrims sit on a photo, so they use the overlay tokens and look the
          same in both modes. Fades and panels follow the color mode.
        </Text>
      </Stack>
      <Stack direction="row" gap="8" wrap="wrap">
        {SCRIM_GRADIENTS.map((gradientName) => (
          <GradientTile
            key={gradientName}
            gradientName={gradientName}
            backdropColor="accent.solid"
          />
        ))}
      </Stack>
      <Stack direction="row" gap="8" wrap="wrap">
        {SURFACE_GRADIENTS.map((gradientName) => (
          <GradientTile
            key={gradientName}
            gradientName={gradientName}
            backdropColor="bg.panel"
          />
        ))}
        <MetricTile />
      </Stack>
    </Stack>
  </Box>
);

export const Gradients: Story = {
  render: () => <GradientScale />,
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: () => (
    <DarkMode>
      <GradientScale />
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: () => (
    <LightMode>
      <GradientScale />
    </LightMode>
  ),
};
