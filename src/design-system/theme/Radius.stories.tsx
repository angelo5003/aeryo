// src/design-system/theme/Radius.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo radius scale in
 * `src/design-system/tokens/radii.ts`. `none` is included even though it
 * isn't defined in that file — it comes from Chakra's own `defaultConfig`
 * (this system is built via `createSystem(defaultConfig, config)`), and
 * reading it live here proves that merge actually resolves.
 */
const meta = {
  title: "Foundations/Radius",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"];

function RadiusSwatch({ step }: { step: string }) {
  const [resolved] = useToken("radii", step);
  return (
    <Stack gap="2">
      <Box bg="accent.solid" height="16" width="16" rounded={step} />
      <Text fontSize="xs" fontWeight="medium" color="fg">
        {step}
      </Text>
      <Text fontSize="xs" color="fg.muted" fontFamily="mono">
        {resolved}
      </Text>
    </Stack>
  );
}

export const Radius: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Radius
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/radii.ts (plus Chakra&apos;s
            built-in `none`). Prefer md/lg for buttons and form controls,
            xl/2xl for cards — see the file&apos;s own comment for the full
            rationale.
          </Text>
        </Stack>
        <Stack direction="row" gap="6" wrap="wrap">
          {STEPS.map((step) => (
            <RadiusSwatch key={step} step={step} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
