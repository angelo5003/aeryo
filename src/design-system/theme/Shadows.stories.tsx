import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { DarkMode, LightMode } from "@/components/ui/color-mode";
import { semanticTokens } from "@/design-system/theme/semantic-tokens";

/**
 * Living reference for the Aeryo shadow scale. Primitive fallbacks live in
 * `src/design-system/tokens/shadows.ts`; the mode-aware values `shadow="sm"`
 * actually paints come from `semantic-tokens.ts`. Both tint `ink`, never
 * Chakra `gray` / `black`.
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

const STEPS = ["xs", "sm", "md", "lg", "xl"] as const;
type ShadowStep = (typeof STEPS)[number];
type ShadowMode = "light" | "dark";

function shadowRecipe(step: ShadowStep, mode: ShadowMode): string {
  const value = semanticTokens.shadows[step].value;
  return mode === "dark" ? value._dark : value._light;
}

function ShadowCard({ step, mode }: { step: ShadowStep; mode: ShadowMode }) {
  return (
    <Stack gap="2">
      <Box bg="bg.panel" height="20" width="32" rounded="lg" shadow={step} />
      <Text fontSize="xs" fontWeight="medium" color="fg">
        {step}
      </Text>
      <Text fontSize="xs" color="fg.muted" fontFamily="mono" maxW="48">
        {shadowRecipe(step, mode)}
      </Text>
    </Stack>
  );
}

function ShadowScale({ mode }: { mode: ShadowMode }) {
  return (
    <Box bg="bg.subtle" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Shadows
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            Semantic elevation from src/design-system/theme/semantic-tokens.ts.
            Every layer tints {`{colors.ink.950}`} (inset hairline in dark uses{" "}
            {`{colors.ink.50}`}). Light is a cool ambient on paper; dark is the
            heavier lift for floating chrome.
          </Text>
        </Stack>
        <Stack direction="row" gap="8" wrap="wrap">
          {STEPS.map((step) => (
            <ShadowCard key={step} step={step} mode={mode} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export const Shadows: Story = {
  render: () => <ShadowScale mode="dark" />,
};

export const DarkModeStory: Story = {
  name: "Dark Mode",
  render: () => (
    <DarkMode>
      <ShadowScale mode="dark" />
    </DarkMode>
  ),
};

export const LightModeStory: Story = {
  name: "Light Mode",
  render: () => (
    <LightMode>
      <ShadowScale mode="light" />
    </LightMode>
  ),
};
