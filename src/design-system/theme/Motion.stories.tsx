// src/design-system/theme/Motion.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Box, Button, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo motion tokens in
 * `src/design-system/tokens/motion.ts`. Each row's animation runs on the
 * real resolved duration/easing token values via the `transition` prop, not
 * a re-typed CSS value.
 */
const meta = {
  title: "Foundations/Motion",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DURATIONS = ["fast", "normal", "slow"] as const;
const EASINGS = ["easeIn", "easeOut", "easeInOut"] as const;

function MotionRow({
  duration,
  easing,
  active,
}: {
  duration: (typeof DURATIONS)[number];
  easing: (typeof EASINGS)[number];
  active: boolean;
}) {
  const [durationValue] = useToken("durations", duration);
  const [easingValue] = useToken("easings", easing);

  return (
    <Stack direction="row" gap="6" align="center">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="48">
        {duration} ({durationValue}) &middot; {easing}
      </Text>
      <Box
        bg="accent.solid"
        height="6"
        width="6"
        rounded="sm"
        style={{
          transform: active ? "translateX(240px)" : "translateX(0)",
          transition: `transform ${durationValue} ${easingValue}`,
        }}
      />
    </Stack>
  );
}

export const Motion: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <Box bg="bg" p="8">
        <Stack gap="8">
          <Stack gap="1">
            <Heading as="h2" size="md" color="fg">
              Motion
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              From src/design-system/tokens/motion.ts. Press play to see each
              duration/easing pairing run against the same 240px move.
            </Text>
            <Box>
              <Button
                size="sm"
                colorPalette="teal"
                onClick={() => setActive((v) => !v)}
              >
                {active ? "Reset" : "Play"}
              </Button>
            </Box>
          </Stack>
          <Stack gap="6">
            {DURATIONS.map((duration) =>
              EASINGS.map((easing) => (
                <MotionRow
                  key={`${duration}-${easing}`}
                  duration={duration}
                  easing={easing}
                  active={active}
                />
              )),
            )}
          </Stack>
        </Stack>
      </Box>
    );
  },
};
