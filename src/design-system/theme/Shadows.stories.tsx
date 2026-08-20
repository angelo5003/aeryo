import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo shadow scale in
 * `src/design-system/tokens/shadows.ts`, rendered on the dark surface
 * token they were tuned against.
 */
const meta = {
  title: "Foundations/Shadows",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = ["xs", "sm", "md", "lg", "xl"];

function ShadowCard({ step }: { step: string }) {
  const [resolved] = useToken("shadows", step);
  return (
    <Stack gap="2">
      <Box bg="bg.panel" height="20" width="32" rounded="lg" shadow={step} />
      <Text fontSize="xs" fontWeight="medium" color="fg">
        {step}
      </Text>
      <Text fontSize="xs" color="fg.muted" fontFamily="mono">
        {resolved}
      </Text>
    </Stack>
  );
}

export const Shadows: Story = {
  render: () => (
    <Box bg="bg.subtle" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Shadows
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/shadows.ts. Tuned for the dark
            near-black surface — shadows mainly carry depth for floating
            elements (menus, dialogs, popovers).
          </Text>
        </Stack>
        <Stack direction="row" gap="8" wrap="wrap">
          {STEPS.map((step) => (
            <ShadowCard key={step} step={step} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
