import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box, Heading, Stack, Text, useToken } from "@chakra-ui/react";

/**
 * Living reference for the Aeryo type tokens in
 * `src/design-system/tokens/typography.ts`. Raw scale steps are read live
 * via `useToken`; the textStyle previews apply `textStyle="..."` directly
 * so what you see is the real resolved style, not a re-typed description.
 */
const meta = {
  title: "Foundations/Typography",
  tags: ["ai-generated"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ScaleRow({
  category,
  token,
  sample,
}: {
  category: "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings";
  token: string;
  sample: string;
}) {
  const [resolved] = useToken(category, token);
  const propMap = {
    fontSizes: "fontSize",
    fontWeights: "fontWeight",
    lineHeights: "lineHeight",
    letterSpacings: "letterSpacing",
  } as const;
  const prop = propMap[category];

  return (
    <Stack direction="row" gap="6" align="baseline">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted" width="32">
        {token} &middot; {String(resolved)}
      </Text>
      <Text {...{ [prop]: token }} color="fg">
        {sample}
      </Text>
    </Stack>
  );
}

function TextStyleRow({ name }: { name: string }) {
  return (
    <Stack gap="1">
      <Text fontSize="xs" fontFamily="mono" color="fg.muted">
        textStyle=&quot;{name}&quot;
      </Text>
      <Text textStyle={name} color="fg">
        Wind first. Reduce complexity.
      </Text>
    </Stack>
  );
}

export const Typography: Story = {
  render: () => (
    <Box bg="bg" p="8">
      <Stack gap="10">
        <Stack gap="1">
          <Heading as="h2" size="md" color="fg">
            Typography
          </Heading>
          <Text fontSize="sm" color="fg.muted">
            From src/design-system/tokens/typography.ts. Font sizes, weights,
            line-heights and letter-spacings are the raw scale; textStyles are
            named bundles built from that scale.
          </Text>
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Font sizes
          </Heading>
          {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"].map(
            (t) => (
              <ScaleRow key={t} category="fontSizes" token={t} sample="Aa" />
            ),
          )}
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Font weights
          </Heading>
          {["normal", "medium", "semibold", "bold", "extrabold"].map((t) => (
            <ScaleRow
              key={t}
              category="fontWeights"
              token={t}
              sample="Wind is the central product concept"
            />
          ))}
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Line heights
          </Heading>
          {["tight", "normal", "relaxed"].map((t) => (
            <ScaleRow
              key={t}
              category="lineHeights"
              token={t}
              sample="Should I ride? Where should I go? How was my session?"
            />
          ))}
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="sm" color="fg">
            Letter spacing
          </Heading>
          {["tight", "normal", "wide"].map((t) => (
            <ScaleRow
              key={t}
              category="letterSpacings"
              token={t}
              sample="AERYO"
            />
          ))}
        </Stack>

        <Stack gap="4">
          <Heading as="h3" size="sm" color="fg">
            Text styles
          </Heading>
          {["display", "heading", "title", "body", "caption", "label"].map(
            (name) => (
              <TextStyleRow key={name} name={name} />
            ),
          )}
        </Stack>
      </Stack>
    </Box>
  ),
};
