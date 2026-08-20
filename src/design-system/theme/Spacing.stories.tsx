import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo spacing scale in
 * `src/design-system/tokens/spacing.ts`. Each bar's width is the token's
 * real resolved value, read live via `useToken`.
 */
const meta = {
  title: "Foundations/Spacing",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
  "32",
];

function SpacingRow({ step }: { step: string }) {
  const [resolved] = useToken("spacing", step);
  return (
    <Stack direction="row" gap="4" align="center">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="16">
        {step}
      </Text>
      <Box bg="accent.solid" height="4" width={resolved || "0"} rounded="xs" />
      <Text fontSize="xs" fontFamily="mono" color="fg.muted">
        {resolved}
      </Text>
    </Stack>
  );
}

export const Spacing: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Spacing
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/spacing.ts. 4px base unit.
          </Text>
        </Stack>
        <Stack gap="3">
          {STEPS.map((step) => (
            <SpacingRow key={step} step={step} />
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};
